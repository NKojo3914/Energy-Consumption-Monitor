# Energy Monitor Dashboard

A comprehensive energy monitoring and management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Real-time Energy Monitoring**: Track energy consumption across all connected devices
- **Device Management**: Add, configure, and monitor smart devices
- **Analytics & Reports**: Detailed energy usage analytics with customizable reports
- **AI-Powered Recommendations**: Get intelligent suggestions for energy optimization
- **Alert System**: Real-time notifications for unusual energy patterns
- **Efficiency Tracking**: Monitor and improve energy efficiency scores

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React hooks + Context API
- **API**: Next.js API Routes
- **Database**: PostgreSQL (recommended)
- **Authentication**: JWT tokens
- **Real-time**: WebSocket connections (planned)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd energy-monitor
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your configuration
\`\`\`

4. Set up the database:
\`\`\`bash
# Run database migrations (implement with your preferred ORM)
npm run db:migrate
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

### Authentication

#### POST /api/auth/login
Login with email and password.

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token"
  }
}
\`\`\`

### Devices

#### GET /api/devices
Get all devices for the authenticated user.

#### POST /api/devices
Create a new device.

#### PUT /api/devices/:id
Update a device.

#### DELETE /api/devices/:id
Delete a device.

### Energy Data

#### GET /api/energy/realtime
Get real-time energy consumption data.

#### GET /api/energy/data
Get historical energy data with date range filtering.

**Query Parameters:**
- `startDate`: ISO date string
- `endDate`: ISO date string
- `deviceId`: Optional device filter

### Alerts

#### GET /api/alerts
Get paginated alerts.

#### PUT /api/alerts/:id/read
Mark an alert as read.

#### PUT /api/alerts/:id/resolve
Resolve an alert.

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Devices Table
\`\`\`sql
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'online',
  current_power DECIMAL(10,2) DEFAULT 0,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Energy Data Table
\`\`\`sql
CREATE TABLE energy_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  timestamp TIMESTAMP NOT NULL,
  consumption DECIMAL(10,4) NOT NULL,
  production DECIMAL(10,4) DEFAULT 0,
  cost DECIMAL(10,2) NOT NULL,
  carbon_footprint DECIMAL(10,4) NOT NULL,
  efficiency DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Backend Integration Guide

### For Backend Developers

This frontend is designed to work with a RESTful API. Here's what you need to implement:

1. **Authentication System**
   - JWT-based authentication
   - User registration and login
   - Password reset functionality

2. **Database Models**
   - Implement the database schema provided above
   - Add proper indexes for performance
   - Set up relationships between tables

3. **API Endpoints**
   - Implement all the API routes defined in `/app/api/`
   - Add proper validation and error handling
   - Implement pagination for list endpoints

4. **Real-time Features**
   - WebSocket connections for live energy data
   - Push notifications for alerts
   - Real-time device status updates

5. **External Integrations**
   - Smart meter APIs
   - IoT device connections
   - Email service for notifications
   - File storage for reports

6. **Security**
   - Input validation and sanitization
   - Rate limiting
   - CORS configuration
   - SQL injection prevention

### Data Flow

1. **Device Registration**: Devices send data to your backend via IoT protocols
2. **Data Processing**: Backend processes and stores energy data
3. **API Consumption**: Frontend fetches data via REST APIs
4. **Real-time Updates**: WebSocket connections for live updates
5. **Alerts**: Backend generates alerts based on thresholds
6. **Reports**: Backend generates and stores reports

## Deployment

### Frontend Deployment (Vercel)
\`\`\`bash
npm run build
# Deploy to Vercel or your preferred platform
\`\`\`

### Backend Requirements
- PostgreSQL database
- Redis for caching (optional)
- File storage (AWS S3 or similar)
- Email service (SendGrid or similar)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
