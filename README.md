# Job Tracker

A full-stack serverless job application tracker built as a portfolio project.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript + Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix primitives) |
| Animations | Motion (Framer Motion) |
| Backend | AWS Lambda (Node.js/TypeScript) |
| Database | DynamoDB |
| API | API Gateway REST API |

## Features

- **Track Applications** - Add, edit, and delete job applications
- **Status Management** - Track status: Applied, Interview, Offer, Rejected
- **Filter by Status** - Filter applications list by status
- **Dashboard** - Overview with counts by status
- **Responsive Design** - Works on desktop and mobile

## Project Structure

```
job-tracker/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API service layer
│   │   ├── types/        # TypeScript types
│   │   └── constants/    # App constants
│   └── tests/            # E2E tests (Playwright)
├── backend/           # AWS Lambda function
│   └── src/
│       └── index.ts      # Lambda handler with router
└── CLAUDE.md          # Project context for AI assistance
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- AWS CLI (for backend deployment)

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

### Running Tests

```bash
cd frontend
npm run test:e2e          # Run E2E tests
npm run test:e2e:headed   # Run with browser visible
npm run test:e2e:report   # View test report
```

### Backend Deployment

```bash
cd backend
npm install
npm run deploy    # Build, zip, and deploy to Lambda
```

## API Endpoints

Base URL: `https://j6tss5gko7.execute-api.ap-southeast-2.amazonaws.com/dev`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applications` | Get all applications |
| POST | `/applications` | Create new application |
| PUT | `/applications/{id}` | Update application |
| DELETE | `/applications/{id}` | Delete application |

## Roadmap

- [x] Phase 1: Core CRUD functionality
- [x] Phase 1: Dashboard with stats
- [x] Phase 1: Landing page with animations
- [x] Phase 1: Status filtering
- [ ] Phase 2: Authentication (Cognito)
- [ ] Phase 2: AI Resume Generator (Claude API)
- [ ] Deployment: S3 + CloudFront hosting

## License

MIT
