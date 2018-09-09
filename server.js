const axios = require('axios')
const express = require('express')
const next = require('next')
const scrapeIt = require('scrape-it')
const fs = require('fs')
const _ = require('lodash')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const electorFile = JSON.parse(fs.readFileSync('data/electorData.json', 'utf8'))

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
        .then(res => res.data)
        .then(data => {
          _.map(data.contests, (contest, i) => {
            data.contests[i].candidates = _.uniqBy(
              contest.candidates,
              n => n.name
            )
          })
          return data
        })
        .then(data => res.json(data))
        .catch(error => {
          res.status(500).json({ error: 'an error occurred' })
        })
    } else {
      res.status(400).json({ error: 'no address specified' })
    }
  })

  server.get('/positions', (req, res) => {
    const { name, state } = req.query
    const baseUrl = 'https://votesmart.org/candidate/political-courage-test/'
    electorFile.forEach(element => {
      if (`${element.first_name} ${element.last_name}` === name) {
        const vsUrl = `${baseUrl}${element.votesmart_candidate_id}/${name}/`
        res.json({ url: vsUrl })
      }
    })

    if (name && name !== '') {
      scrapeIt(vsUrl, { data: 'tr .question-answer' }).then(
        //use a list instead of regular data
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
