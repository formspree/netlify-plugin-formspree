fs = require("fs");

/* eslint-disable no-unused-vars */
module.exports = {
  async onPostBuild({ utils: { build, run, status } }) {
    if (fs.existsSync("formspree.json")) {
      try {
        await run("formspree", ["deploy"]);
      } catch (error) {
        // Report a user error
        build.failBuild("Formspree deploy command failed. See errors above.");
      }
    } else {
      status.show({
        title: "Formspree deploy skipped.",
        summary: "No formspree.json file found.",
      });
    }
  },
};
