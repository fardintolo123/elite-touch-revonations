import type { Project } from './projects'

export type SuburbFaq = { question: string; answer: string }

export type SuburbContent = {
  answer: string[]
  localAngle: { heading: string; paragraphs: string[] }
  faqs: SuburbFaq[]
  projectSlug: string
}

export const suburbContent: Record<string, SuburbContent> = {
  randwick: {
    projectSlug: 'randwick-bathroom',
    answer: [
      'Elite Touch Renovations completes bathroom renovations in Randwick as part of our Sydney-wide service. We manage the strip-out, plumbing, electrical, waterproofing to AS 3740, tiling and fit-off, with the full scope and price set out in writing before work starts.',
      'A small bathroom renovation starts from $18,000 for a room about 1.5 by 1.8 by 2.4 metres on the Basic package. Standard starts from $25,000 and Premium from $30,000. The final price is firm after a free on-site measure. Every job is carried out under NSW Builder Licence 475204C and includes a 10-year workmanship warranty.',
    ],
    localAngle: {
      heading: 'Renovating a bathroom in Randwick',
      paragraphs: [
        'Randwick sits in the Eastern Suburbs mix of older terraces, Federation-era homes and apartments. A bathroom renovation here may need to work within an established footprint, check older services once the room is opened, or follow strata approval and building access rules in an apartment.',
        'Our photographed Randwick project is a family bathroom in soft neutral tones, with matte black fittings and a custom angled shower screen as the main feature. A wall-hung vanity keeps the floor open while adding daily storage, and softer lighting keeps the room calm rather than stark.',
        'The project photos show this Randwick bathroom only. They are local proof of one completed project, not a claim that every home in the suburb has the same layout or construction.',
      ],
    },
    faqs: [
      {
        question: 'How much does a bathroom renovation cost in Randwick?',
        answer:
          'It starts from $18,000 for a small bathroom around 1.5 by 1.8 by 2.4 metres on the Basic package, from $25,000 for Standard and from $30,000 for Premium. These are all from-prices tied to that room size. You get a firm figure after a free on-site measure.',
      },
      {
        question: 'Can you renovate a bathroom in an older Randwick home?',
        answer:
          'Yes. Older homes can have timber floors, older plumbing or a bathroom added to a less convenient part of the house. We check the substrate and existing services before the written scope is finalised, then set out the agreed work and price before the renovation starts.',
      },
      {
        question: 'Do you renovate bathrooms in Randwick strata apartments?',
        answer:
          'Yes. Apartment work needs owners corporation approval and may need to follow building rules on work hours, lift access and common-property waterproofing. We allow for those requirements in the work plan and written scope.',
      },
      {
        question: 'Do you have a local Randwick bathroom project to view?',
        answer:
          'Yes. The photographed Randwick project uses soft neutral tones, matte black fittings, a custom angled shower screen and a wall-hung vanity. The gallery page shows the project photographs and details.',
      },
    ],
  },
  'castle-hill': {
    projectSlug: 'castle-hill-bathroom',
    answer: [
      'Elite Touch Renovations completes bathroom renovations in Castle Hill as part of our Sydney-wide service. We manage the strip-out, plumbing, electrical, waterproofing to AS 3740, tiling and fit-off, with the full scope and price set out in writing before work starts.',
      'A small bathroom renovation starts from $18,000 for a room about 1.5 by 1.8 by 2.4 metres on the Basic package. Standard starts from $25,000 and Premium from $30,000. The final price is firm after a free on-site measure. Every job is carried out under NSW Builder Licence 475204C and includes a 10-year workmanship warranty.',
    ],
    localAngle: {
      heading: 'A Castle Hill bathroom project',
      paragraphs: [
        'We have a photographed Castle Hill bathroom renovation to show, rather than filling this page with generic suburb claims. The project used soft grey, crisp white and light wood finishes, with brushed nickel tapware and large-format floor and wall tiles.',
        'The finished room includes a light oak wall-hung double vanity, two round vessel basins, a wide LED backlit mirror and a frameless glass shower. The project notes describe it as a family bathroom designed to feel bright, open and uncluttered.',
        'You can view the full Castle Hill project, including the photographed details, in the gallery. The photos show this project only; they are not presented as a promise about every bathroom in the suburb.',
      ],
    },
    faqs: [
      {
        question: 'How much does a bathroom renovation cost in Castle Hill?',
        answer:
          'It starts from $18,000 for a small bathroom around 1.5 by 1.8 by 2.4 metres on the Basic package, from $25,000 for Standard and from $30,000 for Premium. These are all from-prices tied to that room size. You get a firm figure after a free on-site measure.',
      },
      {
        question: 'What is included in a Castle Hill bathroom renovation?',
        answer:
          'We can manage the full renovation: strip-out, plumbing, electrical, waterproofing to AS 3740, tiling and fit-off. The agreed work is set out in a fixed-scope written quote before work starts.',
      },
      {
        question: 'Do you have a local Castle Hill bathroom project to view?',
        answer:
          'Yes. Our photographed Castle Hill project uses soft grey, crisp white and light wood finishes, brushed nickel tapware, large-format tiles and a frameless glass shower. The gallery page shows the project photographs and details.',
      },
      {
        question: 'How do I get a quote for a bathroom renovation in Castle Hill?',
        answer:
          'Book a free on-site measure. We assess the room, discuss the work and then provide a fixed-scope written quote. Call 0411 752 334 or use the enquiry form on this page.',
      },
    ],
  },
}

export function suburbContentFor(slug: string): SuburbContent | undefined {
  return suburbContent[slug]
}

export function projectForSuburb(content: SuburbContent, projects: readonly Project[]) {
  return projects.find((project) => project.slug === content.projectSlug)
}
