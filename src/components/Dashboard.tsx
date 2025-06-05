import React, { useEffect, useState } from 'react';
import { getEnergyData } from '../api/energyApi';

const Dashboard = () => {
  const [energyData, setEnergyData] = useState<any>(null);

  useEffect(() => {
    getEnergyData().then(setEnergyData).catch(console.error);
  }, []);

  if (!energyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Energy Dashboard</h1>
      <pre>{JSON.stringify(energyData, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;