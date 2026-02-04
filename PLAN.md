# LLM Cost Dashboard — Projektplan

> **Status:** 🚧 In Progress — Phase 1 Complete
> **Erstellt:** 2026-02-04
> **Autor:** Winston (AI Assistant)

---

## 1. Projektübersicht

### Problem
Multiple LLM-Services im Einsatz (OpenAI, Anthropic, Google, Azure, Mistral) führen zu:
- Fehlender Gesamtübersicht über Kosten
- Bösen Überraschungen am Monatsende
- Aufwändigem manuellen Tracking

### Lösung
Ein zentrales Dashboard das:
- Real-time Kosten pro Provider anzeigt
- Gesamtkosten aggregiert
- Historische Trends visualisiert
- Bei Budget-Überschreitungen warnt

---

## 2. Features

### Must-Have (MVP)
- [ ] Real-time Kosten pro Anbieter
- [ ] Gesamtkosten-Anzeige
- [ ] Historische Trends (Tag/Woche/Monat)
- [ ] Budget-Alerts
- [ ] Auto-Refresh

### Nice-to-Have (v2)
- [ ] Kosten pro Projekt/Use-Case
- [ ] Prognose für Monatsende
- [ ] Export (CSV/PDF)
- [ ] Mobile App / PWA

---

## 3. Tech Stack

| Komponente | Technologie | Begründung |
|------------|-------------|------------|
| **Frontend** | Next.js 14 + React 18 | SSR, API Routes integriert, React bereits bekannt |
| **Styling** | Tailwind CSS | Schnell, konsistent, responsive |
| **Charts** | Recharts | React-native, leichtgewichtig |
| **Backend** | Next.js API Routes | Kein separater Server nötig |
| **Datenbank** | PostgreSQL | Bereits im Einsatz, robust |
| **ORM** | Prisma | Type-safe, gute DX |
| **Container** | Docker + docker-compose | Lokales Hosting, isoliert |

### Ports
- **Frontend:** `3847` (nicht-standard, vermeidet Konflikte)
- **PostgreSQL:** `5487` (weit weg vom Standard 5432)

---

## 4. Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                    localhost:3847                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Next.js App                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ API Routes  │  │  React Components   │  │
│  │  /         │  │ /api/costs  │  │  Dashboard, Charts  │  │
│  │  /settings │  │ /api/sync   │  │  ProviderCard, etc  │  │
│  └─────────────┘  └──────┬──────┘  └─────────────────────┘  │
└──────────────────────────┼──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Data Layer                                │
│  ┌─────────────┐  ┌─────────────────────────────────────┐   │
│  │   Prisma    │  │         Provider APIs               │   │
│  │     ORM     │  │  OpenAI │ Anthropic │ Google │ ...  │   │
│  └──────┬──────┘  └─────────────────────────────────────┘   │
└─────────┼───────────────────────────────────────────────────┘
          │
┌─────────▼───────┐
│   PostgreSQL    │
│   :5487         │
└─────────────────┘
```

---

## 5. Provider API-Keys — Wie bekommt man sie?

### OpenAI
1. Gehe zu: https://platform.openai.com/account/api-keys
2. Erstelle einen API Key (falls noch nicht vorhanden)
3. Für Usage/Billing: https://platform.openai.com/account/usage
4. **API Endpoint:** `GET https://api.openai.com/v1/usage`
5. **Benötigt:** `OPENAI_API_KEY`

### Anthropic (Claude)
1. Gehe zu: https://console.anthropic.com/settings/keys
2. Erstelle einen API Key
3. Usage: https://console.anthropic.com/settings/usage
4. **API Endpoint:** Anthropic hat keine öffentliche Usage API — wir müssen scrapen oder manuell eingeben
5. **Benötigt:** `ANTHROPIC_API_KEY` (für zukünftige API falls verfügbar)
6. **Workaround:** Manueller CSV-Import oder periodisches Scraping

### Google Cloud / Vertex AI
1. Gehe zu: https://console.cloud.google.com/billing
2. Aktiviere die Cloud Billing API
3. Erstelle einen Service Account mit Billing-Rechten
4. Lade den JSON-Key herunter
5. **API Endpoint:** Cloud Billing API
6. **Benötigt:** `GOOGLE_APPLICATION_CREDENTIALS` (Pfad zur JSON-Datei)

### Microsoft Azure
1. Gehe zu: https://portal.azure.com → Cost Management
2. Erstelle eine App Registration
3. Gib der App "Cost Management Reader" Rolle
4. **API Endpoint:** Azure Cost Management API
5. **Benötigt:** 
   - `AZURE_TENANT_ID`
   - `AZURE_CLIENT_ID`
   - `AZURE_CLIENT_SECRET`
   - `AZURE_SUBSCRIPTION_ID`

### Mistral
1. Gehe zu: https://console.mistral.ai/
2. API Keys unter Settings
3. **Billing API:** Muss recherchiert werden (ggf. limitiert)
4. **Benötigt:** `MISTRAL_API_KEY`

---

## 6. Environment Variables

Erstelle `.env.local` im Projekt-Root (wird nicht committed):

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5487/llm_costs"

# OpenAI
OPENAI_API_KEY="sk-..."
OPENAI_ORG_ID="org-..."  # optional

# Anthropic
ANTHROPIC_API_KEY="sk-ant-..."

# Google Cloud
GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
GOOGLE_PROJECT_ID="your-project-id"

# Azure
AZURE_TENANT_ID="..."
AZURE_CLIENT_ID="..."
AZURE_CLIENT_SECRET="..."
AZURE_SUBSCRIPTION_ID="..."

# Mistral
MISTRAL_API_KEY="..."

# App Settings
MONTHLY_BUDGET=500  # in USD
REFRESH_INTERVAL=300  # seconds (5 min)
```

---

## 7. Datenbank-Schema (Prisma)

```prisma
model Provider {
  id        String   @id @default(cuid())
  name      String   @unique  // "openai", "anthropic", etc.
  displayName String           // "OpenAI", "Anthropic", etc.
  enabled   Boolean  @default(true)
  costs     Cost[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Cost {
  id         String   @id @default(cuid())
  providerId String
  provider   Provider @relation(fields: [providerId], references: [id])
  amount     Decimal  @db.Decimal(10, 4)
  currency   String   @default("USD")
  date       DateTime @db.Date
  month      String   // "2026-02" für einfaches Grouping
  raw        Json?    // Original API Response
  createdAt  DateTime @default(now())
  
  @@unique([providerId, date])
  @@index([month])
}

model Budget {
  id        String   @id @default(cuid())
  month     String   @unique  // "2026-02"
  amount    Decimal  @db.Decimal(10, 2)
  currency  String   @default("USD")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Alert {
  id        String   @id @default(cuid())
  type      String   // "budget_warning", "budget_exceeded"
  message   String
  threshold Int      // percentage (e.g., 80, 100)
  triggered DateTime
  dismissed Boolean  @default(false)
}
```

---

## 8. Meilensteine

### Phase 1: Setup (Tag 1)
- [x] GitHub Repo erstellen
- [x] Plan schreiben und Review
- [x] Next.js Projekt initialisieren
- [x] Docker Compose Setup (App + PostgreSQL)
- [x] Prisma Schema + Migration
- [x] Basic UI Layout

### Phase 2: Core Features (Tag 2-3)
- [ ] Provider API Integration (OpenAI zuerst)
- [ ] Dashboard UI mit Kosten-Cards
- [ ] Historische Daten speichern
- [ ] Trend-Charts

### Phase 3: Alle Provider (Tag 4-5)
- [ ] Anthropic Integration (Workaround falls keine API)
- [ ] Google Cloud Integration
- [ ] Azure Integration
- [ ] Mistral Integration

### Phase 4: Polish (Tag 6)
- [ ] Budget-Alerts
- [ ] Auto-Refresh
- [ ] Responsive Design
- [ ] Error Handling
- [ ] Dokumentation

---

## 9. Offene Fragen

1. **Anthropic Billing API:** Gibt es eine offizielle API? Falls nicht, wie sollen wir die Daten bekommen?
   - Option A: Manueller CSV-Import
   - Option B: Scraping (fragil)
   - Option C: Warten auf offizielle API

2. **Multi-Währung:** Alle Provider in USD umrechnen, oder Originalwährung behalten?

3. **Datenhistorie:** Wie weit zurück sollen wir Daten importieren? Nur ab jetzt, oder historische Daten?

---

## 10. Nächste Schritte

Nach Freigabe dieses Plans:
1. Next.js Projekt aufsetzen
2. Docker Compose konfigurieren
3. Erstes Provider-Integration (OpenAI)
4. MVP Dashboard UI

---

*Bitte reviewe diesen Plan und gib Feedback. Sobald freigegeben, starte ich die Implementierung.*
