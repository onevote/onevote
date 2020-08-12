import React, { Component } from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import { Heading, Box, LargeButton, Text } from '@hackclub/design-system'
import Link from '@hackclub/design-system/dist/Link'

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

class VoteSignup extends Component {
  state = {
    active: false
  }

  toggle = e => {
    e.preventDefault()
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    const { active } = this.state
    return (
      <Base my={4}>
        <Heading.h2 mb={3} style={{ fontWeight: 'bold' }}>
          Not sure if you’re registered to vote?
        </Heading.h2>
        <LargeButton
          onClick={this.toggle}
          bg="info"
          children={active ? 'Close' : 'Check your status'}
          mt={2}
          mb={active ? 3 : 0}
        />
        {active && (
          <>
            <iframe
              src="https://verify.vote.org/?partner=111111&campaign=free-tools"
              width="100%"
              height="830px"
              marginheight="0"
              frameborder="0"
              scrollable="no"
            />
            <Text mt={3} fontSize={1} color={theme.colors.muted}>
              This service is provided by{' '}
              <Link
                href="https://vote.org"
                rel="noopener noreferrer"
                target="_blank"
              >
                Vote.org
              </Link>
              , and they may use your email or phone number for marketing.
              Please read{' '}
              <Link
                href="https://www.vote.org/privacy/"
                rel="noopener noreferrer"
                target="_blank"
              >
                their privacy policy.
              </Link>
            </Text>
          </>
        )}
      </Base>
    )
  }
}

export default VoteSignup
