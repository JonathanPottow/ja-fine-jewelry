// What a visitor can pick on the inquiry forms. The key travels in links
// (/contact?topic=watches) and to the email API; only these keys are accepted.
export const INQUIRY_TOPICS = [
  { key: 'bridal', label: 'Engagement & bridal' },
  { key: 'gift', label: 'Anniversary or gift' },
  { key: 'heirloom', label: 'Heirloom redesign' },
  { key: 'watches', label: 'Fine watches' },
  { key: 'sourcing', label: 'Sourcing something specific' },
  { key: 'question', label: 'Just a question' },
] as const

export type InquiryTopicKey = (typeof INQUIRY_TOPICS)[number]['key']

export function topicLabel(key: unknown): string | undefined {
  return INQUIRY_TOPICS.find((t) => t.key === key)?.label
}

export function isTopicKey(key: unknown): key is InquiryTopicKey {
  return INQUIRY_TOPICS.some((t) => t.key === key)
}
