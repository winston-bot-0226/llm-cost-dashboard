# LLM Cost Dashboard

A central dashboard to track and manage LLM API costs across multiple providers (OpenAI, Anthropic, Google, Azure, Mistral).

## Features

- 📊 Real-time cost tracking per provider
- 💰 Total cost aggregation
- 📈 Historical trends visualization
- ⚠️ Budget alerts
- 🔄 Auto-refresh

## Tech Stack

- **Frontend:** Next.js 14 + React 18 (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Database:** PostgreSQL
- **ORM:** Prisma

## Ports

- **Frontend:** `http://localhost:3847`
- **PostgreSQL:** `localhost:5487`

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### Development

1. **Clone and install:**
   ```bash
   git clone https://github.com/YOUR_USER/llm-cost-dashboard.git
   cd llm-cost-dashboard
   npm install
   ```

2. **Start the database:**
   ```bash
   docker compose up -d db
   ```

3. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```

4. **Start the dev server:**
   ```bash
   npm run dev -- -p 3847
   ```

5. Open [http://localhost:3847](http://localhost:3847)

### With Docker (full stack)

```bash
docker compose up -d
```

This starts both the Next.js app and PostgreSQL.

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5487/llm_costs"

# Provider API Keys
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
# ... see .env.example for all options
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Main layout with sidebar
│   └── page.tsx        # Dashboard page
├── components/          # React components
│   ├── ProviderCard.tsx
│   ├── TotalCostCard.tsx
│   └── BudgetProgress.tsx
├── lib/                 # Utilities
│   └── db.ts           # Prisma client
└── generated/           # Generated Prisma client
    └── prisma/

prisma/
├── schema.prisma       # Database schema
└── migrations/         # Migration files
```

## License

MIT
