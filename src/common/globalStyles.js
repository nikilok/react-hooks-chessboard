import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
    margin: 0;
    padding: 0;
    font-family: Big Noodle Too,impact,sans-serif;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 32px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
html {
    background-color: black;
}
@font-face {
    font-family: Big Noodle Too,impact,sans-serif;
    font-size: 31px;
    src: url(./fonts/bignoodletoo.ttf) format("truetype");
}
@font-face {
    font-family: Big Noodle Too,impact,sans-serif;
    font-size: 31px;
    src: url(./fonts/bignoodletoo.woff) format("woff");
}
`;

export default GlobalStyles;
