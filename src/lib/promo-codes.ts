/**
 * Promo codes: one config object, one code per order, no confetti.
 *
 * Adding a code is a one-line change here. `percent` applies to the garment
 * subtotal (before shipping/tax; the $0 socks were never in the math).
 * `validate` runs before applying and may reject with its own message —
 * it receives the customer's local hour (0–23) from the browser.
 *
 * Messages render exactly as written, calmly, as settled fact.
 */

export interface PromoCodeEntry {
  percent: number
  message: string
  validate?: (ctx: {localHour: number}) => string | null
}

export const PROMO_CODES: Record<string, PromoCodeEntry> = {
  HESFINE: {
    percent: 10,
    message: '10% off. He’s fine. He’ll find the remote. It was under him.',
  },
  ASKINGFORME: {
    percent: 10,
    message: 'We believe you. 10% off, for you, who this is for.',
  },
  THESIGNAL: {
    percent: 15,
    message:
      '15% off. Put it on at 6:15. He knows what it means. If he doesn’t yet, he will.',
  },
  NOTTONIGHT: {
    percent: 15,
    message: 'Code applied. So is the policy.',
  },
  GOODNIGHT: {
    percent: 10,
    message: '10% off. This code stops working at 9 p.m. because so do we.',
    validate: ({localHour}) =>
      localHour >= 21 ? 'This code went to bed at 9. Try again tomorrow. It rises early.' : null,
  },
  LAMPTESTED: {
    percent: 12,
    message: '12% off. The discount was held up to a lamp. Nothing came through.',
  },
  GRANDMASRIGHT: {
    percent: 20,
    message:
      'She was right about the gown. She was right about him, too, but one thing at a time. 20% off.',
  },
  ANNIVERSARY: {
    percent: 14,
    message:
      '14% off — one percent per ounce of cotton. Happy anniversary. He forgot, but the gown didn’t.',
  },
  FLATTERINGTOWHO: {
    percent: 15,
    message: 'An excellent question. Still unanswered. 15% off.',
  },
  SLEEVEOFCRACKERS: {
    percent: 10,
    message: '10% off. What happens inside The Big One stays inside The Big One.',
  },
  HISCARDACTUALLY: {
    percent: 5,
    message: '5% off. It’s a joint account. It was always a joint account.',
  },
  // Intentionally does nothing. Do not "fix" it.
  SOCKSPLEASE: {
    percent: 0,
    message:
      'This code does nothing. The socks were already coming. They were always coming. Have a nice day.',
  },
}

export const INVALID_CODE_MESSAGE =
  'That is not a code. It’s okay. Neither was ‘HUSBAND10’, which someone tries every week.'

export const REPLACED_CODE_MESSAGE =
  'One code per order. We are a nightgown company, not a casino.'

export function normalizeCode(input: string): string {
  return input.trim().toUpperCase()
}
