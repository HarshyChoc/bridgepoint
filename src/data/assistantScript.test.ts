import { describe, expect, it } from 'vitest'
import { ADVOCATE_ASSISTANT, CLIENT_ASSISTANT, matchAnswer } from './assistantScript'

describe('matchAnswer', () => {
  it('routes a client question to the matching scripted answer', () => {
    const match = matchAnswer(CLIENT_ASSISTANT, 'What do I bring to the MVC?')
    expect(match?.answer).toContain('birth certificate')
  })

  it('is case insensitive', () => {
    expect(matchAnswer(CLIENT_ASSISTANT, 'AM I ELIGIBLE FOR SNAP')).not.toBeNull()
  })

  it('returns null when nothing matches, so the caller can say it does not know', () => {
    expect(matchAnswer(CLIENT_ASSISTANT, 'what is the capital of Peru')).toBeNull()
  })

  it('prefers the longer keyword when two entries could match', () => {
    const match = matchAnswer(ADVOCATE_ASSISTANT, 'summarize Marcus Reyes')
    expect(match?.answer).toContain('Marcus Reyes —')
  })

  it('keeps the client and advocate scripts separate', () => {
    const clientAnswer = matchAnswer(CLIENT_ASSISTANT, 'draft the income letter')
    const advocateAnswer = matchAnswer(ADVOCATE_ASSISTANT, 'draft the income letter')
    expect(clientAnswer?.answer).not.toBe(advocateAnswer?.answer)
  })
})

describe('script shape', () => {
  it('offers starting suggestions in both variants', () => {
    expect(CLIENT_ASSISTANT.suggestions.length).toBeGreaterThan(0)
    expect(ADVOCATE_ASSISTANT.suggestions.length).toBeGreaterThan(0)
  })

  it('has a fallback that admits uncertainty rather than inventing an answer', () => {
    expect(CLIENT_ASSISTANT.fallback.toLowerCase()).toContain("don't have")
    expect(ADVOCATE_ASSISTANT.fallback.toLowerCase()).toContain('do not have')
  })

  it('uses only lowercase keywords so matching stays predictable', () => {
    const all = [...CLIENT_ASSISTANT.answers, ...ADVOCATE_ASSISTANT.answers]
    const keywords = all.flatMap((entry) => entry.keywords)
    expect(keywords.every((kw) => kw === kw.toLowerCase())).toBe(true)
  })
})
