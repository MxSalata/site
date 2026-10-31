export const SITE = {
  name: 'Mikolaj Salata',
  title: 'Mikolaj Salata',
  description: 'Healthcare integration engineer: projects, writing and CV of Mikolaj Salata.',
  linkedin: 'https://www.linkedin.com/in/msalata/',
  github: 'https://github.com/MxSalata',
  email: 'hello@mxsalata.com',
  // The "Book a meeting" link (Cal.com). Empty until the booking page exists; the contact page then shows email only.
  booking: '',
  // The members' game portal (Cloudflare Access). Empty until it exists; links go to the public Games page until then.
  games: '',
};

export const gamesHref = () => SITE.games || '/minecraft/';

/** One order for projects everywhere: placed contest entries first, then the newest. */
export function projectOrder<T extends { data: { date: Date; award?: string } }>(a: T, b: T): number {
  const placed = (p: T) => Number(/place/i.test(p.data.award ?? ''));
  return placed(b) - placed(a) || b.data.date.valueOf() - a.data.date.valueOf();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
