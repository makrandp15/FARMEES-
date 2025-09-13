import { useState } from "react";
import { Button } from "@/components/ui/button";
import CropRecommendationForm from "@/components/CropRecommendationForm";
import CropRecommendations from "@/components/CropRecommendations";
import { Sprout, Users, Globe, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

interface FormData {
  location: string;
  temperature: string;
  rainfall: string;
  soilType: string;
  soilPh: string;
  farmSize: string;
  language: string;
}

interface Crop {
  name: string;
  season: string;
  waterRequirement: "Low" | "Medium" | "High";
  profitability: "Low" | "Medium" | "High";
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  tips: string[];
}

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<Crop[]>([]);
  const [language, setLanguage] = useState("english");

  const generateRecommendations = (formData: FormData): Crop[] => {
    setLanguage(formData.language);
    
    // Mock recommendations based on input
    const mockRecommendations: Crop[] = [
      {
        name: "Rice (Basmati)",
        season: "Kharif",
        waterRequirement: "High",
        profitability: "High",
        difficulty: "Medium",
        description: "Well-suited for your soil type and rainfall conditions. Basmati rice has good market demand and export potential.",
        tips: [
          "Plant during monsoon season (June-July)",
          "Ensure proper drainage to prevent waterlogging",
          "Apply organic fertilizers for better grain quality",
          "Monitor for common pests like stem borer"
        ]
      },
      {
        name: "Wheat",
        season: "Rabi",
        waterRequirement: "Medium",
        profitability: "Medium",
        difficulty: "Easy",
        description: "Excellent winter crop for your region. Requires less water compared to rice and has stable market prices.",
        tips: [
          "Sow in November-December",
          "Use certified seeds for better yield",
          "Apply fertilizers in split doses",
          "Harvest when grain moisture is 20-25%"
        ]
      },
      {
        name: "Sugarcane",
        season: "Year-round",
        waterRequirement: "High",
        profitability: "High",
        difficulty: "Hard",
        description: "Long-duration crop with high profitability. Suitable for your soil pH and temperature range.",
        tips: [
          "Choose disease-resistant varieties",
          "Maintain proper spacing between rows",
          "Regular irrigation every 7-10 days",
          "Harvest at 12-18 months depending on variety"
        ]
      }
    ];

    return mockRecommendations;
  };

  const handleFormSubmit = (formData: FormData) => {
    const newRecommendations = generateRecommendations(formData);
    setRecommendations(newRecommendations);
    setShowRecommendations(true);
    setShowForm(false);
  };

  const handleBackToForm = () => {
    setShowRecommendations(false);
    setShowForm(true);
  };

  const handleBackToHome = () => {
    setShowForm(false);
    setShowRecommendations(false);
  };

  if (showRecommendations) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <CropRecommendations 
          recommendations={recommendations}
          language={language}
          onBack={handleBackToForm}
        />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button variant="outline" onClick={handleBackToHome} className="mb-4">
              ← Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-4">Crop Recommendation System</h1>
          </div>
          <CropRecommendationForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Sprout className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Smart Crop Recommendations for Farmers
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Get personalized crop suggestions based on your soil health, weather conditions, and location
          </p>
          <Button 
            onClick={() => setShowForm(true)}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                AI-powered crop suggestions based on scientific data and local conditions
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Local Language Support</h3>
              <p className="text-muted-foreground">
                Get advice in your preferred regional language for better understanding
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-earth/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-earth" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Farmer-Friendly</h3>
              <p className="text-muted-foreground">
                Simple interface designed specifically for farmers' needs and workflows
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-leaf/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-leaf" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Mobile Optimized</h3>
              <p className="text-muted-foreground">
                Works perfectly on any device, especially designed for mobile phones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="font-semibold text-lg text-foreground">Enter Farm Details</h3>
              <p className="text-muted-foreground">
                Provide information about your location, soil type, rainfall, and temperature
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="font-semibold text-lg text-foreground">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Our system analyzes your data and provides suitable crop suggestions
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-leaf text-leaf-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="font-semibold text-lg text-foreground">Start Farming</h3>
              <p className="text-muted-foreground">
                Follow the detailed growing tips and maximize your harvest
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4"
            >
              Try It Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;