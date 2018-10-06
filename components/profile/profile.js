import React from 'react'
import styled from 'styled-components'
import theme from '../../theme/config'
import { Avatar, Heading, Text, Box, Flex } from '@hackclub/design-system'
import Contact from './contact'
import { get, find, lowerCase, random } from 'lodash'
import getAvi from 'getavi'
import axios from 'axios'

const PARTIES = 'Republican' | 'Democrat' | 'Independent'
const PLACEHOLDER_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png'
const getYear = date => date.slice(0, 4)
const aviUrl = data => getAvi(get(find(data, ['type', 'Facebook']), 'id'))
const getAviFromVS = name =>
  axios
    .get(`https://votesmart.org/x/search?s=${encodeURIComponent(name)}`)
    .then(res => res.data)
    .then(data => {
      try {
        return data.results[0].photo
      } catch (err) {}
    })
    .catch(err => console.error(err))

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

class Profile extends React.Component {
  state = {
    avatar: null
  }

  componentDidMount() {
    const avatar = aviUrl(this.props.data.channels)
    if (avatar) {
      this.setState({ avatar })
    } else {
      getAviFromVS(this.props.data.name)
        .then(image => {
          if (!image) image = PLACEHOLDER_IMAGE
          this.setState({ avatar: image })
        })
        .catch(err => {
          this.setState({ avatar: PLACEHOLDER_IMAGE })
        })
    }
  }

  render() {
    const { data, ...props } = this.props
    const { avatar } = this.state

    return (
      <Base {...props}>
        <Flex align="center" style={{ position: 'relative' }}>
          <BadgeContainer>
            <Badge party={data.party} />
          </BadgeContainer>
          <Avi size={64} src={avatar ? avatar : '/static/loading.svg'} mr={3} />
          <Box align="left" style={{ flex: '1 1 auto' }}>
            <Heading.h4 fontSize={4} fontWeight="bold" children={data.name} />
          </Box>
          <Contact
            twitter={find(data.channels, ['type', 'Twitter'])}
            facebook={find(data.channels, ['type', 'Facebook'])}
          />
        </Flex>
      </Base>
    )
  }
}

const Avi = styled(Avatar)`
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  position: relative;
  background-image: ${PLACEHOLDER_IMAGE};
`

const BadgeContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
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
      title={party}
      {...props}
      children={party.slice(0, 1)}
    />
  )
}

export default Profile
