import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {LongFormPage} from '@/components/LongFormPage'
import {getPage} from '@/lib/content'

const KNOWN_SLUGS = ['faq', 'shipping-returns', 'privacy', 'terms']

interface Props {
  params: Promise<{slug: string}>
}

export function generateStaticParams() {
  return KNOWN_SLUGS.map((slug) => ({slug}))
}

export const dynamicParams = false

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const page = await getPage(slug)
  if (!page) return {}
  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description,
  }
}

export default async function CmsPage({params}: Props) {
  const {slug} = await params
  if (!KNOWN_SLUGS.includes(slug)) notFound()
  const page = await getPage(slug)
  if (!page) notFound()
  return <LongFormPage page={page} />
}
