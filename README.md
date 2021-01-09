Netlify Plugin for Formspree.

Please install this plugin from the Netlify app.

For help, please checkout the [Formspree CLI Docs](https://help.formspree.io/hc/en-us/articles/360053819114-The-Formspree-CLI).

# Configuration

Once the plugin is installed, if there is a `formspree.json` file in your project root, it will run `formspree deploy` with default options during your pre-build phase.

You'll need to ensure you have any needed environment variables configured. At a minimum you'll need a `FORMSPREE_DEPLOY_KEY` which you can find under your project’s “Settings” tab in Formspree. See the docs on [configuring forms](https://help.formspree.io/hc/en-us/articles/360053819114#configuring-forms).
