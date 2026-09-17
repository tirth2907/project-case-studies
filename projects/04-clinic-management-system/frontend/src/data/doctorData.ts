import {
  DoctorProfile,
  MedicalStatistic,
  ExpertiseArea,
  MedicalService,
  ClinicalJourneyItem,
  PatientReview,
  MedicalInsight,
  FAQItem,
  ClinicInfo,
  TreatedConditionItem,
} from '../types';

export const doctorProfile: DoctorProfile = {
  name: 'Dr. Samir Prajapati',
  titles: 'MBBS, MD (Internal Medicine)',
  specialization: 'Senior Consultant Physician • Internal Medicine, Lifestyle Diseases & Rheumatology',
  subspecialties: [
    'Lifestyle Diseases (Hypertension & Diabetes Mellitus)',
    'Rheumatological & Chronic Joint Disorders',
    'Infectious Diseases & Complex Fevers (PUO)',
    'Respiratory & Gastroenterology Medicine',
  ],
  tagline: 'Expertise Built Over 25+ Years • Precision Diagnosis & Compassionate Care',
  heroStatement: 'Clinical diagnosis built on 25+ years of experience, precision and trust.',
  philosophy: {
    headline: 'Clinical excellence lies in thorough clinical listening, early lifestyle disease reversal, and diagnostic precision.',
    quote:
      'In internal medicine, a patient’s story is the most vital diagnostic tool. Whether diagnosing an elusive rheumatological condition, treating complex seasonal fevers, or guiding lifelong diabetes control, clinical vigilance and empathy must go hand in hand.',
    paragraphs: [
      'With over 25 years of continuous clinical practice in Rajkot and tertiary academic hospitals in Gujarat, Dr. Samir Prajapati provides thorough, evidence-grounded internal medicine consultations.',
      'Our clinic emphasizes decisive lifestyle disease management—particularly Hypertension and Diabetes—arresting metabolic damage before microvascular or cardiac complications emerge.',
      'Dr. Prajapati brings recognized clinical acumen in evaluating difficult rheumatological conditions (such as Rheumatoid Arthritis, Gout, Spondylitis) and diagnosing complex infectious illnesses and fevers of unknown origin (PUO).',
    ],
    pillars: [
      {
        title: 'Diagnostic Acumen',
        description:
          'Sharp clinical judgment in untangling complex, ambiguous symptoms, seasonal fevers, and multi-system medical disorders.',
      },
      {
        title: 'Lifestyle Disease Mastery',
        description:
          'Longitudinal management of Hypertension, Type 2 Diabetes, and metabolic syndrome with individual patient education.',
      },
      {
        title: 'Accessible & Compassionate Care',
        description:
          'Fluent in English, ગુજરાતી (Gujarati), and हिंदी (Hindi), providing warm, communicative consultation for patients and families.',
      },
    ],
  },
  portraitUrl: '/images/dr_samir_portrait.jpg',
  interiorUrl: '/images/clinic_interior.jpg',
  diagnosticUrl: '/images/diagnostic_suite.jpg',
  credentials: {
    boardCertifications: [
      'Registered with Gujarat Medical Council (Reg. No: G-10961, 2001)',
      'Life Member, Association of Physicians of India (API, 2000 – Present)',
      'Member, Indian Society of Critical Care Medicine (ISCCM, 2003 – Present)',
      'Member, Association of Physicians of Rajkot (APR, 2007 – Present)',
    ],
    fellowships: [
      'Former Assistant Professor in Medicine — V.S. General Hospital & Smt. NHL MMC, Ahmedabad (2004 – 2006)',
      'Intensive Care & Critical Care Training (ISCCM)',
    ],
    education: [
      { degree: 'Doctor of Medicine (M.D. in Medicine)', institution: 'B.J. Medical College (BJMC) / Gujarat University', year: '2001' },
      { degree: 'Bachelor of Medicine, Bachelor of Surgery (M.B.B.S.)', institution: 'Smt. NHL Municipal Medical College (NHL MMC) / Gujarat University', year: '1997' },
    ],
    affiliations: [
      'Director & Chief Consultant Physician, Shree Maa Krupa Clinic, Rajkot',
      'Visiting Consultant Physician at Leading Private & Tertiary Hospitals in Rajkot',
      'Association of Physicians of Rajkot (APR)',
      'Association of Physicians of India (API)',
    ],
    academicAppointments: [
      'Former Assistant Professor of Medicine, V.S. General Hospital, Ahmedabad (2004 – 2006)',
      'Active Speaker & Panelist in Regional Medical Seminars on Diabetology & Infectious Diseases',
    ],
  },
};

export const medicalStatistics: MedicalStatistic[] = [
  {
    value: 25,
    suffix: '+',
    label: 'Years of Clinical Practice',
    subtext: 'Dedicated service across hospital academic medicine and private clinical practice in Rajkot',
  },
  {
    value: 40000,
    suffix: '+',
    label: 'Patients Consulted & Treated',
    subtext: 'Comprehensive care for lifestyle conditions, infectious fevers, and chronic disorders',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Registered & Certified',
    subtext: 'Gujarat Medical Council (G-10961) • API & ISCCM Life Member',
  },
  {
    value: 3,
    suffix: ' Languages',
    label: 'English • ગુજરાતી • हिंदी',
    subtext: 'Seamless clinical communication for patients across Saurashtra and Gujarat',
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'lifestyle-hypertension-diabetes',
    number: '01',
    title: 'Hypertension & Diabetes Mellitus',
    description:
      'Comprehensive management of essential hypertension, metabolic syndrome, and Type 2 Diabetes to safeguard cardiovascular, renal, and neurological health.',
    clinicalFocus: [
      'Tight glycemic control & insulin titration',
      'Refractory & secondary hypertension evaluation',
      'Prevention of diabetic nephropathy & retinopathy',
      'Dietary and lifestyle calibration for Saurashtra population',
    ],
    tags: ['Diabetes', 'Hypertension', 'Cardiometabolic'],
  },
  {
    id: 'rheumatology-joints',
    number: '02',
    title: 'Rheumatology & Joint Disorders',
    description:
      'Recognized diagnostic edge in inflammatory arthritis, gout, spondyloarthropathies, and chronic musculoskeletal pain syndromes.',
    clinicalFocus: [
      'Rheumatoid arthritis early diagnosis & DMARD therapy',
      'Acute and chronic Gouty arthritis management',
      'Ankylosing Spondylitis & Spondyloarthropathy',
      'Lumbar disc prolapse with radiculopathy & chronic back pain',
    ],
    tags: ['Rheumatology', 'Gout', 'Arthritis'],
  },
  {
    id: 'infectious-fevers-puo',
    number: '03',
    title: 'Infectious Diseases & Fevers of Unknown Origin (PUO)',
    description:
      'Exhaustive diagnostic evaluation and treatment of acute tropical fevers, endemic infections, and prolonged unexplained febrile illnesses.',
    clinicalFocus: [
      'Dengue, Chikungunya, and Malaria management',
      'Enteric (Typhoid) fever & Brucellosis workup',
      'COVID-19 & post-viral recovery care',
      'Complicated Urinary Tract Infections (UTI)',
    ],
    tags: ['Infectious Disease', 'Fever / PUO', 'Tropical Medicine'],
  },
  {
    id: 'respiratory-pulmonology',
    number: '04',
    title: 'Respiratory & Chest Medicine',
    description:
      'Clinical management of chronic respiratory conditions, seasonal allergic airway diseases, and lower respiratory infections.',
    clinicalFocus: [
      'COPD (Chronic Obstructive Lung Disease) optimization',
      'Bronchial Asthma & inhaler therapy guidance',
      'Bacterial & viral Pneumonia treatment',
      'Allergic Rhinitis & pleural effusion evaluation',
    ],
    tags: ['Pulmonology', 'Asthma', 'COPD'],
  },
  {
    id: 'gastroenterology-liver',
    number: '05',
    title: 'Gastroenterology & Hepatic Conditions',
    description:
      'Evaluation and clinical treatment of digestive disorders, acute dysentery, viral hepatitis, and liver pathology.',
    clinicalFocus: [
      'Infective Hepatitis & Jaundice differential diagnosis',
      'Liver Abscess & Ascites medical management',
      'Acute Dysentery, Diarrhea & Food-borne GI illness',
      'Chronic GERD, Peptic Ulcers & IBS management',
    ],
    tags: ['Gastroenterology', 'Liver Health', 'Digestive Care'],
  },
  {
    id: 'thyroid-metabolic',
    number: '06',
    title: 'Thyroid & General Internal Medicine',
    description:
      'Holistic clinical care addressing multi-system constitutional symptoms, thyroid imbalances, anemia, and preventive adult health.',
    clinicalFocus: [
      'Hypothyroidism & Hyperthyroidism stabilization',
      'Adult immunization and preventive health checks',
      'Evaluation of unexplained fatigue & weight shifts',
      'Comprehensive elderly care & multi-morbidity coordination',
    ],
    tags: ['Thyroid', 'Internal Medicine', 'Adult Health'],
  },
];

export const medicalServices: MedicalService[] = [
  {
    id: 'in-clinic-physician-consultation',
    title: 'Comprehensive In-Clinic Consultation',
    category: 'Consultation',
    duration: 'Dedicated Time Slot',
    shortDescription:
      'Personal clinical consultation with Dr. Samir Prajapati at Shree Maa Krupa Clinic, Vidyanagar Main Road, Rajkot.',
    fullDescription:
      'Detailed in-person evaluation covering thorough clinical history, physical examination, vitals check, review of prior laboratory investigations, and clear prescription with dietary guidance in English, Gujarati, or Hindi.',
    keyComponents: [
      'Detailed clinical history taking & symptom analysis',
      'Systematic physical examination (Cardiovascular, Respiratory, Abdominal)',
      'Blood pressure, blood sugar, and pulse oximetry check',
      'Audit of prior reports, blood tests, and prescriptions',
      'Personalized treatment regimen with clear medication instructions',
    ],
    idealFor: 'Patients seeking expert evaluation for fevers, uncontrolled blood pressure, diabetes, joint pain, or general illness.',
    delivery: 'In-Clinic',
  },
  {
    id: 'diabetes-hypertension-program',
    title: 'Lifestyle Disease & Diabetes Care Protocol',
    category: 'Preventive',
    duration: 'Regular Follow-Up Plan',
    shortDescription:
      'Structured management for Type 2 Diabetes, Hypertension, and Dyslipidemia to prevent long-term organ complications.',
    fullDescription:
      'Continuous metabolic stewardship designed for the local dietary patterns of Saurashtra. Dr. Prajapati fine-tunes oral hypoglycemic agents, insulin regimens, and anti-hypertensive medications while tracking renal function and lipid markers.',
    keyComponents: [
      'HbA1c monitoring and personalized blood glucose targets',
      'Blood pressure profile optimization and cardiovascular risk reduction',
      'Kidney function (Serum Creatinine, eGFR, Urine Microalbumin) tracking',
      'Dietary counseling customized for Gujarati vegetarian cuisine',
      'Diabetic foot care inspection and neuropathy screening',
    ],
    idealFor: 'Individuals diagnosed with Diabetes Mellitus, High Blood Pressure, or High Cholesterol.',
    delivery: 'In-Clinic',
  },
  {
    id: 'fever-infectious-disease-evaluation',
    title: 'Acute Fever & Infection Diagnostic Workup',
    category: 'Diagnostic',
    duration: 'Prompt Urgent Slot',
    shortDescription:
      'Rapid clinical evaluation and diagnostic laboratory investigation for Dengue, Malaria, Typhoid, Chikungunya, and PUO.',
    fullDescription:
      'Fevers require fast, discriminating clinical diagnosis to avoid dangerous complications. Dr. Prajapati evaluates symptom timelines, blood counts, liver function, and serological assays to initiate targeted antimicrobial or supportive therapy.',
    keyComponents: [
      'Platelet count monitoring & hydration protocol for Dengue',
      'Serology tests for Typhoid (Widal/Typhidot), Dengue NS1/IgM, Malaria',
      'Liver function test audit for Jaundice and Hepatitis',
      'Detection and management of secondary bacterial complications',
      'Clear criteria for hospital admission or outpatient home care',
    ],
    idealFor: 'Patients experiencing acute fever, body aches, chills, jaundice, vomiting, or persistent unexplained high temperature.',
    delivery: 'In-Clinic',
  },
  {
    id: 'rheumatology-joint-pain-assessment',
    title: 'Rheumatology & Chronic Joint Evaluation',
    category: 'Consultation',
    duration: 'Detailed Workup',
    shortDescription:
      'Specialized evaluation for Rheumatoid Arthritis, Gout, Ankylosing Spondylitis, and Lumbar Radiculopathy.',
    fullDescription:
      'Leveraging Dr. Prajapati’s recognized diagnostic edge in rheumatology, patients with swollen joints, morning stiffness, uric acid elevation, or sciatic back pain receive a comprehensive immunologic workup and modern disease-modifying treatment.',
    keyComponents: [
      'Serum Uric Acid, ESR, CRP, and RA Factor / Anti-CCP profiling',
      'Physical joint palpation, range of motion, and spine mobility checks',
      'Evidence-based DMARD and anti-inflammatory therapy selection',
      'Management of sciatica and lumbar disc pain with rehabilitation advice',
      'Gout flare prevention and long-term purine dietary guidelines',
    ],
    idealFor: 'Patients suffering from joint swelling, persistent morning stiffness, severe knee/back pain, or elevated uric acid.',
    delivery: 'In-Clinic',
  },
  {
    id: 'executive-annual-health-audit',
    title: 'Executive & Comprehensive Adult Health Audit',
    category: 'Executive',
    duration: 'Comprehensive Evaluation',
    shortDescription:
      'An annual health appraisal designed for professionals and adults aged 35+ to detect silent disease early.',
    fullDescription:
      'A preventative medical review examining cardiometabolic, respiratory, thyroid, and renal health before symptoms manifest. Includes review of ECG, complete hemogram, liver and lipid profiles, and personalized lifestyle strategy.',
    keyComponents: [
      'Comprehensive biochemical & metabolic lab panel audit',
      'Resting cardiovascular and respiratory assessment',
      'Thyroid function test (TSH) and Vitamin D3/B12 evaluation',
      'Adult immunization advice (Pneumococcal, Influenza, Hepatitis B)',
      'Actionable health summary report with annual milestones',
    ],
    idealFor: 'Working professionals, business leaders, and adults seeking proactive prevention and longevity.',
    delivery: 'In-Clinic',
  },
  {
    id: 'telehealth-video-consultation',
    title: 'Online Video & Telehealth Consultation',
    category: 'Consultation',
    duration: '20 – 30 Minutes',
    shortDescription:
      'Secure virtual consultation for patients across Gujarat and outstation seeking Dr. Prajapati’s second opinion or follow-up.',
    fullDescription:
      'For established patients requiring report review, medication titration, or initial second opinions who cannot travel to Rajkot. Consult via video call with prescription sent digitally.',
    keyComponents: [
      'Direct one-on-one video consultation with Dr. Samir Prajapati',
      'Digital review of latest blood reports and scans',
      'Prescription renewal and dosage calibration',
      'Advice on whether an in-person physical visit or hospital admission is needed',
    ],
    idealFor: 'Patients residing outside Rajkot, elderly patients preferring home consultations, or follow-up visits.',
    delivery: 'Virtual / In-Clinic',
  },
];

export const clinicalJourney: ClinicalJourneyItem[] = [
  {
    year: '1997',
    role: 'Bachelor of Medicine & Surgery (M.B.B.S.)',
    institution: 'Smt. NHL Municipal Medical College / Gujarat University',
    location: 'Ahmedabad, Gujarat',
    description:
      'Graduated with distinction from NHL MMC, gaining rigorous hands-on clinical training across inpatient medical wards, emergency trauma, and outpatient clinics.',
    milestone: 'Medical Degree Foundations',
  },
  {
    year: '2001',
    role: 'Doctor of Medicine (M.D. in General Medicine)',
    institution: 'B.J. Medical College (BJMC) / Gujarat University',
    location: 'Ahmedabad, Gujarat',
    description:
      'Completed postgraduate medical doctorate at BJMC—one of Western India’s premier apex tertiary hospitals. Registered with Gujarat Medical Council (G-10961). Inducted into Association of Physicians of India (API).',
    milestone: 'Postgraduate MD Degree & Council Registration',
  },
  {
    year: '2003',
    role: 'Critical Care Medicine Induction',
    institution: 'Indian Society of Critical Care Medicine (ISCCM)',
    location: 'India',
    description:
      'Joined ISCCM, advancing protocols in medical intensive care, hemodynamic monitoring, septic shock, and multi-organ life support.',
    milestone: 'Critical Care Specialization',
  },
  {
    year: '2004 – 2006',
    role: 'Assistant Professor of Medicine',
    institution: 'V.S. General Hospital & Smt. NHL MMC',
    location: 'Ahmedabad, Gujarat',
    description:
      'Served as faculty member and Assistant Professor, training postgraduate residents and medical students while managing complex tertiary medical cases, respiratory emergencies, and acute intoxications.',
    milestone: 'Academic Medicine & Clinical Teaching',
  },
  {
    year: '2007 – Present',
    role: 'Active Leadership & Member',
    institution: 'Association of Physicians of Rajkot (APR)',
    location: 'Rajkot, Gujarat',
    description:
      'Elected member of APR, contributing to regional clinical guidelines, continuous medical education (CME) seminars, and physician academic panels in Saurashtra.',
    milestone: 'Physician Association Leadership',
  },
  {
    year: '2006 – Present',
    role: 'Senior Consultant Physician & Director',
    institution: 'Shree Maa Krupa Clinic',
    location: 'Vidyanagar Main Road, Rajkot, Gujarat',
    description:
      'Established Shree Maa Krupa Clinic at Virani Chowk / Vidyanagar Main Road. Over two decades of trusted clinical practice serving tens of thousands of families across Rajkot and Saurashtra.',
    milestone: 'Private Clinical Practice Leadership',
  },
];

export const patientReviews: PatientReview[] = [
  {
    id: 'review-1',
    author: 'Hasmukhbhai Patel',
    initials: 'HP',
    verified: true,
    rating: 5,
    date: 'February 2026',
    conditionContext: 'Diabetes & Blood Pressure Management',
    quote:
      'Dr. Samir Prajapati has been our family physician in Rajkot for over 15 years. My sugar and BP were always erratic before coming to Shree Maa Krupa Clinic. He explained the diet in simple Gujarati, adjusted my medicine with great precision, and today my HbA1c is normal. Very polite, patient, and knowledgeable doctor.',
  },
  {
    id: 'review-2',
    author: 'Jitendra Shah',
    initials: 'JS',
    verified: true,
    rating: 5,
    date: 'January 2026',
    conditionContext: 'Severe Dengue & High Fever',
    quote:
      'I had severe Dengue with rapidly falling platelets. We were extremely panicked. Dr. Samir Prajapati monitored me with calm confidence, guided oral hydration and daily counts, and saved me from unnecessary ICU admission. His clinical diagnosis in fevers is truly unmatched in Rajkot.',
  },
  {
    id: 'review-3',
    author: 'Bhavnaben Dave',
    initials: 'BD',
    verified: true,
    rating: 5,
    date: 'December 2025',
    conditionContext: 'Rheumatoid Arthritis & Joint Pain',
    quote:
      'I suffered from severe morning joint pain and swelling for months without a clear diagnosis. Dr. Samir diagnosed my rheumatoid condition on the very first visit with specific blood tests. Within weeks of starting his treatment, I was able to walk without pain. He has an extra edge in joint problems.',
  },
  {
    id: 'review-4',
    author: 'Rajesh V. (Gondal)',
    initials: 'RV',
    verified: true,
    rating: 5,
    date: 'November 2025',
    conditionContext: 'Chronic Gout & Sciatica Pain',
    quote:
      'Traveled from Gondal specifically to consult Dr. Prajapati. His thorough checkup of my back and uric acid levels was exceptional. He explained which foods to avoid and gave a very effective prescription. Shree Maa Krupa Clinic is very well-managed.',
  },
  {
    id: 'review-5',
    author: 'Dharmesh Mehta',
    initials: 'DM',
    verified: true,
    rating: 5,
    date: 'October 2025',
    conditionContext: 'Pneumonia & Asthmatic Bronchitis',
    quote:
      'When my elderly father developed acute breathing difficulty and chest congestion, Dr. Prajapati’s swift diagnosis of pneumonia and exact antibiotic course brought him back to health within days. We have complete trust in his diagnosis.',
  },
];

export const medicalInsights: MedicalInsight[] = [
  {
    id: 'insight-1',
    slug: 'hypertension-silent-threat-gujarat',
    title: 'Hypertension in Daily Life: Why Normal Blood Pressure Cannot Be Diagnosed by Symptoms Alone',
    excerpt:
      'High blood pressure is famously asymptomatic until organ damage occurs. Practical clinical insights on managing BP with diet, stress control, and medication compliance.',
    category: 'Lifestyle Diseases',
    readingTime: '5 min read',
    date: 'February 20, 2026',
    author: 'Dr. Samir Prajapati, MD (Medicine)',
    keyTakeaways: [
      'Hypertension often causes no headache or warning until readings exceed 160/100 mmHg.',
      'Reducing salt and fried foods commonly consumed in local snacks plays a major role in BP stabilization.',
      'Never stop anti-hypertensive medication without physician advice once readings normalize—the medication is what keeps them normal.',
    ],
    content: [
      'In our clinical practice in Rajkot, one of the most frequent misconceptions we encounter is: "Doctor, I don’t feel dizzy or have a headache, so my blood pressure must be fine." In truth, hypertension is known medically as the silent killer precisely because it rarely produces symptoms in its early to moderate stages.',
      'Sustained high blood pressure places unrelenting mechanical stress on the delicate arterial walls of your brain, heart, and kidneys. Over years, this leads to arterial stiffening, left ventricular hypertrophy, and elevated risk of stroke or chronic kidney disease.',
      'Controlling blood pressure requires a combined strategy: moderating sodium intake, maintaining physical activity, managing emotional stress, and adhering faithfully to prescribed medications.',
      'We advise all adults over 30 to monitor their blood pressure at least once every three months, even when feeling entirely well.',
    ],
  },
  {
    id: 'insight-2',
    slug: 'dengue-chikungunya-fever-management',
    title: 'Navigating Seasonal Fevers: Dengue, Chikungunya, and When to Seek Urgent Medical Care',
    excerpt:
      'How to distinguish viral fevers, critical warning signs of falling platelets, and why self-medicating with painkillers can be dangerous.',
    category: 'Infectious Diseases',
    readingTime: '6 min read',
    date: 'January 15, 2026',
    author: 'Dr. Samir Prajapati, MD (Medicine)',
    keyTakeaways: [
      'Dengue fevers require strict fluid management and daily platelet monitoring during the critical phase (days 3–7).',
      'Never take NSAIDs like Ibuprofen or Diclofenac for fever when Dengue is suspected, as they increase bleeding risks; use Paracetamol only.',
      'Warning signs: severe abdominal pain, persistent vomiting, mucosal bleeding, or extreme lethargy demand immediate medical attention.',
    ],
    content: [
      'Post-monsoon and seasonal shifts frequently bring surges in acute vector-borne fevers across Saurashtra. While both Dengue and Chikungunya present with high-grade fever and severe body aches, their clinical trajectories and complications differ fundamentally.',
      'Chikungunya is notorious for agonizing, lingering joint inflammation that can persist for months, whereas Dengue requires vigilant monitoring for plasma leakage and thrombocytopenia (falling platelet count).',
      'A crucial warning: during febrile episodes, patients frequently purchase over-the-counter painkillers. In Dengue, taking NSAIDs or steroids can precipitate catastrophic gastrointestinal bleeding. Paracetamol, adequate oral fluids (coconut water, ORS, lemon water), and physician-directed blood testing are the gold standards.',
      'Early clinical consultation ensures timely lab testing and prevents unnecessary panic or emergency hospitalization.',
    ],
  },
  {
    id: 'insight-3',
    slug: 'rheumatoid-arthritis-vs-gout-diagnosis',
    title: 'Understanding Joint Pain: Differentiating Gout from Rheumatoid Arthritis and Spondylitis',
    excerpt:
      'Early morning stiffness versus sudden agonizing big toe pain: how clinical history and lab markers identify the exact rheumatological condition.',
    category: 'Rheumatology',
    readingTime: '6 min read',
    date: 'December 28, 2025',
    author: 'Dr. Samir Prajapati, MD (Medicine)',
    keyTakeaways: [
      'Gout typically presents as sudden, excruciating redness and swelling in a single joint (most often the big toe).',
      'Rheumatoid arthritis is symmetrical, affecting multiple small joints of the hands and wrists with marked morning stiffness.',
      'Early diagnosis and targeted DMARD therapy prevent permanent joint erosion and deformities.',
    ],
    content: [
      'Musculoskeletal pain and swollen joints are among the most common complaints in internal medicine. However, "joint pain" is not a diagnosis—it is a symptom of diverse underlying biological mechanisms.',
      'Gout is a crystal-induced metabolic arthritis resulting from the deposition of monosodium urate crystals in synovial tissues when serum uric acid exceeds solubility thresholds. It strikes acutely, frequently in the middle of the night.',
      'Conversely, Rheumatoid Arthritis (RA) is a chronic systemic autoimmune disorder where the immune system mistakenly attacks the synovium. It causes prolonged morning stiffness (lasting over 45 minutes) and symmetrical swelling in the hands, wrists, and feet.',
      'Accurate diagnosis requires correlating clinical signs with specific blood markers (Serum Uric Acid, ESR, CRP, Anti-CCP). Early intervention halts joint damage and allows patients to maintain full, active lifestyles.',
    ],
  },
  {
    id: 'insight-4',
    slug: 'type-2-diabetes-kidney-protection',
    title: 'Diabetes Beyond Blood Sugar: Protecting Your Kidneys, Heart, and Vision',
    excerpt:
      'Why comprehensive diabetes management must look beyond daily glucometer numbers to annual microalbuminuria, lipid, and retinal checks.',
    category: 'Diabetology',
    readingTime: '5 min read',
    date: 'November 18, 2025',
    author: 'Dr. Samir Prajapati, MD (Medicine)',
    keyTakeaways: [
      'HbA1c reflects average blood sugar over 3 months and should be checked quarterly.',
      'Kidney involvement in diabetes begins silently; an annual urine microalbumin test detects it years before creatinine rises.',
      'Customized diet, portion control, and walking 30 minutes daily remain foundational alongside modern medicine.',
    ],
    content: [
      'Managing Type 2 Diabetes is not merely about achieving a desirable number on a glucometer; it is about shielding your vital organs from the microvascular and macrovascular complications of chronic hyperglycemia.',
      'When glucose remains persistently elevated, glucose molecules bind to proteins in blood vessel walls, causing thickening and loss of elasticity. Over a decade, this can damage the filtering units of the kidneys (nephropathy), the retina (retinopathy), and peripheral nerves (neuropathy).',
      'In our clinical practice, we conduct systematic quarterly assessments: reviewing HbA1c, monitoring blood pressure, and performing annual urine microalbumin/creatinine ratio tests. Detecting protein leakage in urine at the micro-stage allows us to introduce protective medications that halt kidney damage.',
      'With proactive medical stewardship, living a long, vibrant life with diabetes is entirely achievable.',
    ],
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Clinic Information',
    question: 'Where is Dr. Samir Prajapati’s clinic located in Rajkot?',
    answer:
      'Dr. Samir Prajapati practices at Shree Maa Krupa Clinic, located on the 2nd Floor, Clinic Centre, 13 Manhar Plot Corner, Vidyanagar Main Road, Opposite Patel Boarding, Virani Chowk, Rajkot, Gujarat 360001 / 360005. The clinic is centrally located and easily accessible by auto-rickshaw, city bus, or car.',
  },
  {
    id: 'faq-2',
    category: 'Consultations',
    question: 'What are the consultation timings at Shree Maa Krupa Clinic?',
    answer:
      'General consultation hours at the clinic are Monday to Friday: Morning 09:30 AM – 01:30 PM and Evening 05:00 PM – 08:30 PM. Saturday morning sessions are also available. We recommend calling +91 63515 39718 in advance to confirm current consultation timings and minimize waiting time. Walk-in patients are welcomed during clinic hours.',
  },
  {
    id: 'faq-3',
    category: 'Consultations',
    question: 'What medical conditions does Dr. Samir Prajapati commonly treat?',
    answer:
      'Dr. Samir Prajapati specializes in Internal Medicine with extensive expertise in Lifestyle Diseases (Hypertension, Diabetes, Thyroid), Rheumatology (Gout, Rheumatoid Arthritis, Spondylitis, Lumbar disc pain), Infectious Diseases (Dengue, Typhoid, Chikungunya, Malaria, COVID-19, Liver Abscess, UTI), Respiratory conditions (COPD, Bronchial Asthma, Pneumonia), and Gastrointestinal illnesses (Jaundice, Hepatitis, Dysentery).',
  },
  {
    id: 'faq-4',
    category: 'Consultations',
    question: 'Are remote teleconsultations available for patients outside Rajkot?',
    answer:
      'Yes. For patients residing in rural Saurashtra, outstation, or other cities in Gujarat, remote consultation can be coordinated by contacting the clinic reception directly (+91 63515 39718). Digital prescriptions and follow-up guidance are provided after report evaluation.',
  },
  {
    id: 'faq-5',
    category: 'Insurance & Fees',
    question: 'What payment modes are accepted at Shree Maa Krupa Clinic?',
    answer:
      'The clinic accepts Cash and all major digital UPI payment applications (Google Pay, PhonePe, Paytm, BHIM). Itemized clinical receipts and prescriptions are provided for mediclaim or reimbursement purposes.',
  },
  {
    id: 'faq-6',
    category: 'Diagnostics',
    question: 'In which languages can I communicate during my consultation?',
    answer:
      'Dr. Samir Prajapati is completely fluent in English, ગુજરાતી (Gujarati), and हिंदी (Hindi). He takes the time to explain diagnoses, lab reports, and medication timings in the language you and your family feel most comfortable speaking.',
  },
];

export const treatedConditions: TreatedConditionItem[] = [
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    category: 'Lifestyle & Metabolic',
    urgencyOrCare: 'Longitudinal Management',
    summary:
      'Precision antihypertensive titration, home blood pressure monitoring guidance, dietary sodium modulation, and end-organ cardiovascular/renal protection.',
    symptoms: ['Often asymptomatic', 'Morning occipital headaches', 'Dizziness', 'Palpitations'],
  },
  {
    id: 'diabetes-mellitus',
    name: 'Diabetes Mellitus (Type 2 & Type 1)',
    category: 'Lifestyle & Metabolic',
    urgencyOrCare: 'Longitudinal Stewardship',
    summary:
      'Quarterly HbA1c optimization, personalized oral agents and insulin regimens, microalbuminuria kidney screening, and Gujarati dietary adaptation.',
    symptoms: ['Excessive thirst (polydipsia)', 'Frequent urination', 'Fatigue', 'Slow wound healing'],
  },
  {
    id: 'thyroid-disorders',
    name: 'Thyroid Disorders (Hypo & Hyperthyroidism)',
    category: 'Lifestyle & Metabolic',
    urgencyOrCare: 'Endocrine Care',
    summary:
      'TSH, Free T3, and Free T4 profiling, precise levothyroxine dose titration, thyroid antibody assessment, and systemic metabolic normalization.',
    symptoms: ['Unexplained weight changes', 'Fatigue & lethargy', 'Cold or heat intolerance', 'Hair thinning'],
  },
  {
    id: 'gout',
    name: 'Gout & Hyperuricemia',
    category: 'Rheumatology & Musculoskeletal',
    urgencyOrCare: 'Acute & Long-term Care',
    summary:
      'Rapid acute flare pain relief, long-term serum uric acid lowering therapy, and purine dietary counseling to prevent recurrent attacks and tophi.',
    symptoms: ['Sudden excruciating big toe pain', 'Red hot swollen joint', 'Severe touch tenderness', 'High uric acid'],
  },
  {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis (RA)',
    category: 'Rheumatology & Musculoskeletal',
    urgencyOrCare: 'Comprehensive Rheumatology',
    summary:
      'Early serological diagnosis (RA factor, Anti-CCP), early conventional DMARD therapy to halt cartilage erosion and prevent joint deformities.',
    symptoms: ['Symmetrical swelling of hand/wrist joints', 'Morning stiffness >45 mins', 'Joint warmth', 'Fatigue'],
  },
  {
    id: 'spondylitis',
    name: 'Spondylitis (Cervical & Lumbar)',
    category: 'Rheumatology & Musculoskeletal',
    urgencyOrCare: 'Physical & Medical Therapy',
    summary:
      'Degenerative and inflammatory spinal pain management, neurological root evaluation, ergonomic guidance, and targeted analgesia.',
    symptoms: ['Neck stiffness with radiating arm pain', 'Persistent low back ache', 'Restricted spinal mobility'],
  },
  {
    id: 'spondyloarthropathy',
    name: 'Spondyloarthropathy (Ankylosing Spondylitis)',
    category: 'Rheumatology & Musculoskeletal',
    urgencyOrCare: 'Specialized Rheumatology',
    summary:
      'Clinical evaluation of inflammatory axial arthritis, HLA-B27 correlation, sacroiliitis management, and posture preservation.',
    symptoms: ['Inflammatory night back pain', 'Morning spinal stiffness', 'Enthesitis (heel pain)', 'Hip/buttock ache'],
  },
  {
    id: 'lumbar-disc-radiculopathy',
    name: 'Lumbar Disc Prolapse with Radiculopathy (Sciatica)',
    category: 'Rheumatology & Musculoskeletal',
    urgencyOrCare: 'Medical & Conservative Care',
    summary:
      'Neurological nerve root assessment, MRI correlation, neuropathic pain analgesia, and structured spine rehabilitation to avoid premature surgery.',
    symptoms: ['Sharp electric pain shooting down one leg', 'Foot numbness/pins & needles', 'Pain exacerbated by bending or coughing'],
  },
  {
    id: 'dengue-fever',
    name: 'Dengue Fever',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Urgent Daily Monitoring',
    summary:
      'Early NS1/IgM antigen confirmation, daily serial platelet monitoring, tailored oral/IV hydration protocols, and plasma leak surveillance.',
    symptoms: ['Sudden high-grade fever', 'Severe retro-orbital eye pain', 'Falling platelet count', 'Severe backache (breakbone fever)'],
  },
  {
    id: 'typhoid-fever',
    name: 'Typhoid (Enteric) Fever',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Prompt Clinical Care',
    summary:
      'Blood culture and serology diagnosis, effective oral/injectable antibiotic treatment against resistant enteric strains, and gentle dietary recovery.',
    symptoms: ['Step-ladder rising fever', 'Coated white tongue', 'Abdominal discomfort', 'Severe persistent headache'],
  },
  {
    id: 'chikungunya-fever',
    name: 'Chikungunya Fever',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Clinical Management',
    summary:
      'Vigilant acute and post-viral arthralgia management, anti-inflammatory protocols, and physical therapy for prolonged joint pains.',
    symptoms: ['High sudden fever', 'Severe crippling multi-joint pain', 'Skin rash', 'Extreme fatigue'],
  },
  {
    id: 'brucellosis',
    name: 'Brucellosis',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Specialized Workup',
    summary:
      'Diagnostic serology, multi-week combination antibiotic regimen, and clinical monitoring for persistent or undulant zoonotic fever.',
    symptoms: ['Undulant (fluctuating) prolonged fever', 'Profuse night sweats', 'Joint and lower back pain', 'Malaise & weight loss'],
  },
  {
    id: 'fever-puo',
    name: 'Acute, Chronic & Fever of Unknown Origin (PUO)',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Expert Clinical Edge',
    summary:
      'Exhaustive clinical evaluation and systematic workup for elusive fevers, occult infections, connective tissue diseases, and tropical pathogens.',
    symptoms: ['High or fluctuating body temperature', 'Chills, rigors & night sweats', 'Persistent weakness', 'Unexplained systemic symptoms'],
  },
  {
    id: 'flu-influenza',
    name: 'Flu (Influenza)',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Outpatient Care',
    summary:
      'Symptomatic antiviral and supportive care to relieve high fever, severe myalgia, and avoid secondary chest infections.',
    symptoms: ['High fever & chills', 'Severe muscle and body aches', 'Dry cough & headache', 'Exhaustion'],
  },
  {
    id: 'covid-19',
    name: 'COVID-19 & Post-Viral Illness',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Clinical Evaluation',
    summary:
      'Evidence-based acute outpatient care, pulse oximetry tracking, inflammatory marker monitoring, and post-COVID recovery.',
    symptoms: ['Fever & dry cough', 'Loss of smell or taste', 'Chest heaviness', 'Prolonged fatigue'],
  },
  {
    id: 'uti',
    name: 'UTI (Urinary Tract Infection)',
    category: 'Infectious & Fevers',
    urgencyOrCare: 'Rapid Outpatient Care',
    summary:
      'Urine routine and culture analysis, targeted antibiotic therapy, and recurrence prevention protocols for lower and upper urinary tract infections.',
    symptoms: ['Burning micturition (dysuria)', 'Urinary urgency & frequency', 'Lower abdominal pain', 'Fever with chills (in upper UTI)'],
  },
  {
    id: 'copd',
    name: 'COPD (Chronic Obstructive Lung Disease)',
    category: 'Respiratory',
    urgencyOrCare: 'Longitudinal Pulmonary Care',
    summary:
      'Spirometry review, dual bronchodilator inhaler calibration, pulmonary rehabilitation, and acute exacerbation prevention.',
    symptoms: ['Chronic productive cough with phlegm', 'Progressive breathlessness on exertion', 'Wheezing', 'Chest tightness'],
  },
  {
    id: 'bronchial-asthma',
    name: 'Bronchial Asthma',
    category: 'Respiratory',
    urgencyOrCare: 'Preventive & Acute Care',
    summary:
      'Inhaled corticosteroid and bronchodilator optimization, peak flow monitoring, allergen trigger reduction, and personalized action plans.',
    symptoms: ['Episodic wheezing', 'Night-time or early morning cough', 'Chest tightness', 'Breathlessness triggered by dust/cold'],
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia (Bacterial & Viral)',
    category: 'Respiratory',
    urgencyOrCare: 'Urgent Clinical Workup',
    summary:
      'Chest auscultation, chest X-ray correlation, targeted oral or IV antibiotics, and oxygen monitoring for lower respiratory lung infections.',
    symptoms: ['Productive cough with rust/yellow phlegm', 'Sharp pleuritic chest pain', 'High fever with rigors', 'Rapid breathing'],
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (Pulmonary TB)',
    category: 'Respiratory',
    urgencyOrCare: 'Specialized Program',
    summary:
      'Sputum GeneXpert and chest radiograph evaluation, DOTS compliance counseling, and anti-tubercular therapy (ATT) monitoring.',
    symptoms: ['Cough persisting >2 weeks', 'Hemoptysis (blood in sputum)', 'Low-grade evening fever', 'Unexplained weight loss & night sweats'],
  },
  {
    id: 'pleural-effusion',
    name: 'Pleural Effusion',
    category: 'Respiratory',
    urgencyOrCare: 'Diagnostic Workup',
    summary:
      'Chest imaging review, pleural fluid tap analysis (exudate vs transudate), and targeted medical management of infectious or systemic fluid.',
    symptoms: ['Sharp chest pain worsening on deep breath', 'Progressive shortness of breath', 'Dry cough', 'Dullness on chest examination'],
  },
  {
    id: 'allergic-rhinitis',
    name: 'Allergic Rhinitis',
    category: 'Respiratory',
    urgencyOrCare: 'Outpatient Management',
    summary:
      'Identification of seasonal triggers, nasal corticosteroid optimization, and non-sedating antihistamines for chronic sneezing and nasal congestion.',
    symptoms: ['Repetitive morning sneezing', 'Runny / itchy nose', 'Watery eyes', 'Postnasal drip and throat clearing'],
  },
  {
    id: 'common-cold',
    name: 'Common Cold & Upper Airway Infections',
    category: 'Respiratory',
    urgencyOrCare: 'Outpatient Care',
    summary:
      'Symptomatic viral relief, secondary bacterial infection prevention, decongestants, and avoidance of unnecessary antibiotic overuse.',
    symptoms: ['Stuffy / runny nose', 'Sore scratchy throat', 'Mild headache', 'Low-grade fever & sneezing'],
  },
  {
    id: 'dysentery',
    name: 'Dysentery (Bacterial & Amoebic)',
    category: 'Gastrointestinal & Hepatic',
    urgencyOrCare: 'Prompt Clinical Care',
    summary:
      'Evaluation and targeted antimicrobial / fluid management for severe inflammatory diarrhea, bacterial (Shigella) or amoebic dysentery.',
    symptoms: ['Frequent loose stools with blood/mucus', 'Severe painful abdominal cramps', 'Tenesmus (straining)', 'Fever & dehydration'],
  },
  {
    id: 'diarrhoea',
    name: 'Diarrhoea (Acute & Chronic)',
    category: 'Gastrointestinal & Hepatic',
    urgencyOrCare: 'Outpatient Care',
    summary:
      'Stool examination, rapid oral rehydration therapy, probiotic gut re-establishment, and differentiation of infective vs irritable bowel causes.',
    symptoms: ['Frequent watery bowel movements', 'Dehydration & dry mouth', 'Abdominal cramping', 'Electrolyte depletion'],
  },
  {
    id: 'hepatitis',
    name: 'Hepatitis (Viral & Toxic)',
    category: 'Gastrointestinal & Hepatic',
    urgencyOrCare: 'Diagnostic & Clinical Care',
    summary:
      'Serological differentiation of viral hepatitis (A, B, C, E), drug-induced liver injury, liver function test monitoring, and hepatoprotective care.',
    symptoms: ['Jaundice (yellow skin/eyes)', 'Dark tea-colored urine', 'Severe loss of appetite & nausea', 'Right upper abdomen fullness'],
  },
  {
    id: 'jaundice',
    name: 'Jaundice (Clinical Differential)',
    category: 'Gastrointestinal & Hepatic',
    urgencyOrCare: 'Urgent Diagnostic Workup',
    summary:
      'Fractionated bilirubin and liver enzyme audit, distinguishing pre-hepatic, hepatocellular, and obstructive etiologies with ultrasound imaging.',
    symptoms: ['Yellow sclera of eyes & skin', 'Deep yellow urine', 'Pale/clay colored stools', 'Generalized itching (pruritus)'],
  },
  {
    id: 'abscess-liver',
    name: 'Abscess of Liver (Amoebic & Pyogenic)',
    category: 'Gastrointestinal & Hepatic',
    urgencyOrCare: 'Urgent Medical Management',
    summary:
      'Amoebic and pyogenic liver abscess diagnosis with ultrasound correlation, high-potency antimicrobial coverage, and drainage referral if indicated.',
    symptoms: ['Right upper quadrant liver tenderness', 'High spiking fever with chills & rigors', 'Loss of appetite', 'Referred right shoulder pain'],
  },
  {
    id: 'ascites',
    name: 'Ascites (Abdominal Fluid Accumulation)',
    category: 'Gastrointestinal & Hepatic',
    urgencyOrCare: 'Diagnostic Workup',
    summary:
      'Diagnostic paracentesis correlation, SAAG gradient evaluation, diuretic titration, and sodium-restricted dietary strategy for abdominal fluid accumulation.',
    symptoms: ['Progressive abdominal swelling', 'Rapid unexplained weight gain', 'Breathlessness from diaphragm elevation', 'Bilateral ankle edema'],
  },
];

export const clinicInfo: ClinicInfo = {
  name: 'Shree Maa Krupa Clinic (શ્રી મા કૃપા ક્લિનિક)',
  doctorName: 'Dr. Samir Prajapati, MD (Medicine)',
  address: {
    line1: '2nd Floor, Clinic Centre, 13 Manhar Plot Corner',
    line2: 'Vidyanagar Main Road, Opp. Patel Boarding, Virani Chowk',
    city: 'Rajkot',
    state: 'Gujarat',
    postalCode: '360005',
    country: 'India',
  },
  phone: '+91 63515 39718',
  phoneRaw: '+916351539718',
  email: 'drsamirprajapati@gmail.com',
  hours: {
    weekday: 'Mon – Fri: 09:30 AM – 01:30 PM & 05:00 PM – 08:30 PM',
    saturday: 'Saturday: 09:30 AM – 01:30 PM (Evening: Call Ahead)',
    sunday: 'Sunday: Closed (Emergency on Call)',
  },
  paymentModes: ['Cash', 'UPI (Google Pay, PhonePe, Paytm, BHIM)'],
  covidProtocols: ['Walk-ins Welcomed', 'Sterilization & Hygiene Standards', 'Reception Queue Management'],
  amenities: [
    'Gender Neutral Restroom',
    'Clean Private Restroom',
    'Air-Conditioned Waiting Lounge',
    'Wheelchair Accessible Elevator Access',
  ],
  registration: {
    council: 'Gujarat Medical Council',
    regNumber: 'G 10961',
    year: '2001',
  },
  memberships: [
    { organization: 'Association of Physicians of Rajkot (APR)', tenure: '2007 – Present' },
    { organization: 'Indian Society of Critical Care Medicine (ISCCM)', tenure: '2003 – Present' },
    { organization: 'Association of Physicians of India (API)', tenure: '2000 – Present' },
  ],
  languages: ['English', 'ગુજરાતી (Gujarati)', 'हिंदी (Hindi)'],
  emergencyNotice:
    'For acute emergencies such as chest pain, acute breathlessness, or stroke symptoms, please proceed immediately to the nearest hospital casualty / emergency department.',
  disclaimer:
    'The medical information on this website is for general educational and informational purposes. An online consultation does not substitute for an in-person clinical examination when urgent physical care is warranted.',
};

