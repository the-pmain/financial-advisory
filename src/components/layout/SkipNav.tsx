const targets = [
  { href: '#vz-search-input', label: 'Skip to search' },
  { href: '#navigation-container', label: 'Skip to main navigation' },
  { href: '#main', label: 'Skip to main content' },
  { href: '#footer', label: 'Skip to footer navigation' },
];

export function SkipNav() {
  return (
    <nav id="skip-navigation" aria-label="Skip links">
      <ul>
        {targets.map((target) => (
          <li key={target.href}>
            <a href={target.href} className="visually-hidden skip-link">
              {target.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
