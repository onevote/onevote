import React from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import { Heading, Box, Text, Field, LargeButton } from '@hackclub/design-system'

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
    <Heading.h2 mb={3} style={{ fontWeight: 'bold' }}>
      Get reminded before the election
    </Heading.h2>
    <form>
      <Field
        label="Your phone number"
        placeholder="(123) 456-7890"
        name="phone"
        mb={3}
      />
      <LargeButton bg={theme.colors.brand}>Sign up</LargeButton>
    </form>
    <Text mt={3} fontSize={1} color={theme.colors.muted}>
      We'll never share or sell your data.
    </Text>
  </Base>
)

export default Location
