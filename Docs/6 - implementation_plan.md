# Refactoring Plan: Remove Notes & Add Video Tag Selector

## Goal
The goal of this refactoring is to completely eliminate the `notes` field from the vocabulary domain and to vastly improve the UI for linking videos by replacing the native `<select multiple>` element with a custom searchable checkbox/tag selector.

## Proposed Changes

### 1. Backend Changes (Laravel)
#### [NEW] Migration: Drop `notes` Column
- Create a new migration file via `php artisan make:migration drop_notes_from_words_table --table=words`.
- In the `up` method, call `$table->dropColumn('notes');`.
- In the `down` method, add `$table->text('notes')->nullable();` to allow rollback.
- Execute the migration with `php artisan migrate`.

#### [MODIFY] [WordRequest.php](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/backend/app/Http/Requests/WordRequest.php)
- Remove the `'notes' => ['nullable', 'string']` rule from validation.

#### [MODIFY] [WordResource.php](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/backend/app/Http/Resources/WordResource.php)
- Ensure the resource does not output a `notes` field.

### 2. Frontend Changes (Next.js)
#### [MODIFY] [types/index.ts](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/types/index.ts)
- Remove `notes?: string;` from the `Word` interface.

#### [MODIFY] [dashboard/words/page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/%28dashboard%29/words/page.tsx)
- Remove `notes` from `formData` and `openEditModal` initialization.
- Remove the `Notes (Optional)` textarea block from the form modal.
- Remove any visual rendering of `notes` from the Word cards in the grid.
- Build a **Searchable Checkbox/Tag Selector** for Videos:
  - Add a new state for a video search query (`videoSearchQuery`).
  - Replace the native `<select multiple>` with a custom UI component inside the form.
  - The component will feature a search input field to filter available videos.
  - Below the search input, display a scrollable list of videos with custom styled checkboxes/tags.
  - Add logic to toggle `video_ids` in `formData` when a video tag/checkbox is clicked.

## Verification Plan
### Automated Tests
- Run backend tests (if any) or simply rely on UI interaction.

### Manual Verification
- Re-run `php artisan migrate` to ensure the database updates.
- Verify that creating a word without `notes` functions perfectly and no server errors occur.
- Verify the new Video Selector allows searching by video title and accurately toggles the selection state of the underlying `video_ids` array before submission.
