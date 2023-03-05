// Declare css module
declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}
declare module "*.json" {
    const value: any;
    export default value;
}
declare module '*.svg' {
    const content: any;
    export default content;
}
type AssetMap = { [key: string]: string };
