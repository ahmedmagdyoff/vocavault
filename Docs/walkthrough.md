# Global Brand Styling Walkthrough

I have successfully completed the global styling pass. The entire application now uses a centralized CSS variable system for its primary brand color, and the dark mode / modal UI has been polished.

## What Was Accomplished

### 1. Global Brand Variable System
Instead of hardcoding colors like `blue-600` or `blue-500` throughout the codebase, the project now relies on CSS variables defined in `globals.css`.
* **Variables Added**: `--brand`, `--brand-hover`, `--brand-dark`.
* **Tailwind v4 Integration**: Used the `@theme` directive so that standard Tailwind classes like `bg-brand`, `text-brand`, and `focus:ring-brand` work seamlessly.
* **Why this matters**: If you ever want to change the primary color of VocaVault (e.g., to purple or emerald), you only need to change three hex codes in `globals.css`, and the entire app will instantly adapt.

### 2. Custom Scrollbars (Cross-Browser)
* Implemented `scrollbar-color` in CSS to bring custom dark scrollbars to **Firefox**.
* Rewrote the Webkit (`::-webkit-scrollbar`) CSS to use `--brand` variables.
* Removed the previous bug where white scrollbars would flash in dark mode or fail to detect the `.dark` class correctly.

### 3. Modal Standardization
All modals across the application have been strictly aligned to a single design standard to ensure absolute consistency:
* **Backgrounds**: `bg-white dark:bg-slate-900`
* **Border Radius**: `rounded-2xl`
* **Shadows**: `shadow-xl` (Light mode) and `dark:shadow-2xl dark:shadow-black/50` (Dark mode).
* **Backdrops**: Standardized to `bg-slate-900/80 backdrop-blur-sm`.
* **Internal Scrollbars**: Added `scrollbar-custom` classes to modal content areas so that long modals (like the Add Word modal) do not trigger ugly white browser scrollbars in dark mode.

### 4. UI Audit & Replacements
We replaced all references to the legacy `blue-*` classes across:
- `components/ui/Button.tsx` (Primary buttons)
- `components/ui/Input.tsx` (Focus rings)
- `components/Sidebar.tsx` (Active menu links)
- `components/LoadingScreen.tsx` (Animated logo)
- `app/login/page.tsx` & `app/register/page.tsx` (Links & branding)
- `app/(dashboard)/page.tsx` (Dashboard gradient header, stats cards, recent words/videos)
- `app/(dashboard)/words/page.tsx` (Badges, buttons, modals)
- `app/(dashboard)/videos/page.tsx` (Play buttons, links, modals)
- `app/(dashboard)/learn/page.tsx` (Flashcard stats, buttons, badges)

## Next Steps
- Verify the application in the browser across Light and Dark modes.
- Try interacting with modals and long lists to verify the scrollbar behavior.
- Change `--brand` in `globals.css` if you wish to experiment with a different primary color.
