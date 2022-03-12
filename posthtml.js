// const { readFileSync } = require('fs')

// const posthtml = require('posthtml')
// const expressions = require('posthtml-expressions')

// posthtml(expressions({ locals: { Google_API_Key : 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAc0VycLd1iZcaipze_ye4WoN5Cl1xhXr8', apiId: 'AIzaSyAc0VycLd1iZcaipze_ye4WoN5Cl1xhXr8' } }))
//   .process(readFileSync('eventsearch.html', 'utf8'))
//   .then((result) => console.log(result.html))



  const { readFileSync } = require('fs')
const posthtml = require('posthtml')
const options = { /* see available options below */ }

posthtml()
  .use(require('posthtml-modules'))
  .process(readFileSync('eventsearch.html', 'utf8'))
  .then((result) => result)
  