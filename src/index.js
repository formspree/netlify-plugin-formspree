fs = require('fs')

/* eslint-disable no-unused-vars */
module.exports = {
  async onPostBuild({ utils: { build, run } }) {
    if (fs.existsSync('formspree.json')) {
      try {
        await run('formspree', ['deploy'])
      } catch (error) {
        // Report a user error
        build.failBuild('Formspree deploy command failed. See errors above.')
      }
    }
  },
}
