import {ImageResponse} from 'next/og'

export const runtime = 'edge'
export const alt = 'Grangerie — Comfort is the new sex.'
export const size = {width: 1200, height: 630}
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f5f3',
          color: '#201e1d',
          fontFamily: 'Archivo, system-ui, sans-serif',
        }}
      >
        <div style={{fontSize: 34, fontWeight: 300, letterSpacing: '0.42em', textTransform: 'uppercase' as const}}>
          Grangerie
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60}}>
          <div style={{fontSize: 64, fontWeight: 300, letterSpacing: '-0.015em'}}>
            Comfort is the new sex.
          </div>
          <div style={{fontSize: 64, fontWeight: 400, letterSpacing: '-0.015em'}}>
            It&rsquo;s Grangerie.
          </div>
        </div>
        <div
          style={{
            marginTop: 60,
            fontSize: 18,
            letterSpacing: '0.28em',
            textTransform: 'uppercase' as const,
            color: 'rgba(32,30,29,0.55)',
          }}
        >
          Nap socks with every order — no exceptions
        </div>
      </div>
    ),
    size,
  )
}
