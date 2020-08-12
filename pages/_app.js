import '../public/base.css'
import App from 'next/app'
import Head from 'next/head'
import ThemeProvider from '../theme'
import theme from '../theme/config'

const pageDescription =
  'Millennials and us Gen Z don’t show up to the polls. Know your candidates and get out to vote with OneVote.'
const pageTitle = 'OneVote'
const url = 'https://onevote.vercel.app'
const imageUrl = '' // TODO

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <Head>
          <title children={pageTitle} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content={theme.colors.brand} />
          <meta name="description" content={pageDescription} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:domain" content={url} />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content={imageUrl} />
          <meta property="og:site_name" content={pageTitle} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
