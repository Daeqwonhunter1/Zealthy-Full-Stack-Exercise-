# Zealthy Full Stack Engineering Exercise

A mini-EMR and Patient Portal built with Next.js, Prisma, and SQLite.


### Mini EMR (`/admin`)
- View patient table with summary data
- Create new patients
- Edit patient info
- View patient detail page
- Create, edit, and delete appointments
- Create, edit, and delete prescriptions

### Patient Portal (`/`)
- Patient login with email/password
- Portal summary with:
  - basic patient info
  - appointments in next 7 days
  - prescription refills in next 7 days
- Full appointments page
- Full prescriptions page
- Logout


## Tech Stack

- Next.js
- TypeScript
- Prisma
- SQLite
- Tailwind CSS
- Axios
- Zod

## Getting Started

### 1. Install dependencies
```bash
npm install

```

### 2. Set up the database
```bash
npx prisma migrate reset
npx prisma db seed
npx prisma migrate dev --name init

```

### 3. Start the development server
```bash
npm run dev

```