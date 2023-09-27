# About kulturdaten.berlin

[![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue?style=flat-square)](https://www.technologiestiftung-berlin.de/)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

**We make Berlin’s cultural diversity visible**

On the one hand, the internet offers many ways to find out about Berlin’s diverse cultural scene, but on the other hand, there remains no central overview of all the city’s cultural institutions and events. With kulturdaten.berlin, we want to create the basis for making it easier to discover the diversity of Berlin’s culture - from small but inviting events held in a given neighborhood to major cultural productions. Via our data interface, event portals, for example, can obtain exactly the data they need for their particular sector focus in no time at all. kulturdaten.berlin is based on the principles of open data and open source. That means, the source code is open and the cultural data of the platform is freely and easily accessible to all via an API, so that others can use it to build their own applications, for example. Whether it’s an app specifically for barrier-free cultural experiences or a website with concert tips specific to a given neighborhood: we're opening up Berlin’s cultural data for anyone with fresh ideas to reuse.

kulturdaten.berlin is a project of the Technologiestiftung Berlin (<https://www.technologiestiftung-berlin.de>), funded by the Senate Department for Culture and Social Cohesion.


## Prerequisites

- Install a Node version according to the version specified in `.nvmrc` (e.g. with `nvm install` or `nvm use`)
- Install [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/)


## Installation

1. Install packages with `npm install`
2. Create an `.env` in the root directory and fill it with values (see `.env.example` for inspiration)


## Development

```shell
# Local development server
npm run dev

# Local development server in debug mode
npm run debug
```


## More commands

```shell
# Re-generate all OpenAPI schema files
npm run generate

# Format all code with Prettier
npm run format

# Lint all code with ESLint
npm run lint

# Run the TypeScript compiler to find any TypeScript errors
npm run typecheck
```


## Tests

Run all tests with Jest:

```shell
npm test
```


## Production Build

```shell
npm start
```


## Initializing an empty database

The `Seeder.ts` script assists in initializing your database. Use the `-t` or `--tags` flag to add predefined tags. To set up an admin user, utilize the `-a` or `--admin` flag followed by the credentials in the format `email:password`. Both operations can be performed simultaneously in one command. For example:

```shell
npm run seed -- --tags --admin admin@example.com:password123
```


## Contributing

Before you create a pull request, write an issue so we can discuss your changes.


## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ThorstenDiekhof"><img src="https://avatars.githubusercontent.com/u/121924163?v=4?s=64" width="64px;" alt="Thorsten Diekhof"/><br /><sub><b>Thorsten Diekhof</b></sub></a><br /><a href="https://github.com/technologiestiftung/kulturdaten.berlin/commits?author=ThorstenDiekhof" title="Code">💻</a> <a href="#ideas-ThorstenDiekhof" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/pulls?q=is%3Apr+reviewed-by%3AThorstenDiekhof" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/commits?author=ThorstenDiekhof" title="Documentation">📖</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/commits?author=ThorstenDiekhof" title="Tests">⚠️</a> <a href="#infra-ThorstenDiekhof" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://herrherrmann.net"><img src="https://avatars.githubusercontent.com/u/6429568?v=4?s=64" width="64px;" alt="Sebastian Herrmann"/><br /><sub><b>Sebastian Herrmann</b></sub></a><br /><a href="https://github.com/technologiestiftung/kulturdaten.berlin/commits?author=herrherrmann" title="Code">💻</a> <a href="#ideas-herrherrmann" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/pulls?q=is%3Apr+reviewed-by%3Aherrherrmann" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/commits?author=herrherrmann" title="Tests">⚠️</a> <a href="#infra-herrherrmann" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ZenVega"><img src="https://avatars.githubusercontent.com/u/50147356?v=4?s=64" width="64px;" alt="Urs Schmidt"/><br /><sub><b>Urs Schmidt</b></sub></a><br /><a href="https://github.com/technologiestiftung/kulturdaten.berlin/commits?author=ZenVega" title="Code">💻</a> <a href="#ideas-ZenVega" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/pulls?q=is%3Apr+reviewed-by%3AZenVega" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/commits?author=ZenVega" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/BugBoomBang"><img src="https://avatars.githubusercontent.com/u/30436389?v=4?s=64" width="64px;" alt="Simon Scholler"/><br /><sub><b>Simon Scholler</b></sub></a><br /><a href="#ideas-BugBoomBang" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/technologiestiftung/kulturdaten.berlin/pulls?q=is%3Apr+reviewed-by%3ABugBoomBang" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Content Licensing

Text and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).


## Credits

<table>
  <tr>
    <td>
      Made by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-tsb-outline.svg" />
      </a>
    </td>
    <td>
      Supported by: <a src="https://www.berlin.de/sen/kultur/en/">
        <br />
        <br />
        <img width="120" src="https://logos.citylab-berlin.org/logo-berlin-senkueu-en.svg" />
      </a>
    </td>
  </tr>
</table>
