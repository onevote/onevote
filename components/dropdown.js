import { Box, Card, Flex } from '@hackclub/design-system'
import styled, { css, keyframes } from 'styled-components'
import theme from '../theme/config'

const zoom = keyframes`
  0% {
    box-shadow: ${theme.boxShadows[1]};
    transform: scale(0);
  }
  85% {
    transform: scale(1.025);
  }
  100% {
    box-shadow: ${theme.boxShadows[2]};
    transform: scale(1);
  }
`

export const DropdownContainer = styled(Box)`
  position: relative;
  // &:hover > div {
  //   animation: 0.1875s ease-out ${zoom};
  //   display: block;
  //   opacity: 1;
  // }
`

export const DropdownMenu = styled(Card.withComponent(Flex))`
  align-items: stretch;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadows[2]};
  // display: none;
  flex-direction: column;
  max-width: 95vw;
  // opacity: 0;
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
  ${props => props.active && css``};
`
