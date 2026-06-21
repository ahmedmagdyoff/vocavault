# VocaVault — Laravel Backend Structure & Migrations

Create the Laravel 12 backend for VocaVault, a vocabulary learning app where users save words from videos, categorize them, and build a personal vocabulary library.

## Proposed Changes

### 1. Laravel Project Scaffolding

#### [NEW] `backend/` — Laravel 12 project

- Scaffold a new Laravel 12 project inside `backend/` using `composer create-project`
- Install Laravel Sanctum (ships with Laravel 12 by default)
- Configure `.env` for MySQL connection

---

### 2. Database Migrations

Create migrations matching the database structure from the README:

#### [NEW] `videos` migration
| Field      | Type      | Notes                        |
|------------|-----------|------------------------------|
| id         | bigint    | Primary key                  |
| user_id    | bigint    | FK → users, cascading delete |
| title      | varchar   |                              |
| url        | text      |                              |
| platform   | varchar   | youtube, tiktok, facebook, instagram, other |
| timestamps |           |                              |

#### [NEW] `categories` migration
| Field | Type    | Notes                       |
|-------|---------|-----------------------------|
| id    | bigint  | Primary key                 |
| name  | varchar | Unique, no timestamps       |

#### [NEW] `words` migration
| Field       | Type    | Notes                        |
|-------------|---------|------------------------------|
| id          | bigint  | Primary key                  |
| user_id     | bigint  | FK → users, cascading delete |
| category_id | bigint  | FK → categories, cascading delete |
| word        | varchar |                              |
| meaning     | text    |                              |
| notes       | text    | Nullable                     |
| timestamps  |         |                              |

#### [NEW] `video_words` pivot migration
| Field    | Type   | Notes                        |
|----------|--------|------------------------------|
| video_id | bigint | FK → videos, cascading delete|
| word_id  | bigint | FK → words, cascading delete |
| Composite primary key on (video_id, word_id) |

---

### 3. Eloquent Models

#### [NEW] `app/Models/Video.php`
- `belongsTo` User
- `belongsToMany` Word (via `video_words` pivot)
- Fillable: `title`, `url`, `platform`

#### [NEW] `app/Models/Category.php`
- `hasMany` Word
- Fillable: `name`
- No timestamps

#### [NEW] `app/Models/Word.php`
- `belongsTo` User
- `belongsTo` Category
- `belongsToMany` Video (via `video_words` pivot)
- Fillable: `word`, `meaning`, `notes`, `category_id`

#### [MODIFY] `app/Models/User.php`
- Add `hasMany` Video
- Add `hasMany` Word

---

### 4. API Controllers

#### [NEW] `app/Http/Controllers/Api/AuthController.php`
- `register()` — POST `/api/register`
- `login()` — POST `/api/login`
- `logout()` — POST `/api/logout` (auth required)
- `user()` — GET `/api/user` (auth required)

#### [NEW] `app/Http/Controllers/Api/VideoController.php`
- `index()` — GET `/api/videos` — List user's videos
- `store()` — POST `/api/videos`
- `update()` — PUT `/api/videos/{id}`
- `destroy()` — DELETE `/api/videos/{id}`

#### [NEW] `app/Http/Controllers/Api/CategoryController.php`
- `index()` — GET `/api/categories` — List all categories

#### [NEW] `app/Http/Controllers/Api/WordController.php`
- `index()` — GET `/api/words` — List user's words with category & videos
- `store()` — POST `/api/words` — Create word + attach videos
- `update()` — PUT `/api/words/{id}` — Update word + sync videos
- `destroy()` — DELETE `/api/words/{id}`

---

### 5. Form Request Validation

#### [NEW] `app/Http/Requests/RegisterRequest.php`
- name: required, string, max:255
- email: required, email, unique:users
- password: required, min:8, confirmed

#### [NEW] `app/Http/Requests/LoginRequest.php`
- email: required, email
- password: required

#### [NEW] `app/Http/Requests/VideoRequest.php`
- title: required, string, max:255
- url: required, url
- platform: required, in:youtube,tiktok,facebook,instagram,other

#### [NEW] `app/Http/Requests/WordRequest.php`
- word: required, string, max:255
- meaning: required, string
- notes: nullable, string
- category_id: required, exists:categories,id
- video_ids: nullable, array
- video_ids.*: exists:videos,id

---

### 6. API Routes

#### [MODIFY] `routes/api.php`
- Public: `POST /register`, `POST /login`
- Protected (Sanctum middleware): `POST /logout`, `GET /user`, all video/category/word routes

---

### 7. Database Seeder

#### [NEW] `database/seeders/CategorySeeder.php`
- Seed default categories: Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Interjection, Expression, Phrasal Verb

---

### 8. CORS & Sanctum Configuration

#### [MODIFY] `.env`
- Set `SANCTUM_STATEFUL_DOMAINS` and `SESSION_DOMAIN` for Next.js frontend
- Configure `FRONTEND_URL`

#### [MODIFY] `config/cors.php`
- Allow `localhost:3000` (Next.js dev server)

---

## Verification Plan

### Automated Tests
```bash
cd backend
php artisan migrate --seed
php artisan route:list --path=api
```

### Manual Verification
- Confirm all migrations run without errors
- Confirm categories are seeded
- Confirm route list matches the API spec from the README
