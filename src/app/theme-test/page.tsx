'use client';

import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export default function ThemeTestPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold" style={{ color: 'var(--color-foreground)' }}>
        Theme Test Page
      </h1>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Current Theme: {theme}</h2>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--color-muted-foreground)' }}>
              This text should change color based on the theme.
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => setTheme('light')}>
            Light Theme
          </Button>
          <Button onClick={() => setTheme('dark')}>
            Dark Theme
          </Button>
          <Button onClick={() => setTheme('system')}>
            System Theme
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['background', 'foreground', 'primary', 'muted', 'border', 'card'].map((color) => (
            <Card key={color} hoverEffect={false}>
              <CardContent className="text-center p-6">
                <div 
                  className="w-full h-8 rounded-lg mb-2"
                  style={{
                    backgroundColor: `var(--color-${color})`,
                    border: '1px solid var(--color-border)'
                  }}
                ></div>
                <p className="font-medium">{color}</p>
                <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                  var(--color-{color})
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
