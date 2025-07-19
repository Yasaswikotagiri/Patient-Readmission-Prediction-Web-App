import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/medical-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-medical-light to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Healthcare AI Platform
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Predict Patient
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Readmissions
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Advanced machine learning algorithms to identify patients at risk of 30-day readmission, 
                enabling proactive care and reducing healthcare costs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                Start Prediction
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                View Analytics
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">30%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Medical Dashboard" 
                className="rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <Card className="absolute -left-6 top-1/4 p-4 bg-card/90 backdrop-blur-sm border shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Low Risk</div>
                    <div className="text-xs text-muted-foreground">Patient #A1234</div>
                  </div>
                </div>
              </Card>
              
              <Card className="absolute -right-6 bottom-1/4 p-4 bg-card/90 backdrop-blur-sm border shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">1,247</div>
                    <div className="text-xs text-muted-foreground">Patients Analyzed</div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl -rotate-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;