import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PatientForm from '@/components/PatientForm';
import RiskDashboard from '@/components/RiskDashboard';

interface PatientData {
  patientId: string;
  age: number;
  gender: string;
  primaryDiagnosis: string;
  secondaryDiagnoses: string;
  lengthOfStay: number;
  previousAdmissions: number;
  medications: string;
  comorbidities: string;
  dischargePlan: string;
  riskScore: number;
  riskLevel: string;
}

const Dashboard = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const handleFormSubmit = (data: PatientData) => {
    setPatientData(data);
  };

  const handleNewPrediction = () => {
    setPatientData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!patientData ? (
        <div className="space-y-0">
          <HeroSection />
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Patient Risk Assessment
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Enter patient information below to generate a comprehensive readmission risk prediction 
                  with evidence-based recommendations for optimal post-discharge care.
                </p>
              </div>
              <PatientForm onSubmit={handleFormSubmit} />
            </div>
          </section>
        </div>
      ) : (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <RiskDashboard 
            patientData={patientData} 
            onNewPrediction={handleNewPrediction}
          />
        </section>
      )}
    </div>
  );
};

export default Dashboard;