# Shadow Vocabulary

A web application for English learners to save vocabulary from real videos (YouTube, TikTok, Facebook, etc.), organize words by category, and build a personal vocabulary library.

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS

## Backend

- Laravel
- Laravel Sanctum Authentication

## Database

- MySQL

---

# Version 1 Goals

- User Authentication
- Add Videos
- Add Vocabulary
- Categorize Words
- Link Words to Videos
- Personal User Library

---

# Features

## Authentication

### Register

Fields:

- Name
- Email
- Password
- Confirm Password

### Login

Fields:

- Email
- Password

### Logout

- Secure logout

---

# Dashboard

Display:

- Total Words
- Total Videos
- Total Categories

Example:

- Words: 120
- Videos: 35
- Categories: 8

---

# Videos Module

Users can save videos from:

- YouTube
- TikTok
- Facebook
- Instagram
- Other platforms

### Fields

- Title
- URL
- Platform

### Example

Title:

```text
Friends Episode 1
```

URL:

```text
https://youtube.com/...
```

Platform:

```text
YouTube
```

---

# Categories Module

Default Categories:

- Noun
- Verb
- Adjective
- Adverb
- Pronoun
- Preposition
- Conjunction
- Interjection
- Expression
- Phrasal Verb

---

# Words Module

Users can save vocabulary.

### Fields

- Word
- Meaning
- Category
- Notes

### Example

Word:

```text
hug
```

Meaning:

```text
يعانق
```

Category:

```text
Verb
```

Notes:

```text
Common in daily conversations
```

---

# Video ↔ Word Relationship

A word can appear in multiple videos.

A video can contain multiple words.

Example:

Word:

```text
hug
```

Found in:

- Friends Episode 1
- Daily English Conversation
- Learning English Fast

---

# Database Structure

## users

| Field | Type |
|---------|---------|
| id | bigint |
| name | varchar |
| email | varchar |
| password | varchar |
| created_at | timestamp |
| updated_at | timestamp |

---

## videos

| Field | Type |
|---------|---------|
| id | bigint |
| user_id | bigint |
| title | varchar |
| url | text |
| platform | varchar |
| created_at | timestamp |
| updated_at | timestamp |

---

## categories

| Field | Type |
|---------|---------|
| id | bigint |
| name | varchar |

---

## words

| Field | Type |
|---------|---------|
| id | bigint |
| user_id | bigint |
| category_id | bigint |
| word | varchar |
| meaning | text |
| notes | text |
| created_at | timestamp |
| updated_at | timestamp |

---

## video_words

| Field | Type |
|---------|---------|
| video_id | bigint |
| word_id | bigint |

---

# API Endpoints

## Auth

POST /api/register

POST /api/login

POST /api/logout

GET /api/user

---

## Videos

GET /api/videos

POST /api/videos

PUT /api/videos/{id}

DELETE /api/videos/{id}

---

## Categories

GET /api/categories

---

## Words

GET /api/words

POST /api/words

PUT /api/words/{id}

DELETE /api/words/{id}

---

# Future Features

## V2

- Search Words
- Filter by Category
- Recently Added Words
- Favorite Words

## V3

- Flash Cards
- Word Review System
- Daily Challenges
- Vocabulary Statistics

## V4

- Shadowing Mode
- Voice Recording
- Pronunciation Scoring
- AI Examples
- AI Translation

---

# UI Style

Theme:

- Clean
- Minimal
- Fast

Colors:

- White Background
- Gray Surfaces
- Blue Primary

Framework:

- Tailwind CSS

Responsive:

- Mobile First
- Tablet
- Desktop

---

# Development Order

1. Laravel Setup
2. Sanctum Authentication
3. Database Design
4. Videos CRUD
5. Categories CRUD
6. Words CRUD
7. Video-Word Relationships
8. Dashboard
9. Search
10. Deployment