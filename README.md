# [kunyora.github.io/kunyora](https://kunyora.github.io/kunyora) &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md) 

This repo contains the website documentation powering the [Kunyora website](https://kunyora.github.io/kunyora)

## Getting Started

### installation

1.  Clone the `kunyora-website` repo
2.  cd `kunyora-website`
3.  `cd website` to go into the website portion of the project
4.  `yarn install` to install the website's npm dependencies or (`npm install`)

### Running locally

1.  `yarn run start` to run the development server powered by Docusaurus or `npm install` if not using yarn.
2.  `open http://localhost:3000/` to open the site in your favourite browser

### OverView

The site is built with [Docusaurus](https://docusaurus.io) which is a static site builder for blogs and documentation.To edit the internals of the documentation, you need to familiarize yourself with this builder. Visit the Docusaurus site to learn more about the available configuration options.

Please check the docusaurus documentation for an overview of the website structure built with it.

### Contributing

1.  `git checkout master` from any local folder in your `kunyora-website` repository.
2.  `git pull origin master` to ensure that you have the latest code.
3.  `git checkout -b name-of-your-new-branch`
4.  Make your changes and save changes
5.  Check your package.json file to see how to run locally. it would most likely be `yarn run start` or `npm start`
6.  `open http://localhost:3000/kunyora/versions.html` to see other versions
7.  Test your changes with other browsers for compartibility.
8. `yarn run prettier` to format your code.
9.  `git add -A && git commit -m My commit message` (replacing `My commit message` with your own message)
10.  `git push my-fork-name the-name-of-my-branch`
11. Go to the `kunyora-website repo`, you should see the recently pushed branch.

## License

React-Kunyora is [MIT licensed](./LICENSE)

Kunyora is [MIT licensed](https://github.com/kunyora/kunyora/blob/master/LICENSE).

Kunyora documentation is [MIT licensed](https://github.com/kunyora/kunyora-website/blob/master/LICENSE)