// The knowledge base: what Mikolaj knows from work, as on his final CV (Nov 2026) and LinkedIn. Deep is his CV's
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
      { name: 'InterSystems HealthShare', level: 'Deep', note: '2017.2 at Luton and Dunstable and Bedfordshire' },
      { name: 'InterSystems Ensemble', level: 'Deep', note: 'the engine before HealthShare 2017.2' },
      { name: 'ObjectScript and InterSystems Workflow', level: 'Deep' },
      { name: 'Interweave Connect', level: 'Deep' },
      { name: 'Mirth Connect', level: 'Working' },
      { name: 'Rhapsody', level: 'Working' },
      { name: 'Blackford Platform (Philips AI Manager) and BART', level: 'Working', note: 'seven deployments; .NET plugin troubleshooting; doctors review AI results before they return to PACS' },
    ],
  },
  {
    title: 'Standards',
    intro: 'What the messages are written in.',
    items: [
      { name: 'HL7 v2', level: 'Deep', note: 'referrals, appointments, admissions, transfers, discharges' },
      { name: 'HL7 FHIR', level: 'Deep', note: 'STU3 and R4; shared care record data provision to Interweave standards' },
      { name: 'DICOM', level: 'Working', note: 'SCP and SCU nodes, auto-forwarded studies, C-FIND for priors, relevancy rules' },
      { name: 'IHE profiles', level: 'Overview' },
      { name: 'NHS ITK', level: 'Working' },
      { name: 'ISO 27001 and ISO 9001', level: 'Overview', note: 'working under Blackford’s accreditations' },
    ],
  },
  {
    title: 'NHS national services',
    intro: 'The national plumbing every trust shares.',
    items: [
      { name: 'NHS Spine', level: 'Deep', note: 'PDS demographics lookups by query-response, via Lorenzo' },
      { name: 'NHS MESH', level: 'Deep', note: 'the MESH client and the national MESH API' },
    ],
  },
  {
    title: 'Systems I have integrated with',
    intro: 'On the other end of the interfaces.',
    note: 'No levels here: these are the systems my interfaces connect to, not tools I run.',
    items: [
      { name: 'Lorenzo (Dedalus)', note: 'patient administration; PDS lookups' },
      { name: 'MOLIS', note: 'laboratory; paperless ePhlebotomy' },
      { name: 'WASP', note: 'online booking for blood tests' },
      { name: 'DrDoctor', note: 'patient engagement' },
      { name: 'Liquidlogic', note: 'social care; a Node.js ETL pipeline to FHIR, deletions included' },
      { name: 'BigHand', note: 'digital dictation, the document source for DocAssure' },
      { name: 'Xerox', note: 'a document recipient for DocAssure' },
      { name: 'PACS, RIS and EMR systems', note: 'DICOM and HL7 v2, in clinical AI deployments' },
      { name: 'Clinical AI applications', note: 'Lunit INSIGHT CXR and MMG, Coreline A:View LCS Plus, Contextflow CHEST ADVANCE CT' },
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
      { name: 'Leicester, Leicestershire and Rutland Care Record', note: 'social care data; the Synanetics FHIR Store' },
    ],
  },
  {
    title: 'Infrastructure and tools',
    intro: 'What the work is built and shipped with.',
    items: [
      { name: 'Docker and Docker Compose', level: 'Deep' },
      { name: 'Git; Jira, Confluence and Bitbucket', level: 'Deep' },
      { name: 'Transact-SQL', level: 'Deep' },
      { name: 'JSON, XML, HTTP, TCP and TLS', level: 'Deep' },
      { name: 'Windows Server and Linux', level: 'Working', note: 'Ubuntu' },
      { name: 'Google Cloud', level: 'Working', note: 'IAP, buckets, firewalls, permissions; an air-gapped deployment' },
      { name: 'Keycloak, OIDC and LDAP', level: 'Working', note: 'sign-in for BART' },
      { name: 'SSH and certificates', level: 'Working' },
      { name: 'nginx and Cloudflare Workers', level: 'Working' },
      { name: 'NVIDIA toolkit and CUDA', level: 'Working', note: 'GPU hosts for clinical AI' },
      { name: 'MicroDICOM and DCMTK', level: 'Working', note: 'DICOM troubleshooting' },
      { name: 'PostgreSQL', level: 'Working' },
      { name: 'AI agents', level: 'Working', note: 'development and deployments' },
      { name: 'Node.js, TypeScript, Python and HTML', level: 'Working' },
    ],
  },
];
