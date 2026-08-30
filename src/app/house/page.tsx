import type {Metadata} from 'next'

import {LongFormPage} from '@/components/LongFormPage'
import {getPage} from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('house')
  return {
    title: page?.seo?.title ?? page?.title ?? 'The House',
    description: page?.seo?.description,
  }
}

export default async function HousePage() {
  const page = await getPage('house')
  if (!page) return null
  return <LongFormPage page={page} />
}
