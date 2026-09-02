import { testimonial } from '../../data/content';
import { UnderlineLink } from '../ui/primitives';

/**
 * Opening hero: a 256px circular portrait beside a 32/45 pull-quote, the pair
 * centred as a 930px block inside the 1220px mast and vertically aligned on
 * the portrait's midpoint.
 */
export function Testimonial() {
  return (
    <section className="mx-auto flex max-w-[930px] items-center max-mob:block max-mob:text-center">
      <div className="size-[256px] shrink-0 overflow-hidden rounded-full max-mob:mx-auto max-mob:size-[140px]">
        <img
          src={testimonial.image}
          alt={testimonial.imageAlt}
          width={256}
          height={256}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 pl-6 max-mob:mt-[14px] max-mob:pl-0">
        {/* Georgia, so the Inter width correction must not apply — the
            reference's declared -0.01em is used verbatim. */}
        <blockquote className="m-0 text-[32px] leading-[45px] tracking-[-0.01em] max-mob:text-[21px] max-mob:leading-[27.3px]">
          <p className="m-0">{testimonial.quote}</p>
        </blockquote>

        <p className="mt-[10px] mb-0 flex flex-wrap items-baseline gap-x-3 text-[15px] leading-[22px] max-mob:justify-center max-mob:text-[13px] max-mob:leading-[18px]">
          <span className="text-vz-ink font-bold">{testimonial.name}</span>
          <span className="text-vz-ink">
            <span className="visually-hidden">{testimonial.positionLabel} </span>
            {testimonial.position}
          </span>
        </p>

        <p className="mt-[24px] mb-0 max-mob:mt-[14px]">
          <UnderlineLink to={testimonial.ctaTo}>{testimonial.ctaLabel}</UnderlineLink>
        </p>
      </div>
    </section>
  );
}
