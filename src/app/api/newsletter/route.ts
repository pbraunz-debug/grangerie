import {NextResponse} from 'next/server'

/**
 * Newsletter signup → Klaviyo (when configured). Single input, no popup.
 * Without a key this accepts and no-ops so the form works pre-launch.
 */
export async function POST(req: Request) {
  let email: unknown
  try {
    ;({email} = (await req.json()) as {email?: unknown})
  } catch {
    return new NextResponse('Bad request', {status: 400})
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new NextResponse('Invalid email', {status: 400})
  }

  const apiKey = process.env.KLAVIYO_API_KEY
  const listId = process.env.KLAVIYO_LIST_ID
  if (!apiKey || !listId) {
    // Pre-launch: accept quietly.
    return NextResponse.json({ok: true, stored: false})
  }

  const res = await fetch(
    'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
    {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        'Content-Type': 'application/json',
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {email, subscriptions: {email: {marketing: {consent: 'SUBSCRIBED'}}}},
                },
              ],
            },
          },
          relationships: {list: {data: {type: 'list', id: listId}}},
        },
      }),
    },
  )

  if (!res.ok) return new NextResponse('Subscription failed', {status: 502})
  return NextResponse.json({ok: true, stored: true})
}
