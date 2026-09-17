# 🏥 Case Study: Clinic Management System — Modern EHR & Consultation Suite

[![Project Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg?style=for-the-badge)](#)
[![Frontend Architecture](https://img.shields.io/badge/Frontend-React%2019%20%2B%20TypeScript-blue.svg?style=for-the-badge)](#)
[![Design System](https://img.shields.io/badge/Styling-Tailwind%20CSS-teal.svg?style=for-the-badge)](#)
[![Security Vault](https://img.shields.io/badge/Backend%20EHR-Private%20Vault-orange.svg?style=for-the-badge)](#)

> **Architectural Case Study**: The Clinic Management System is a clinical workflow and electronic health record (EHR) web application built with React 19 and TypeScript. It streamlines outpatient department (OPD) bookings, physician consultations, diagnostic attachments, and patient medical histories.

---

## 🛡️ Intellectual Property Notice
*Sensitive electronic health records (EHR), physician consultation models, patient diagnostic logs, and internal clinical algorithms are securely preserved inside a Private Repository. This public repository provides the complete client-side TypeScript frontend codebase, UI components, and architectural blueprints.*

---

## 🏛️ Clinical Architecture Flow

```mermaid
graph LR
    Patient[Patient / Receptionist] -->|Book OPD Slot| Scheduler[OPD Scheduler Engine]
    Scheduler -->|Assign Specialist| DoctorPortal[Doctor Consultation Desk]
    DoctorPortal -->|Log Diagnosis & Rx| EHR[Digital EHR Record]
    DoctorPortal -->|Order Imaging| Diagnostics[Diagnostic Suite]
    EHR -->|Generate Bill & Summary| Billing[Billing & Discharge]
```

---

## ⚙️ Core Technical Highlights

### 1. Type-Safe React 19 & TypeScript Frontend
- Full type safety across medical patient profiles, doctor encounter objects, and diagnostic reports.
- Sub-second hot module replacement powered by Vite and verified with Oxlint linting rules.

### 2. Clinical Scheduling & OPD Booking Engine
- Dynamic slot allocation preventing doctor overbooking across clinical specialties.
- Real-time physician availability toggles and appointment status updates.

### 3. Comprehensive Diagnostic & Consultation Suite
- Integrated laboratory test viewer and radiology imaging attachments.
- Clean medical wayfinding UI with Tabler and Lucide icon systems.

---

## 📸 Visual Showcase

| Modern Diagnostic Suite | Clinical Experience |
| :---: | :---: |
| ![Diagnostic Suite](./assets/diagnostic_suite.jpg) | ![Clinic Interior](./assets/clinic_interior.jpg) |

---

## 📁 Repository Contents
- [`frontend/src/`](./frontend/src/) — Complete React 19 TypeScript components, hooks, and types
- [`frontend/package.json`](./frontend/package.json) — Dependencies and scripts
- [`frontend/tailwind.config.js`](./frontend/tailwind.config.js) — Custom clinical color palette and typography

---

## 📬 Contact & Author
- **Author**: Tirth ([@tirth2907](https://github.com/tirth2907))
- **Email**: [cryptorth2907@gmail.com](mailto:cryptorth2907@gmail.com)
