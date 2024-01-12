# Campaign Manager

## Developing

1. Run the install command (make sure to have [pnpm installed](https://pnpm.io))

```bash
pnpm i
```

2. Copy the .env.example file to .env, change variables if you need to, otherwise it will run with the local Docker setup

3. Start up the local MySQL server if you are using Docker

```bash
docker-compose up -d
```

4. Push the database schema

```bash
pnpm db:push
```

5. Run the SvelteKit project!

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

Hooray, you are now running the dev environment locally!
