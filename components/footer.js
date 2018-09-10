import React from 'react'
import Link from '../theme/link'
import { Flex, Container } from '@hackclub/design-system'

const Base = Container.withComponent(Flex)

export default () => (
  <Base justify="space-between" wrap width={1} maxWidth={48} px={3} pb={5}>
    <Link
      color="muted"
      href="http://devpost.com/software/onevote"
      target="_blank"
    >
      Made at PennApps XVIII
    </Link>
    <Link color="muted" href="https://github.com/lachlanjc/onevote">
      Open source with ❤
    </Link>
  </Base>
)
