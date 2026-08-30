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
    'Candlelight, steam, a long exhale — and then a floor-length cotton gown, because that is how the evening actually ends. A pair of nap socks ships with every order.',
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
  {_id: 'stat-3', value: '0', label: 'Cutouts, panels\nAlso zero opinions solicited', order: 3},
  {_id: 'stat-4', value: '14oz', label: 'Cotton weight\nA real amount of cotton', order: 4},
]

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: 'testimonial-renata',
    quote: 'He said it wasn\u2019t very flattering. I asked, flattering to who. He\u2019s still thinking about it. It\u2019s been a month.',
    name: 'Renata C.',
    city: 'Tucson',
    attribution: 'Renata C. — Tucson — owns three',
    placement: 'strip',
    order: 1,
  },
  {
    _id: 'testimonial-paulette',
    quote: 'For my birthday he bought me something red with straps. I wear it in summer, over the gown, as a decorative scarf. He has never mentioned it.',
    name: 'Paulette M.',
    city: 'Grand Rapids',
    attribution: 'Paulette M. — Grand Rapids — wears The No. 1',
    placement: 'strip',
    order: 2,
  },
  {
    _id: 'testimonial-kathy',
    quote:
      'My sister bought one and said nothing about it for six weeks, which, for her, is a rave. Anyway, I love the gown, and the socks fit both of our feet, which she also hasn\u2019t acknowledged.',
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
      'Faded roses on 14oz heavyweight cotton, printed the way they used to print them, which is to say: faded already. This is the original. The gown your grandmother wore while outliving two husbands and a business partner.',
      'The neckline is at the neck. The hem is at the ankle. Between those two points there is cotton, and only cotton, and the cotton is not accepting questions at this time.',
      'Two deep front pockets, contents yours. Put it on at 6 p.m. and watch a grown man learn to read a room.',
    ],
    fabricWeightOz: 14,
    images: [{url: '/img/no1.jpeg', alt: 'The No. 1 — ankle-length faded-floral cotton nightgown, high neck, long sleeves'}],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    inStock: true,
    order: 1,
    testimonial: {
      quote:
        'I put it on at 6:15 now. My husband calls it \u2018the signal.\u2019 He\u2019s right and he should keep studying.',
      attribution: 'Dawn F. — Erie — 6:15 sharp',
    },
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
      'It passed the lamp test on the first try, which almost nothing does, and which the other garments have not been told.',
      'Holds a mug at any temperature and a stare of any length. Married women report using it to say \u201cwe\u2019ll see\u201d without speaking. The mug is not included. The nap socks are.',
    ],
    fabricWeightOz: 14,
    images: [{url: '/img/housecoat.jpeg', alt: 'The Housecoat — quilted floor-length housecoat, belted, hands in pockets'}],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    inStock: true,
    order: 2,
    testimonial: {
      quote:
        'A man came to the door selling solar panels. I tied the belt. He thanked me for my time before he finished his sentence.',
      attribution: 'Yolanda T. — Fresno — porch use, primarily',
    },
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
      'A man once described this set as \u201csending mixed signals.\u201d It is not. It is sending one signal, clearly, in flannel, on every channel. Two pieces means two chances to be covered. Both are taken.',
    ],
    fabricWeightOz: 14,
    images: [{url: '/img/twopiece.jpeg', alt: 'The Two-Piece, Modest — loose flannel two-piece, long sleeves buttoned to the top'}],
    sizes: ['S', 'M', 'L', 'XL', '2X'],
    inStock: true,
    order: 3,
    testimonial: {
      quote:
        'On Valentine\u2019s Day he lit candles. I stood in front of one. Passed. Best night of sleep of my entire marriage.',
      attribution: 'Bernice K. — Skokie — buttons all of them',
    },
  },
  {
    _id: 'product-big-one',
    title: 'The Big One',
    handle: 'the-big-one',
    cut: 'tent',
    cutLabel: 'Tent cut',
    price: 102,
    blurb: 'Tent cut. You could raise a family in there and nobody would be told.',
    longDescriptionText: [
      'Three-quarter sleeves, tent cut, and an amount of cotton we had to explain to our supplier twice. Extremely generous through the middle. Nobody knows anything, and under this gown, nobody ever will.',
      'You can sit cross-legged inside it entirely. You can bring a snack in there. You can conduct your whole evening in there while a man on the couch wonders, correctly, whether you can hear him. We designed for all of that on purpose and we would do it again.',
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
    testimonial: {
      quote:
        'I eat crackers in there. Whole sleeves of them. From the outside there is no evidence. He hears something but he\u2019ll never prove it.',
      attribution: 'Carol Anne W. — Chattanooga — tent cut loyalist',
    },
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

export const shopHeading = {
  kicker: 'The collection — all four of them',
  headline:
    'Four garments. Zero of them are \u201ca little something.\u201d All of them are a lot of something.',
}

export const promisesHeading = {
  kicker: 'How we do it here',
  headline: 'Three promises, held firmly',
}

export const socksBand = {
  kicker: 'Included with every order',
  headline: 'Nap socks. They come with it.',
  body: 'Ribbed, ankle-high, one size, a color we are calling Oatmeal. You cannot buy them separately and you cannot decline them. Several men have written in to ask why. The socks do not answer to them and neither do we.',
  closing: 'Put them on. Take a nap. That is the whole instruction.',
}

export const closingPoster = {
  headlineLines: ['Comfort is the new sex.', 'He can Google the old one.'],
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
          'Grangerie makes nightgowns for women who are done for the day, and in some cases done in general. Floor-length. Heavyweight. On in one motion, like closing a store.',
        ],
      },
      {
        heading: 'How it started',
        paragraphs: [
          'Grangerie was founded the night our founder\u2019s husband looked at her nightgown and asked, \u201cAre you wearing that to bed?\u201d She said yes. Then she wore it to bed for eleven more years and started a company. He is very supportive now. He had a period of adjustment. The period of adjustment is called marriage.',
        ],
      },
      {
        heading: 'The promises',
        paragraphs: [
          'It goes on over the head. One motion, and the day is legally over. Anything that happens after the gown is on is the gown\u2019s business.',
          'We hold it up to a lamp. The full procedure is described below, because people ask, and because we are proud of it in a way that has been described as \u201cconcerning.\u201d',
          'Pockets, and their purpose. Two of them, deep. What goes in them is between you and the pockets. Our full policy is below and it has held under pressure.',
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
          'We do not ask what is in the pockets. We decided that on day one and it has never once been hard to honor, which tells you it was the right call.',
          'The policy has been tested. In 2024 a customer in Duluth wrote to tell us what was in her pockets. We did not open the letter. We have the letter. It is in a drawer, and the drawer is closed, and that is the policy working exactly as designed.',
          'Husbands sometimes ask what is in the pockets. That is between the husband and the pockets. Our involvement ends at the seam.',
        ],
      },
      {
        heading: 'The socks',
        paragraphs: [
          'Ribbed, ankle-high, one size, a color we are calling Oatmeal. They are not for sale, they are not optional, and they are not a metaphor. They are socks. Put them on. Take a nap. That is the whole instruction.',
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
          'No. We made them optional for eleven days one spring, as an experiment, and people chose wrong, so that experiment is over and will not be repeated. The socks come. Think of them less as a gift and more as a fact.',
        ],
      },
      {
        heading: 'Is it see-through?',
        paragraphs: [
          'No. Every garment is tested against a lamp before it ships \u2014 the full ritual is described on The House page, and we stand by every word. If your gown ever fails a lamp in your own home, email us. We will handle it the way other companies handle recalls.',
        ],
      },
      {
        heading: 'What sizes do you carry?',
        paragraphs: [
          'S through 2X, every cut generous. If you are between sizes, go up. In the history of this company, no one has ever put on a Grangerie and thought, \u201cI wish this were less.\u201d',
        ],
      },
      {
        heading: 'Is there a zipper?',
        paragraphs: [
          'No. Over the head, one motion, done. If you want to spend your evening operating equipment, that is what the dishwasher is for, and we both know who\u2019s loading it.',
        ],
      },
      {
        heading: 'What can I keep in the pockets?',
        paragraphs: [
          'Anything. A phone. A snack. The last word. We have a strict no-questions policy about the pockets \u2014 full text on The House page \u2014 and it has survived everything, including one letter from Duluth.',
        ],
      },
      {
        heading: 'Is it machine washable?',
        paragraphs: [
          'Yes. Cold wash, tumble low. It comes out softer every time, like it\u2019s settling in for the long haul, which it is. The socks go in the same load. Nothing we make requires special handling. We save that for ourselves.',
        ],
      },
      {
        heading: 'Can I buy the nap socks separately?',
        paragraphs: ['No. The socks and the gown arrive together, like in-laws.'],
      },
      {
        heading: 'My husband asked if you make anything shorter.',
        paragraphs: [
          'We got this question enough times that it earned a permanent spot on this page. No. Everything we make ends at the ankle. The ankle is a load-bearing part of our whole deal. Tell him we said hi.',
        ],
      },
      {
        heading: 'Is this lingerie?',
        paragraphs: [
          'Legally, we have no idea. Spiritually, it is the opposite of lingerie: lingerie is designed to be looked at, and a Grangerie is designed to end the looking portion of the evening. Both are valid. One of them comes with socks.',
        ],
      },
      {
        heading: 'Can I wear it outside the house?',
        paragraphs: [
          'You can wear it anywhere. The Housecoat in particular was engineered for the driveway, the mailbox, and standing on the porch watching a man attempt to parallel park. It performs beautifully in all three settings.',
        ],
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
          'Returns accepted within 30 days, unworn, for a full refund. Common reasons for returns: wrong size, changed mind. Not a valid reason: \u201cmy husband said it wasn\u2019t his favorite.\u201d We will process that return, but we will know.',
          'The socks are yours. We do not take socks back. There is no version of this where we take the socks back.',
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
          'Our pockets policy \u2014 we don\u2019t ask what\u2019s in them, ever \u2014 extends to your data: if we do not need it to ship a gown, we do not want it. We know less about you than your group chat does, and we intend to keep it that way.',
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
        heading: '5a. Spousal input',
        paragraphs: [
          'Grangerie does not accept feedback, sizing suggestions, or design requests submitted on behalf of a customer by her husband. This has come up. Twice.',
        ],
      },
      {
        heading: '6. Contact',
        paragraphs: ['hello@grangerie.com. A person reads it. Usually the same person.'],
      },
    ],
  },
]
