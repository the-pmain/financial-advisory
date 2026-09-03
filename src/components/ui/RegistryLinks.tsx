import { registries } from '../../data/registries';

/**
 * Extra public-register marks shown under the Bloomberg LEI link in the mega
 * menu and footer. The heading matters: without it third-party marks read as
 * partnerships rather than records a visitor can check us against.
 */
export function RegistryLinks({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-vz-gray-mid m-0 text-[13px] leading-[1.3]">Verify our details</p>
      <ul className="m-0 mt-[10px] flex list-none flex-col items-start gap-[2px] p-0">
        {registries.map((registry) => (
          <li key={registry.id}>
            <a
              href={registry.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex min-h-[44px] min-w-[44px] items-center opacity-100 transition-opacity duration-250 hover:opacity-75"
            >
              <img
                src={registry.logo}
                alt={registry.label}
                width={registry.width}
                height={registry.height}
                style={{ width: registry.width }}
                className="block h-auto"
                loading="lazy"
                decoding="async"
              />
              <span className="visually-hidden"> (external link, opens in a new window)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
