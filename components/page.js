import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import NProgress from 'nprogress'
import { debounce } from 'lodash'
import RouterEvents from '../lib/router-events'

const start = debounce(NProgress.start, 200)
RouterEvents.on('routeChangeStart', start)
RouterEvents.on('routeChangeComplete', url => {
  start.cancel()
  NProgress.done()
})
RouterEvents.on('routeChangeError', () => {
  start.cancel()
  NProgress.done()
})

export default ({ children }) => (
  <div>
    <Head>
      <title>OneVote</title>
    </Head>
    <Header />
    <main>{children}</main>
    <Footer />
    <style jsx global>{`
      html {
        height: 100%;
        box-sizing: border-box;
        font-size: 16px;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      body {
        position: relative;
        min-height: 100%;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
        text-rendering: optimizeLegibility;
        line-height: 1.5;
        font-size: 1.6rem;
      }
      a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      html,
      body {
        background-color: #fff;
        color: #000;
      }
      ::selection {
        background-color: #000;
        color: #fff;
      }
      .prevent-scroll {
        overflow: hidden;
      }
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        position: fixed;
        z-index: 2000;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: black;
      }
    `}</style>
  </div>
)
