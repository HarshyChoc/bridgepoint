export interface ScriptedAnswer {
  /** Lowercase keywords — any match routes to this answer. */
  keywords: string[]
  answer: string
  /** Follow-up chips offered after the answer. */
  followUps?: string[]
}

export interface AssistantScript {
  greeting: string
  suggestions: string[]
  answers: ScriptedAnswer[]
  fallback: string
}

export const CLIENT_ASSISTANT: AssistantScript = {
  greeting:
    "I'm the BridgePoint Helper. Ask me anything about your plan and I'll answer from verified information — not a guess.",
  suggestions: [
    'What do I bring to the MVC?',
    'What is transitional housing?',
    'How do I get to Isaiah House?',
    'Am I eligible for SNAP?',
  ],
  answers: [
    {
      keywords: ['mvc', 'bring', 'id', 'identification', 'six points'],
      answer:
        "Bring four things: your birth certificate, your corrections release document, a proof of address, and your Social Security card if you have it. Together those cover the six points MVC requires. Your birth certificate and proof of address are already uploaded in Documents, so you can show them from your phone.\n\nMVC Newark Regional Center is at 165 Halsey St, open until 4:30pm, and accepts walk-ins.",
      followUps: ['How do I get to the MVC?', 'What if I lost my birth certificate?'],
    },
    {
      keywords: ['transitional', 'housing', 'isaiah', 'place to stay', 'shelter'],
      answer:
        'Transitional housing is a time-limited placement — usually 6 to 24 months — that comes with a case manager and is meant to bridge you to a permanent lease.\n\nThree Essex County options match your situation. Isaiah House is the closest to your job at 3.1 miles and reserves eight beds for reentry referrals. Your application there is pending one thing: a letter from your supervisor confirming your hours and rate.',
      followUps: ['What is stopping my housing application?', 'How do I get to Isaiah House?'],
    },
    {
      keywords: ['stopping', 'stuck', 'blocked', 'pending', 'why', 'waiting'],
      answer:
        'One item is blocking your housing applications: proof of income. You uploaded pay stubs on Jul 28, but Isaiah House requires a signed letter from your employer confirming hours and hourly rate.\n\nRenee has already asked Ironbound Workforce for it. If you can ask your supervisor directly this week, it usually moves faster than the referral route.',
      followUps: ['Message Renee about it', 'What is transitional housing?'],
    },
    {
      keywords: ['get to', 'directions', 'how do i get', 'transit', 'bus', 'train', 'far'],
      answer:
        "You take the 25 bus from Broad St toward East Orange — about 22 minutes, with a four-minute walk at the end.\n\nYou also have a reentry transit voucher waiting at Newark Penn Station: 60 days of unlimited local bus travel, and you only need your photo ID to collect it. It's step four in your Next Steps.",
      followUps: ['What do I bring to the MVC?'],
    },
    {
      keywords: ['snap', 'food stamps', 'eligible', 'eligibility', 'qualify', 'benefits'],
      answer:
        'Based on what you told me at intake — part-time hours at 22 per week and no other household income — you appear eligible for SNAP, and a household with income this low usually receives an expedited decision within seven days.\n\nEssex County Board of Social Services at 18 Rector St takes walk-ins Monday to Friday until 4:30pm. Bring your new state ID and your release documentation.',
      followUps: ['What do I bring to the MVC?', 'Where is the nearest food pantry?'],
    },
    {
      keywords: ['pantry', 'food', 'eat', 'hungry', 'groceries'],
      answer:
        'Bridges Outreach Food Pantry on Springfield Ave in Irvington is 3.4 miles from you, open Tuesday, Thursday and Saturday from 10am to 2pm. No documentation is required — you can walk in.\n\nIt is already in your saved resources.',
    },
    {
      keywords: ['renee', 'advocate', 'case manager', 'message', 'meeting', 'thursday'],
      answer:
        "Renee Carter is your advocate at Newark Reentry Coalition. She can see your plan progress live, so you never have to re-explain where you are.\n\nYour next meeting is Thursday July 31 at 10:30am at 62 Halsey St. It's still unconfirmed — confirming it in your plan will send you directions that morning.",
      followUps: ['What is stopping my housing application?'],
    },
    {
      keywords: ['expunge', 'record', 'legal', 'lawyer', 'court', 'attorney'],
      answer:
        'Rutgers Law runs a free expungement clinic on the second Saturday of every month, 10am to 2pm, at 123 Washington St. Law students and supervising attorneys prepare the petition on the spot at no cost.\n\nBring your full criminal history record — you can request it from the State Police, and Essex County Legal Aid will help you do that if you have not already.',
      followUps: ['Am I eligible for SNAP?'],
    },
    {
      keywords: ['job', 'work', 'employment', 'hire', 'hiring', 'training', 'certificate'],
      answer:
        'You are placed part-time at 22 hours a week through Ironbound Workforce Center, which is also where your income letter needs to come from.\n\nIf you want more hours, Essex County College runs short-term certificate programs in HVAC, commercial driving, medical billing, and IT support, with tuition waivers available through workforce innovation funding. That is step six in your plan.',
    },
    {
      keywords: ['doctor', 'health', 'familycare', 'medicaid', 'insurance', 'prescription'],
      answer:
        'Your NJ FamilyCare enrollment was approved on July 14, so you are covered now.\n\nNewark Community Health Center at 101 Ludlow St takes walk-ins Monday to Friday until 6pm and Saturday mornings, and has an on-site pharmacy. You do not need a referral.',
    },
    {
      keywords: ['private', 'safe', 'who can see', 'confidential', 'privacy', 'data'],
      answer:
        'Your advocate at Newark Reentry Coalition has full access to your record. Ironbound Workforce sees only your employment track, and Essex County Legal Aid sees only your legal items — both because you granted that consent, and you can withdraw it at any time.\n\nNo one else sees your record. Government reporting uses aggregated counts only, never individual records.',
    },
  ],
  fallback:
    "I don't have a verified answer for that one, and I'd rather tell you that than guess. I've flagged it for Renee — she'll follow up in your messages.",
}

export const ADVOCATE_ASSISTANT: AssistantScript = {
  greeting:
    'I can summarize a case, draft documentation, generate a referral, or surface what needs attention across your caseload.',
  suggestions: [
    'Summarize Marcus Reyes',
    'What needs attention today?',
    'Draft the income letter request',
    'Which referrals are stalled?',
  ],
  answers: [
    {
      keywords: ['summarize', 'summary', 'marcus', 'reyes', 'case'],
      answer:
        'Marcus Reyes — Essex County, intake Jun 12, 47 days in program, 8 of 14 plan steps complete.\n\nCompleted: state ID replacement, FamilyCare enrollment, employment placement at 22 hrs/wk.\n\nActive barrier: housing. Two of three transitional applications are stalled on the same item — a signed employer letter confirming hours and rate. Pay stubs were uploaded Jul 28 but Isaiah House does not accept them alone.\n\nFlagged: transportation gap, and the Section 8 preliminary application closes Aug 8.',
      followUps: ['Draft the income letter request', 'What is the next best action?'],
    },
    {
      keywords: ['next best', 'next action', 'recommend', 'what should i do'],
      answer:
        'Two actions, in this order.\n\n1. Submit the Section 8 preliminary application for Marcus before the Aug 8 county deadline. It takes about 15 minutes and it is the only item with a hard date.\n\n2. Request the income letter from Ironbound Workforce. Their median response is 9 hours, the fastest of any partner in your network, so this unblocks Isaiah House by tomorrow if sent today.',
      followUps: ['Draft the income letter request'],
    },
    {
      keywords: ['draft', 'letter', 'income', 'write', 'documentation', 'note'],
      answer:
        'Drafted — review before sending:\n\n"Luis — following up on Marcus Reyes (placed Jun 24, 22 hrs/wk). Isaiah House requires a signed letter on letterhead confirming his current hours and hourly rate; pay stubs alone were not accepted. Their application expires Aug 12. Could your team issue this by Friday? Happy to send the template. — Renee Carter, Newark Reentry Coalition"\n\nI have attached the Isaiah House documentation requirement so Luis does not have to ask what format they want.',
      followUps: ['Summarize Marcus Reyes'],
    },
    {
      keywords: ['attention', 'today', 'urgent', 'priority', 'prioritize', 'caseload'],
      answer:
        'Four items across 34 active clients.\n\nAndre Ellis — moves in Aug 2 with no furniture assistance secured and utilities not activated. Two days out.\n\nRobert Nguyen — shelter stay limit Aug 12, recovery intake still pending at Integrity House since Jul 19.\n\nMarcus Reyes — Section 8 preliminary application closes Aug 8.\n\nTanya Brooks — contact lapsed 9 days at the 90-day retention mark, and a June behavioral health referral was never re-offered.',
      followUps: ['Which referrals are stalled?'],
    },
    {
      keywords: ['stalled', 'referral', 'pending', 'waiting', 'slow'],
      answer:
        'Three referrals have been open past your network median.\n\nIsaiah House — Marcus Reyes, 9 days, blocked on proof of income rather than on their side.\n\nIntegrity House — Robert Nguyen, 11 days, no response. Their median is 14 hours, so this is out of character and worth a phone call.\n\nBridgeway Behavioral Health — Tanya Brooks, declined Jun 30 and never re-offered. She is at the 90-day mark, which is when re-offers land best.',
      followUps: ['What needs attention today?'],
    },
    {
      keywords: ['gap', 'service gap', 'missing', 'barrier'],
      answer:
        'Four service gaps flagged across your caseload.\n\nTransportation — Marcus Reyes and Robert Nguyen. Both are walking or transit-dependent, and both have provider assignments over 3 miles out.\n\nMental health — Tanya Brooks, referral declined and not re-offered.\n\nChildcare — Jasmine Alvarez, two children in the household and no placement identified.\n\nFurniture — Andre Ellis, move-in in two days.\n\nStatewide, transportation in Salem and behavioral health in Cumberland are both flagged critical.',
    },
    {
      keywords: ['report', 'outcome', 'funder', 'grant', 'compliance'],
      answer:
        'Your caseload contributes to three active grants. The Workforce Innovation Grant report is due Aug 15 and is the only one not current.\n\nFor that report your numbers are: 34 active clients, 11 employment placements this period, 71% still employed at 90 days. I can generate the narrative section from your case notes if you want to review a draft.',
    },
    {
      keywords: ['consent', 'access', 'privacy', 'who can see', 'support network'],
      answer:
        "Marcus's support network has three organizations. Newark Reentry Coalition holds full access as lead advocate. Ironbound Workforce sees the employment track only. Essex County Legal Aid has limited access to legal items.\n\nEvery view is logged. If you add a fourth organization, Marcus receives a consent request in his app before they see anything.",
    },
  ],
  fallback:
    'I do not have a grounded answer for that. Rather than generate one, I have logged it — if this is a recurring question, it usually means the underlying data is not being captured yet.',
}

/** Routes a free-text question to a scripted answer by keyword overlap. */
export function matchAnswer(script: AssistantScript, question: string): ScriptedAnswer | null {
  const q = question.toLowerCase()
  let best: { entry: ScriptedAnswer; score: number } | null = null

  for (const entry of script.answers) {
    const score = entry.keywords.reduce((sum, kw) => (q.includes(kw) ? sum + kw.length : sum), 0)
    if (score > 0 && (best === null || score > best.score)) {
      best = { entry, score }
    }
  }

  return best?.entry ?? null
}
