# 11ty Sanity Vite Starter

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
- Create new favicon assets and replace them in `/public/assets/favicon`
- Get started with your own Sanity instance: [sanity.io/get-started](https://www.sanity.io/get-started/)

## Local Environment Variables

Create an `.env` file in the root directory to add environment variables for this project:

```
SANITY_API_TOKEN = ""
SANITY_PROJECT_ID = ""
SANITY_DATASET = "production"
```

## Run dev server

Start up this project for development:

```sh
npm start
```

## Build

Trigger a production build:

```sh
npm run build
```
