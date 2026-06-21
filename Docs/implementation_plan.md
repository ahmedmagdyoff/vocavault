# VocaVault — Next.js Frontend Implementation Plan

Build the complete Next.js 15 frontend for VocaVault with App Router, TypeScript, Tailwind CSS, dark mode, Arabic/English support, and full Sanctum API integration.

## Proposed Changes

### 1. Project Scaffolding

#### [NEW] `frontend/` — Next.js 15 project
- Scaffold with `create-next-app` using App Router, TypeScript, Tailwind CSS
- Install dependencies: `react-hot-toast`, `lucide-react` (icons)

---

### 2. Design System & Global Styles

#### [NEW] `frontend/src/app/globals.css`
- Tailwind base with custom CSS variables for light/dark themes
- Color palette: Blue primary (#2563eb), gray surfaces, white background
- Dark mode: slate backgrounds, blue accents
- Typography: Inter font from Google Fonts
- Smooth transitions on theme toggle

#### [NEW] `frontend/tailwind.config.ts`
- Extend colors with design tokens
- Dark mode via `class` strategy

---

### 3. API Service Layer

#### [NEW] `frontend/src/lib/api.ts`
- Axios-like fetch wrapper with base URL, token injection, JSON headers
- Automatic 401 handling (redirect to login)

#### [NEW] `frontend/src/lib/auth.ts`
- `register()`, `login()`, `logout()`, `getUser()` API calls

#### [NEW] `frontend/src/lib/videos.ts`
- `getVideos()`, `createVideo()`, `updateVideo()`, `deleteVideo()`

#### [NEW] `frontend/src/lib/words.ts`
- `getWords()`, `createWord()`, `updateWord()`, `deleteWord()`

#### [NEW] `frontend/src/lib/categories.ts`
- `getCategories()`

#### [NEW] `frontend/src/types/index.ts`
- TypeScript interfaces: `User`, `Video`, `Category`, `Word`, `ApiResponse`

---

### 4. Auth Context & Protection

#### [NEW] `frontend/src/contexts/AuthContext.tsx`
- React context providing `user`, `login()`, `register()`, `logout()`, `loading`
- Token stored in `localStorage`
- Auto-fetch user on mount if token exists

#### [NEW] `frontend/src/components/ProtectedRoute.tsx`
- Wraps authenticated pages, redirects to `/login` if not authenticated

---

### 5. Layout & Navigation

#### [NEW] `frontend/src/app/layout.tsx`
- Root layout with Inter font, dark mode class on `<html>`, AuthProvider

#### [NEW] `frontend/src/components/Sidebar.tsx`
- Responsive sidebar with navigation links: Dashboard, Videos, Words
- User info at bottom, logout button
- Collapsible on mobile (hamburger menu)
- Active link highlighting

#### [NEW] `frontend/src/components/DarkModeToggle.tsx`
- Sun/Moon icon toggle, persisted in localStorage

#### [NEW] `frontend/src/components/LanguageToggle.tsx`
- AR/EN toggle, switches UI text direction (RTL/LTR)

---

### 6. Pages

#### [NEW] `frontend/src/app/login/page.tsx` — Login Page
- Email + password form
- Link to register
- Toast on error/success
- Redirect to dashboard on success

#### [NEW] `frontend/src/app/register/page.tsx` — Register Page
- Name, email, password, confirm password form
- Link to login
- Toast notifications
- Redirect to dashboard on success

#### [NEW] `frontend/src/app/(dashboard)/layout.tsx` — Dashboard Layout
- Sidebar + main content area
- Protected route wrapper
- Responsive: sidebar collapses on mobile

#### [NEW] `frontend/src/app/(dashboard)/page.tsx` — Dashboard
- 3 stat cards: Total Words, Total Videos, Total Categories
- Fetches counts from API
- Animated counters

#### [NEW] `frontend/src/app/(dashboard)/videos/page.tsx` — Videos Page
- Table/card list of user's videos
- Add Video button → modal
- Edit/Delete actions per video
- Platform badges (YouTube, TikTok, etc.)

#### [NEW] `frontend/src/app/(dashboard)/words/page.tsx` — Words Page
- Table/card list of user's words
- Add Word button → modal with category dropdown and video multi-select
- Edit/Delete actions per word
- Category badges
- Linked videos shown as tags

---

### 7. Shared Components

#### [NEW] `frontend/src/components/ui/Button.tsx`
- Variants: primary, secondary, danger, ghost
- Loading state with spinner

#### [NEW] `frontend/src/components/ui/Input.tsx`
- Styled input with label, error message support

#### [NEW] `frontend/src/components/ui/Modal.tsx`
- Animated overlay modal for create/edit forms

#### [NEW] `frontend/src/components/ui/Badge.tsx`
- Colored badge for platforms and categories

#### [NEW] `frontend/src/components/ui/Card.tsx`
- Stat card with icon, label, value

#### [NEW] `frontend/src/components/ui/EmptyState.tsx`
- Friendly empty state with icon and call-to-action

---

### 8. Internationalization (i18n)

#### [NEW] `frontend/src/lib/i18n.ts`
- Simple translation dictionary for EN/AR
- `useTranslation()` hook
- RTL direction toggle on `<html dir="rtl">`

#### [NEW] `frontend/src/locales/en.ts` & `frontend/src/locales/ar.ts`
- Translation strings for all UI text

---

## Open Questions

> [!IMPORTANT]
> **Backend API completion**: The Videos, Categories, and Words API controllers haven't been created yet on the Laravel side. The frontend will call these endpoints — should I also create the remaining backend controllers as part of this task, or will that be a separate step?

---

## Verification Plan

### Automated Tests
```bash
cd frontend
npm run build
```

### Manual Verification
- Run `npm run dev` and verify all pages render
- Test login/register flow
- Test dark mode toggle
- Test responsive layout on mobile viewport
