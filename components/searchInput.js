import React from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import Icon from '@hackclub/icons'
import { Box, Flex, Input } from '@hackclub/design-system'
import { placeholder } from 'polished'

const Relative = styled(Box)`
  position: relative;
`

const Absolute = styled(Flex)`
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
`

const Search = styled(Input).attrs({
  bg: 'info',
  color: 'white',
  py: 2,
  pr: 3
})`
  padding-left: 56px; // 32px icon + padding
  line-height: 48px;
  max-width: 100%;
  border: 0;
  border-radius: ${theme.radii[2]};
  ${placeholder({ color: theme.colors.blue[2] })};
  font-size: ${theme.fontSizes[3]}px;
  box-shadow: ${theme.boxShadows[1]}, 0 12px 24px rgba(0, 0, 0, 0.0625);
  transition: ${theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${theme.boxShadows[2]}, 0 24px 48px rgba(0, 0, 0, 0.125);
  }
  ${theme.mediaQueries.md} {
    font-size: ${theme.fontSizes[4]}px;
  }
`

const SearchInput = ({ value, placeholder, label, onChange, ...props }) => (
  <Relative {...props}>
    <Absolute color="blue.1" px={3}>
      <Icon glyph="home" size={32} />
    </Absolute>
    <Search
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type="search"
      aria-label={label}
    />
  </Relative>
)

export default SearchInput
