import React from 'react';
import DashboardLayout from './components/DashboardLayout';
import DashboardWidgets from './components/DashboardWidgets';
import OverviewSection from './components/OverviewSection';

function App() {
  return (
    <DashboardLayout>
      <DashboardWidgets />
      <OverviewSection />
    </DashboardLayout>
  );
}

export default App;
