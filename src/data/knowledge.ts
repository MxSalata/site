// The knowledge base: what Mikolaj knows from work, from his CV of Nov 2026 and his own answers. Deep is years of daily
// use, Working use on real projects. No Blackford customer hospitals: vendors and countries only.
export type Level = 'Deep' | 'Working' | 'Overview';
export interface Item {
  name: string;
  level?: Level;
  note?: string;
}
export interface Group {
  title: string;
  intro: string;
  /** Shown under the list, e.g. why a group has no levels. */
  note?: string;
  items: Item[];
}

export const KNOWLEDGE: Group[] = [
  {
    title: 'Integration platforms',
    intro: 'Where the interfaces run.',
    items: [
      { name: 'InterSystems IRIS and IRIS for Health', level: 'Deep', note: 'DocAssure, Aperture, Shutter' },
      { name: 'InterSystems HealthShare', level: 'Deep', note: '2017.2, at Luton and Dunstable and Bedfordshire' },
      { name: 'InterSystems Ensemble', level: 'Deep', note: 'before HealthShare, 2012 or 2014' },
      { name: 'ObjectScript and InterSystems Workflow', level: 'Deep' },
      { name: 'Interweave Connect', level: 'Deep' },
      { name: 'Blackford Platform (Philips AI Manager)', level: 'Working', note: 'seven deployments since April 2026' },
      { name: 'Mirth Connect', level: 'Working' },
      { name: 'Rhapsody', level: 'Working' },
    ],
  },
  {
    title: 'Standards',
    intro: 'What the messages are written in.',
    items: [
      { name: 'HL7 v2', level: 'Deep', note: 'referrals, appointments, admissions, transfers, discharges' },
      { name: 'HL7 FHIR', level: 'Deep', note: 'STU3 and R4; shared care record data provision' },
      { name: 'DICOM', level: 'Working', note: 'SCP and SCU nodes, query-retrieve (C-FIND) for priors, relevancy rules on tags and values' },
      { name: 'IHE profiles', level: 'Overview' },
      { name: 'NHS ITK', level: 'Working' },
    ],
  },
  {
    title: 'NHS national services',
    intro: 'The national plumbing every trust shares.',
    items: [
      { name: 'NHS Spine', level: 'Working', note: 'PDS lookups through Lorenzo query-response' },
      { name: 'NHS MESH', level: 'Deep', note: 'the MESH client and the national MESH API' },
    ],
  },
  {
    title: 'Systems I have integrated with',
    intro: 'On the other end of the interfaces.',
    note: 'No levels here: these are the systems my interfaces connect to and the clinical apps I deployed, not tools I run day to day.',
    items: [
      { name: 'Lorenzo (Dedalus)', note: 'patient administration' },
      { name: 'MOLIS', note: 'laboratory' },
      { name: 'WASP', note: 'online booking for blood tests' },
      { name: 'DrDoctor', note: 'patient engagement' },
      { name: 'Liquidlogic', note: 'social care' },
      { name: 'BigHand', note: 'digital dictation, the source for DocAssure' },
      { name: 'PACS, RIS and EMR systems', note: 'Philips and GE Healthcare sites, medical imaging AI deployments' },
      { name: 'Lunit INSIGHT CXR and MMG', note: 'chest X-ray and mammography AI, deployed' },
      { name: 'Coreline A:View LCS Plus', note: 'CT AI, deployed' },
      { name: 'Contextflow CHEST ADVANCE CT', note: 'chest CT AI, deployed' },
      { name: 'BART', note: 'Blackford’s AI results review, deployed' },
    ],
  },
  {
    title: 'Shared care records',
    intro: 'Regional records that bring care settings together.',
    note: 'No levels here: these are the records my work fed or connected to.',
    items: [
      {
        name: 'Interweave (Yorkshire & Humber Care Record)',
        note: 'Yorkshire Ambulance Service’s PAS integrated with Interweave authentication via JWT',
      },
      { name: 'Leicester, Leicestershire and Rutland Care Record', note: 'social care data' },
    ],
  },
  {
    title: 'Infrastructure and tools',
    intro: 'What the work is built and shipped with.',
    items: [
      { name: 'Docker and Docker Compose', level: 'Deep' },
      { name: 'Git; Jira, Confluence and Bitbucket', level: 'Deep' },
      { name: 'Transact-SQL', level: 'Deep' },
      { name: 'JSON, HTTP, TCP and TLS', level: 'Deep' },
      { name: 'Windows Server and Linux (Ubuntu)', level: 'Working' },
      { name: 'Google Cloud', level: 'Working', note: 'IAP, buckets, firewalls, permissions' },
      { name: 'nginx, Keycloak, OIDC and LDAP', level: 'Working' },
      { name: 'MicroDICOM and DCMTK', level: 'Working' },
      { name: 'NVIDIA toolkit and CUDA', level: 'Working' },
      { name: 'Node.js, TypeScript, Python and HTML', level: 'Working' },
    ],
  },
];
