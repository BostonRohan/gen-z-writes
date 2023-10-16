## 1. Create a `.env` file

Provide your values as needed

### 2. Remote Database (using PlanetScale)

[Follow the PlanetScale quick start guide to get started][planetscale-quick-start]

After creating an account and creating a database using the steps above:

1. Click either the big "Connect" button or the "connect to your database" Link.

2. Select "Connect with Prisma" and copy the `DATABASE_URL` for your `.env`

### 3. Create a new Google OAuth Application

[Follow this link](https://support.google.com/cloud/answer/6158849?hl=en) to create a new app filling the following required
details on creation:

```
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

Next, copy the client secret generated and the client ID into the `.env` file,
replacing `<client_id>` and `<client_secret>`, respectively:

```
GOOGLE_CLIENT_ID=<client_id>
GOOGLE_CLIENT_SECRET=<client_secret>
```

In the end your local `.env` file should look something like the following

```
DATABASE_URL="mysql://dev:dev@localhost/gen-z-writes"
GOOGLE_CLIENT_ID=<client_id>
GOOGLE_CLIENT_SECRET=<client_secret>

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET="for local use you can just use a garble of letters"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Install dependencies

Use `pnpm` to install dependencies.

```
pnpm install
```

### 5. Push Database Schema and Seed

```
pnpm db:push
pnpm db:seed
```

### 6. Running the dev server

Finally, you can run the dev server:

```
pnpm dev
```
