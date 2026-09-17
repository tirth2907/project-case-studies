export const BRAND_CONFIG = {
  name: "AURUM NOIR",
  tagline: "Master B2B Jewellery Atelier & Wholesale Vault",
  portalType: "B2B", // Future-proof toggle: 'B2B', 'B2C', or 'HYBRID'
  founded: "2018",
  whatsappNumber: "+919876543210",
  whatsappDisplay: "+91 98765 43210",
  email: "wholesale@aurumnoir.com",
  address: "Heritage Jewellery Quarter, Zaveri Bazaar, Mumbai 400002",
  gstin: "27AAACN0192Q1Z3",
  
  // B2B Wholesale Thresholds
  wholesale: {
    minCartValue: 10000, // Min ₹10,000 to place a wholesale order
    defaultMOQ: 3,       // Min 3 pcs per SKU for wholesale pricing
    sampleMarkup: 1.35,  // Sample pcs have 35% markup if ordered below MOQ
    tiers: [
      { minQty: 3, discount: 0, label: "Wholesale MOQ (3+ pcs)" },
      { minQty: 12, discount: 15, label: "Volume Lot (12+ pcs) • 15% Extra Off" },
      { minQty: 36, discount: 25, label: "Master Distributor (36+ pcs) • 25% Extra Off" }
    ],
    privateLabelMinQty: 100 // Custom boutique logo cards
  },

  currencies: {
    INR: { symbol: "₹", rate: 1, name: "Indian Rupee" },
    USD: { symbol: "$", rate: 0.012, name: "US Dollar" },
    AED: { symbol: "AED ", rate: 0.044, name: "UAE Dirham" },
    GBP: { symbol: "£", rate: 0.0095, name: "British Pound" },
    CAD: { symbol: "CA$ ", rate: 0.016, name: "Canadian Dollar" }
  },

  coupons: {
    "FIRSTBULK": { discount: 1000, type: "flat", minSpend: 15000 },
    "EXPORTERS5": { discount: 5, type: "percent", minSpend: 30000 }
  }
};

export const formatPrice = (amountINR, currency = "INR") => {
  const curr = BRAND_CONFIG.currencies[currency] || BRAND_CONFIG.currencies.INR;
  const converted = Math.round(amountINR * curr.rate);
  return `${curr.symbol}${converted.toLocaleString()}`;
};

export const generateB2BWhatsAppPO = (cart, grandTotal, businessData = {}) => {
  let itemsList = cart.map((item, idx) => 
    `${idx + 1}. *${item.name}* (SKU: ${item.sku})\n   • Variant: ${item.variant}\n   • Quantity: ${item.qty} pcs @ ₹${item.price}/pc = ₹${(item.price * item.qty).toLocaleString()}`
  ).join('\n\n');

  const message = `*OFFICIAL B2B WHOLESALE PURCHASE ORDER (PO)* 📋✨\n---------------------------------------\n*Buyer Business:* ${businessData.businessName || 'Verified Retail Boutique'}\n*GSTIN / Tax ID:* ${businessData.gstin || 'Pending Verification'}\n*City / Country:* ${businessData.city || 'India / Export'}\n---------------------------------------\n*ORDER LINE ITEMS:*\n${itemsList}\n\n---------------------------------------\n*Total Pieces:* ${cart.reduce((a, b) => a + b.qty, 0)} pcs\n*Estimated Wholesale Total:* ₹${grandTotal.toLocaleString()}\n---------------------------------------\nPlease share formal Proforma Invoice and bank wire/RTGS coordinates for 50% production advance. Thank you!`;

  return `https://wa.me/${BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
};

export const generateWhatsAppLink = (product, variant = "18K Gold Plated") => {
  const message = `Hello AURUM NOIR Factory Concierge! ✨\nI am inquiring for a B2B Wholesale Bulk Lot:\n\n*${product.name}*\n• SKU: ${product.sku}\n• Variant/Lot: ${variant}\n• Wholesale Unit Price: ₹${product.price ? product.price.toLocaleString() : 'N/A'}\n\nPlease let me know factory availability and production lead times for bulk dispatch. Thank you!`;
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
};
