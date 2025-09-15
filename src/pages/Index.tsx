import { useState } from "react";
import { Button } from "@/components/ui/button";
import CropRecommendationForm from "@/components/CropRecommendationForm";
import CropRecommendations from "@/components/CropRecommendations";
import LanguageSelection from "@/components/LanguageSelection";
import Chatbot from "@/components/Chatbot";
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
    // Language is already managed globally, don't override it from formData
    
    // Mock recommendations based on input - use current language state
    const isHindi = language === 'hindi';
    const mockRecommendations: Crop[] = [
      {
        name: isHindi ? "चावल (बासमती)" : "Rice (Basmati)",
        season: isHindi ? "खरीफ" : "Kharif",
        waterRequirement: "High",
        profitability: "High",
        difficulty: "Medium",
        description: isHindi 
          ? "🌾 आपकी मिट्टी के लिए बेहतरीन! बासमती चावल की बाजार में अच्छी कीमत मिलती है।"
          : "🌾 Great for your soil! Basmati rice sells well in market.",
        tips: isHindi ? [
          "🌧️ जून-जुलाई में बुआई करें",
          "💧 अच्छी निकासी की जरूरत",
          "🌿 जैविक खाद का उपयोग करें",
          "🐛 कीड़ों से बचाव करें"
        ] : [
          "🌧️ Plant in June-July",
          "💧 Good drainage needed",
          "🌿 Use organic fertilizer", 
          "🐛 Watch for pests"
        ],
        fertilizer: isHindi 
          ? "बुआई के समय NPK 10:26:26, 20 दिन बाद यूरिया"
          : "NPK 10:26:26 at planting, Urea after 20 days",
        warnings: isHindi 
          ? ["⚠️ भारी बारिश से बाढ़ हो सकती है", "🌡️ अधिक गर्मी से उत्पादन कम हो जाता है"]
          : ["⚠️ Heavy rain can cause flooding", "🌡️ Very hot weather reduces yield"]
      },
      {
        name: isHindi ? "गेहूं" : "Wheat",
        season: isHindi ? "रबी" : "Rabi",
        waterRequirement: "Medium",
        profitability: "Medium",
        difficulty: "Easy",
        description: isHindi 
          ? "🌾 आसान सर्दियों की फसल। नए किसानों के लिए बेहतरीन। स्थिर कीमतें।"
          : "🌾 Easy winter crop. Good for beginners. Stable prices.",
        tips: isHindi ? [
          "❄️ नवंबर-दिसंबर में बुआई करें",
          "🌱 अच्छे बीज का इस्तेमाल करें",
          "💊 खाद को हिस्सों में डालें",
          "📏 सही समय पर कटाई करें"
        ] : [
          "❄️ Sow in November-December",
          "🌱 Use good quality seeds",
          "💊 Apply fertilizer in parts",
          "📏 Harvest when ready"
        ],
        fertilizer: isHindi 
          ? "बुआई के समय DAP, 21 और 45 दिन बाद यूरिया"
          : "DAP at sowing, Urea in 2 splits after 21 & 45 days",
        warnings: isHindi 
          ? ["⚠️ देरी से बुआई करने पर उत्पादन कम होता है", "🐛 रतुआ रोग से सावधान रहें"]
          : ["⚠️ Late sowing reduces yield", "🐛 Watch for rust disease"]
      },
      {
        name: isHindi ? "गन्ना" : "Sugarcane",
        season: isHindi ? "साल भर" : "Year-round",
        waterRequirement: "High",
        profitability: "High",
        difficulty: "Hard",
        description: isHindi 
          ? "🎯 लम्बी फसल लेकिन बहुत मुनाफा। देखभाल चाहिए लेकिन फायदेमंद है।"
          : "🎯 Long crop but very profitable. Needs care but worth it.",
        tips: isHindi ? [
          "🛡️ रोग मुक्त किस्म चुनें",
          "📏 उचित दूरी रखें",
          "💧 7-10 दिन में पानी दें",
          "⏱️ 12-18 महीने में कटाई करें"
        ] : [
          "🛡️ Choose disease-free variety",
          "📏 Keep proper spacing",
          "💧 Water every 7-10 days",
          "⏱️ Harvest at 12-18 months"
        ],
        fertilizer: isHindi 
          ? "बुआई के समय NPK 12:32:16 + सूक्ष्म पोषक तत्व"
          : "NPK 12:32:16 + Micronutrients at planting",
        warnings: isHindi 
          ? ["⚠️ बहुत पानी की जरूरत होती है", "🌡️ ठंड में फसल को नुकसान हो सकता है", "💰 शुरुआत में ज्यादा पैसा लगता है"]
          : ["⚠️ Needs lots of water", "🌡️ Cold weather can damage crop", "💰 High initial investment needed"]
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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
          <div className="flex items-center justify-center">
            <span className="text-2xl mr-3">🌾</span>
            <h1 className="text-2xl font-bold">FARMEES</h1>
          </div>
        </header>
        <div className="py-8 px-4">
          <CropRecommendations 
            recommendations={recommendations}
            language={language}
            onBack={handleBackToForm}
            onBackToHome={handleBackToHome}
          />
        </div>
        <Chatbot language={language} onLanguageChange={handleLanguageToggle} />
      </div>
    );
  }

  if (showForm) {
    const formTranslations = {
      english: {
        backToHome: "← Back to Home",
        title: "Crop Recommendation System"
      },
      hindi: {
        backToHome: "← होम पर वापस जाएं",
        title: "फसल सुझाव प्रणाली"  
      }
    };

    const formT = formTranslations[language as keyof typeof formTranslations] || formTranslations.english;

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
          <div className="flex items-center justify-center">
            <span className="text-2xl mr-3">🌾</span>
            <h1 className="text-2xl font-bold">FARMEES</h1>
          </div>
        </header>
        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Button variant="outline" onClick={handleBackToHome} className="mb-4">
                {formT.backToHome}
              </Button>
              <h1 className="text-4xl font-bold text-foreground mb-4">{formT.title}</h1>
            </div>
            <CropRecommendationForm onSubmit={handleFormSubmit} language={language} />
          </div>
        </div>
        <Chatbot language={language} onLanguageChange={handleLanguageToggle} />
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
          <div className="mb-6">
            <span className="text-6xl">🌾</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">FARMEES</h1>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            🌾 Grow Better Crops
          </h2>
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

      {/* Chatbot */}
      <Chatbot language={language} onLanguageChange={handleLanguageToggle} />
    </div>
  );
};

export default Index;