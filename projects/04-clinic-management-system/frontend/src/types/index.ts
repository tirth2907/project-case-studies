export interface DoctorProfile {
  name: string;
  titles: string;
  specialization: string;
  subspecialties: string[];
  tagline: string;
  heroStatement: string;
  philosophy: {
    headline: string;
    quote: string;
    paragraphs: string[];
    pillars: { title: string; description: string }[];
  };
  portraitUrl: string;
  interiorUrl: string;
  diagnosticUrl: string;
  credentials: {
    boardCertifications: string[];
    fellowships: string[];
    education: { degree: string; institution: string; year: string }[];
    affiliations: string[];
    academicAppointments: string[];
  };
}

export interface MedicalStatistic {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}

export interface ExpertiseArea {
  id: string;
  number: string;
  title: string;
  description: string;
  clinicalFocus: string[];
  tags: string[];
}

export interface MedicalService {
  id: string;
  title: string;
  category: 'Diagnostic' | 'Consultation' | 'Preventive' | 'Executive';
  duration: string;
  shortDescription: string;
  fullDescription: string;
  keyComponents: string[];
  idealFor: string;
  delivery: 'In-Clinic' | 'Virtual / In-Clinic' | 'Concierge';
}

export interface ClinicalJourneyItem {
  year: string;
  role: string;
  institution: string;
  location: string;
  description: string;
  milestone: string;
}

export interface PatientReview {
  id: string;
  author: string;
  initials: string;
  verified: boolean;
  rating: number;
  date: string;
  conditionContext: string;
  quote: string;
}

export interface MedicalInsight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  content: string[];
  keyTakeaways: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Clinic Information' | 'Consultations' | 'Insurance & Fees' | 'Diagnostics';
}

export interface TreatedConditionItem {
  id: string;
  name: string;
  category:
    | 'All'
    | 'Lifestyle & Metabolic'
    | 'Rheumatology & Musculoskeletal'
    | 'Infectious & Fevers'
    | 'Respiratory'
    | 'Gastrointestinal & Hepatic';
  urgencyOrCare: string;
  summary: string;
  symptoms: string[];
}

export interface ClinicInfo {
  name: string;
  doctorName: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  phoneRaw: string;
  email: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  paymentModes: string[];
  covidProtocols: string[];
  amenities: string[];
  registration: {
    council: string;
    regNumber: string;
    year: string;
  };
  memberships: { organization: string; tenure: string }[];
  languages: string[];
  emergencyNotice: string;
  disclaimer: string;
}
