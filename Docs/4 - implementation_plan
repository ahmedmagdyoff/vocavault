# Connect Frontend to Backend APIs

The goal is to connect the Next.js frontend to the real Laravel backend APIs for Videos, Words, and Dashboard, and remove all mock data. We will also implement the Create, Edit, and Delete functionalities.

## Proposed Changes

### Dashboard Component

#### [MODIFY] [page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/%28dashboard%29/page.tsx)
- Remove hardcoded mock stats.
- Add `useEffect` to fetch videos, words, and categories using `videosApi.getVideos()`, `wordsApi.getWords()`, and `categoriesApi.getCategories()`.
- Calculate `Total Words`, `Total Videos`, and `Categories` by measuring the length of the respective arrays returned.
- Add a loading state while fetching this data.

### Videos Component

#### [MODIFY] [page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/%28dashboard%29/videos/page.tsx)
- Create a reusable or inline modal form to `Create Video`. The fields will be:
  - `title` (text)
  - `url` (url)
  - `platform` (select: youtube, tiktok, facebook, instagram, other)
- Implement `handleAddVideo` to submit the form using `videosApi.createVideo(data)`.
- Re-fetch or optimally update the local state with the new video.
- Existing `deleteVideo` logic works, I'll ensure the loading states reflect network activity correctly.
- Add a loading state to the `Create Video` button to prevent double submissions.

### Words Component

#### [MODIFY] [page.tsx](file:///c:/Users/AHMED%20MAGDY/Downloads/Projects/VocaVault/frontend/src/app/%28dashboard%29/words/page.tsx)
- Create a modal form to `Create/Edit Word`. The fields will be:
  - `word` (text)
  - `meaning` (textarea)
  - `notes` (textarea, optional)
  - `category_id` (select category)
  - `video_ids` (multi-select videos, optional)
- For the multi-select videos, I will fetch `videosApi.getVideos()` so the user can select which videos the word belongs to.
- Implement `handleAddWord` and `handleEditWord` using `wordsApi.createWord` and `wordsApi.updateWord`.
- Update state optimistically or re-fetch on success.
- Wire the existing Edit and Delete buttons.

## Verification Plan

### Automated Tests
N/A

### Manual Verification
- View the dashboard and confirm the totals reflect the database state.
- Create a video, verify it appears in the videos list.
- Create a word, link it to the newly created video, verify it appears in the words list.
- Edit the word, verify changes are saved.
- Delete the video and word, verify they disappear.
