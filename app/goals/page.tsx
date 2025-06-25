'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const API_BASE = 'http://localhost:4000/api/goals';

// Define a type for Goal
interface Goal {
  id: string;
  targetKwh: number;
  startDate: string;
  endDate: string;
  userId: string;
}

// GoalsPage is temporarily deactivated.
export default function GoalsPage() {
  return null;
}
