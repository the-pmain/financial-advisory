export function SkipNav() {
  return (
    <nav id="skip-navigation" aria-label="Skip links">
      <ul>
        <li>
          <a href="#app-nav" className="visually-hidden skip-link">
            Skip to navigation
          </a>
        </li>
        <li>
          <a href="#main" className="visually-hidden skip-link">
            Skip to main content
          </a>
        </li>
      </ul>
    </nav>
  );
}
