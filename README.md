# Job and Networking Portal - AI-Powered Professional Platform

A comprehensive full-stack job networking platform that combines AI-powered matching, Web3 payments, and professional networking features. Built with Next.js, TypeScript, and modern web technologies.

## Features

### Core Functionality
- **User Authentication**: JWT-based login and registration system
- **Profile Management**: Complete professional profiles with AI skill extraction
- **Job Posting & Search**: Advanced job posting with blockchain payment integration
- **AI-Powered Matching**: Smart job-candidate matching with compatibility scores
- **Professional Feed**: Social networking features for career updates and advice
- **Application System**: Streamlined job application process with tracking

### Web3 Integration
- **MetaMask Wallet Connection**: Secure wallet integration for payments
- **Blockchain Payments**: 0.001 ETH payment for job postings
- **Multi-Network Support**: Ethereum, Polygon, Arbitrum compatibility
- **Transaction Verification**: On-chain payment confirmation

### AI Features
- **Skill Extraction**: Automatic skill detection from profiles and job descriptions
- **Job Matching**: NLP-based compatibility scoring between candidates and jobs
- **Smart Recommendations**: Personalized job suggestions based on user profiles

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/UI**: Modern component library
- **Lucide React**: Icon system

### Backend
- **Next.js API Routes**: Server-side functionality
- **JWT Authentication**: Secure user sessions
- **RESTful APIs**: Standard API design patterns

### Database
- **SQL Schema**: Comprehensive database structure
- **Relational Design**: Normalized data relationships
- **Indexing**: Optimized query performance

### Web3
- **MetaMask Integration**: Wallet connection and management
- **Ethereum Blockchain**: Payment processing
- **Web3.js**: Blockchain interaction library

### AI/ML
- **NLP Processing**: Text analysis for skill extraction
- **Matching Algorithms**: Compatibility scoring systems
- **OpenAI Integration**: Advanced AI capabilities

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask browser extension
- SQL database (PostgreSQL recommended)

### Setup Steps

1. **Clone Repository**
   \`\`\`bash
   git clone https://github.com/your-username/job-networking-portal.git
   cd job-networking-portal
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Configuration**
   Create `.env.local` file:
   \`\`\`
   JWT_SECRET=your-jwt-secret-key
   DATABASE_URL=your-database-connection-string
   OPENAI_API_KEY=your-openai-api-key
   \`\`\`

4. **Database Setup**
   \`\`\`bash
   # Run database creation script
   npm run db:create
   
   # Run seed data script
   npm run db:seed
   \`\`\`

5. **Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Getting Started
1. **Create Account**: Register with email and professional bio
2. **Connect Wallet**: Link MetaMask for Web3 features
3. **Complete Profile**: Add skills, experience, and location
4. **Explore Jobs**: Browse AI-matched job opportunities

### For Job Seekers
- **Profile Optimization**: Use AI skill extraction for better matching
- **Job Applications**: Apply with one-click to relevant positions
- **Match Scores**: View compatibility ratings for each job
- **Network Building**: Connect with industry professionals

### For Employers
- **Job Posting**: Pay 0.001 ETH to post verified job listings
- **Candidate Matching**: Receive AI-scored candidate recommendations
- **Application Management**: Track and manage job applications
- **Secure Payments**: Blockchain-verified payment processing

## API Documentation

### Authentication Endpoints
- `POST /api/auth` - User login/registration
- `GET /api/auth/verify` - Token verification

### Job Management
- `GET /api/jobs` - Fetch job listings with filters
- `POST /api/jobs` - Create new job posting
- `POST /api/jobs/apply` - Submit job application

### AI Services
- `POST /api/ai/extract-skills` - Extract skills from text
- `POST /api/ai/job-match` - Calculate job compatibility

### Web3 Integration
- `POST /api/web3/payment` - Process blockchain payments
- `GET /api/web3/payment` - Verify payment status

## Database Schema

### Core Tables
- **users**: User profiles and authentication
- **jobs**: Job postings and requirements
- **applications**: Job application tracking
- **payments**: Blockchain payment records
- **skills**: User and job skill mappings

### Relationships
- Users can post multiple jobs
- Jobs can have multiple applications
- Applications link users to jobs
- Payments verify job posting transactions

## Security Features

### Authentication
- JWT token-based sessions
- Password hashing with bcrypt
- Secure API route protection

### Web3 Security
- MetaMask signature verification
- Blockchain transaction validation
- Secure wallet address storage

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection measures

## Performance Optimizations

### Frontend
- Next.js App Router for optimal loading
- Component lazy loading
- Image optimization
- Responsive design patterns

### Backend
- Database query optimization
- API response caching
- Efficient data structures

### AI Processing
- Skill extraction caching
- Batch processing for matches
- Optimized NLP algorithms

## Deployment

### Production Build
\`\`\`bash
npm run build
npm start
\`\`\`

### Environment Variables
\`\`\`
NODE_ENV=production
JWT_SECRET=production-secret
DATABASE_URL=production-database-url
OPENAI_API_KEY=production-openai-key
\`\`\`

### Hosting Recommendations
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render
- **Database**: PostgreSQL on Railway, Supabase

## Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Implement changes
4. Add tests
5. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

## License

MIT License - see LICENSE file for details

## Support

For technical support or questions:
- Create GitHub issue
- Email: support@jobportal.com
- Documentation: [docs.jobportal.com](https://docs.jobportal.com)

## Roadmap

### Phase 1 (Current)
- Core platform functionality
- Basic AI matching
- Web3 payment integration

### Phase 2 (Q2 2024)
- Mobile application
- Advanced AI features
- Enterprise partnerships

### Phase 3 (Q3 2024)
- Smart contract automation
- Token-based rewards
- Global expansion

---

Built with modern web technologies for the future of professional networking.
