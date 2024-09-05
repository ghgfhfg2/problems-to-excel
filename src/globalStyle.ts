import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ul,li{
    list-style: none;
  }
  html,body,#root{
    width: 100%;
  }
  input:read-only {
    background-color: #f1f1f1;
    color: #aaa;
  }
`;
