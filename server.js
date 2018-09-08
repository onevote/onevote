require('dotenv').config()

const axios = require('axios')
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/locate', (req, res) => {
    address = req.query.address
    axios
      .get(
        `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${
          process.env.GOOGLE_CIVIC_API_KEY
        }&address=${encodeURIComponent(address)}&electionId=2000`
      )
      .then(response => {
        res.json(response.data)
      })
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
