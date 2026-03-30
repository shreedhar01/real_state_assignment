# Buyer Portal Assignment

## Tech Stack

### Frontend

* React
* @tanstack/react-query
* Tailwind CSS
* shadcn/ui
* Zod

### Backend

* Node.js
* Express
* Drizzle ORM
* Zod

---

## API Endpoints

### Register

```bash
curl -X POST http://localhost:8000/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"one@sk.com","password":"12345six"}'
```

### Login

```bash
curl -X POST http://localhost:8000/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"one@sk.com","password":"12345six"}'
```

### Verify Me

```bash
curl -X GET http://localhost:8000 \
  -H "Cookie: your_cookie_name=your_cookie_value"
```

### Logout

```bash
curl -X POST http://localhost:8000/logout \
  -H "Cookie: your_cookie_name=your_cookie_value"
```

### Get All Properties

```bash
curl -X GET "http://localhost:8000/property?page=1&limit=10" \
  -H "Cookie: your_cookie_name=your_cookie_value"
```

### Add to Favourite

```bash
curl -X POST "http://localhost:8000/property/fav" \
  -H "Content-Type: application/json" \
  -H "Cookie: your_cookie_name=your_cookie_value" \
  -d '{"id":22}'
```

### Remove Favourite

```bash
curl -X PATCH "http://localhost:8000/property/fav" \
  -H "Content-Type: application/json" \
  -H "Cookie: your_cookie_name=your_cookie_value" \
  -d '{"id":22}'
```

### Get Property Info

```bash
curl -X GET "http://localhost:8000/property/info?propertyId=1" \
  -H "Cookie: your_cookie_name=your_cookie_value"
```

### Edit Property

```bash
curl -X PATCH "http://localhost:8000/property/edit" \
  -H "Content-Type: application/json" \
  -H "Cookie: your_cookie_name=your_cookie_value" \
  -d '{
    "id": "1",
    "title": "Spacious 3BHK House with Me",
    "price": "210000",
    "description": "3-bedroom house with a private garden and rooftop in Lazimpat."
  }'
```

---

## Application Flow

* Registration and login inputs are validated using Zod on both frontend and backend.

* On successful authentication:

  * A cookie is set in the browser.
  * The following user object is returned:

    ```ts
    {
      id: number;
      name: string;
      role: "buyer" | "agent" | "admin" | null;
    }
    ```

* This user data is stored using a `verifyMe` hook.

* The `verifyMe` endpoint:

  * Is a protected route.
  * Uses cookies to validate session.
  * Ensures the session persists after browser refresh.
  * Returns user data if the cookie is valid and not expired.

---

## Properties

* 48 properties are pre-seeded in the database.
* `/dashboard` loads initial property data.
* Infinite scrolling is implemented:

  * Additional data is fetched when reaching the bottom of the page.

---

## Favourite System

### Add to Favourite

* Marks property as favourite.
* If not already موجود:

  * Creates a favourite entry.
* Returns favourite object.
* Updates local property state (`property.fav.status = true`).

### Remove from Favourite

* Takes favourite ID.
* Updates status to `false`.
* Updates local property state (`property.fav.status = false`).

---

## Edit Property

* Requires:

  ```ts
  {
    id: string;
    title: string;
    price: string;
    description: string;
  }
  ```
* Input is validated using Zod.
* Property is updated only if validation passes.

---

## Environment Variables

### Backend (`/backend/.env`)

```
PORT=8000
DATABASE_URL=require_if_running_Locally
SALT_ROUND=10
JWT_TOKEN=466a00a3da828f8dcc494097aee87a06d6120eebc25d8c9808d96b88600e4997
JWT_LIFE=86400000
```

### Frontend (`/frontend/.env`)

```
VITE_API_URL=http://localhost:8000
```

---

## Running the Application

### Using Docker

```bash
docker compose build
docker compose up -d
```

Note: The project has been tested with Podman. It should work with Docker as well.

---

### Running Locally

1. Setup database connection string.

2. Start backend:

```bash
cd backend
pnpm dev
```

3. Seed database:

```bash
pnpm db:seed
```

4. Start frontend:

```bash
cd frontend
pnpm dev
```
