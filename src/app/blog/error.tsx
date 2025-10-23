'use client';

import { useEffect } from 'react';
import { Button } from '../components/ui/Button';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog error:', error);
  }, [error]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
          Something went wrong!
        </h2>
        <p className="text-[var(--color-muted-foreground)] mb-6">
          We couldn't load the blog posts. Please try again.
        </p>
        <Button
          onClick={reset}
          variant="default"
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
