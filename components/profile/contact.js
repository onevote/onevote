import React from 'react'
import styled from 'styled-components'
import theme from '../../theme/config'
import { Box, Flex, Link, Text, Button } from '@hackclub/design-system'
import Icon from '@hackclub/icons'

const Base = styled(Flex)`
  line-height: 0;
`

const Contact = ({ twitter, facebook, website, ...props }) => (
  <Base align="center" {...props}>
    {website && (
      <SocialIcon
        url={website}
        label="Website"
        icon="link"
        color={theme.colors.muted}
      />
    )}
    {twitter && (
      <SocialIcon
        url={twitter.id}
        label="Twitter"
        icon="twitter"
        color="#1da1f2"
      />
    )}
    {facebook && (
      <SocialIcon
        url={facebook.id}
        label="Facebook"
        icon="facebook"
        color="#3b5998"
      />
    )}
  </Base>
)

export default Contact

const ItemLink = styled(Link).attrs({ mx: [1, 2] })`
  cursor: pointer;
  display: inline-block;
  flex-shrink: 0;
  line-height: 0;
`

const Item = ({ href, label, icon, ...props }) => (
  <ItemLink
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    {...props}
  >
    <Icon glyph={icon} size={32} />
  </ItemLink>
)

const SocialIcon = ({ url, ...props }) => <Item href={url} {...props} />
