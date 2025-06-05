// Location: app/readings/page.tsx

'use client';

import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000/api/readings';

export default function ReadingsPage() {
  const [readings, setReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReadings() {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error('Failed to fetch readings');
        const data = await res.json();
        setReadings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    loadReadings();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Energy Readings</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && readings.length === 0 && <p>No readings found.</p>}
      <ul className="space-y-3">
        {readings.map(reading => (
          <li key={reading.id} className="p-3 bg-white shadow rounded">
            <div className="font-semibold">{reading.kwhUsed} kWh</div>
            <div className="text-sm text-gray-500">
              {new Date(reading.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
