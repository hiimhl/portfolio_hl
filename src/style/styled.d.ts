import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    logo: string;
    fontColor: string;
    cardColor: string;
    gray: string;
    boxShadow: string;
    gradient: string;
    contact: string;
    btnColor: string;
  }
}
