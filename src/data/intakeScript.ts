import type { ServiceCategory } from './types'

/**
 * Scripted conversational intake. Each question maps an answer to the
 * service categories that answer implies, which the recommendation engine
 * then filters by county.
 */
export interface IntakeOption {
  id: string
  label: string
  /** Categories this answer adds to the person's need profile. */
  implies: ServiceCategory[]
  /** Assistant's acknowledgement, shown before the next question. */
  reply: string
  /** Marks the answer as an urgent barrier in the generated plan. */
  urgent?: boolean
}

export interface IntakeQuestion {
  id: string
  /** Mono label shown above the question. */
  stage: string
  prompt: string
  helper?: string
  kind: 'choice' | 'multi' | 'county' | 'text'
  options?: IntakeOption[]
}

export const INTAKE_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'q-where',
    stage: 'Stage 01 — Housing',
    prompt: 'Where are you staying right now?',
    helper: 'There is no wrong answer here. It only changes which options I show you.',
    kind: 'choice',
    options: [
      {
        id: 'a-family',
        label: 'With family or a friend, temporarily',
        implies: ['Housing'],
        reply:
          "Understood — a temporary arrangement counts as unstable housing for most Essex County programs, which means you qualify for options that are closed to people already on a lease.",
      },
      {
        id: 'a-shelter',
        label: 'In a shelter or transitional program',
        implies: ['Housing'],
        reply:
          'Thank you for telling me. Shelter residency moves you up the coordinated entry priority list, and it opens rapid rehousing that I can apply for on your behalf.',
        urgent: true,
      },
      {
        id: 'a-nowhere',
        label: 'I do not have a place tonight',
        implies: ['Housing', 'Food'],
        reply:
          "That is the first thing we solve. I am flagging this as urgent so an advocate sees it today, and I will put tonight's options at the top of your plan.",
        urgent: true,
      },
      {
        id: 'a-own',
        label: 'I have my own place',
        implies: [],
        reply:
          'Good — that changes things considerably. We can focus on keeping it that way and on the other pieces around it.',
      },
    ],
  },
  {
    id: 'q-id',
    stage: 'Stage 02 — Documents',
    prompt: 'Do you have a state ID or birth certificate on hand?',
    helper: 'Almost everything downstream — housing, benefits, work — asks for one of these first.',
    kind: 'choice',
    options: [
      {
        id: 'a-both',
        label: 'I have both',
        implies: [],
        reply: 'That puts you ahead of most people at this stage. We can skip several weeks of waiting.',
      },
      {
        id: 'a-one',
        label: 'I have one, not the other',
        implies: ['Government assistance'],
        reply:
          'We can work with that. A corrections release document counts toward the six points MVC requires, so replacing the missing one is usually a single trip.',
      },
      {
        id: 'a-neither',
        label: 'I have neither',
        implies: ['Government assistance', 'Legal aid'],
        reply:
          'Then that is where your plan starts, because it unlocks everything else. There are two Essex County locations that accept a corrections release as a secondary proof of identity.',
      },
    ],
  },
  {
    id: 'q-need',
    stage: 'Stage 03 — Priorities',
    prompt: 'What else do you need help with?',
    helper: 'Choose as many as apply. I will sequence them so you are not doing everything at once.',
    kind: 'multi',
    options: [
      {
        id: 'a-work',
        label: 'Work or job training',
        implies: ['Employment', 'Education'],
        reply: 'Employment',
      },
      {
        id: 'a-health',
        label: 'Healthcare or prescriptions',
        implies: ['Healthcare'],
        reply: 'Healthcare',
      },
      {
        id: 'a-mental',
        label: 'Mental health support',
        implies: ['Mental health'],
        reply: 'Mental health',
      },
      {
        id: 'a-recovery',
        label: 'Recovery or substance use',
        implies: ['Recovery'],
        reply: 'Recovery',
      },
      {
        id: 'a-legal',
        label: 'Legal help or expungement',
        implies: ['Legal aid'],
        reply: 'Legal aid',
      },
      {
        id: 'a-family2',
        label: 'Reconnecting with my children',
        implies: ['Family reunification'],
        reply: 'Family reunification',
      },
      {
        id: 'a-food',
        label: 'Food',
        implies: ['Food', 'Government assistance'],
        reply: 'Food assistance',
      },
      {
        id: 'a-transit',
        label: 'Getting around',
        implies: ['Transportation'],
        reply: 'Transportation',
      },
    ],
  },
  {
    id: 'q-transport',
    stage: 'Stage 04 — Getting there',
    prompt: 'How do you get around right now?',
    helper: 'This decides how far away I am willing to send you.',
    kind: 'choice',
    options: [
      {
        id: 'a-car',
        label: 'I have a car',
        implies: [],
        reply: 'Then distance is less of a constraint and I can include options across the county line.',
      },
      {
        id: 'a-bus',
        label: 'Bus and train',
        implies: ['Transportation'],
        reply:
          'I will keep recommendations close to transit, and there is a reentry voucher that covers 60 days of unlimited local bus travel — I am adding it to your plan.',
      },
      {
        id: 'a-walk',
        label: 'Walking, mostly',
        implies: ['Transportation'],
        reply:
          'Then I will keep everything within a few miles and flag transportation as a barrier your advocate should see.',
        urgent: true,
      },
    ],
  },
  {
    id: 'q-county',
    stage: 'Stage 05 — Location',
    prompt: 'Which county are you in?',
    helper:
      'Eligibility rules, waitlists, and providers all change at the county line. This is the single most important thing you will tell me.',
    kind: 'county',
  },
]

/** Closing message shown once the plan has been generated. */
export const INTAKE_CLOSING =
  'That is everything I need. I have built your plan from the verified database for your county — every item below has a confirmed, current resource attached to it.'
