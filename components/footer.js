import React from 'react'
import { Flex, Container, Link } from '@hackclub/design-system'

const Base = Container.withComponent(Flex)

export default () => (
  <Base justify="space-between" wrap w={1} maxWidth={48} px={3} pb={5}>
    <a href="https://lachlanjc.me" target="_blank">
      Made at PennApps XVIII
    </a>
    <a className="github" href="https://github.com/lachlanjc/onevote">
      Source code
    </a>
  </Base>
)
