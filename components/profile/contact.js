import React from 'react'
import { Box, Flex, Link, Text, Icon, Button } from '@hackclub/design-system'

const Base = Flex.extend`
  line-height: 0;
`

const Contact = ({ phone, callCount, form, twitter, facebook, ...props }) => (
  <Base mt={3} mr={[-1, -2]} align="center" {...props}>
    {phone && <Phone data={phone} />}
    {callCount && <Calling data={phone} count={callCount} />}
    {form && <Form data={form} />}
    {twitter && <Twitter data={twitter} />}
    {facebook && <Facebook data={facebook} />}
  </Base>
)

export default Contact

const ItemLink = Link.extend.attrs({ mx: [1, 2] })`
  display: inline-block;
  background-image: url(//icon.now.sh/${props => props.icon}/ffffff);
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 24px;
  &:first-of-type {
    width: 48px;
    height: 48px;
  }
`

const Item = ({ href, label, icon, bg = 'brand', ...props }) => (
  <ItemLink
    href={href}
    target="_blank"
    aria-label={label}
    title={label}
    icon={icon}
    bg={bg}
    color="white"
    {...props}
  />
)

const tel = data => `tel:${data.match(/\d+/g).join('')}`
const PhoneButton = Button.extend`
  display: inline-flex;
  align-items: center;
`
const Phone = ({ data }) => (
  <PhoneButton
    href={tel(data)}
    title={`Phone number: ${data}`}
    aria-label={`Phone number: ${data}`}
    bg="brand"
  >
    <Icon name="phone" size={24} mr={2} />
    Call
  </PhoneButton>
)
const FlexLink = Flex.withComponent(Link)
const Calling = ({ count, data }) => (
  <FlexLink flex="1 1 auto" align="center" href={tel(data)} px={[2, 3]}>
    <Text.span f={3} color="brand" bold>
      {count}
    </Text.span>
    <Text.span ml={1} mt={1} f={0} color="muted" caps>
      calling
    </Text.span>
  </FlexLink>
)

const Form = ({ data }) => (
  <Item href={data} label="Contact" icon="chat" bg="warning" />
)

const Twitter = ({ data }) => (
  <Item
    href={`https://twitter.com/${data}`}
    label="Twitter"
    icon="twitter"
    bg="#1da1f2"
  />
)

const Facebook = ({ data }) => (
  <Item
    href={`https://facebook.com/${data}`}
    label="Facebook"
    icon="facebook"
    bg="#3b5998"
  />
)
