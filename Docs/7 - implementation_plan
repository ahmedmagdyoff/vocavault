# Implementation Plan: Advanced Word Forms

## Goal
Implement a future-proof, robust system to store and display various grammatical forms for words depending on their assigned category (e.g., Verbs, Nouns, Adjectives).

## Proposed Changes

### 1. Database & Models
#### [NEW] `create_word_forms_table` Migration
- Create the `word_forms` table with columns: `id`, `word_id` (foreign key), `form_type` (string), `value` (string), and `timestamps`.
- Add an index or unique constraint on `(word_id, form_type)`.

#### [NEW] `WordForm.php` Model
- Create the model and assign `Fillable` fields: `word_id`, `form_type`, `value`.
- Implement a `word()` `belongsTo` relationship.

#### [MODIFY] `Word.php` Model
- Remove `notes` from `Fillable` (since it was dropped in the previous step but remains in the PHP8 attribute `#[Fillable(['word', 'meaning', 'notes', 'category_id'])]`).
- Add a `forms()` `hasMany` relationship pointing to `WordForm::class`.

### 2. API Layer
#### [MODIFY] `WordRequest.php`
- Add validation for `forms` (optional array).
- Add validation for `forms.*.form_type` (string) and `forms.*.value` (string).

#### [MODIFY] `WordResource.php` & `WordFormResource.php` (New)
- Create `WordFormResource`.
- Update `WordResource` to include `'forms' => WordFormResource::collection($this->whenLoaded('forms'))`.

#### [MODIFY] `WordController.php`
- In `index()`, `store()`, and `update()`, ensure the `forms` relationship is eager loaded via `with(['category', 'videos', 'forms'])`.
- In `store()` and `update()`, extract the `forms` array from the request payload. After saving the word, sync/upsert the forms into the `word_forms` table using a transaction or `$word->forms()->delete()` followed by `$word->forms()->createMany($forms)`.

### 3. Frontend 
#### [MODIFY] `types/index.ts`
- Define `WordForm` interface `{ id: number; form_type: string; value: string; }`.
- Update `Word` interface to include `forms?: WordForm[];`.

#### [MODIFY] `app/(dashboard)/words/page.tsx`
- **Dynamic Form Fields**: 
  - Update `formData` state to track `forms` as an array or dictionary.
  - When the user selects a Category, analyze its name.
  - If "Verb": Render inputs for `base_form`, `past_simple`, `past_participle`, `present_participle`, `third_person_singular`.
  - If "Noun": Render inputs for `singular`, `plural`.
  - If "Adjective": Render inputs for `positive`, `comparative`, `superlative`.
- **Word Cards**:
  - Update the grid card to render the forms dynamically (e.g., `Past: saw`, `Participle: seen`).
- **Word Details Modal**:
  - Implement a new modal (`isDetailsModalOpen`) that triggers when clicking the card (but avoid triggering when clicking Edit/Delete).
  - The Details Modal will display the Word, Meaning, Category, a clean list of all Forms, and Related Videos.

## Verification Plan
### Automated Tests
- N/A

### Manual Verification
- Create a Verb, provide all 5 forms, save it, and verify it displays correctly on the card.
- Edit the Verb, modify a form, save, verify it updates.
- Switch the category to "Noun" and verify the form fields switch and clear out the old verb data appropriately.
- Click the card to verify the Details Modal shows all associated forms and videos cleanly.
