// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react-scripts" />
declare module '*.mp3';

declare module '*.txt' {
  const content: any
  export default content
}
