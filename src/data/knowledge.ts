// The knowledge base: what Mikolaj knows from work, as on his CV and LinkedIn (10 Oct 2026). Deep is his CV's
// "extensive knowledge and experience", Working its "some knowledge or experience". Makers he hasn't confirmed stay out.
export type Level = 'Deep' | 'Working' | 'Overview';
export interface Item {
  name: string;
  level?: Level;
  note?: string;
}
export interface Group {
  title: string;
  intro: string;
  items: Item[];
}

export const KNOWLEDGE: Group[] = [
  {
    title: 'Integration platforms',
    intro: 'Where the interfaces run.',
    items: [
      { name: 'InterSystems IRIS and IRIS for Health', level: 'Deep', note: 'DocAssure, Aperture, Shutter' },
      { name: 'InterSystems HealthShare', level: 'Deep' },
      { name: 'InterSystems Ensemble', level: 'Deep' },
      { name: 'ObjectScript and InterSystems Workflow', level: 'Deep' },
      { name: 'Interweave Connect', level: 'Deep' },
      { name: 'Mirth Connect', level: 'Working' },
      { name: 'Rhapsody', level: 'Working' },
    ],
  },
  {
    title: 'Standards',
    intro: 'What the messages are written in.',
    items: [
      { name: 'HL7 v2', level: 'Deep', note: 'referrals, appointments, admissions, transfers, discharges' },
      { name: 'HL7 FHIR', level: 'Deep', note: 'shared care record data provision' },
      { name: 'DICOM', level: 'Working', note: 'imaging AI deployments' },
      { name: 'IHE profiles', level: 'Overview' },
      { name: 'NHS ITK', level: 'Working' },
    ],
  },
  {
    title: 'NHS national services',
    intro: 'The national plumbing every trust shares.',
    items: [
      { name: 'NHS Spine', level: 'Deep', note: 'demographics lookups' },
      { name: 'NHS MESH', level: 'Deep', note: 'the MESH client and the national MESH API' },
    ],
  },
  {
    title: 'Systems I have integrated with',
    intro: 'On the other end of the interfaces.',
    items: [
      { name: 'Lorenzo (Dedalus)', note: 'patient administration' },
      { name: 'MOLIS', note: 'laboratory' },
      { name: 'WASP', note: 'online booking for blood tests' },
      { name: 'DrDoctor', note: 'patient engagement' },
      { name: 'Liquidlogic', note: 'social care' },
      { name: 'PACS, RIS and EMR systems', note: 'medical imaging AI deployments' },
    ],
  },
  {
    title: 'Shared care records',
    intro: 'Regional records that bring care settings together.',
    items: [
      { name: 'Interweave (Yorkshire & Humber Care Record)', note: 'data provision over FHIR' },
      { name: 'Leicester, Leicestershire and Rutland Care Record', note: 'social care data' },
    ],
  },
  {
    title: 'Infrastructure and tools',
    intro: 'What the work is built and shipped with.',
    items: [
      { name: 'Docker', level: 'Deep' },
      { name: 'Git; Jira, Confluence and Bitbucket', level: 'Deep' },
      { name: 'Transact-SQL', level: 'Deep' },
      { name: 'JSON, HTTP, TCP and TLS', level: 'Deep' },
      { name: 'Windows Server and Linux', level: 'Working' },
      { name: 'Node.js, TypeScript, Python and HTML', level: 'Working' },
    ],
  },
];
