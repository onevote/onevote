const scrapeIt = require('scrape-it')
const _ = require('lodash')

export default (req, res) => {
  const { name, state } = req.query
  if (_.isEmpty(name) || _.isEmpty(state)) {
    res
      .status(400)
      .json({ error: 'invalid parameters, name and state are required' })
  }
  return fetch(`https://votesmart.org/x/search?s=${encodeURIComponent(name)}`)
    .then(vs => vs.json())
    .then(vs =>
      Array.isArray(vs.results)
        ? vs.results
        : res.status(400).json({ error: 'No candidate found' })
    )
    .then(async vs => {
      const payload = []
      res.json(vs)
      /*
      console.log(vs)
      await Promise.all(
        vs
          .filter(c => c.state_id === state && c.incumbent !== true)
          .map(element => {
            const baseUrl =
              'https://votesmart.org/candidate/political-courage-test/'
            const vsUrl = `${baseUrl}${
              element.votesmart_candidate_id
            }/${_.kebabCase(element.name)}`
            console.log(vsUrl)
            return scrapeIt(vsUrl, {
              questions: {
                listItem: 'table.pct-q-a tr',
                data: {
                  response: 'td.span-3',
                  question: '.span-12'
                }
              }
            }).then(({ data, response }) => {
              console.log(response.statusCode, data)
              payload.push(data)
            })
          })
      )
      if (payload.length > 0) {
        res.json(payload)
      } else {
        res.status(400).json({ error: 'Something went wrong' })
      }
      */
    })
}
