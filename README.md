![Campaign Manager](screenshots/CampaignManagerSplash.png 'Campaign Manager')

# Campaign Manager

## Features

- Email and GitHub authentication
- Creating new campaigns, with edit and delete functionality
- Invite other players to your campaign, accept or deny invites
- Visible notification in the navbar when you receive an invite
- Create sessions and add/edit/delete notes for all players to see in the campaign

## Technologies

- SvelteKit
- Typescript
- Tailwind CSS
- Drizzle ORM
- Zod
- Cloudinary
- Planetscale
- Turso

## Developing

1. Run the install command (make sure to have [pnpm installed](https://pnpm.io))

```bash
pnpm i
```

2. Copy the .env.example file to .env, change variables if you need to, otherwise it will run with the local Docker setup

3. Push the database schema

```bash
pnpm db:push
```

4. Run the SvelteKit project!

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

Hooray, you are now running the dev environment locally!
