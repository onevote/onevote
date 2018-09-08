import React from 'react'
import styled from 'styled-components'
import theme from '../../theme/config'
import { Card, Avatar, Heading, Text, Box, Flex } from '@hackclub/design-system'
import Contact from './contact'
import { get, find, lowerCase, random } from 'lodash'
import getAvi from 'getavi'

const PARTIES = 'Republican' | 'Democrat' | 'Independent'
const getYear = date => date.slice(0, 4)
const aviUrl = data =>
  getAvi(
    get(
      find(data, ['type', 'Facebook']) || find(data, ['type', 'Twitter']),
      'id'
    )
  )

const Profile = ({ data, ...props }) => (
  <Card bg="white" p={[3, 4]} mx={[-3, -4]} boxShadowSize="md" {...props}>
    <Flex align="center" style={{ position: 'relative' }}>
      <BadgeContainer>
        <Badge party={data.party} />
      </BadgeContainer>
      <Avi size={64} src={aviUrl(data.channels)} mr={3} />
      <Box align="left">
        <Heading.h4 fontSize={4} fontWeight="bold" children={data.name} />
        <Text color="muted" fontSize={2}>
          hi
        </Text>
      </Box>
    </Flex>
    {/* <Contact
      phone={data.contact.phone}
      callCount={random(4, 64)}
      form={data.contact.form}
      twitter={data.contact.twitter}
      facebook={data.contact.facebook}
    /> */}
  </Card>
)

const Avi = styled(Avatar)`
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  position: relative;
`

const BadgeContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const Badge = ({ party, ...props }) => {
  const Base = styled(Box)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    line-height: 0;
    font-weight: bold;
  `
  return (
    <Base
      bg={theme.colors[lowerCase(party).slice(0, 3)]}
      color="white"
      fontSize={1}
      {...props}
      children={party.slice(0, 1)}
    />
  )
}

export default Profile
