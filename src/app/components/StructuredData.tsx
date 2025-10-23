export function PersonStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mujahid Siyam',
    url: 'https://mujaxso.com',
    image: 'https://mujaxso.com/img/profile.png',
    sameAs: [
      'https://github.com/mujaxso',
      'https://twitter.com/mujaxso',
      'https://linkedin.com/in/mujahidsiyam',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    knowsAbout: [
      'Software Engineering',
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Full-Stack Development',
      'DevSecOps',
      'Open Source',
      'Nix/NixOS',
      'Linux System Administration',
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
