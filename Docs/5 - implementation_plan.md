# Bug Fixes & Enhancements Plan

The user reported several issues related to Video editing, platform detection, and category initialization.

## Proposed Changes

### 1. Categories Initialization
#### [NEW] [CategorySeeder.php](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/backend/database/seeders/CategorySeeder.php)
- Create a new seeder class.
- Insert the default categories: Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Interjection, Expression, Phrasal Verb.

#### [MODIFY] [DatabaseSeeder.php](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/backend/database/seeders/DatabaseSeeder.php)
- Add `$this->call(CategorySeeder::class);` to ensure the seeder runs automatically.
- After creating, we will run `php artisan db:seed --class=CategorySeeder` to populate the database.

### 2. Automatic Platform Detection & Video Editing
#### [MODIFY] [page.tsx (Videos)](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/%28dashboard%29/videos/page.tsx)
- **Automatic Platform Detection:**
  - Create a utility function `detectPlatform(url: string)` that returns 'youtube', 'tiktok', 'facebook', 'instagram', or 'other'.
  - Update the `onChange` handler for the URL input to automatically set `platform` based on the URL.
  - Remove the manual Platform `<select>` element from the form.
- **Video Editing:**
  - Add an `editingId` state (similar to the Words page).
  - Update `openEditModal(video)` to populate `newVideo` state with the selected video's data.
  - Wire the Edit button in the table to trigger `openEditModal()`.
  - Update `handleAddVideo` (or rename to `handleSubmit`) to check if `editingId` exists and call `videosApi.updateVideo` instead of `createVideo`.
  - Optimistically update the UI with the edited video.

### 3. Categories Management & Verification
- Once seeded, verify the Words page successfully fetches and populates the categories dropdown.
- Test the full lifecycle (create/edit/delete) for videos and words.

## Verification Plan
### Automated Tests
- Run `php artisan db:seed --class=CategorySeeder` to seed the database.

### Manual Verification
- Verify categories appear in the Words modal.
- Verify creating a video parses the platform correctly from YouTube/TikTok URLs.
- Verify editing a video successfully updates the UI.
