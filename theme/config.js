import { injectGlobal } from 'styled-components'
import { theme as base } from '@hackclub/design-system'

const primary = '#0069ff'

export const grays = {
  black: '#1F2D3D',
  slate: '#3C4858',
  silver: '#8492A6',
  smoke: '#E0E6ED',
  snow: '#F9FAFC',
  white: '#FFFFFF'
}

export const brand = {
  primary,
  brand: '#592DEA',
  success: '#13CE66',
  info: '#1FB6FF',
  warning: '#FF7849',
  error: '#FF4949',
  muted: '#8492A6'
}
brand.dem = brand.info
brand.rep = brand.error
brand.ind = brand.brand
brand.non = brand.muted // nonpartisan
brand.lib = brand.warning // libertarian
brand.gre = brand.success // green
brand.sap = brand.muted // sapient
brand.con = brand.warning // consitution

// NOTE(@lachlanjc): fix for DS inputs
brand.blue = ['#009EEB', '#1FB6FF', '#85D7FF']

export const colors = {
  ...brand,
  ...grays
}

export const font =
  'GT-America,"Avenir Next","Segoe UI",Roboto,"Helvetica Neue",sans-serif'

const theme = {
  ...base,
  colors,
  font
}

export default theme

injectGlobal`
  @font-face {
    src: url('/static/gt-america-ultralight.woff') format('woff');
    font-family: GT-America;
    font-weight: 100;
  }
  @font-face {
    src: url('/static/gt-america-thin.woff') format('woff');
    font-family: GT-America;
    font-weight: 200;
  }
  @font-face {
    src: url('/static/gt-america-light.woff') format('woff');
    font-family: GT-America;
    font-weight: 300;
  }
  @font-face {
    src: url('/static/gt-america-regular.woff') format('woff');
    font-family: GT-America;
    font-weight: 400;
  }
  @font-face {
    src: url('/static/gt-america-medium.woff') format('woff');
    font-family: GT-America;
    font-weight: 500;
  }
  @font-face {
    src: url('/static/gt-america-bold.woff') format('woff');
    font-family: GT-America;
    font-weight: 700;
  }
  @font-face {
    src: url('/static/gt-america-black.woff') format('woff');
    font-family: GT-America;
    font-weight: 900;
  }

  html {
    height: 100%;
    box-sizing: border-box;
  }
  body {
    background-color: ${theme.colors.snow};
    font-family: ${theme.font};
    font-size: ${theme.fontSizes[2]}px;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  ::selection {
    background-color: ${primary};
    color: ${theme.colors.white};
  }
  .prevent-scroll {
    overflow: hidden;
  }
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${primary};
  }
`
