import { useState } from "react";
import { Button } from "@/components/ui/button";
import CropRecommendationForm from "@/components/CropRecommendationForm";
import CropRecommendations from "@/components/CropRecommendations";
import LanguageSelection from "@/components/LanguageSelection";
import Chatbot from "@/components/Chatbot";
import LanguageToggle from "@/components/LanguageToggle";
import { Sprout, Users, Globe, Smartphone, Droplets, Thermometer } from "lucide-react";
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
  fertilizer?: string;
  warnings?: string[];
}

const Index = () => {
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
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
        description: "🌾 Great for your soil! Basmati rice sells well in market.",
        tips: [
          "🌧️ Plant in June-July",
          "💧 Good drainage needed",
          "🌿 Use organic fertilizer", 
          "🐛 Watch for pests"
        ],
        fertilizer: "NPK 10:26:26 at planting, Urea after 20 days",
        warnings: ["⚠️ Heavy rain can cause flooding", "🌡️ Very hot weather reduces yield"]
      },
      {
        name: "Wheat",
        season: "Rabi",
        waterRequirement: "Medium",
        profitability: "Medium",
        difficulty: "Easy",
        description: "🌾 Easy winter crop. Good for beginners. Stable prices.",
        tips: [
          "❄️ Sow in November-December",
          "🌱 Use good quality seeds",
          "💊 Apply fertilizer in parts",
          "📏 Harvest when ready"
        ],
        fertilizer: "DAP at sowing, Urea in 2 splits after 21 & 45 days",
        warnings: ["⚠️ Late sowing reduces yield", "🐛 Watch for rust disease"]
      },
      {
        name: "Sugarcane",
        season: "Year-round",
        waterRequirement: "High",
        profitability: "High",
        difficulty: "Hard",
        description: "🎯 Long crop but very profitable. Needs care but worth it.",
        tips: [
          "🛡️ Choose disease-free variety",
          "📏 Keep proper spacing",
          "💧 Water every 7-10 days",
          "⏱️ Harvest at 12-18 months"
        ],
        fertilizer: "NPK 12:32:16 + Micronutrients at planting",
        warnings: ["⚠️ Needs lots of water", "🌡️ Cold weather can damage crop", "💰 High initial investment needed"]
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
    setShowLanguageSelect(false);
  };

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setShowLanguageSelect(false);
    setShowForm(true);
  };

  const handleLanguageToggle = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleGetStarted = () => {
    setShowLanguageSelect(true);
  };

  if (showLanguageSelect) {
    return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
  }

  if (showRecommendations) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <CropRecommendations 
          recommendations={recommendations}
          language={language}
          onBack={handleBackToForm}
          onBackToHome={handleBackToHome}
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
          <CropRecommendationForm onSubmit={handleFormSubmit} language={language} />
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
            🌾 Grow Better Crops
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Simple farming advice in your language
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 font-bold"
            >
              🚀 Start Now
            </Button>
            <div className="flex items-center text-white/80 text-sm">
              <Smartphone className="w-4 h-4 mr-2" />
              Works on mobile
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            ✨ Why Farmers Love Us
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground">Smart Advice</h3>
              <p className="text-muted-foreground text-lg">
                Best crops for your soil & weather
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗣️</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground">Your Language</h3>
              <p className="text-muted-foreground text-lg">
                Tips in Hindi, Tamil & more
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-earth/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🌾</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground">Easy to Use</h3>
              <p className="text-muted-foreground text-lg">
                Simple steps, big results
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-leaf/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground">Mobile Ready</h3>
              <p className="text-muted-foreground text-lg">
                Works on any phone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            🚀 3 Simple Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                1
              </div>
              <div className="text-center">
                <span className="text-4xl mb-2 block">📍</span>
                <h3 className="font-semibold text-xl text-foreground mb-2">Tell Us About Your Farm</h3>
                <p className="text-muted-foreground text-lg">
                  Location, soil & weather
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-accent to-accent/70 text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                2
              </div>
              <div className="text-center">
                <span className="text-4xl mb-2 block">🤖</span>
                <h3 className="font-semibold text-xl text-foreground mb-2">Get Smart Tips</h3>
                <p className="text-muted-foreground text-lg">
                  Best crops for you
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-leaf to-leaf/70 text-leaf-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                3
              </div>
              <div className="text-center">
                <span className="text-4xl mb-2 block">💰</span>
                <h3 className="font-semibold text-xl text-foreground mb-2">Grow & Profit</h3>
                <p className="text-muted-foreground text-lg">
                  Follow tips, earn more
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-4 text-xl font-bold rounded-full shadow-lg"
            >
              🌾 Start Farming Better
            </Button>
          </div>
        </div>
      </section>

      {/* Language Toggle & Chatbot */}
      <LanguageToggle language={language} onLanguageChange={handleLanguageToggle} />
      <Chatbot language={language} />
    </div>
  );
};

export default Index;