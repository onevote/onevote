const axios = require('axios')
const express = require('express')
const next = require('next')
const scrapeIt = require('scrape-it')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/locate', (req, res) => {
    const address = req.query.address
    if (address && address !== '') {
      axios
        .get(
          `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${
            process.env.GOOGLE_CIVIC_API_KEY
          }&address=${encodeURIComponent(address)}&electionId=${req.query
            .electionId || 2000}`
        )
        .then(response => {
          res.json(response.data)
        })
        .catch(error => {
          res.status(500).json({ error: 'an error occurred' })
        })
    } else {
      res.status(400).json({ error: 'no address specified' })
    }
  })

  server.get('/position', (req, res) => {
    const { name, state } = req.query
    if (name && name !== '') {
      scrapeIt('https://avascherocman.com', { data: 'h1' }).then(
        ({ data, response }) => {
          res.json(data)
        }
      )
    } else {
      res.status(400).json({ error: 'no name specified' })
    }
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
