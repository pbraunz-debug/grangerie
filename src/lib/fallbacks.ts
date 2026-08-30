/**
 * Fallback content — the prototype's copy, verbatim.
 *
 * Every string on the site comes from Sanity when it is configured; this file is
 * the render fallback (and the seed source for `scripts/seed.ts`), so the site is
 * fully browsable before the CMS or Shopify exist. Do not paraphrase anything in
 * here. The voice is the product.
 */
import type {
  Campaign,
  HomeContent,
  PageDoc,
  Product,
  Promise_,
  Settings,
  Stat,
  Testimonial,
} from './content-types'

export const fallbackSettings: Settings = {
  wordmark: 'Grangerie',
  navLinks: [
    {label: 'Collection', href: '/shop'},
    {label: 'Nap socks', href: '/#socks'},
    {label: 'Care', href: '/house'},
  ],
  footerLines: [
    'Grangerie — it’s Grangerie',
    'Nap socks with every order, no exceptions',
    'Returns accepted — the socks are yours',
  ],
  socksIncludedCopy: 'Nap socks included. You did not ask for them. They are in the box.',
  announcementBar: 'A pair of nap socks ships with every order. Non-negotiable.',
}

export const fallbackCampaign: Campaign = {
  kicker: 'Autumn — sleepwear, entirely',
  headlineLines: ['Comfort is the new sex.', 'It’s Grangerie.'],
  bodyCopy:
    'Candlelight, steam, a long exhale — and then a floor-length cotton gown, because that is how the evening actually ends. A pair of nap socks ships with every order. You did not ask for them. They are in the box.',
  ctaLabel: 'Shop the collection',
  // Placeholder stock from the prototype; replace with brand photography in Sanity.
  heroPosterUrl:
    'https://images.pexels.com/photos/6940881/pexels-photo-6940881.jpeg?auto=compress&cs=tinysrgb&w=1800',
}

export const fallbackPromises: Promise_[] = [
  {
    _id: 'promise-1',
    numeral: 'I',
    title: 'It goes on over the head',
    body: 'There is no zipper, because a zipper is a decision, and you are done making those today. One motion. It ends at the ankle. The ankle is where it ends.',
    order: 1,
  },
  {
    _id: 'promise-2',
    numeral: 'II',
    title: 'We hold it up to a lamp',
    body: 'Every garment, every time. If a person standing behind it becomes visible in any way, it does not leave the building. It stays. We keep it. We have a room.',
    order: 2,
  },
  {
    _id: 'promise-3',
    numeral: 'III',
    title: 'Pockets, and their purpose',
    body: 'Two deep front pockets: a phone, a granola bar, and one item you will not explain to anybody. We do not ask what is in the pockets. That was an early decision and we have honored it.',
    order: 3,
  },
]

export const fallbackStats: Stat[] = [
  {_id: 'stat-1', value: '100%', label: 'Of you, covered\nGive or take the head', order: 1},
  {_id: 'stat-2', value: '2', label: 'Nap socks per order\nA pair. Both feet', order: 2},
  {_id: 'stat-3', value: '0', label: 'Cutouts, panels\nPeekaboo anything', order: 3},
  {_id: 'stat-4', value: '14oz', label: 'Cotton weight\nA real amount of cotton', order: 4},
]

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'testimonial-angela',
    quote: 'The socks came and I said, I did not order socks. And they said, correct.',
    name: 'Angela D.',
    city: 'Sarasota',
    attribution: 'Angela D. — Sarasota — owns four',
    placement: 'strip',
    order: 1,
  },
  {
    _id: 'testimonial-marisol',
    quote: 'I haven’t shaved in weeks, and he has no idea. Thanks, Grangerie.',
    name: 'Marisol P.',
    city: 'Tempe',
    attribution: 'Marisol P. — Tempe — wears The No. 1 nightly',
    placement: 'strip',
    order: 2,
  },
  {
    _id: 'testimonial-kathy',
    quote:
      'My sister bought one and said nothing about it for six weeks, which, for that bitch, is a rave. She has never once complimented me. Anyway, I love the gown.',
    name: 'Kathy L.',
    city: 'Bethesda',
    attribution: 'Kathy L. — Bethesda — wears The Housecoat',
    placement: 'strip',
    order: 3,
  },
  {
    _id: 'testimonial-denise',
    quote:
      'My husband asked what I had on and I said ‘It’s Grangerie,’ and he stood there a second and said, ‘So is that a no, then. For tonight. Is that a no.’ And I slept nine hours.',
    name: 'Denise R.',
    city: 'Ohio',
    attribution: 'Denise R. — mother of three, Ohio — wears The Big One',
    placement: 'feature',
    order: 4,
  },
]

export const fallbackProducts: Product[] = [
  {
    _id: 'product-no-1',
    title: 'The No. 1',
    handle: 'the-no-1',
    cut: 'ankle-length',
    cutLabel: 'Ankle-length',
    price: 88,
    blurb: 'Faded roses on heavyweight cotton. The neckline is at the neck.',
    longDescriptionText: [
      'Faded roses on 14oz heavyweight cotton, printed the way they used to print them, which is to say: faded already. It goes on over the head. There is no zipper, because a zipper is a decision, and you are done making those today.',
      'The neckline is at the neck. The hem is at the ankle. Between those two points there is cotton, and only cotton, and nobody needs to know anything else.',
      'Two deep front pockets. We do not ask what is in the pockets. That was an early decision and we have honored it.',
    ],
    fabricWeightOz: 14,
    images: [{url: '/img/no1.jpeg', alt: 'The No. 1 — ankle-length faded-floral cotton nightgown, high neck, long sleeves'}],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    inStock: true,
    order: 1,
  },
  {
    _id: 'product-housecoat',
    title: 'The Housecoat',
    handle: 'the-housecoat',
    cut: 'quilted',
    cutLabel: 'Quilted',
    price: 124,
    blurb: 'For answering the door at a distance you control.',
    longDescriptionText: [
      'Quilted, floor-length, belted. For answering the door at a distance you control. The belt is decorative in the sense that the coat works either way; it is functional in the sense that tying it communicates something, and everyone on the porch understands what.',
      'It passed the lamp test on the first try. Most things do not pass the lamp test on the first try.',
      'Holds a mug at any temperature. The mug is not included. The nap socks are.',
    ],
    fabricWeightOz: 14,
    images: [{url: '/img/housecoat.jpeg', alt: 'The Housecoat — quilted floor-length housecoat, belted, hands in pockets'}],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    inStock: true,
    order: 2,
  },
  {
    _id: 'product-two-piece',
    title: 'The Two-Piece, Modest',
    handle: 'the-two-piece-modest',
    cut: 'two-piece',
    cutLabel: 'Two pieces',
    price: 96,
    blurb: 'Buttoned to the top button. That is the point of the top button.',
    longDescriptionText: [
      'A loose flannel two-piece with long sleeves and a full placket. Buttoned to the top button. That is the point of the top button.',
      'The top and the bottom are cut generously enough that, worn together, they are informationally equivalent to the gowns. We checked. With the lamp.',
      'Two pieces means two chances to be covered. Both are taken.',
    ],
    fabricWeightOz: 14,
    images: [{url: '/img/twopiece.jpeg', alt: 'The Two-Piece, Modest — loose flannel two-piece, long sleeves buttoned to the top'}],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    inStock: true,
    order: 3,
  },
  {
    _id: 'product-big-one',
    title: 'The Big One',
    handle: 'the-big-one',
    cut: 'tent',
    cutLabel: 'Tent cut',
    price: 102,
    blurb: 'Extremely generous through the middle. Nobody knows anything.',
    longDescriptionText: [
      'Extremely generous through the middle. Nobody knows anything. Three-quarter sleeves, tent cut, an amount of cotton we had to explain to our supplier twice.',
      'You can sit cross-legged inside it entirely. You can bring a snack in there. We designed for that on purpose and we would do it again.',
      'It is our largest gown, and it is exactly as large as it needs to be, which is very.',
    ],
    fabricWeightOz: 14,
    images: [
      {
        // Placeholder stock from the prototype; replace with brand photography in Sanity.
        url: 'https://images.pexels.com/photos/9146362/pexels-photo-9146362.jpeg?auto=compress&cs=tinysrgb&w=1800',
        alt: 'The Big One — enormous tent-cut cotton nightgown, three-quarter sleeves',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    inStock: true,
    order: 4,
  },
]

export const fallbackHome: HomeContent = {
  campaign: fallbackCampaign,
  promises: fallbackPromises,
  stats: fallbackStats,
  testimonials: fallbackTestimonials,
  products: fallbackProducts,
  settings: fallbackSettings,
}

export const collectionHeading = {
  kicker: 'The collection — all four of them',
  headline:
    'You will not believe what these women have going on under there. Neither will they, by 9 p.m.',
}

export const promisesHeading = {
  kicker: 'How we do it here',
  headline: 'Three promises, held firmly',
}

export const socksBand = {
  kicker: 'Included with every order',
  headline: 'Nap socks. They come with it.',
  body: 'Ribbed, ankle-high, one size, a color we are calling Oatmeal. You cannot buy them separately and you cannot decline them. We made them optional for eleven days in the spring and people chose wrong, so that is over now.',
  closing: 'Put them on. Take a nap. That is the whole instruction.',
}

export const closingPoster = {
  headlineLines: ['Comfort is the new sex.', 'You are covered.'],
  ctaLabel: 'Take one home — nap socks included',
}

export const cartCopy = {
  socksLine: 'Nap Socks — Oatmeal, One Size',
  socksNote: 'You did not ask for them. They are in the box.',
}

export const fallbackPages: PageDoc[] = [
  {
    title: 'The House',
    slug: 'house',
    seo: {
      title: 'The House — Grangerie',
      description:
        'How we do it here: the promises, the lamp test, and the pockets policy.',
    },
    bodyText: [
      {
        paragraphs: [
          'Grangerie makes nightgowns for people who are done for the day. Floor-length, heavyweight, over the head in one motion. Comfort is the new sex. It’s Grangerie.',
        ],
      },
      {
        heading: 'The promises',
        paragraphs: [
          'It goes on over the head. There is no zipper, because a zipper is a decision, and you are done making those today. One motion. It ends at the ankle. The ankle is where it ends.',
          'We hold it up to a lamp. Every garment, every time. If a person standing behind it becomes visible in any way, it does not leave the building. It stays. We keep it. We have a room.',
          'Pockets, and their purpose. Two deep front pockets: a phone, a granola bar, and one item you will not explain to anybody. We do not ask what is in the pockets. That was an early decision and we have honored it.',
        ],
      },
      {
        heading: 'The lamp test',
        paragraphs: [
          'The lamp is a normal lamp. It is not a special lamp. That is the point: if a normal lamp in a normal room can find you through the cotton, the cotton has failed, and the garment goes to the room.',
          'People ask about the room. The room is real. It is climate-controlled and it is full, and every garment in it failed the same test, and none of them are for sale, and none of them ever will be.',
          'We run the test at the end of the line, after inspection, when the garment thinks it has made it. That is when the truth comes out.',
        ],
      },
      {
        heading: 'The pockets policy',
        paragraphs: [
          'We do not ask what is in the pockets. That was an early decision and we have honored it.',
          'The policy has been tested. In 2024 a customer in Duluth wrote to tell us what was in her pockets. We did not open the letter. We have the letter. It is in a drawer, and the drawer is closed, and that is the policy working exactly as designed.',
        ],
      },
      {
        heading: 'The socks',
        paragraphs: [
          'A pair of nap socks ships with every order. Ribbed, ankle-high, one size, a color we are calling Oatmeal. You cannot buy them separately and you cannot decline them. We made them optional for eleven days in the spring and people chose wrong, so that is over now.',
          'Put them on. Take a nap. That is the whole instruction.',
        ],
      },
    ],
  },
  {
    title: 'FAQ',
    slug: 'faq',
    seo: {
      title: 'FAQ — Grangerie',
      description: 'Questions we are asked, and the answers, which do not change.',
    },
    bodyText: [
      {
        heading: 'Can I decline the nap socks?',
        paragraphs: [
          'No. We made them optional for eleven days in the spring and people chose wrong, so that is over now. You did not ask for them. They are in the box.',
        ],
      },
      {
        heading: 'Is it see-through?',
        paragraphs: [
          'No. We hold every garment up to a lamp. If a person standing behind it becomes visible in any way, it does not leave the building. It stays. We keep it. We have a room.',
        ],
      },
      {
        heading: 'What sizes do you carry?',
        paragraphs: [
          'S through 2X. Every cut is generous, and The Big One is extremely generous through the middle. Nobody knows anything. If you are between sizes, go up. There is no situation this garment addresses that is improved by it being smaller.',
        ],
      },
      {
        heading: 'Is there a zipper?',
        paragraphs: [
          'There is no zipper, because a zipper is a decision, and you are done making those today. It goes on over the head. One motion.',
        ],
      },
      {
        heading: 'What can I keep in the pockets?',
        paragraphs: [
          'A phone, a granola bar, and one item you will not explain to anybody. We do not ask what is in the pockets. That was an early decision and we have honored it.',
        ],
      },
      {
        heading: 'Is it machine washable?',
        paragraphs: [
          'Yes. Cold wash, tumble low, and it comes out softer every time, like it is settling in. The socks can go in the same load. They are not delicate. Nothing we make is delicate.',
        ],
      },
      {
        heading: 'Can I buy the nap socks separately?',
        paragraphs: ['No. They come with it. That is the whole arrangement.'],
      },
    ],
  },
  {
    title: 'Shipping & Returns',
    slug: 'shipping-returns',
    seo: {
      title: 'Shipping & Returns — Grangerie',
      description: 'Shipping, returns, and what happens to the socks (you keep them).',
    },
    bodyText: [
      {
        heading: 'Shipping',
        paragraphs: [
          'Orders ship within 2 business days from our warehouse. Standard shipping is free over $75, which, given the prices, is most orders, which is on purpose.',
          'Every box contains your order and one pair of nap socks. The socks are not listed as a surprise. We tell you everywhere. It is still somehow a surprise, and people seem to like that, so we have stopped fighting it.',
        ],
      },
      {
        heading: 'Returns',
        paragraphs: [
          'Returns accepted within 30 days, unworn, for a full refund. The socks are yours. We do not take socks back. There is no version of this where we take the socks back.',
          'If a gown fails you in any way — a seam, a button, the lamp test in your own home — write to hello@grangerie.com and we will make it right, quietly and completely.',
        ],
      },
      {
        heading: 'Exchanges',
        paragraphs: [
          'Wrong size? We will send the right one before you send the first one back. You will briefly own two. Many people report this as the best 5 days of the process.',
        ],
      },
    ],
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy',
    seo: {
      title: 'Privacy — Grangerie',
      description: 'What we collect, what we do not, and the pockets policy, extended.',
    },
    bodyText: [
      {
        paragraphs: [
          'We collect what we need to ship you a gown: your name, your address, your email, and your order. We do not sell it, rent it, or share it beyond the services that move the box (payment processing, shipping, and email, each under their own agreements).',
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'Order and contact details you give us at checkout. Basic analytics about how the site is used, gated behind your consent. Emails you send us, which we read, and letters about pocket contents, which we do not.',
        ],
      },
      {
        heading: 'What we do not collect',
        paragraphs: [
          'We do not ask what is in the pockets. That was an early decision and we have honored it. This policy extends to your data: if we do not need it to ship a gown, we do not want it.',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'A cart cookie so your cart survives a page load, and analytics only if you say yes. That is the list.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Email hello@grangerie.com to see, correct, or delete what we hold about you. We answer within 30 days, usually much faster, because there is not much to look through.',
        ],
      },
    ],
  },
  {
    title: 'Terms of Service',
    slug: 'terms',
    seo: {
      title: 'Terms — Grangerie',
      description: 'The terms. They are reasonable. One of them is about socks.',
    },
    bodyText: [
      {
        paragraphs: [
          'By ordering from Grangerie you agree to these terms, which we have kept short on purpose.',
        ],
      },
      {
        heading: '1. The products',
        paragraphs: [
          'We sell sleepwear. Prices, availability, and specifications can change; the gown you ordered at the price you paid will not.',
        ],
      },
      {
        heading: '2. The socks',
        paragraphs: [
          'Every order includes one pair of nap socks at no charge. This is not an offer, a promotion, or a trial. It is a condition of the box. You did not ask for them. They are in the box.',
        ],
      },
      {
        heading: '3. Payment and checkout',
        paragraphs: [
          'Checkout is processed by Shopify. Taxes and shipping are calculated there. We never see your card number and we would not know what to do with it if we did.',
        ],
      },
      {
        heading: '4. Returns',
        paragraphs: [
          'Per our Shipping & Returns policy: 30 days, unworn, full refund. The socks are excluded from all returns because they are yours.',
        ],
      },
      {
        heading: '5. Liability',
        paragraphs: [
          'To the maximum extent permitted by law, our liability is limited to the amount you paid us. We are a nightgown company. The stakes were always going to be manageable.',
        ],
      },
      {
        heading: '6. Contact',
        paragraphs: ['hello@grangerie.com. A person reads it. Usually the same person.'],
      },
    ],
  },
]
