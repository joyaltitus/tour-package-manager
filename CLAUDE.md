# Project: Tour Package Manager

## What this is
A learning project. Admin adds/edits tour packages from a private panel. Public website displays them live. Built to teach me full-stack basics.

## Who I am
Non-technical learner. I understand concepts but cannot debug code alone. Always explain in plain English first, then show code.

## Tech stack
- Backend: Node.js + Express
- Database: Supabase (Postgres)
- Frontend: React (Vite)
- Auth: Supabase Auth (admin login only)

## Folder layout
- /backend → Express server, talks to Supabase
- /frontend → React app, has public page + admin page
- .env files inside each folder (never commit them)

## How you must work with me
1. Before writing code, explain in 2–3 lines what we are about to build and why.
2. After writing code, explain what each file/function does in plain English.
3. Tell me exactly which file to open and where to paste.
4. One step at a time. Do not jump ahead.
5. If something can break, warn me before I run it.
6. Use the simplest solution. No clever tricks, no advanced patterns.
7. Every function gets a one-line comment above it explaining purpose.
8. Never hardcode passwords, keys, URLs — always .env.
9. When I report an error, fix it AND explain why it happened.
10. End each step with: "Test this by doing X. Tell me what you see."

## Current status
Part 5 deployment in progress.
Backend: live on Render at https://tour-package-manager.onrender.com
Frontend: live on Vercel at https://tour-package-manager.vercel.app
Packages JSON confirmed working at /packages endpoint.
CORS fix applied — Vercel preview URL added to allowedOrigins.
Next: confirm frontend loads packages, then test full flow.

## Live URLs
- Backend (Render): https://tour-package-manager.onrender.com
- Frontend (Vercel): https://tour-package-manager.vercel.app
- GitHub: https://github.com/joyaltitus/tour-package-manager

## Start backend command (local)
```
cd "/Users/joyaltitus/Documents/Claude VS code/tour-package-manager/backend" && NODE_OPTIONS="" node index.js
```

## Start frontend command (local)
```
cd "/Users/joyaltitus/Documents/Claude VS code/tour-package-manager/frontend" && npm run dev
```

## Next step
Confirm frontend loads packages from Render. Test full flow: public page → admin login → add/edit/delete → logout.

## Rules I follow
- Test every step before moving on
- Never run terminal commands I don't understand — ask first
- Mornings only (1.5–2 hrs), so each session must end at a working state
