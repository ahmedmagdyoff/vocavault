# Full Project Audit: VocaVault

## Issues Found

### 1. 🔴 Root Page Always Redirects to `/login`
**File:** [page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/page.tsx)

The root `page.tsx` does a hard server-side `redirect("/login")` regardless of auth state. After login, `router.push('/')` lands on this page and gets immediately kicked to `/login` again — creating a loop.

**Fix:** Redirect to the dashboard route instead. Since the `(dashboard)` group layout handles the protected route guard, we should redirect to `/words` or simply remove this redirect page and let the dashboard layout's `page.tsx` be the root.

---

### 2. 🔴 Login/Register Pages Push to `/` After Success
**Files:** [login/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/login/page.tsx), [register/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/register/page.tsx)

Both do `router.push('/')` after success, but `/` redirects right back to `/login`. This creates a redirect loop after successful authentication.

**Fix:** Change `router.push('/')` to `router.push('/words')` (or any dashboard sub-page) since those are inside the `(dashboard)` route group.

---

### 3. 🟡 Button Component Missing `size` and `outline` Variant
**File:** [Button.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/components/ui/Button.tsx)

The Learn page uses `size="lg"` and `variant="outline"` on `<Button>`, but the Button component:
- Has no `size` prop in its interface
- Has no `outline` variant defined

The `size` prop silently passes through via `...props` (so it gets set as an HTML attribute, not used for styling). The `outline` variant will fall back to `undefined`, breaking the className.

**Fix:** Add `size` prop support and `outline` variant to the Button component.

---

### 4. 🟡 Video Search Bar on Videos Page Not Functional
**File:** [videos/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/(dashboard)/videos/page.tsx)

The search input on the videos page is completely decorative — no state, no filtering logic. Typing into it does nothing.

**Fix:** Wire up the search input to filter the displayed videos list.

---

### 5. 🟡 Login/Register Pages Accessible While Logged In
**Files:** [login/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/login/page.tsx), [register/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/register/page.tsx)

A logged-in user can navigate to `/login` or `/register` and see the forms. They should be redirected to the dashboard automatically.

**Fix:** Add a redirect-if-authenticated guard at the top of login/register pages.

---

### 6. 🟡 `AuthResponse` Type Includes Unused `token` Field
**File:** [types/index.ts](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/types/index.ts)

The `AuthResponse` interface has a `token: string` field, but the backend never returns a token (it uses Sanctum cookie-based SPA auth). This is misleading.

**Fix:** Remove the `token` field from `AuthResponse`.

---

### 7. 🟢 Dashboard Layout Route Mismatch
The sidebar links to `/` for Dashboard, but the actual dashboard is at `(dashboard)/page.tsx`. Since Next.js route groups (`(dashboard)`) don't affect the URL, `/` maps to `app/page.tsx` (the redirect) NOT `app/(dashboard)/page.tsx`.

This means the dashboard page at `app/(dashboard)/page.tsx` is actually **unreachable** — `/` serves `app/page.tsx` which redirects to `/login`.

**Fix:** The root `app/page.tsx` is the problem. We need to remove the redirect and let the `(dashboard)` layout page serve as the root dashboard. However since there's a conflict (both `app/page.tsx` and `app/(dashboard)/page.tsx` try to serve `/`), we need to **delete** `app/page.tsx` and let `(dashboard)/page.tsx` handle the root path.

---

## Proposed Changes

### Frontend

#### [DELETE] `app/page.tsx`
Remove the redirect file — it conflicts with and overrides the dashboard page.

#### [MODIFY] [login/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/login/page.tsx)
- Change post-login redirect from `/` to `/words`
- Add redirect-if-authenticated guard

#### [MODIFY] [register/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/register/page.tsx)
- Change post-register redirect from `/` to `/words`
- Add redirect-if-authenticated guard

#### [MODIFY] [Button.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/components/ui/Button.tsx)
- Add `size` prop (`sm`, `default`, `lg`)
- Add `outline` variant

#### [MODIFY] [videos/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/(dashboard)/videos/page.tsx)
- Wire up video search bar with state and filtering

#### [MODIFY] [types/index.ts](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/types/index.ts)
- Remove `token` from `AuthResponse`

---

## Verification Plan

### Manual Verification
- Login → confirm user lands on dashboard (not `/login` loop)
- Refresh page → confirm session persists, dashboard loads
- Visit `/login` while logged in → confirm redirect to dashboard
- Visit `/register` while logged in → confirm redirect to dashboard
- Navigate to Videos page → confirm search bar filters table
- Navigate to Learn page → confirm buttons render with correct size/outline styles
