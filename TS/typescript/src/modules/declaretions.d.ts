declare module "hot-new-module"

declare module "*!text" {
  const content: string;
  export default content;
}
declare module "json!*" {
  const value: any;
  export default value;
}