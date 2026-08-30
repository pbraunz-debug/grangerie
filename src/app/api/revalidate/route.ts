import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: {current?: string}
  handle?: {current?: string}
}

/**
 * Sanity webhook → on-demand revalidation.
 * Configure the webhook with the shared secret from SANITY_REVALIDATE_SECRET and a
 * projection of {_type, slug, handle}.
 */
export async function POST(req: NextRequest) {
  try {
    const {isValidSignature, body} = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', {status: 401})
    }
    if (!body?._type) {
      return new NextResponse('Bad request', {status: 400})
    }

    const tags = [body._type]
    if (body._type === 'product' && body.handle?.current) {
      tags.push(`product:${body.handle.current}`)
    }
    if (body._type === 'page' && body.slug?.current) {
      tags.push(`page:${body.slug.current}`)
    }
    for (const tag of tags) revalidateTag(tag)

    return NextResponse.json({revalidated: tags, now: Date.now()})
  } catch (err) {
    return new NextResponse(err instanceof Error ? err.message : 'Error', {status: 500})
  }
}
