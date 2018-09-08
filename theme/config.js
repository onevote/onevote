import { injectGlobal } from 'styled-components'
import { theme as base } from '@hackclub/design-system'
import palx from 'palx'

const primary = '#0069ff'
export const palette = palx(primary)

export const grays = {
  black: palette.black,
  slate: palette.gray[9],
  silver: palette.gray[7],
  smoke: palette.gray[2],
  snow: palette.gray[0],
  white: '#ffffff'
}

export const brand = {
  primary,
  accent: palette.red[5],
  brand: palette.violet[5],
  success: palette.teal[5],
  info: primary,
  warning: palette.orange[5],
  error: palette.red[7],
  muted: grays.silver,

  dem: palette.blue[5],
  rep: palette.red[5],
  ind: palette.violet[5],
  lib: palette.orange[5]
}

export const colors = {
  ...brand,
  ...grays,
  ...palette
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
