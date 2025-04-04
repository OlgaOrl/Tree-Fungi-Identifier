# Tree-Fungi-Identifier

A simple express app of tree fungi.

## Installation

1. Install dependencies
```bash
npm install
```
2. Copy the `.env.sample` file to `.env`
```bash
cp .env.sample .env
```
Make sure to update .env with the correct database credentials if needed.

3. Set up and seed the database:
```bash
npx prisma db push && npm run seed
```
This will push the Prisma schema to your database and populate initial data.
## Usage
```bash
npm start
```
The server will run on http://localhost:3000 by default.

## Troubleshooting
If you encounter database connection errors, check that:
-The DATABASE_URL in .env is correctly configured.
-The database server is running (e.g., MySQL via Laragon).
-Prisma CLI is installed globally:
```bash
npm install -g prisma
```
Run the following command to check database status:
```bash
npx prisma migrate status
```

