# Global Brand Styling Pass

This plan outlines the steps to centralize our color system around a `--brand` variable, replace hardcoded UI colors, support modern scrollbars globally, and polish modals for absolute consistency across light and dark modes.

## Proposed Changes

### 1. Global CSS & Tailwind Configuration
We will introduce core CSS variables in `globals.css` to govern the brand color. Since this project uses Tailwind CSS v4, we will hook these variables into the `@theme` directive so we can use classes like `bg-brand`, `text-brand-hover`, etc.

#### [MODIFY] `globals.css`
* Add `--brand`, `--brand-hover`, `--brand-dark`, `--brand-dark-hover` to `:root` and `.dark`.
* Map these via `@theme { --color-brand: var(--brand); ... }`.
* **Scrollbars**: Add Firefox scrollbar support using `scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);` on `html` and `body` to ensure coverage across all browsers. Update Webkit scrollbars to use the new brand variables.

### 2. Replacing Hardcoded Colors
We will audit and update all components using hardcoded `blue-500`, `blue-600`, etc., and replace them with `brand`.

#### Components & Pages Affected:
* **`components/ui/Button.tsx`**: Update primary button backgrounds and hover states.
* **`components/ui/Input.tsx`**: Update focus rings to `focus:ring-brand` and `focus:border-brand`.
* **`components/Sidebar.tsx`**: Update active navigation item backgrounds and text colors.
* **`components/LoadingScreen.tsx`**: Update the animated logo and loader dots.
* **`components/VideoModal.tsx`**: Update close button and fallback link colors.
* **`app/login/page.tsx` & `app/register/page.tsx`**: Update text links to `text-brand`.
* **`app/(dashboard)/page.tsx`**: Update icons, stats cards, and interactive elements.
* **`app/(dashboard)/words/page.tsx`**: Update badges, buttons, and focus rings.
* **`app/(dashboard)/videos/page.tsx`**: Update action buttons and links.
* **`app/(dashboard)/learn/page.tsx`**: Update interactive flashcard controls, progress texts, and badges.

### 3. Modal Polish & Dark Theme Consistency
Modals will be standardized to share the exact same aesthetic properties. We will also audit the UI for any light-theme artifacts escaping into dark mode (like white scrollbars on inner scrolling areas).

#### Updates:
* **Border Radius**: Standardize all modals to `rounded-2xl`.
* **Shadows**: Use `shadow-xl` in light mode and `dark:shadow-2xl dark:shadow-black/50` in dark mode for depth.
* **Inner Scrollbars**: Modals with long content (like Add/Edit Word or Word Details) will use `scrollbar-thin` or inherit the global custom scrollbar rules so they don't render a default white browser scrollbar in dark mode.
* **Backdrop**: Ensure the modal backdrop is consistently `bg-slate-900/50 backdrop-blur-sm` for all modals (Words Page modals, Video Modal, etc.).

## Verification Plan

### Manual Verification
* Navigate to the Dashboard, Words, Videos, and Learn pages in both Light and Dark modes.
* Verify that all primary interactive elements are using the new brand color.
* Open the "Add Word" modal, "Word Details" modal, and the "Video Modal". Verify that shadows, border-radius, and backdrops match exactly.
* Cause the "Add Word" modal to scroll (by opening the Video selector). Verify that the scrollbar inside the modal is properly styled and dark in dark mode on Chrome/Edge and Firefox.

## Open Questions

> [!NOTE]
> For the initial implementation, I will set the base `--brand` color to `#2563eb` (the current Blue 600) so the transition is seamless. You can easily modify the HEX code in `globals.css` at any time to instantly change the entire site's theme. Are you ready to proceed with this implementation?
