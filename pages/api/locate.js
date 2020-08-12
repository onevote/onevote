const scrapeIt = require('scrape-it')
const _ = require('lodash')

export default async (req, res) => {
  const {address} = req.query
  if (address && address !== '') {
    await fetch
      (
        `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${
          process.env.GOOGLE_CIVIC_API_KEY
        }&address=${encodeURIComponent(address)}&electionId=${req.query
          .electionId || 2000}`
      )
      .then(res => res.json())
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
}
