import React, { Fragment } from 'react'
import { ThemeProvider as Root } from 'styled-components'
import theme from './config'

const ThemeProvider = props => (
  <Root
    theme={theme}
    {...props}
    children={<Fragment>{props.children}</Fragment>}
  />
)

export default ThemeProvider
