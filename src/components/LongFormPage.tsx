import {PortableText} from 'next-sanity'

import type {PageDoc} from '@/lib/content-types'

export function LongFormPage({page}: {page: PageDoc}) {
  return (
    <article className="gr-section-pad gr-gutter" style={{maxWidth: 780, margin: '0 auto'}}>
      <header style={{textAlign: 'center', marginBottom: 'clamp(36px, 4.5vw, 60px)'}}>
        <h1
          className="gr-display"
          style={{fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 1.18, margin: 0}}
        >
          {page.title}
        </h1>
      </header>

      {page.body?.length ? (
        <div className="gr-portable">
          {/* CMS-driven body */}
          <PortableText
            value={page.body as never}
            components={{
              block: {
                h2: ({children}) => (
                  <h2
                    className="gr-display"
                    style={{fontSize: 'clamp(21px, 2.2vw, 28px)', lineHeight: 1.3, margin: '44px 0 0'}}
                  >
                    {children}
                  </h2>
                ),
                normal: ({children}) => (
                  <p style={{fontSize: 15, lineHeight: '30px', color: 'var(--ink-70)', margin: '18px 0 0'}}>
                    {children}
                  </p>
                ),
              },
            }}
          />
        </div>
      ) : (
        page.bodyText?.map((section, i) => (
          <section key={section.heading ?? i} style={{marginTop: i === 0 ? 0 : 44}}>
            {section.heading && (
              <h2
                className="gr-display"
                style={{fontSize: 'clamp(21px, 2.2vw, 28px)', lineHeight: 1.3, margin: '0 0 4px'}}
              >
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((para) => (
              <p
                key={para.slice(0, 40)}
                style={{fontSize: 15, lineHeight: '30px', color: 'var(--ink-70)', margin: '18px 0 0'}}
              >
                {para}
              </p>
            ))}
          </section>
        ))
      )}
    </article>
  )
}
