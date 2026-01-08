// CV Data Types
export interface CVExperience {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface CVSkillItem {
  name: string;
  level: number;
}

export interface CVSkillCategory {
  category: string;
  items: CVSkillItem[];
}

export interface CVEducation {
  period: string;
  degree: string;
  institution: string;
  description: string;
}

export interface CVLanguage {
  name: string;
  level: string;
}

export interface CVMeta {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone?: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface CVData {
  meta: CVMeta;
  experience: CVExperience[];
  skills: CVSkillCategory[];
  education: CVEducation[];
  certifications: string[];
  languages: CVLanguage[];
}

export type CVLanguageCode = 'en' | 'de';

// Section labels for each language
export const sectionLabels: Record<CVLanguageCode, Record<string, string>> = {
  en: {
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    present: 'Present',
  },
  de: {
    experience: 'Berufserfahrung',
    skills: 'Fähigkeiten',
    education: 'Ausbildung',
    certifications: 'Zertifizierungen',
    languages: 'Sprachen',
    present: 'Heute',
  },
};

// Bilingual CV Data
export const cvData: Record<CVLanguageCode, CVData> = {
  en: {
    meta: {
      name: 'Noah Kellner',
      title: 'Head of IT',
      subtitle: 'AI Enthusiast | Builder',
      email: 'hello@noah-kellner.de',
      location: 'Germany',
      website: 'noah-kellner.de',
      linkedin: 'linkedin.com/in/noahkellner',
      github: 'github.com/noahkellner',
    },
    experience: [
      {
        period: '2024 – Present',
        title: 'Head of IT',
        company: 'Dialog Factory GmbH',
        location: 'Germany',
        description:
          'Leading technical strategy, infrastructure modernization, and AI initiatives. Managing IT team and driving digital transformation.',
        highlights: [
          'Led complete cloud migration to AWS',
          'Implemented AI-powered customer support',
          'Reduced infrastructure costs by 50%',
          'Built and scaled IT team',
        ],
      },
      {
        period: '2022 – 2024',
        title: 'IT Manager',
        company: 'Dialog Factory GmbH',
        location: 'Germany',
        description:
          'Built and scaled the IT department from ground up. Implemented cloud infrastructure and automation pipelines.',
        highlights: [
          'Established IT department processes',
          'Deployed CI/CD pipelines',
          'Integrated monitoring & alerting',
        ],
      },
      {
        period: '2020 – 2022',
        title: 'System Administrator',
        company: 'Various Companies',
        location: 'Germany',
        description:
          'Managed server infrastructure, networks, and security systems for multiple clients.',
        highlights: [
          'Server administration (Linux/Windows)',
          'Network infrastructure management',
          'Security audits & hardening',
        ],
      },
    ],
    skills: [
      {
        category: 'Cloud & Infrastructure',
        items: [
          { name: 'AWS', level: 95 },
          { name: 'Docker', level: 90 },
          { name: 'Kubernetes', level: 75 },
          { name: 'Terraform', level: 85 },
          { name: 'Linux', level: 90 },
        ],
      },
      {
        category: 'Development',
        items: [
          { name: 'Python', level: 90 },
          { name: 'TypeScript', level: 80 },
          { name: 'React', level: 75 },
          { name: 'FastAPI', level: 85 },
          { name: 'Node.js', level: 70 },
        ],
      },
      {
        category: 'AI & Automation',
        items: [
          { name: 'Claude API', level: 90 },
          { name: 'LangChain', level: 80 },
          { name: 'GitHub Actions', level: 95 },
          { name: 'n8n', level: 85 },
        ],
      },
    ],
    education: [
      {
        period: '2018 – 2020',
        degree: 'IT Specialist',
        institution: 'IHK Certification',
        description: 'System Integration specialization',
      },
    ],
    certifications: [
      'AWS Solutions Architect',
      'Docker Certified Associate',
      'Terraform Associate',
    ],
    languages: [
      { name: 'German', level: 'Native' },
      { name: 'English', level: 'Fluent' },
    ],
  },
  de: {
    meta: {
      name: 'Noah Kellner',
      title: 'Leiter IT',
      subtitle: 'KI-Enthusiast | Builder',
      email: 'hello@noah-kellner.de',
      location: 'Deutschland',
      website: 'noah-kellner.de',
      linkedin: 'linkedin.com/in/noahkellner',
      github: 'github.com/noahkellner',
    },
    experience: [
      {
        period: '2024 – Heute',
        title: 'Leiter IT',
        company: 'Dialog Factory GmbH',
        location: 'Deutschland',
        description:
          'Leitung der technischen Strategie, Infrastrukturmodernisierung und KI-Initiativen. Führung des IT-Teams und Vorantreiben der digitalen Transformation.',
        highlights: [
          'Vollständige Cloud-Migration zu AWS geleitet',
          'KI-gestützten Kundensupport implementiert',
          'Infrastrukturkosten um 50% reduziert',
          'IT-Team aufgebaut und skaliert',
        ],
      },
      {
        period: '2022 – 2024',
        title: 'IT-Manager',
        company: 'Dialog Factory GmbH',
        location: 'Deutschland',
        description:
          'Aufbau und Skalierung der IT-Abteilung von Grund auf. Implementierung von Cloud-Infrastruktur und Automatisierungspipelines.',
        highlights: [
          'IT-Abteilungsprozesse etabliert',
          'CI/CD-Pipelines bereitgestellt',
          'Monitoring & Alerting integriert',
        ],
      },
      {
        period: '2020 – 2022',
        title: 'Systemadministrator',
        company: 'Verschiedene Unternehmen',
        location: 'Deutschland',
        description:
          'Verwaltung von Server-Infrastruktur, Netzwerken und Sicherheitssystemen für mehrere Kunden.',
        highlights: [
          'Serveradministration (Linux/Windows)',
          'Netzwerk-Infrastruktur-Management',
          'Sicherheitsaudits & Härtung',
        ],
      },
    ],
    skills: [
      {
        category: 'Cloud & Infrastruktur',
        items: [
          { name: 'AWS', level: 95 },
          { name: 'Docker', level: 90 },
          { name: 'Kubernetes', level: 75 },
          { name: 'Terraform', level: 85 },
          { name: 'Linux', level: 90 },
        ],
      },
      {
        category: 'Entwicklung',
        items: [
          { name: 'Python', level: 90 },
          { name: 'TypeScript', level: 80 },
          { name: 'React', level: 75 },
          { name: 'FastAPI', level: 85 },
          { name: 'Node.js', level: 70 },
        ],
      },
      {
        category: 'KI & Automatisierung',
        items: [
          { name: 'Claude API', level: 90 },
          { name: 'LangChain', level: 80 },
          { name: 'GitHub Actions', level: 95 },
          { name: 'n8n', level: 85 },
        ],
      },
    ],
    education: [
      {
        period: '2018 – 2020',
        degree: 'Fachinformatiker',
        institution: 'IHK-Zertifizierung',
        description: 'Fachrichtung Systemintegration',
      },
    ],
    certifications: [
      'AWS Solutions Architect',
      'Docker Certified Associate',
      'Terraform Associate',
    ],
    languages: [
      { name: 'Deutsch', level: 'Muttersprache' },
      { name: 'Englisch', level: 'Fließend' },
    ],
  },
};
