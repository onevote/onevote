import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import ThemeProvider from '../theme'
import NProgress from 'nprogress'
import { debounce } from 'lodash'
import RouterEvents from '../lib/router-events'
import { Provider } from 'unstated'
import AppContainer from '../lib/state'

const app = new AppContainer()

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

const meta = tags =>
  tags.map((m, i) => {
    m.key = i
    return React.createElement('meta', m, null)
  })

const title = 'OneVote'
const description = 'Work in progress'
const img = '/static/card.png'

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(
        <ThemeProvider>
          <App {...props} />
        </ThemeProvider>
      )
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title children={title} />
          {meta([
            { name: 'description', content: description },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:description', content: description },
            { name: 'twitter:title', content: title },
            { name: 'twitter:image:src', content: img },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: img }
          ])}
          {this.props.styleTags}
        </Head>
        <body>
          <ThemeProvider>
            <Provider inject={[app]}>
              <Main />
            </Provider>
          </ThemeProvider>
          <NextScript />
        </body>
      </html>
    )
  }
}
