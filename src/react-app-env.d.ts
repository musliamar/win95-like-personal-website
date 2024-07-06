/// <reference types="react-scripts" />
declare module "*.mp3";

declare module "*.txt" {
  const content: any;
  export default content;
}
