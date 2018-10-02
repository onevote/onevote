import { Box, Card, Flex } from '@hackclub/design-system'
import styled from 'styled-components'
import theme from '../theme/config'

export const DropdownContainer = styled(Box)`
  position: relative;
`

export const DropdownMenu = styled(Card.withComponent(Flex))`
  align-items: stretch;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadows[2]};
  flex-direction: column;
  max-width: 95vw;
  overflow-y: auto;
  padding: ${theme.space[2]}px 0;
  position: absolute;
  left: 0;
  right: 0;
  text-align: left;
  transform-origin: center top;
  width: 100%;
  z-index: 4;
  -webkit-overflow-scrolling: touch;
`

export const DropdownMenuOption = styled(Box)`
  cursor: pointer;
  padding: ${theme.space[2]}px ${theme.space[3]}px;
  width: 100%;
  &:hover {
    background: linear-gradient(to bottom, #1fb6ff, #009eeb);
    color: ${theme.colors.white};
    transition: background-color ${theme.transition};
  }
`
