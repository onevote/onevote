import React from 'react'
import styled from 'styled-components'
import theme from '../theme/config'
import { Heading, Box, LargeButton, Flex, Text } from '@hackclub/design-system'
import Map from './map'
import Distance from './distance'

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

const Location = ({ pollingPlaceAddress, userAddress }) => (
  <Base my={4}>
    <Flex justify="space-between" wrap mb={2} align="flex-start">
      <Box>
        <Heading.h2>Your polling location</Heading.h2>
        <Text>{pollingPlaceAddress}</Text>
        <Text><Distance to={pollingPlaceAddress} from={userAddress} /> miles away</Text>
      </Box>
      <LargeButton
        bg="info"
        target="_blank"
        rel="noopener noreferral"
        href={`https://www.google.com/maps?q=${encodeURIComponent(pollingPlaceAddress)}`}
      >
        Get Directions
      </LargeButton>
    </Flex>
    <Map address={pollingPlaceAddress} />
  </Base>
)

export default Location
