'use client';

import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000/api/goals';

// Define a type for Goal
interface Goal {
  id: string;
  targetKwh: number;
  startDate: string;
  endDate: string;
  userId: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGoals() {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error('Failed to fetch goals');
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    loadGoals();
  }, []);

  const handleAddGoal = async () => {
    const newGoal = {
      targetKwh: 300,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      userId: 'demo-user-id', // TODO: Replace with real auth user ID
    };

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal),
      });
      if (!res.ok) throw new Error('Failed to create goal');
      const createdGoal = await res.json();
      setGoals(prev => [...prev, createdGoal]);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(String(err));
      }
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Energy Goals</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && goals.length === 0 && <p>No goals found.</p>}
      <ul className="space-y-3">
        {goals.map(goal => (
          <li key={goal.id} className="p-3 bg-white shadow rounded">
            <div className="font-semibold">{goal.targetKwh} kWh</div>
            <div className="text-sm text-gray-500">
              {goal.startDate.slice(0, 10)} → {goal.endDate.slice(0, 10)}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddGoal}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Demo Goal
      </button>
    </main>
  );
}
