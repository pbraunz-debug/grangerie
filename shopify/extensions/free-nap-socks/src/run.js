// @ts-check

/**
 * Product discount Function: prices "Nap Socks — Oatmeal, One Size" at $0 on
 * every cart, so the gift survives checkout. The storefront adds the line;
 * this makes sure it never costs anything.
 */

const SOCKS_TITLE = 'Nap Socks — Oatmeal, One Size'

/**
 * @param {{cart: {lines: Array<{id: string, merchandise: {__typename: string, product?: {title: string}}}>}}} input
 */
export function run(input) {
  const targets = input.cart.lines
    .filter(
      (line) =>
        line.merchandise.__typename === 'ProductVariant' &&
        line.merchandise.product?.title === SOCKS_TITLE,
    )
    .map((line) => ({cartLine: {id: line.id}}))

  if (targets.length === 0) {
    return {discountApplicationStrategy: 'FIRST', discounts: []}
  }

  return {
    discountApplicationStrategy: 'MAXIMUM',
    discounts: [
      {
        targets,
        value: {percentage: {value: '100.0'}},
        message: 'You did not ask for them. They are in the box.',
      },
    ],
  }
}
