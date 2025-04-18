# Health Dashboard

A patient-facing health dashboard built with Next.js and Chakra UI.

## Features

- View health biomarker summary
- Compare biological age with chronological age
- View assigned doctor information
- Browse and select health services
- Schedule appointments
- Dark mode support

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Chakra UI
- Supabase (for data storage)

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
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   ├── page.tsx
│   │   └── services/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── MainLayout.tsx
│   ├── dashboard/
│   │   ├── BiomarkerSummary.tsx
│   │   ├── AgeComparison.tsx
│   │   └── DoctorInfo.tsx
│   └── services/
│       └── ServiceCard.tsx
└── lib/
    └── supabase.ts
```

## Features Implementation

### Home Page
- Biomarker summary with total, in-range, and out-of-range counts
- Age comparison visualization
- Doctor information display

### Services Page
- Grid layout of available health services
- Service cards with key information
- Detailed service view with appointment scheduling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
