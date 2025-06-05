const API_BASE = 'http://localhost:4000/api/goals';

export async function fetchGoals() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch goals');
  return res.json();
}

export async function createGoal(goal: any) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error('Failed to create goal');
  return res.json();
}
