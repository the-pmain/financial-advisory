import { clientTestimonials, trustMetrics, videoTestimonial } from '../../data/clientTestimonials';
import { SectionTitle } from '../ui/primitives';

function FamiliesIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8" focusable="false">
      <circle cx="11" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="21" cy="11" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 26c.6-5 3.4-8 7-8s6.4 3 7 8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 26c.4-3.8 2.4-6.2 5-6.2 2.4 0 4.4 2 5 6.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function AssetsIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8" focusable="false">
      <path d="M5 27V7M5 27h22" stroke="currentColor" strokeWidth="1.6" />
      <rect x="9" y="17" width="4" height="7" fill="currentColor" />
      <rect x="15" y="13" width="4" height="11" fill="currentColor" />
      <rect x="21" y="9" width="4" height="15" fill="currentColor" />
    </svg>
  );
}

function RetentionIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8" focusable="false">
      <rect x="5" y="8" width="22" height="19" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 13h22M11 5v5M21 5v5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const metricIcons = {
  families: FamiliesIcon,
  assets: AssetsIcon,
  retention: RetentionIcon,
};

export function ClientTestimonials() {
  return (
    <section aria-labelledby="client-testimonials-heading">
      <SectionTitle id="client-testimonials-heading">Client testimonials</SectionTitle>
      <p className="text-vz-gray m-0 mb-8 max-w-[802px] text-[15px] leading-[1.45]">
        Illustrative, anonymised comments. They are not a guarantee of similar results.
      </p>

      <ul className="m-0 grid list-none grid-cols-3 gap-x-8 gap-y-10 p-0 max-tab:grid-cols-1">
        {clientTestimonials.map((item) => (
          <li key={item.id} className="border-vz-rule border-t pt-5">
            {/* TODO: Replace with actual client photo */}
            <img
              src={item.photo}
              alt={item.photoAlt}
              width={200}
              height={200}
              className="size-[88px] rounded-full object-cover max-mob:size-[72px]"
              decoding="async"
            />
            <p className="text-vz-ink m-0 mt-4 text-[16px] leading-[1.3] font-bold">
              {item.name}, {item.location}
            </p>
            <p className="text-vz-gray-mid m-0 mt-1 text-[13px] leading-[1.3]">
              Client for {item.years} years
            </p>
            {/* TODO: Replace testimonial text */}
            <blockquote className="m-0">
              <p className="text-vz-ink mt-3 mb-0 text-[16px] leading-[1.45]">{item.quote}</p>
              <p className="text-vz-blue mt-3 mb-0 text-[15px] leading-[1.45] font-bold">{item.result}</p>
            </blockquote>
          </li>
        ))}
      </ul>

      <div className="mt-12 max-lap:mt-10">
        <h3 className="text-vz-gray-mid border-vz-gray-light m-0 mb-[30px] border-b pb-[7px] text-[22px] leading-[28px] font-bold max-mob:mb-5 max-mob:text-[20px]">
          Video
        </h3>
        <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center gap-x-10 gap-y-5 max-tab:grid-cols-1">
          {/* TODO: Replace video thumbnail */}
          <div className="relative overflow-hidden bg-vz-blue">
            <img
              src={videoTestimonial.thumbnail}
              alt={videoTestimonial.thumbnailAlt}
              width={600}
              height={400}
              className="block aspect-[3/2] w-full object-cover"
              decoding="async"
            />
            <button
              type="button"
              className="bg-vz-orange-btn hover:bg-vz-orange absolute inset-0 m-auto h-11 w-[168px] cursor-pointer rounded-[21px] border-0 text-[14px] font-bold text-white shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
              aria-label="Watch video testimonial (placeholder)"
            >
              Watch video
            </button>
          </div>
          <div>
            <p className="text-vz-ink m-0 text-[22px] leading-[1.3] font-bold max-mob:text-[20px]">
              {videoTestimonial.title}
            </p>
            <p className="text-vz-ink mt-3 mb-0 text-[16px] leading-[1.45]">
              {videoTestimonial.description}
            </p>
          </div>
        </div>
      </div>

      {/* TODO: Replace trust metrics with verified figures */}
      <div className="mt-12 max-lap:mt-10">
        <h3 className="visually-hidden">Trust metrics</h3>
        <ul
          aria-label="Illustrative client metrics"
          className="m-0 grid list-none grid-cols-3 gap-6 p-0 max-tab:grid-cols-1"
        >
          {trustMetrics.map((metric) => {
            const Icon = metricIcons[metric.icon];
            return (
              <li
                key={metric.id}
                className="border-vz-rule flex items-start gap-4 border bg-white px-4 py-5"
              >
                <span className="text-vz-blue shrink-0">
                  <Icon />
                </span>
                <div>
                  <p className="text-vz-ink m-0 text-[26px] leading-[1.15] font-bold max-mob:text-[22px]">
                    {metric.value}
                  </p>
                  <p className="text-vz-gray m-0 mt-1 text-[15px] leading-[1.35]">{metric.label}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
