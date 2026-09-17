# Case Study: AURUM NOIR — Luxury B2B Imitation Jewellery Platform

## Executive Summary
**AURUM NOIR** is an haute-couture B2B digital wholesale platform designed specifically for high-volume imitation and fine jewellery distributors. The platform bridges the artisanal craftsmanship of traditional karigars with enterprise procurement tools, delivering a curated, velvet-glove digital showroom.

---

## 🎨 Design System: "Maison Vendôme"

AURUM NOIR operates on a bespoke, hyper-tailored design philosophy rooted in Cashmere Greige and Tuscan Bronze.

### Color Palette Architecture
- **Primary Canvas (Cashmere Greige)**: `#EDE8E3` — Evoking Parisian limestone, raw parchment, and brushed cashmere.
- **Secondary Structural Accents (Tuscan Bronze)**: `#6E473B` — Hand-rubbed Florentine bronze providing warmth, grounding, and luxury contrast.
- **Accent Radiance (Florentine Gold)**: `#C8A84E` — Micro-shimmer accents, star badges, and interactive feedback highlights.
- **Surface Elevation**: `#F5F2EE` — Delicate layered cards with subtle warm shadows (`box-shadow: 0 12px 36px rgba(44, 24, 16, 0.08)`).
- **Communication Channel (Direct WhatsApp Karigar)**: Restored to classic emerald `#1F6B3E` with an active karigar beacon pulse.

---

## 🏗️ Core Architectural Modules

### 1. The Architectural Plinth (Product Cards)
Unlike generic e-commerce grid cards, AURUM NOIR cards are constructed as museum pedestals:
- **Aspect Ratio**: 4:5 vertical portrait frame maximizing detail view for intricate bridal sets, necklaces, and polki chokers.
- **Cinematic Dual-Image Crossfade**: Smooth opacity transition revealing reverse craftsmanship angles on hover.
- **Dynamic B2B Tier Margin Indicator**: Prominently calculates estimated retail gross profit margins (`+62% Margin`) beside bulk wholesale piece rates (`₹2,469/pc`).
- **One-Click Quick Order Drawer**: Slide-up Tuscan Bronze drawer allowing rapid quantity selection (`5 / 10 / 25 / 50 pcs`) without leaving the catalogue view.

### 2. Centered Proforma Purchase Order Vault
Converted from standard sidebar drawers into a grand, centered dual-column modal:
- **Left Column**: High-density line-item breakdown with pack MOQ validation, metal finish toggles, and live piece count adjustments.
- **Right Column (Financial Summary)**: Real-time wholesale subtotal calculation, automated B2B volume tier discount deduction, applicable GST/customs computations, and direct WhatsApp proforma dispatch button.

### 3. Editorial Lookbook & Studio Reel
- Full-viewport interactive editorial spreads featuring clickable hot-spots that open instant variant order pads.
- Dynamic video reel component streaming 4K studio craft videos showcasing shimmer, stone setting, and durability.

---

## 💻 Frontend Technology Stack
- **Framework**: React 18 with Vite for instantaneous compilation and sub-second HMR.
- **Styling Architecture**: Strict Vanilla CSS Tokens (`variables.css` + `global.css`) ensuring zero runtime CSS-in-JS overhead.
- **Animation & Physics**: Framer Motion orchestrating frictionless modal reveals, drawer transitions, and pulse indicators.
- **Currency Engine**: Dynamic client-side exchange rate matrix supporting INR (₹), USD ($), EUR (€), GBP (£), and AED (د.إ).

---

## 🔒 Intellectual Property & Backend Security
All inventory forecasting algorithms, wholesale distributor pricing logic, supplier contracts, and database records are securely stored in private repositories.
