import React from 'react'
import styled from 'styled-components'
import theme from '../../theme/config'
import { Box, Flex, Link, Text, Button } from '@hackclub/design-system'
import Icon from '@hackclub/icons'

const Base = styled(Flex)`
  line-height: 0;
`

const Contact = ({ twitter, facebook, ...props }) => (
  <Base mt={3} mx={[-1, -2]} align="center" {...props}>
    {twitter && <Twitter data={twitter.id} />}
    {facebook && <Facebook data={facebook.id} />}
  </Base>
)

export default Contact

const ItemLink = styled(Link).attrs({ mx: [1, 2] })`
  display: inline-block;
  flex-shrink: 0;
  line-height: 0;
`

const Item = ({ href, label, icon, ...props }) => (
  <ItemLink href={href} target="_blank" title={label} {...props}>
    <Icon glyph={icon} size={36} />
  </ItemLink>
)

const Twitter = ({ data }) => (
  <Item href={data} label="Twitter" icon="twitter" color="#1da1f2" />
)

const Facebook = ({ data }) => (
  <Item href={data} label="Facebook" icon="facebook" color="#3b5998" />
)
