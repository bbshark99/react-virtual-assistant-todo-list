export const SUPPORTED_LANGUAGES = [
  {
    title: 'English (United States)',
    value: 'en-US',
  },
  {
    title: 'Chinese (Simplified)',
    value: 'zh-CN',
  },
  {
    title: 'Korean',
    value: 'ko-KR',
  },
]

export const INITIAL_LANGUAGE = SUPPORTED_LANGUAGES[0]

export type LANGUAGE = typeof SUPPORTED_LANGUAGES[number]
