import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, User, Activity, FileText, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

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
}

interface PatientFormProps {
  onSubmit: (data: PatientData & { riskScore: number; riskLevel: string }) => void;
}

const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PatientData>();

  const calculateRiskScore = (data: PatientData): { riskScore: number; riskLevel: string } => {
    let score = 0;
    
    // Age factor
    if (data.age > 65) score += 25;
    else if (data.age > 50) score += 15;
    
    // Length of stay factor
    if (data.lengthOfStay > 7) score += 20;
    else if (data.lengthOfStay > 3) score += 10;
    
    // Previous admissions factor
    score += Math.min(data.previousAdmissions * 15, 30);
    
    // Random factor for demo purposes
    score += Math.floor(Math.random() * 20);
    
    const riskScore = Math.min(score, 100);
    const riskLevel = riskScore >= 70 ? 'High' : riskScore >= 40 ? 'Medium' : 'Low';
    
    return { riskScore, riskLevel };
  };

  const onFormSubmit = async (data: PatientData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const risk = calculateRiskScore(data);
    onSubmit({ ...data, ...risk });
    
    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Patient Assessment</CardTitle>
            <CardDescription>
              Enter patient information to predict readmission risk
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  placeholder="e.g., P-001234"
                  {...register('patientId', { required: 'Patient ID is required' })}
                />
                {errors.patientId && (
                  <p className="text-sm text-destructive">{errors.patientId.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="65"
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 0, message: 'Age must be positive' },
                    max: { value: 120, message: 'Age must be realistic' }
                  })}
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Clinical Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Clinical Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryDiagnosis">Primary Diagnosis</Label>
                <Input
                  id="primaryDiagnosis"
                  placeholder="e.g., Pneumonia"
                  {...register('primaryDiagnosis', { required: 'Primary diagnosis is required' })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lengthOfStay">Length of Stay (days)</Label>
                <Input
                  id="lengthOfStay"
                  type="number"
                  placeholder="5"
                  {...register('lengthOfStay', { 
                    required: 'Length of stay is required',
                    min: { value: 1, message: 'Must be at least 1 day' }
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousAdmissions">Previous Admissions (last 12 months)</Label>
                <Input
                  id="previousAdmissions"
                  type="number"
                  placeholder="2"
                  {...register('previousAdmissions', { 
                    required: 'Previous admissions count is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondaryDiagnoses">Secondary Diagnoses</Label>
              <Textarea
                id="secondaryDiagnoses"
                placeholder="e.g., Diabetes, Hypertension"
                className="min-h-[80px]"
                {...register('secondaryDiagnoses')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comorbidities">Comorbidities</Label>
              <Textarea
                id="comorbidities"
                placeholder="e.g., COPD, Heart Disease"
                className="min-h-[80px]"
                {...register('comorbidities')}
              />
            </div>
          </div>

          {/* Treatment Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Treatment & Discharge</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="e.g., Lisinopril 10mg daily, Metformin 500mg twice daily"
                  className="min-h-[80px]"
                  {...register('medications')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dischargePlan">Discharge Plan</Label>
                <Textarea
                  id="dischargePlan"
                  placeholder="e.g., Follow-up with primary care in 1 week, Home health services"
                  className="min-h-[100px]"
                  {...register('dischargePlan')}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Predict Risk
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;