import React from 'react'
import Link from 'next/link'
import { Flex, Container } from '@hackclub/design-system'
import Icon from '@hackclub/icons'

const Base = Container.withComponent(Flex)

const link = 'https://onevote.now.sh'
const twitterURL = (text, url) =>
  `https://twitter.com/intent/tweet?text=${text
    .split(' ')
    .join('%20')}&url=${url}`
const facebookURL = url => `https://www.facebook.com/sharer/sharer.php?u=${url}`

export default () => (
  <Base justify="space-between" wrap w={1} maxWidth={48} px={3} py={4}>
    <Link href="/" prefetch>
      <a className="logo">OneVote</a>
    </Link>
    <div className="social">
      <a href={twitterURL('OneVote', link)}>
        <Icon glyph="twitter" size={24} />
      </a>
      <a href={facebookURL(link)}>
        <Icon glyph="facebook" size={24} />
      </a>
    </div>
  </Base>
)
