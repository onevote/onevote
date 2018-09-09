import React from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import {
  Avatar,
  Heading,
  Text,
  Box,
  Field,
  LargeButton
} from '@hackclub/design-system'
import Map from './map'

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

const Location = ({ address }) => (
  <Base my={4}>
    <Heading.h2 mb={2} style={{ fontWeight: 'bold' }}>
      Get reminded before the election
    </Heading.h2>
    <form>
      <Field
        label="Your phone number"
        placeholder="(123) 456-789"
        name="phone"
        mb={3}
      />
      <LargeButton bg={theme.colors.brand}>Sign up</LargeButton>
    </form>
  </Base>
)

export default Location
