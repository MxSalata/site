export const SITE = {
  name: 'Mikolaj Salata',
  title: 'Mikolaj Salata',
  description: 'Healthcare integration engineer: projects, writing and CV of Mikolaj Salata.',
  linkedin: 'https://www.linkedin.com/in/msalata/',
  github: 'https://github.com/MxSalata',
  email: 'hello@mxsalata.com',
  // The "Book a meeting" link (Cal.com), as user/event. Empty hides every booking link. /booking.js opens it over the page.
  calLink: 'mxsalata/online-meeting',
  // The members' game portal (Cloudflare Access). Empty until it exists; links go to the public Games page until then.
  games: '',
};

export const gamesHref = () => SITE.games || '/minecraft/';

/** Whether an award is a contest placing ("Second place", "2nd of 37 entries"): shown in the success colour. */
export const isPlaced = (award?: string) => /\bplace\b|\b\d+(st|nd|rd|th)\b/i.test(award ?? '');

/** One order for projects everywhere: placed contest entries first, then the newest. */
export function projectOrder<T extends { data: { date: Date; award?: string } }>(a: T, b: T): number {
  const placed = (p: T) => Number(isPlaced(p.data.award));
  return placed(b) - placed(a) || b.data.date.valueOf() - a.data.date.valueOf();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export const bookingHref = () => SITE.calLink && `https://cal.com/${SITE.calLink}`;
