This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# T-Planet
Built using Next.js
Database - Postgres

-- database set up, seeded users, flash cards, card sets, connections btwn the 3
-- initialize dashboard/welcome, login page + auth config, actions, sidenav
    ** need to update actions
    ** need to work on front-end (ui)
     
-- work on login page
    * add middleware.ts
    * generate secret (openssl rand -base64 32) and update .env
    ** login page works!

-- work on creating new user
    * registration page built (basic) and link on login page redirects
    * name, email, password are requested + validated
    * error creating user in DB -- likely because of uid.
        This is ok bc the reason I built the registration page was to test things with UID
        Namely auto-generation of primary key for uid.

Working on displaying table for flashcards
    * basic set up is done for table + fetching + buttons
    * currently error with fetching - NeonDbError: operator does not exist: character varying = uuid
    * also need to set up table skeletons