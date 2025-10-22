'use client'

import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';

const components = {
  // You can add custom components here
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4" {...props} />,
  // Add more component overrides as needed
};

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote source={source} components={components} />;
}
