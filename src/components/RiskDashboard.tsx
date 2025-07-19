import { AlertTriangle, CheckCircle, Clock, TrendingUp, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

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

interface RiskDashboardProps {
  patientData: PatientData;
  onNewPrediction: () => void;
}

const RiskDashboard = ({ patientData, onNewPrediction }: RiskDashboardProps) => {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Clock className="h-5 w-5" />;
      case 'low': return <CheckCircle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getRiskRecommendations = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return [
          'Schedule follow-up within 48-72 hours',
          'Consider home health services',
          'Medication reconciliation required',
          'Care coordination with specialists',
          'Patient education on warning signs'
        ];
      case 'medium':
        return [
          'Schedule follow-up within 1 week',
          'Ensure medication adherence',
          'Monitor for symptom changes',
          'Provide discharge education',
          'Consider telehealth monitoring'
        ];
      case 'low':
        return [
          'Routine follow-up in 2-4 weeks',
          'Standard discharge instructions',
          'Primary care coordination',
          'Lifestyle counseling if applicable'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Risk Assessment Results</h2>
          <p className="text-muted-foreground">Patient ID: {patientData.patientId}</p>
        </div>
        <Button onClick={onNewPrediction} variant="outline">
          New Prediction
        </Button>
      </div>

      {/* Risk Score Card */}
      <Card className="border-l-4 border-l-primary bg-gradient-to-r from-card to-muted/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full bg-${getRiskColor(patientData.riskLevel)}/10`}>
                {getRiskIcon(patientData.riskLevel)}
              </div>
              <div>
                <CardTitle className="text-2xl">
                  Readmission Risk: {patientData.riskLevel}
                </CardTitle>
                <CardDescription>
                  30-day readmission probability assessment
                </CardDescription>
              </div>
            </div>
            <Badge variant={getRiskColor(patientData.riskLevel) as any} className="text-lg px-4 py-2">
              {patientData.riskScore}% Risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Risk Score</span>
              <span>{patientData.riskScore}/100</span>
            </div>
            <Progress value={patientData.riskScore} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Risk (0-39)</span>
              <span>Medium Risk (40-69)</span>
              <span>High Risk (70-100)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Patient Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{patientData.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium capitalize">{patientData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Length of Stay:</span>
                <span className="font-medium">{patientData.lengthOfStay} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Previous Admissions:</span>
                <span className="font-medium">{patientData.previousAdmissions}</span>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <h4 className="font-medium mb-2">Primary Diagnosis</h4>
              <p className="text-sm text-muted-foreground">{patientData.primaryDiagnosis}</p>
            </div>
            
            {patientData.comorbidities && (
              <div className="pt-3 border-t">
                <h4 className="font-medium mb-2">Comorbidities</h4>
                <p className="text-sm text-muted-foreground">{patientData.comorbidities}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Clinical Recommendations</span>
            </CardTitle>
            <CardDescription>
              Evidence-based interventions to reduce readmission risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getRiskRecommendations(patientData.riskLevel).map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
            
            {patientData.dischargePlan && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Current Discharge Plan</h4>
                <p className="text-sm text-muted-foreground bg-card p-3 rounded-lg border">
                  {patientData.dischargePlan}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factors Analysis</CardTitle>
          <CardDescription>
            Key factors contributing to readmission risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Age Factor</span>
                <Badge variant={patientData.age > 65 ? 'destructive' : patientData.age > 50 ? 'warning' : 'success'}>
                  {patientData.age > 65 ? 'High' : patientData.age > 50 ? 'Medium' : 'Low'}
                </Badge>
              </div>
              <Progress value={patientData.age > 65 ? 80 : patientData.age > 50 ? 50 : 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Length of Stay</span>
                <Badge variant={patientData.lengthOfStay > 7 ? 'destructive' : patientData.lengthOfStay > 3 ? 'warning' : 'success'}>
                  {patientData.lengthOfStay > 7 ? 'High' : patientData.lengthOfStay > 3 ? 'Medium' : 'Low'}
                </Badge>
              </div>
              <Progress value={Math.min(patientData.lengthOfStay * 10, 100)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Previous Admissions</span>
                <Badge variant={patientData.previousAdmissions > 2 ? 'destructive' : patientData.previousAdmissions > 0 ? 'warning' : 'success'}>
                  {patientData.previousAdmissions > 2 ? 'High' : patientData.previousAdmissions > 0 ? 'Medium' : 'Low'}
                </Badge>
              </div>
              <Progress value={Math.min(patientData.previousAdmissions * 25, 100)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Comorbidity Load</span>
                <Badge variant={patientData.comorbidities?.split(',').length > 2 ? 'destructive' : patientData.comorbidities?.split(',').length > 0 ? 'warning' : 'success'}>
                  {patientData.comorbidities?.split(',').length > 2 ? 'High' : patientData.comorbidities?.split(',').length > 0 ? 'Medium' : 'Low'}
                </Badge>
              </div>
              <Progress value={Math.min((patientData.comorbidities?.split(',').length || 0) * 30, 100)} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDashboard;