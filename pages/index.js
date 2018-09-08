import React, { Fragment } from 'react'
import styled from 'styled-components'
import Link from '../theme/link'
import Header from '../components/header'
import Footer from '../components/footer'
import { Container, Box, Flex, Text, Heading } from '@hackclub/design-system'
import SearchInput from '../components/searchInput'

const Highlight = styled(Text.span)`
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(250, 247, 133, 0.3),
    rgba(250, 247, 133, 0.7) 95%,
    rgba(250, 247, 133, 0.1)
  );
`

export default () => (
  <Fragment>
    <Header />
    <Container width={1} maxWidth={48} px={3} pb={4}>
      <Heading.h1 f={[5, 6]}>
        Your vote counts. <Text.span bold>Cast it.</Text.span>
      </Heading.h1>
      <Text f={3} mt={2} mb={2}>
        While young people are more informed and engaged than ever, we’re not
        turning up at the polls.{' '}
        <Highlight>Our votes are critical to the future we want.</Highlight>
      </Text>
      <Text f={3}>
        <Text.span bold>Know who you’re voting for, then vote.</Text.span> We’re
        here to help.
      </Text>
      <Box mt={[3, 4]}>
        <SearchInput placeholder="1 Infinite Loop, Cupertino, CA" />
      </Box>
    </Container>
    <Footer />
  </Fragment>
)
