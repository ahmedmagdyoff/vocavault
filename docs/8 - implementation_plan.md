# Implementation Plan: Learning Mode

## Goal
Transform VocaVault into a vocabulary-learning application by introducing a dedicated `/learn` mode that functions as an interactive flashcard system.

## Proposed Changes

### 1. Navigation
#### [MODIFY] `Sidebar.tsx`
- Add a new "Learn" item to the `navItems` array linking to `/learn`.
- Use the `GraduationCap` or `BrainCircuit` icon from `lucide-react`.

### 2. Learning Mode Core Page
#### [NEW] `app/(dashboard)/learn/page.tsx`
- **Data Fetching:** Fetch all `words`, `categories`, and `videos` using existing APIs (`wordsApi`, `categoriesApi`, `videosApi`).
- **Filters:** 
  - Add dropdowns to filter the learning pool by Category and by specific Video.
  - Implement a `filteredWords` array using `useMemo`.
- **Flashcard State:**
  - `currentIndex` (tracks which word is currently being studied).
  - `isMeaningRevealed` (boolean).
  - `isFormsRevealed` (boolean).
  - Reset reveal states whenever the current word changes.
- **Controls Navigation:**
  - "Previous" and "Next" buttons to cycle through the `filteredWords` array.
  - "Random" button to jump to a random index.
- **Progress Tracking:**
  - Create a custom hook or simple local storage logic to track `wordsReviewedToday` and `totalWordsReviewed`.
  - The counters increment whenever the user hits "Next" or "Random".
  - `wordsReviewedToday` will reset based on a date check in `localStorage`.

### 3. Flashcard UI Design
- **Main Card:** Centered, large font for the Word. Beautiful, minimalist, and responsive (works perfectly on mobile). 
- **Reveal Mechanics:** Clicking "Reveal Meaning" expands the card to show the translation and category badge. Clicking "Reveal Forms" shows the grammatical forms grid.
- **Found In (Videos):** Display the related videos as clickable tags/buttons underneath the meaning, similar to the dashboard but optimized for learning focus.
- **Progress Header:** Display statistics (e.g., "🎯 Studied Today: 15" and "📚 Total Reviewed: 120") at the top right of the view.

## Open Questions
- Is there a specific daily goal you want me to set for "Words studied today", or should it just be a simple counter?
- Should the "Reveal" mechanics be completely separate buttons, or should clicking anywhere on the card reveal everything at once (standard flashcard behavior)?

## Verification Plan
### Automated Tests
- N/A

### Manual Verification
- Navigate to `/learn` and verify the page loads.
- Filter by a specific video and verify the word list narrows down.
- Ensure clicking the "Reveal" buttons smoothly displays hidden information.
- Click "Next", "Previous", and "Random" to verify correct cycling.
- Verify that the Daily and Total progress counters correctly increment and persist in `localStorage` across page reloads.
