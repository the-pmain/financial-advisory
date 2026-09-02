import { Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { isKnowledgeHubPath, ROUTES } from '../../constants/routes';
import { topicByPath } from '../../data/topics';

function stickyTarget(pathname: string): { to: string; label: string } | null {
  if (isKnowledgeHubPath(pathname)) {
    return { to: ROUTES.appointments, label: 'Make an appointment' };
  }
  const topic = topicByPath.get(pathname);
  if (!topic) return null;
  if (topic.ctaLabel === 'Subscribe now') return { to: ROUTES.newsletter, label: 'Subscribe now' };
  if (topic.ctaLabel === 'Sign up for free')
    return { to: ROUTES.financialPortal, label: 'Sign up for free' };
  if (topic.ctaLabel === 'Order for free') return { to: pathname, label: 'Order for free' };
  return { to: ROUTES.appointments, label: topic.ctaLabel ?? 'Make an appointment' };
}

/** Compact CTA after scrolling past the header — mobile only. */
export function StickyCta() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const target = stickyTarget(pathname);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (!target) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform duration-250 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link
        to={target.to}
        className="bg-vz-orange hover:bg-vz-orange/90 flex h-11 w-full items-center justify-center rounded-[3px] text-[15px] font-bold text-white transition-colors duration-250"
      >
        {target.label}
      </Link>
    </div>
  );
}
