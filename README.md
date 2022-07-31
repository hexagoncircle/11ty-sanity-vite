# 11ty + Sanity + Vite Project Starter

Starter template using 11ty, Vite, and Sanity. Heavily inspired by the [Eleventy Plus Vite](https://github.com/matthiasott/eleventy-plus-vite) starter project.

## Getting started

After cloning the repo, install all dependencies:

```sh
npm install
```

## Checklist

A list of things to check when you get started on a new project:

- Change name and description in `package.json`
- Update information in `_data/meta.json`
- Update `/public/site.webmanifest`
- Replace the site's open graph image in `/public/assets/images/site.og-image.png`
- Create new favicon assets and replace them in `/public/assets/favicon`
- Get started with your own Sanity instance: [sanity.io/get-started](https://www.sanity.io/get-started/)

## Working with Sanity

Once you have a Sanity project created, add an `.env` file in the project's root directory for environment variables.

```
SANITY_API_TOKEN = ""
SANITY_PROJECT_ID = ""
SANITY_DATASET = "production"
```

The Sanity client can be found in the `_sanity` directory. An example of fetching data can be seen in `_data/pets.js` which then gets rendered in `sanity-example.njk`.

### Helpful resources

- [Sanity Docs](https://www.sanity.io/docs/overview-introduction)
- [How Queries Work – GROQ](https://www.sanity.io/docs/how-queries-work)

## Run dev server

Start up this project for development:

```sh
npm start
```

## Build

Run a production build:

```sh
npm run build
```
