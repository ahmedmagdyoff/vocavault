# Backend API Completion & SPA Auth Refactor

Complete the missing backend endpoints and switch authentication from token-based to Sanctum SPA cookie-based auth (HttpOnly cookies) as requested.

## Proposed Changes

### 1. SPA Auth Configuration

#### [MODIFY] `bootstrap/app.php`
- Add `\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class` to the `api` middleware group to enable Sanctum's cookie-based session auth for the API.

#### [MODIFY] `.env`
- Configure `SESSION_DRIVER=cookie` (or file/database if preferred, but usually file/database/cookie are fine, cookie is default stateful in SPA sometimes, but Laravel defaults to `database` or `file`).
- Ensure `SANCTUM_STATEFUL_DOMAINS=localhost:3000` is set.
- Ensure `SESSION_DOMAIN=localhost` is set.

### 2. Auth Controller Refactor

#### [MODIFY] `app/Http/Controllers/Api/AuthController.php`
- `register()`: Create user, log them in using `Auth::login($user)`, return success (no token).
- `login()`: Use `Auth::attempt()` with credentials. If successful, regenerate session `$request->session()->regenerate()`, return success (no token).
- `logout()`: `Auth::guard('web')->logout()`, invalidate session, regenerate token.

### 3. API Resources (New)

Create resources to consistently format JSON responses:
#### [NEW] `app/Http/Resources/VideoResource.php`
#### [NEW] `app/Http/Resources/CategoryResource.php`
#### [NEW] `app/Http/Resources/WordResource.php`

### 4. Form Requests (New)

#### [NEW] `app/Http/Requests/VideoRequest.php`
- Validation for title, url, platform.
#### [NEW] `app/Http/Requests/WordRequest.php`
- Validation for word, meaning, notes, category_id, and video_ids (array).

### 5. API Controllers (New)

#### [NEW] `app/Http/Controllers/Api/VideoController.php`
- `index`, `store`, `update`, `destroy` mapped to the authenticated user.
#### [NEW] `app/Http/Controllers/Api/CategoryController.php`
- `index` to list all categories.
#### [NEW] `app/Http/Controllers/Api/WordController.php`
- `index`, `store` (with video sync), `update`, `destroy`.

### 6. API Routes

#### [MODIFY] `routes/api.php`
- Keep `auth:sanctum` middleware for protected routes.
- Add `apiResource` routes for videos, categories, and words.

---

## Verification Plan

### Automated Tests
```bash
php artisan route:list --path=api
```

### Manual Verification
- Verify `AuthController` no longer returns tokens.
- Verify `routes/api.php` contains all required endpoints.
