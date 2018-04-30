---
id: version-0.1.0-getting_started
title: Getting Started
original_id: getting_started
---

Thanks for taking your time to visit this section of the Kunyora documentation. This section will help you get started with installing and setting up the Kunyora environment on your personal or work computer. If you have already done this, then you can skip ahead to the [Quick tutorial section](quick_tutorial.html). This guide also describes how to install `react-kunyora` which is a binding between ReactJs and Kunyora; other view integrations should be implemented soon.

There are two ways to setup kunyora based on your development environment. Choose the installation type that best suites your needs.

* [`Installation through npm or yarn`](getting_started.md#installation-through-npm-or-yarn)
* [`Installation using cdn links`](getting_started.md#installation-using-cdn-links)

### `Installation through npm or yarn`

For this installation, you need to set up [Node](https://nodejs.org/en/download). Afterwards, cd into the project directory and enter the following commands.

```powershell
  #For use in a Javasript non-native linked environment

  npm install --save kunyora
  # or with yarn
  yarn add kunyora
```

If you are building a single page application, and you have [ReactJs](https://reactjs.org/docs/add-react-to-a-new-app.html) or [React Native](https://facebook.github.io/react-native/docs/getting-strted.html) set up as your development environment, you would want to setup react-Kunyora. To set up react-kunyora, cd into the project directory and enter the following commands.

```powershell
  #For use with reactJs

  npm install --save react-kunyora
  #or with yarn
  yarn add react-kunyora
```

### `Installation using cdn links`

If you are not building a single page application, you can use Kunyora and/or react-kunyora from the unpkg CDN. Kunyora would be available in your browser as `window.KunyoraClient`. Add the script below to your html template. To load a specific version of kunyora and react-kunyora, Just replace `0.1.0` with the version number.

```html
  <script crossorigin src="https://unpkg.com/kunyora@0.1.0/dist/kunyora.js"></script>
  <script crossorigin src="https://unpkg.com/react-kunyora@0.1.0/dist/react-kunyora.js"></script>
```

# What's Next?

Congratulations, you have successfully installed kunyora. What follows are getting acquinted with the rudiments of the library. If you are curious to learn more about the library then check out the [Quick tutorial section](quick_tutorial.md).
