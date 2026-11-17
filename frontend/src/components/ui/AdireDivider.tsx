/**
 * Thin indigo adire strip used as a section divider. Indigo is the one accent colour added to the
 * palette, and this strip (plus small details) is its only use, so it stays a small share of any page.
 */
export default function AdireDivider({ className = '' }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`h-7 w-full bg-[#2B3563] ${className}`}
      style={{
        backgroundImage: 'url(/patterns/adire-strip.webp)',
        backgroundSize: '240px 56px',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
      }}
    />
  );
}
