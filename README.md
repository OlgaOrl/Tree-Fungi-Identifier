# Tree-Fungi-Identifier

A simple express app of tree fungi.

## Features

- Filter fungi by lifespan (annual/perennial)
- Filter fungi by type of decay (root rot/trunk rot)
- Filter fungi by shape (cap-and-stem/hoof-shaped/leathery crust)
- Filter fungi by tree genus (Oak, Pine, Maple, etc.)

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Copy the `.env.sample` file to `.env`

```bash
cp .env.sample .env
```

### 3. Configure database connection

Update the `.env` file with your database credentials:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username      # Replace with your MySQL username
DB_PASSWORD=your_password  # Replace with your MySQL password
DB_NAME=tree_fungi

# Database URL is constructed from the above variables
DATABASE_URL="mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
```

Make sure you have created the `tree_fungi` database in your MySQL server.

### 4. Set up and seed the database:

```bash
npx prisma db push && npm run seed
```

This will push the Prisma schema to your database and populate initial data.

## Usage

```bash
npm start
```

The server will run on http://localhost:3000 by default.

## User Stories Implemented

1. As a user, I want to filter tree fungi by lifespan so I can identify fungi based on their lifecycle.
2. As a user, I want to filter tree fungi by decay type and shape so I can narrow down identification options.
3. As a user, I want to find tree fungi by selecting tree genus so I can identify fungi for specific species.

## Troubleshooting

If you encounter database connection errors, check that:
- The database credentials in your `.env` file are correct
- The database server is running (e.g., MySQL via Laragon)
- You have created the database specified in `DB_NAME`
- Prisma CLI is installed globally:

```bash
npm install -g prisma
```

Run the following command to check database status:

```bash
npx prisma migrate status
```