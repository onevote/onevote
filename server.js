const axios = require('axios')
const express = require('express')
const next = require('next')
const scrapeIt = require('scrape-it')
const _ = require('lodash')

const port = process.env.PORT || 5000
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
        .then(res => res.data)
        .then(data => {
          _.map(data.contests, (contest, i) => {
            data.contests[i].candidates = _.uniqBy(
              contest.candidates,
              n => n.name
            )
            data.contests[i].candidates = _.filter(
              contest.candidates,
              n => !_.startsWith(_.lowerCase(n.name), 'supreme court')
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
    if (_.isEmpty(name) || _.isEmpty(state)) {
      res
        .status(400)
        .json({ error: 'invalid parameters, name and state are required' })
    }
    axios
      .get(`https://votesmart.org/x/search?s=${encodeURIComponent(name)}`)
      .then(vs => vs.data)
      .then(vs => {
        vs.results.forEach(element => {
          if (state === element.state_id && element.incumbent !== true) {
            const baseUrl =
              'https://votesmart.org/candidate/political-courage-test/'
            const vsUrl = `${baseUrl}${
              element.votesmart_candidate_id
            }/${_.kebabCase(element.name)}`
            scrapeIt(vsUrl, {
              questions: {
                listItem: 'table.pct-q-a tr',
                data: {
                  response: 'td.span-3',
                  question: '.span-12'
                }
              }
            }).then(({ data, response }) => {
              console.log(`Status Code: ${response.statusCode}`)
              console.log(data)
            })
          }
        })
      })
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
//git branch test
