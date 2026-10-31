export const SITE = {
  name: 'Mikolaj Salata',
  title: 'Mikolaj Salata',
  description: 'Healthcare integration engineer: projects, writing and CV of Mikolaj Salata.',
  linkedin: 'https://www.linkedin.com/in/msalata/',
  github: 'https://github.com/MxSalata',
  email: 'hello@mxsalata.com',
  // The "Book a meeting" link (Cal.com). Empty until the booking page exists; the contact page then shows email only.
  booking: '',
};

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
