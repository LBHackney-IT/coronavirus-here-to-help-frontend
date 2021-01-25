# 📤 Hackney Here To Help Frontend

This is the call-centre staff-facing frontend for Hackney's Here To Help.

## 🧱 How it's made

It's a [Next.js](https://nextjs.org) app that works with:

- Hackney's [CV-19 Resident Support API V3](https://github.com/LBHackney-IT/cv-19-res-support-v3)
- Hackney's [Google oAuth service](https://github.com/LBHackney-IT/LBH-Google-auth)

It's built using the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend).

## 💻 Running it locally

You need `node` and `npm` installed.

First, clone the repo

```bash
npm i
npm run dev
```

It'll be on [http://localhost:3000](http://localhost:3000) with a mocking server on [http://localhost:3001](http://localhost:3001)

### Logging in

First, you need a @hackney.gov.uk Google account in the right groups to log in. Speak to Hackney IT if you don't have these.

Next, you need to tell your computer to run the app from a hackney.gov.uk domain. Let's use `localdev.hackney.gov.uk`.

Add this line to your hosts file (Windows: `C:\Windows\System32\drivers\etc\hosts`, Mac: `/etc/hosts`):

```
127.0.0.1	localdev.hackney.gov.uk
```

When you next launch the app, it should be on `http://localdev.hackney.gov.uk:3000`.

Login should now work.

## 🧪 Testing it

It uses cypress for tests. Run them with:

```
npm run test:e2e:dev
```

## 🌎 Putting it on the internet

It's suitable for Heroku, Vercel, AWS, or any other Node.js hosting.

Pushes to the main branch will be automatically built and deployed to our staging environment.

Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🧬 Configuration

You can use a `.env.local` file to supply environment config locally. Create a fresh one with `cp .env.sample .env.local`.

| Variable                                  | Description                                                         | Example                             |
| ----------------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| RUNTIME_APP_URL                           |                                                                     | http://localdev.hackney.gov.uk:3000 |
| HACKNEY_JWT_SECRET                        |                                                                     |                                     |
| RUNTIME_HACKNEY_COOKIE_NAME               |                                                                     | hackneyToken                        |
| RUNTIME_HOST_ENV                          |                                                                     | dev                                 |