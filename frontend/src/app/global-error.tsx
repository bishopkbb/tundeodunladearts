'use client';

// Last-resort boundary: replaces the root layout, so it must render its own <html>/<body>
// and cannot rely on providers or Tailwind-loaded fonts.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1rem',
          background: 'linear-gradient(to bottom, #8B4513, #4A2810)',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div role="alert" style={{ maxWidth: 420 }}>
          <h1 style={{ color: '#D4AF37', fontFamily: 'Georgia, serif' }}>Something went wrong</h1>
          <p style={{ opacity: 0.85, marginBottom: 24 }}>The site hit an unexpected error. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            style={{ padding: '12px 24px', background: '#C17C2E', color: '#fff', border: 0, borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
