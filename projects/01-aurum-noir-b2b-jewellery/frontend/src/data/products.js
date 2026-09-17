export const PRODUCTS = [
  {
    id: "AN-BR-01",
    sku: "AN-BR-01",
    name: "The Noor-e-Jahan Kundan Bridal Set",
    category: "bridal-sets",
    tag: "Bestseller",
    isFlashSale: true,
    price: 6499,
    originalPrice: 8999,
    rating: 4.9,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1611591475819-797de233865c?auto=format&fit=crop&w=1000&q=85"
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    description: "An opulent handcrafted bridal suite featuring Jadau Kundan work, delicate emerald bead drops, matching oversized chaandbalis, and a regal maang tikka. Engineered with double-layer 18K micro gold plating for lasting luster.",
    specs: {
      metal: "High-Grade Brass & Copper Alloy",
      plating: "18K Micro Gold Electroplated (Nickel Free)",
      stones: "Uncut Glass Kundan & Hydro Emerald Beads",
      chokerLength: "Adjustable 16 to 22 inches (Handmade Silk Dori)",
      earringWeight: "26 grams per earring",
      closure: "Push Back & Secure Post with Rubber Bullet Stopper"
    },
    variants: ["18K Yellow Gold", "Antique Matte Gold", "Rose Gold Polish"],
    inStock: true,
    dispatchTime: "Ready to Dispatch in 24 Hours",
    matchingItems: ["AN-BG-01", "AN-RG-01"]
  },
  {
    id: "AN-CH-02",
    sku: "AN-CH-02",
    name: "Maharani Emerald & Pearl Choker",
    category: "chokers",
    tag: "Trending",
    isFlashSale: true,
    price: 3899,
    originalPrice: 5200,
    rating: 4.8,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1611591475819-797de233865c?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Multi-strand natural freshwater seed pearls woven with central Russian emerald doublet stone and fine American diamond micro-pave detailing.",
    specs: {
      metal: "Fine Copper Base",
      plating: "Rhodium & 18K Dual-Tone Polish",
      stones: "Cultured Seed Pearls & Hydro Emerald Doublet",
      chokerLength: "14 inches with 3-inch extender chain",
      earringWeight: "14 grams pair",
      closure: "Lobster Claw with Extender"
    },
    variants: ["18K Yellow Gold", "Silver Rhodium"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-ER-02"]
  },
  {
    id: "AN-ER-01",
    sku: "AN-ER-01",
    name: "Royal Mayur Temple Jhumkas",
    category: "earrings",
    tag: "Heritage",
    isFlashSale: false,
    price: 2199,
    originalPrice: 2899,
    rating: 5.0,
    reviewCount: 214,
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665c302e27c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Detailed Nakshi peacock crest crowned with ruby cabochon stones and tiered bell jhumkis finished with clustered pearl gungroos.",
    specs: {
      metal: "Pure Brass",
      plating: "24K Matte Antique Gold Polish",
      stones: "Synthetic Spinel Ruby & Faux Seed Pearls",
      chokerLength: "N/A",
      earringWeight: "18 grams each",
      closure: "Traditional South Screw & Clip"
    },
    variants: ["Antique Matte Gold", "Oxidised Silver"],
    inStock: true,
    dispatchTime: "Dispatches Tomorrow",
    matchingItems: ["AN-CH-02"]
  },
  {
    id: "AN-BG-01",
    sku: "AN-BG-01",
    name: "Devi Polki Openable Kada Pair",
    category: "bangles",
    tag: "Bestseller",
    isFlashSale: true,
    price: 3499,
    originalPrice: 4500,
    rating: 4.9,
    reviewCount: 86,
    images: [
      "https://images.unsplash.com/photo-1611591475819-797de233865c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Pair of openable royal kadas studded with faceted Polki stones and meenakari hand-painted floral borders on the interior rim.",
    specs: {
      metal: "Brass Core with Lac Filler",
      plating: "18K Micro Gold Plated",
      stones: "Faceted Glass Polki & Enamel Meena",
      bangleSize: "Openable (Fits 2.4 to 2.8 sizes)",
      closure: "Side Screw Lock with Safety Chain"
    },
    variants: ["18K Yellow Gold", "Rose Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-BR-01"]
  },
  {
    id: "AN-TM-01",
    sku: "AN-TM-01",
    name: "Gajlaxmi Temple Matte Gold Haar",
    category: "temple",
    tag: "Exclusive",
    isFlashSale: false,
    price: 5899,
    originalPrice: 7500,
    rating: 4.9,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1635767798638-3665c302e27c?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Majestic long temple haar with intricately sculpted Gajlaxmi pendant, auspicious coin motifs, and matte antique finish reminiscent of temple sanctums.",
    specs: {
      metal: "Panchdhatu Copper Blend",
      plating: "Matte Antique South Gold",
      stones: "Kemp Rubies & Green Cabochons",
      chokerLength: "26 inches long haar with dori",
      earringWeight: "16 grams",
      closure: "Thread Dori"
    },
    variants: ["Matte Antique Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-ER-01"]
  },
  {
    id: "AN-RG-01",
    sku: "AN-RG-01",
    name: "Padma Royal Adjustable Statement Ring",
    category: "rings",
    tag: "New",
    isFlashSale: false,
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviewCount: 52,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Blooming lotus statement cocktail ring set with Russian cubic zirconia solitaires and surrounded by delicate pearl halo.",
    specs: {
      metal: "Jewellers Brass",
      plating: "18K Gold Polish",
      stones: "5A Grade Russian CZ & Micro Faux Pearls",
      size: "Free Size (Smooth Adjustable Band)"
    },
    variants: ["18K Yellow Gold", "Rose Gold", "Rhodium Silver"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-BR-01"]
  },
  {
    id: "AN-BR-02",
    sku: "AN-BR-02",
    name: "Sultana Polki & Ruby Bridal Haar",
    category: "bridal-sets",
    tag: "Royal Collection",
    isFlashSale: true,
    price: 7999,
    originalPrice: 10999,
    rating: 5.0,
    reviewCount: 79,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "A monumental 7-layer tiered Polki long necklace suite with ruby droplet clusters, matching grand earrings and royal nath.",
    specs: {
      metal: "Copper & Silver Alloy",
      plating: "22K Micro Gold Plating",
      stones: "Bikaner Cut Polki & Pigeon Blood Rubies",
      chokerLength: "28 inches adjustable",
      earringWeight: "28 grams pair"
    },
    variants: ["18K Yellow Gold", "Antique Matte Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch in 24 Hours",
    matchingItems: ["AN-BG-01", "AN-RG-01"]
  },
  {
    id: "AN-ER-02",
    sku: "AN-ER-02",
    name: "Zirconia Chandelier Party Drops",
    category: "earrings",
    tag: "Party Glam",
    isFlashSale: false,
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 110,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Sleek cascading American diamond chandelier earrings that sparkle with real diamond brilliance under evening party lighting.",
    specs: {
      metal: "Anti-Tarnish Sterling Alloy",
      plating: "Rhodium Platinum Finish",
      stones: "Hearts & Arrows 5A Zirconia",
      earringWeight: "9 grams pair"
    },
    variants: ["Rhodium Silver", "Rose Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-CH-02"]
  },
  {
    id: "AN-CH-03",
    sku: "AN-CH-03",
    name: "Apsara Meenakari Hasli Choker",
    category: "chokers",
    tag: "Artisan",
    isFlashSale: false,
    price: 4299,
    originalPrice: 5600,
    rating: 4.9,
    reviewCount: 64,
    images: [
      "https://images.unsplash.com/photo-1611591475819-797de233865c?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Rigid neck hasli adorned with traditional Jaipur Meenakari enamel, reverse bird engravings, and cascading South Sea imitation pearls.",
    specs: {
      metal: "Pure Brass Sheet",
      plating: "18K Gold Plated",
      stones: "Jaipur Meenakari & Shell Pearls"
    },
    variants: ["18K Yellow Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-ER-01"]
  },
  {
    id: "AN-BR-03",
    sku: "AN-BR-03",
    name: "Kashmiri Piroi Pastel Bridal Suite",
    category: "bridal-sets",
    tag: "Trending",
    isFlashSale: true,
    price: 6999,
    originalPrice: 9499,
    rating: 4.9,
    reviewCount: 91,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Soft pastel mint and blush pink gemstone piroi bridal choker with matching heavy jhumkis, side pasa, and maang tikka.",
    specs: {
      metal: "High Precision Copper",
      plating: "Micro Gold & Matte Mix",
      stones: "Treated Quartz & Carved Melons"
    },
    variants: ["18K Yellow Gold", "Rose Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-BG-01"]
  },
  {
    id: "AN-BG-02",
    sku: "AN-BG-02",
    name: "Kundan Pacheli Broad Bangles (Set of 4)",
    category: "bangles",
    tag: "Bestseller",
    isFlashSale: false,
    price: 4499,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 43,
    images: [
      "https://images.unsplash.com/photo-1611591475819-797de233865c?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Set of 4 ornate Kundan pachheli bangles with ribbed gold rims and green-red enamel side borders.",
    specs: {
      metal: "Brass",
      plating: "18K Micro Gold",
      stones: "Uncut Glass Kundan"
    },
    variants: ["18K Yellow Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-BR-01", "AN-BR-02"]
  },
  {
    id: "AN-TM-02",
    sku: "AN-TM-02",
    name: "Nataraja Antique Temple Choker",
    category: "temple",
    tag: "Heritage",
    isFlashSale: false,
    price: 3699,
    originalPrice: 4800,
    rating: 4.8,
    reviewCount: 38,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85"
    ],
    description: "Dancing Nataraja motif medallion with miniature temple pillars and dark antique South Indian gold patina.",
    specs: {
      metal: "Die-cast Brass",
      plating: "Dark Antique Gold",
      stones: "Cabochon Rubies"
    },
    variants: ["Matte Antique Gold"],
    inStock: true,
    dispatchTime: "Ready to Dispatch",
    matchingItems: ["AN-ER-01"]
  }
];
