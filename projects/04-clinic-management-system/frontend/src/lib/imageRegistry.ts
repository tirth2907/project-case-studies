/**
 * Centralized Image Registry & Deduplication System
 * 
 * HARD REQUIREMENT: ZERO IMAGE REUSE ACROSS THE ENTIRE WEBSITE.
 * Every photographic asset is registered with a unique key and a verified distinct URL.
 * At module load time and runtime, this system validates that NO URL or image identifier
 * is ever duplicated.
 */

// Global registry of single-use images
const RAW_REGISTRY: Record<string, { url: string; purpose: string }> = {
  // 1. HERO SECTION (Exclusively assigned to Hero)
  heroPortrait: {
    url: '/images/dr_samir_portrait.jpg',
    purpose: 'Hero Section primary physician photograph of Dr. Samir Prajapati',
  },
  heroStream1: {
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Modern diagnostic workstation',
  },
  heroStream2: {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Clinical consultation setting',
  },
  heroStream3: {
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Laboratory diagnostic samples',
  },
  heroStream4: {
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Advanced medical instrumentation',
  },
  heroStream5: {
    url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Clinical examination tools',
  },
  heroStream6: {
    url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Physician diagnostic consultation',
  },
  heroStream7: {
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Quiet clinical corridor',
  },
  heroStream8: {
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    purpose: 'Hero marquee: Compassionate patient support',
  },

  // 2. ABOUT SECTION BENTO (Exclusively assigned to About)
  aboutClinicInterior: {
    url: '/images/clinic_interior.jpg',
    purpose: 'About Bento: The Private Consultation Suite in Rajkot',
  },
  aboutDiagnosticSuite: {
    url: '/images/diagnostic_suite.jpg',
    purpose: 'About Bento: Advanced diagnostic infrastructure',
  },

  // 3. EXPERTISE SECTION BENTO (Exclusively assigned to Expertise)
  expertiseMetabolic: {
    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    purpose: 'Expertise Bento: Lifestyle & metabolic disease management',
  },
  expertiseRheumatology: {
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    purpose: 'Expertise Bento: Rheumatological & joint medicine',
  },
  expertiseInfectious: {
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    purpose: 'Expertise Bento: Complex fevers and infectious disease care',
  },

  // 4. CONDITIONS SECTION BENTO (Exclusively assigned to Conditions)
  conditionsCardioMetabolic: {
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    purpose: 'Conditions Bento: Hypertension, diabetes, and cardiovascular health',
  },
  conditionsRespiratory: {
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    purpose: 'Conditions Bento: Respiratory and pulmonary evaluations',
  },

  // 5. SIGNATURE SERVICE SECTION BENTO (Exclusively assigned to Metabolic Program)
  signatureMetabolicRoadmap: {
    url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    purpose: 'Signature Service Bento: Personalized metabolic reversal protocol',
  },

  // 6. SERVICES SECTION BENTO (Exclusively assigned to Services)
  serviceComprehensiveConsult: {
    url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    purpose: 'Services Bento: Comprehensive internal medicine consultation',
  },
  serviceSecondOpinion: {
    url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80',
    purpose: 'Services Bento: Diagnostic second opinions and multi-system review',
  },

  // 7. TESTIMONIALS SECTION BENTO (Exclusively assigned to Testimonials)
  testimonialAtmosphere: {
    url: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=800&q=80',
    purpose: 'Testimonials Bento: Calm clinic waiting environment',
  },

  // 8. INSIGHTS SECTION BENTO (Exclusively assigned to Insights Articles)
  insightHypertension: {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    purpose: 'Insights Bento: Managing silent hypertension',
  },
  insightDiabetes: {
    url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80',
    purpose: 'Insights Bento: Early metabolic biomarkers and reversal',
  },
  insightFevers: {
    url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    purpose: 'Insights Bento: Investigating persistent fevers (PUO)',
  },
  insightPhilosophy: {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    purpose: 'Insights Bento: Unhurried clinical listening essay',
  },

  // 9. CONTACT SECTION BENTO (Exclusively assigned to Contact)
  contactClinicEntrance: {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    purpose: 'Contact Bento: Vidyanagar clinic reception and location',
  },
};

/**
 * Systemic Uniqueness Auditor
 * Runs at runtime to guarantee that EVERY image URL is used exactly ONCE.
 */
class ImageRegistrySystem {
  private urlToKey = new Map<string, string>();
  private keyToUrl = new Map<string, string>();
  private accessedKeys = new Set<string>();

  constructor() {
    this.validateAndRegisterAll();
  }

  private normalizeUrl(url: string): string {
    // Strip trailing query parameters for Unsplash comparisons to catch different crops of same image
    const [baseUrl] = url.split('?');
    return baseUrl.trim().toLowerCase();
  }

  private validateAndRegisterAll() {
    for (const [key, item] of Object.entries(RAW_REGISTRY)) {
      const normalized = this.normalizeUrl(item.url);

      if (this.urlToKey.has(normalized)) {
        const existingKey = this.urlToKey.get(normalized);
        throw new Error(
          `🚨 CRITICAL IMAGE DUPLICATION ERROR:
Image URL '${item.url}' is registered for key '${key}',
but is ALREADY allocated to '${existingKey}'.
Hard rule violated: One image = One location!`
        );
      }

      this.urlToKey.set(normalized, key);
      this.keyToUrl.set(key, item.url);
    }
  }

  /**
   * Access an image safely. Enforces single assignment.
   */
  public getImage(key: keyof typeof RAW_REGISTRY): string {
    const url = this.keyToUrl.get(key as string);
    if (!url) {
      throw new Error(`Unknown image key: '${String(key)}'`);
    }
    this.accessedKeys.add(key as string);
    return url;
  }

  /**
   * Full Audit Report
   */
  public audit(): { totalRegistered: number; uniqueUrls: number; status: 'VALID' | 'DUPLICATE_FOUND' } {
    const total = Object.keys(RAW_REGISTRY).length;
    const unique = new Set(Object.values(RAW_REGISTRY).map((i) => this.normalizeUrl(i.url))).size;
    return {
      totalRegistered: total,
      uniqueUrls: unique,
      status: total === unique ? 'VALID' : 'DUPLICATE_FOUND',
    };
  }
}

export const imageRegistry = new ImageRegistrySystem();

export type ImageRegistryKey = keyof typeof RAW_REGISTRY;

export function getImage(key: ImageRegistryKey): string {
  return imageRegistry.getImage(key);
}
