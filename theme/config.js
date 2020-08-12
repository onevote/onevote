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
brand.ref = brand.warning // reform

// NOTE(@lachlanjc): fix for DS inputs
brand.blue = ['#009EEB', '#1FB6FF', '#85D7FF']

export const colors = {
  ...brand,
  ...grays
}

export const font =
  'GT-America,ui-rounded,system-ui,"Segoe UI",Roboto,"Helvetica Neue",sans-serif'

const theme = {
  ...base,
  colors,
  font
}

export default theme

injectGlobal`
  body {
    background-color: ${theme.colors.snow};
    font-family: ${theme.font};
    font-size: ${theme.fontSizes[2]}px;
  }
  ::selection {
    background-color: ${primary};
    color: ${theme.colors.white};
  }
`
