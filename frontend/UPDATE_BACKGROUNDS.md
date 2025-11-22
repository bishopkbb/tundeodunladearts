# Background Pattern Update Instructions

All pages need to have their inline background patterns replaced with:
```tsx
import HeroBackgroundPattern from '@/components/common/HeroBackgroundPattern';

// Then in the return statement:
<HeroBackgroundPattern />
```

Pages that still need updating:
- gallery/page.tsx
- exhibitions/page.tsx
- shop/page.tsx
- press/page.tsx
- contact/page.tsx
- checkout/page.tsx (if it has a background pattern)

Replace the entire `<div className="fixed inset-0 z-0">...</div>` block with just `<HeroBackgroundPattern />`

