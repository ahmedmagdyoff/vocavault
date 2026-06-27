# Implementation Plan: Learning Dashboard Redesign

## Goal
Transform the `/dashboard` route from a static admin overview into a rich, data-driven Learning Dashboard that tracks and visualizes user vocabulary progress.

## Proposed Changes

### 1. Data Aggregation & Calculation
#### [MODIFY] `frontend/src/app/(dashboard)/page.tsx`
- Continue fetching `words`, `videos`, and `categories` from existing API endpoints.
- Calculate the following metrics on the client-side (efficient since `index` endpoints return full user data):
  - **Category Distribution**: Group words by `category_id` to compute counts per category.
  - **Learning Progress Percentages**:
    - `% Words with Forms` = (words with `forms.length > 0` / total words) * 100
    - `% Words linked to Videos` = (words with `videos.length > 0` / total words) * 100
    - `% Uncategorized words` = (words without `category_id` / total words) * 100
  - **Recent Additions**: Take the first 5 elements of `words` and `videos` arrays (which are already returned via `latest()` from the backend).
  - **Word of the Day**: Use a deterministic randomizer seeded by the current date (e.g., `Math.floor(Date.now() / 86400000) % words.length`) so the "Random" word stays consistent for the entire day.
  - **Learning Streak**: Pull daily review data from `localStorage` (`voca_vault_progress`) that was created in the Learning Mode feature to calculate consecutive days studied, falling back to a placeholder if empty.

### 2. UI/UX Layout Updates
- **Welcome Section**: Implement a hero banner with the User's name and quick overarching stats (Total Words, Videos, Streak).
- **Stat Cards Row**: 4 sleek cards for top-level metrics (Words, Videos, Categories, Words With Forms).
- **Two-Column Grid**:
  - **Left Column**: 
    - **Category Distribution**: A card showing progress bars for each category (Verb, Noun, etc.) based on distribution counts.
    - **Learning Progress**: A card with progress bars for grammatical forms, video linking, and uncategorized status.
  - **Right Column**: 
    - **Word of the Day**: A beautifully styled featured card displaying the daily word, meaning, forms, and video count.
    - **Recent Words List**: A compact list displaying the 5 newest words.
    - **Recent Videos List**: A compact list displaying the 5 newest videos.

## Design Requirements
- Use dark-mode optimized Tailwind classes (`dark:bg-slate-900`, `dark:border-slate-800`).
- Ensure visual hierarchy using `lucide-react` icons and consistent rounding (`rounded-xl` or `rounded-2xl`).

## Open Questions
- The `Category Distribution` will list all 10 default categories. Would you prefer them to be sorted by count (highest to lowest), or alphabetical? (I will default to highest count).
- No new backend API endpoints are strictly necessary as the current endpoints deliver the required eager-loaded relations. Are you comfortable with client-side aggregation for the dashboard?

## Verification Plan
### Manual Verification
- Load `/` and ensure the dashboard compiles successfully.
- Verify Category Distribution bars scale accurately to 100% of the max category.
- Verify "Word of the Day" remains identical upon page refresh.
- Verify "Recent" sections display exactly 5 items.
