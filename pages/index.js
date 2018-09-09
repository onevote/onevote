import React, { Component, Fragment } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from '../theme/link'
import Header from '../components/header'
import Footer from '../components/footer'
import { Container, Box, Text, Heading } from '@hackclub/design-system'
import Search from '../components/search'

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

const Highlight = styled(Text.span)`
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(250, 247, 133, 0.33),
    rgba(250, 247, 133, 0.66) 95%,
    rgba(250, 247, 133, 0.1)
  );
`

export default class extends Component {
  static getInitialProps() {
    return { googleMapsApiKey }
  }

  render() {
    return (
      <Fragment>
        <Head>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${this.props.googleMapsApiKey}&libraries=places`} />
        </Head>
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
          <Text f={3} mb={[3, 4]}>
            <Text.span bold>Know who you’re voting for, then vote.</Text.span> We’re
            here to help.
          </Text>
          <Search />
        </Container>
        <Footer />
      </Fragment>
    )
  }
}
