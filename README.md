# Health Dashboard

A patient-facing health dashboard built with Next.js, Typescript, Supabase Database and Tailwind CSS.

# Live Demo Link: https://health-dashboard-six.vercel.app/

## Features

- Componentised files added
- Typescript interfaces and types included
- User data and authentication implemented using Supabase
- Use of Server components implemented (In the services page)
- Next JS get and post APIs used.
- TailwindCSS and Shadcn implemented for clean and concise UI. 

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (for data storage)

# API CALLS
- GET NextJs API to get `patient data` and display on Home Page
- GET NextJs API to get `services` and display on Services Page
- POST selected_services to the `user_services` table in DB
- GET Next JS API to get `my_services` on /my_services page

# PAGES

### Home Page
- Biomarker summary with total, in-range, and out-of-range counts
- Age comparison visualization
- Doctor information display

### Services Page
- Grid layout of available health services
- Service cards with key information
- Detailed service view with appointment scheduling

### My Services
- View and manage selected health services
- Track appointment dates and service status


## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/health-dashboard.git
cd health-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/src
├── app/                      # Next.js App Router structure
│   ├── api/                  # API routes
│   │   ├── patient/          # Patient data API endpoint
│   │   └── services/         # Services API endpoints
│   ├── auth/                 # Authentication pages
│   │   ├── login/            # Login page
│   │   └── register/         # Registration page
│   ├── my-services/          # My Services page
│   ├── services/             # Services list page
│   │   └── [id]/             # Service detail page
│   ├── auth-provider.tsx     # Authentication context provider
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Reusable components
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── BiomarkersCard.tsx
│   │   ├── BiologicalAgeCard.tsx
│   │   ├── DoctorInfoCard.tsx
│   │   └── DoctorAppointmentCard.tsx
│   ├── ui/                   # UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── service-card.tsx
│   │   └── skeleton.tsx
│   └── NavBar.tsx            # Navigation bar component
└── lib/                      # Utility libraries
    └── supabase.ts           # Supabase client configuration
```

