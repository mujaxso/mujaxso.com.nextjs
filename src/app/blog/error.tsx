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
    // Log to error reporting service
    console.error('Blog error:', error);
  }, [error]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground mb-6">
          {error.digest 
            ? `Error reference: ${error.digest}`
            : 'We couldn\'t load the blog posts. Please try again.'
          }
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="bg-primary hover:bg-primary-hover"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
