import React from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import { Heading, Box, LargeButton } from '@hackclub/design-system'

const Base = styled(Box)`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.radii[2]};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.0625);
`
Base.defaultProps = {
  bg: 'white',
  p: [3, 4],
  mx: [-3, -4]
}

const VoteSignup = () => (
  <Base my={4}>
    <Heading.h2 mb={2} style={{ fontWeight: 'bold' }}>
      Not sure if you’re registered to vote?
    </Heading.h2>
    <LargeButton href="https://www.vote.org/register-to-vote/" bg="info">Register at Vote.org</LargeButton>
  </Base>
)

export default VoteSignup
