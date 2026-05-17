# FreshBoard

FreshBoard is a local-first fridge inventory prototype for tracking food, drinks, expiry dates, shopping items, and usage history.

## Run

Open `index.html` directly in a browser, or run a local static server:

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:4174/
```

## Current Prototype

- Dashboard with expired, today, soon, and total inventory counts
- Food inventory with expiry status, search, category filter, and expiry filter
- Position-based inventory board for fridge, freezer, and pantry
- Position filter and custom storage locations
- Add and edit food items
- Quick quantity adjustment without opening the full edit form
- Mark food as used or discarded
- Confirmation dialogs for destructive or inventory-removing actions
- Shopping list with checked state and quick conversion to a food item
- Add active or historical food items back to the shopping list
- History view for used and discarded items
- Restore historical food items back into inventory
- Browser `localStorage` persistence
- PWA manifest and service worker for home-screen install/offline shell
- Supabase email/password authentication
- Supabase remote sync with local-first fallback
- Responsive layout for desktop and mobile

## Next Steps

- Run `supabase-schema.sql` in Supabase SQL Editor if the tables are not created yet
- Add family sharing
- Add reminder notifications
- Add import/export backup
