## Netlify Plugin for Formspree

This plugin automatically deploys forms configured in your `formspree.json` file using the Formspree CLI during the Netlify pre-build phase. For more help, please checkout these resources:

- [Formspree CLI Docs](https://help.formspree.io/hc/en-us/articles/360053819114-The-Formspree-CLI)
- The [formspree.json docs](https://help.formspree.io/hc/en-us/articles/360053906373-The-formspree-json-File)

## Prerequisites

**Before installing**, please create a new CLI project in the Formspree dashboard. Once created, you'll see a Project ID and a Deploy Key. You'll need these later when configuring your plugin, and creating your form.

## Configuration via the Netlify UI

The `netlify-plugin-formspree` plugin can be found in the [netlify build plugins directory](https://app.netlify.com/plugins?search=formspree). 

Go to https://app.netlify.com/plugins/netlify-plugin-formspree/install to install the plugin into one of your sites, or you can navigate to your site's settings -> `plugins`.


## Configuration via netlify.toml

First add the plugin to your project's package.json devDependencies:

```
npm install --save-dev netlify-plugin-formspree

// or 

yarn add -D netlify-plugin-formspree
```

Then, in your `netlify.toml` file include the formspree plugin:

```
[[plugins]]
  package = "netlify-plugin-formspree"
```

Once the plugin is installed, if there is a `formspree.json` file in your project root, it will run `formspree deploy` during your pre-build phase.

## Environment Variables

At a minimum you'll need a `FORMSPREE_DEPLOY_KEY` environment variable populated with your project's deploy key. The deploy key was displayed when your project was first created. It can also be found under your project’s “Settings” tab in Formspree. 

3rd party plugins can be configured to accept API keys via environment variables. See the docs on [environment variables](https://help.formspree.io/hc/en-us/articles/360053819114#configuring-forms), and [continuous deployment](https://help.formspree.io/hc/en-us/articles/360053819114-The-Formspree-CLI#headerlink-4).

## Adding endpoints with formspree.json

Creating forms with the Formspree CLI is accomplished by editing the `formspree.json` file. This file contains a list of form keys and associated configurations. Here is an example of a newsletter opt-in form configuration that signs up subscribers to a Mailchimp list:

```json
{
  "forms": {
    "signupForm": {
      "name": "Sign-Up Form",
      "actions": [{ 
        "app": "mailchimp", 
        "type": "addOrUpdateContact", 
        "apiKey": "$FORMSPREE_MAILCHIMP_APIKEY" 
      }]
    }
  }
}
```

For a more in-depth explanation of the various configuration options see the formspree.json reference here: [The formspree.json File](https://help.formspree.io/hc/en-us/articles/360053906373)

For a list of actions that can be added to your forms, check out the articles within the docs section on the [Formspree CLI](https://help.formspree.io/hc/en-us/sections/360009671154-Using-the-CLI).


## Setting up your forms in React

First you'll need to install the `formspree-react` library.

```
npm install @formspree/react
```

Then import `FormspreeProvider` and put it near the top of your component hierarchy, wrapping your forms. Supply the `FormspreeProvider` with your project ID obtained above.

For example, if you are using Next.js, here's what a top-level _app.js file might look like:

```jsx
import { FormspreeProvider } from '@formspree/react';

function App({ Component, pageProps }) {
  return (
    <FormspreeProvider project="YOUR_PROJECT_ID">
      <Component {...pageProps} />
    </FormspreeProvider>
  );
}
export default App;
```

Next, set up your forms to use the `useForm` hook. It surfaces functions to handle form submissions, and manage form state.

Initialize the form in React by calling useForm and passing the form key you used in the formspree.json file.

```jsx
const [state, handleSubmit] = useForm('{form-key}');
```

Here's and example of what a form component might look like for the `signupForm` endpoint we created above:

```jsx
import { useForm } from '@formspree/react';

function SignupForm() {
  const [state, handleSubmit] = useForm('signupForm');
  if (state.succeeded) {
    return <div>Thank you for signing up!</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" />
      <button type="submit" disabled={state.submitting}>Sign up</button>
    </form>
  )
}
```

For more information about creating forms with React see the article on the [Formspree React Library](https://help.formspree.io/hc/en-us/articles/360055613373).


## Examples

You can see the formspree CLI in action, including an event signup form, including built-in Discord notifications below:

- [Maxcon 2024 example event site](https://formspree-example-netlify-plugin.netlify.app/)
- [Maxcon 2024 github repo](https://github.com/formspree/formspree-example-netlify-plugin)

