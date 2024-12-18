<p align="center"><img src="/promo/logo.png" alt="TAPS Logo" width="100"></p>

<h1 align="center">T&PS Space Requests</h1>
 
<div align="center">
  <strong>A simple space request system designed to be used by theatrical organizations in Stanford University in order to book spaces owned by the Department of Theater and Performance Studies (TAPS)</strong>
  
  <sub>Powered by Notion and Open-source Technology.</sub>
</div>

<br>

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)
![Neon DB](https://img.shields.io/badge/Neon-0099FF?style=for-the-badge&logo=neon&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![License](https://img.shields.io/github/license/Stanford-TAPS/TAPS_space_request?color=orange&style=for-the-badge)
![Notion](https://img.shields.io/badge/Notion-f0e0d0?style=for-the-badge&logo=notion&logoColor=black)

<br>

![Screenshot](/promo/banner.png)

## ✨ Features

---

Stanford SSO Login

See space calendars to check availability

Request spaces for a specific time period

See conflicts with other events

If you are an approver: Check all requests, approve/reject

</div>

## 🚀 Development

---

### Installation

Start by cloning the repository and installing dependencies:

```bash
git clone https://github.com/Stanford-TAPS/TAPS_space_request
cd TAPS_space_request
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory of this project. Add the required environment variables. Here is a table with the required environment variables:

| Variable Name            | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| DATABASE_URL             | The URL of the Postgres database, with a pooler               |
| DIRECT_URL               | The URL of the Postgres database, without a pooler            |
| AUTH_SECRET              | A random string used to encrypt NextAuth Info                 |
| AUTH_URL                 | The URL of the NextJS app, if on Vercel `https://$VERCEL_URL` |
| VERCEL_URL               | The URL of the NextJS app                                     |
| STANFORD_CLIENT_SECRET   | The Stanford OAuth Client Secret                              |
| STANFORD_CLIENT_ID       | The Stanford OAuth Client ID                                  |
| NOTION_EVENTS_ID         | The ID of the Notion database for events                      |
| NOTION_FACILITIES_ID     | The ID of the Notion database for facilities                  |
| NOTION_GROUPS_ID         | The ID of the Notion database for groups                      |
| NOTION_KEY               | The Notion API key                                            |
| NOTION_SPACE_REQUESTS_ID | The ID of the Notion database for space requests              |
| SENTRY_DSN               | The Sentry DSN for error tracking                             |

```bash
touch .env.local
```

```bash
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
VERCEL_URL=
STANFORD_CLIENT_SECRET=
STANFORD_CLIENT_ID=
NOTION_EVENTS_ID=
NOTION_FACILITIES_ID=
NOTION_GROUPS_ID=
NOTION_KEY=
NOTION_SPACE_REQUESTS_ID=
SENTRY_DSN=
```

### Database

We use Prisma to manage our database. Once you have configure `DATABASE_URL` and `DIRECT_URL`, you may push the schema by running:

```bash
prisma migrate deploy
```

Our database provider for account management is [Neon](https://neon.tech), but any Prisma-compatible with Edge support will work.

The actual Notion database is managed by the Notion API, and is not managed by Prisma, it is used to query all spaces, events and organizations.

### Running the App

To run the app, run:

```bash
yarn dev
```

If you wish to run in SSL (required for Stanford SSO to work) mode, run:

```bash
yarn devssl
```

You should have a local certificate in the root directory generated with `mkcert`, with files called `localhost.pem` and `localhost-key.pem`. If developing with Firefox, you must also install `nss`. All this can be done with:

```bash
brew install nss
brew install mkcert
mkcert -install
```

Once you have the certificate, you can just run `yarn devssl` and it will work.

### Deploying

We use Vercel to deploy our app. Here is a button to deploy your own instance:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FStanford-TAPS%2FTAPS_space_request&env=DATABASE_URL,AUTH_SECRET,AUTH_URL,STANFORD_CLIENT_SECRET,STANFORD_CLIENT_ID,NOTION_EVENTS_ID,NOTION_FACILITIES_ID,NOTION_GROUPS_ID,NOTION_KEY,NOTION_SPACE_REQUESTS_ID&envDescription=Variables%20needed%20to%20run&envLink=https%3A%2F%2Fgithub.com%2FStanford-TAPS%2FTAPS_space_request)

Any Next.js compatible hosting provider should work, but we have not tested any others.

### Sentry

We use Sentry to track errors. To use Sentry, you must set the `SENTRY_DSN` environment variable.
