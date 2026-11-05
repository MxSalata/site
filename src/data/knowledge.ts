// The knowledge base: what Mikolaj knows from work, as on his final CV (Nov 2026), LinkedIn and his own answers. Deep is
// in-depth and hands-on: he works with it unaided and fixes what breaks. Working is use on real projects. Makers he hasn't
// confirmed stay out, and so do Blackford's customer hospitals.
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
    title: 'Specialisms',
    intro: 'What I am relied on for.',
    items: [
      { name: 'Patient administration (PAS) workflows', level: 'Deep', note: 'inpatient and outpatient, from referral and appointment to admission, transfer and discharge' },
      { name: 'Clinical AI deployment', level: 'Deep', note: 'sole engineer, requirements to post-implementation review; Italy, Germany, Norway, Poland' },
      { name: 'Clinical document routing (DocAssure)', level: 'Deep', note: 'sole developer and architect: GP cc patient, patient only, safeguarding; to DMS, MESH, print, email' },
      { name: 'Imaging AI workflow', level: 'Deep', note: 'PACS to AI app and back: auto-forwarding, priors, study selection, doctor review in BART' },
      { name: 'Study configuration and relevancy rules', level: 'Deep', note: 'which studies and series reach each app; refined filtering to stop failures from irrelevant studies' },
      { name: 'HL7 failure recovery', level: 'Deep', note: 'ordered ADT resend, history correction (EVN and MSH dates), application versus network ACKs' },
      { name: 'Integration architecture and solution design', level: 'Deep', note: 'six of Synanetics’ 20+ NHS trusts: ePR migration, DrDoctor; requirements and quote estimates' },
      { name: 'Live incident response', level: 'Deep', note: 'owned P1 issues and board communication at Bedfordshire; out-of-hours support, root cause analysis' },
      { name: 'Change control and testing', level: 'Working', note: 'deployment and roll-back plans to the change board; supervised sanity, functional, end-to-end testing' },
      { name: 'Mentoring and procedures', level: 'Working', note: 'trained and managed two entry-level staff; mentored colleagues at Synanetics; wrote TIE procedures' },
    ],
  },
  {
    title: 'Integration platforms',
    intro: 'Where the interfaces run.',
    items: [
      { name: 'InterSystems IRIS and IRIS for Health', level: 'Deep', note: 'sole developer and architect of DocAssure, live at Sheffield Children’s; Aperture, 2nd of 37; Shutter' },
      { name: 'InterSystems HealthShare and Ensemble', level: 'Deep', note: 'HealthShare 2017.2 at Luton and Bedfordshire, Ensemble before it; led projects, wrote TIE procedures' },
      { name: 'Objectscript and InterSystems Workflow', level: 'Deep', note: 'six years of NHS interfaces; DocAssure’s framework' },
      { name: 'Interweave Connect', level: 'Deep' },
      { name: 'Blackford Platform (Philips AI Manager)', level: 'Deep', note: 'sole engineer on seven deployments; decompiled .dll plugins, coded study XML around a filtering fault' },
      { name: 'BART (Blackford Accept Reject Tool)', level: 'Working', note: 'deployed with the Platform; doctors review AI results before they return to PACS' },
      { name: 'Mirth Connect', level: 'Working' },
      { name: 'Orion Rhapsody', level: 'Working' },
    ],
  },
  {
    title: 'NHS national services',
    intro: 'The national plumbing every trust shares.',
    items: [
      { name: 'NHS SPINE', level: 'Deep', note: 'PDS demographics lookups by query-response, via Lorenzo' },
      { name: 'NHS MESH', level: 'Deep', note: 'DocAssure to GP practices, through both the MESH client and the national MESH API' },
    ],
  },
  {
    title: 'Standards',
    intro: 'What the messages are written in.',
    items: [
      { name: 'HL7 v2', level: 'Deep', note: 'six years of multi-system PAS feeds, referral to discharge; custom HL7 for an EPR; SPINE query-response' },
      { name: 'HL7 FHIR', level: 'Deep', note: 'STU3 and R4; led two Interweave data provision projects, one a Liquidlogic ETL pipeline' },
      { name: 'DICOM', level: 'Deep', note: 'SCP and SCU nodes, auto-forwarded studies, query-retrieve for priors, relevancy rules' },
      { name: 'NHS ITK', level: 'Working' },
      { name: 'IHE profiles', level: 'Overview', note: 'HL7UK DICOM/HL7/IHE standards overview course' },
      { name: 'ISO 27001 and ISO 9001', level: 'Overview', note: 'working under Blackford’s accreditations' },
    ],
  },
  {
    title: 'Systems and care records I have integrated with',
    intro: 'Who my interfaces connect, and what each build did.',
    note: 'No levels here: what counts is what I built against each one.',
    items: [
      { name: 'Clinical AI applications', note: 'deployed Lunit INSIGHT CXR 4.0 and MMG 1.2, Coreline A:View LCS Plus, Contextflow CHEST ADVANCE CT, Avicenna CINA-ICH, Gleamer Boneview' },
      { name: 'PACS, RIS and EMR systems', note: 'Philips and GE Healthcare sites; DICOM and HL7 v2, results back to PACS' },
      { name: 'Lorenzo (Dedalus)', note: 'PAS feeds, PDS lookups, application ACKs returned on a separate service' },
      { name: 'DrDoctor', note: 'bespoke transformations, subscription tables, exclusion lists, data warehouse jobs' },
      { name: 'MOLIS', note: 'built Warrington and Halton’s paperless ePhlebotomy interfaces, MOLIS to WASP booking' },
      { name: 'WASP', note: 'online blood test booking: nearly 7,000 appointments in just over four months of the pilot' },
      { name: 'BigHand and Xerox', note: 'dictated letters in from BigHand; DocAssure routed them out, Xerox being print and post' },
      { name: 'Liquidlogic', note: 'social care; a NodeJS ETL pipeline to FHIR, deletions included' },
      { name: 'ICE, WinPath and Rhapsody CIM', note: 'pathology order comms and results' },
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
      { name: 'Docker and Docker Compose', level: 'Deep', note: 'complex clinical AI apps, many files to amend per deployment; scripted Docker installs' },
      { name: 'JSON, XML, HTTP, TCP and TLS', level: 'Deep' },
      { name: 'Transact-SQL', level: 'Deep', note: 'designed and deployed a NACS snapshot transformed to custom HL7 for the EPR' },
      { name: 'Git and BitBucket', level: 'Deep', note: 'version control strategies at Synanetics; taught it at Luton; set up repositories at Blackford' },
      { name: 'Jira and Confluence', level: 'Deep' },
      { name: 'Linux (Ubuntu)', level: 'Working', note: 'day to day on deployments; scripted service accounts, Docker set-up, permissions' },
      { name: 'SSH and certificates', level: 'Working', note: 'clinical AI deployments on Ubuntu and Google Cloud' },
      { name: 'Google Cloud', level: 'Working', note: 'day to day: IAP, buckets, firewalls, permissions; one deployment air-gapped in Norway' },
      { name: 'Keycloak, OIDC, LDAP and JWT', level: 'Working', note: 'BART’s sign-in; JWT authentication to Interweave for Yorkshire Ambulance Service’s PAS' },
      { name: 'NVIDIA toolkit and CUDA', level: 'Working', note: 'GPU hosts for clinical AI' },
      { name: 'MicroDICOM and DCMTK', level: 'Working', note: 'DICOM troubleshooting' },
      { name: 'AI agents', level: 'Working', note: 'Blackford deployments; Shutter’s design: agents propose, a gate checks, a person approves' },
      { name: 'Windows Server', level: 'Working' },
      { name: 'nginx and Cloudflare Workers', level: 'Working' },
      { name: 'PostgreSQL', level: 'Working' },
      { name: 'NodeJS, Typescript, Python and HTML', level: 'Working' },
    ],
  },
];
