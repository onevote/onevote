import React, { Fragment } from 'react'
import Link from '../theme/link'
import Header from '../components/header'
import Footer from '../components/footer'
import { Container, Box, Flex, Text, Heading } from '@hackclub/design-system'

export default () => (
  <Fragment>
    <Header />
    <Container width={1} maxWidth={48} px={3} pb={4}>
      <Heading.h1 mb={2}>
        Your vote counts. <Text.span bold>Cast it.</Text.span>
      </Heading.h1>
      <Text f={3}>
        While young people are more informed and engaged than ever, we’re not
        turning up at the polls. Your votes count, so let’s change that.
      </Text>
    </Container>
    <Footer />
  </Fragment>
)
