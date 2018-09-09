import React from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import Icon from '@hackclub/icons'
import { Box, Flex, Input } from '@hackclub/design-system'
import { placeholder } from 'polished'

const Relative = styled(Box)`
  position: relative;
  flex: 1 1 auto;
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
  bg: 'brand',
  color: 'white',
  py: 2,
  pr: 3
})`
  background-color: ${theme.colors.brand};
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    #7e5bef,
    ${theme.colors.brand}
  ) !important;
  padding-left: 56px; // 32px icon + padding
  line-height: 48px;
  max-width: 100%;
  border: 0;
  border-radius: ${theme.radii[2]};
  ${placeholder({ color: 'rgba(255, 255, 255, 0.5)' })};
  font-size: ${theme.fontSizes[3]}px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: ${theme.transition} box-shadow;
  &:focus,
  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.125), 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  &:active {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25), 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  ${theme.mediaQueries.md} {
    font-size: ${theme.fontSizes[4]}px;
  }
`

const SearchInput = ({ value, placeholder, label, onChange, ...props }) => (
  <Relative>
    <Absolute color="rgba(255, 255, 255, 0.75)" px={3}>
      <Icon glyph="home" size={32} />
    </Absolute>
    <Search
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type="search"
      aria-label={label}
      {...props}
    />
  </Relative>
)

export default SearchInput
