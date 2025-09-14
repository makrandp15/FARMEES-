import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sprout, Droplets, Sun, TrendingUp, AlertCircle } from "lucide-react";

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

interface CropRecommendationsProps {
  recommendations: Crop[];
  language: string;
  onBack: () => void;
  onBackToHome: () => void;
}

const CropRecommendations = ({ recommendations, language, onBack, onBackToHome }: CropRecommendationsProps) => {
  
  const translations = {
    english: {
      title: "🌾 Your Perfect Crops",
      subtitle: "Best choices for your farm",
      home: "🏠 Home",
      changeDetails: "← Change Details",
      season: "📅 Season:",
      profit: "Profit",
      water: "Water:",
      level: "Level:",
      warnings: "⚠️ Important Warnings",
      fertilizerGuide: "🌿 Fertilizer Guide",
      quickTips: "💡 Quick Tips",
      proTip: "Pro Tip",
      proTipText: "Talk to local farmers and experts before planting. Market prices change often!"
    },
    hindi: {
      title: "🌾 आपकी सबसे अच्छी फसलें",
      subtitle: "आपके खेत के लिए सबसे अच्छे विकल्प",
      home: "🏠 होम",
      changeDetails: "← विवरण बदलें",
      season: "📅 मौसम:",
      profit: "मुनाफा",
      water: "पानी:",
      level: "स्तर:",
      warnings: "⚠️ महत्वपूर्ण चेतावनी",
      fertilizerGuide: "🌿 खाद गाइड",
      quickTips: "💡 त्वरित सुझाव",
      proTip: "प्रो टिप",
      proTipText: "बुआई से पहले स्थानीय किसानों और विशेषज्ञों से बात करें। बाजार की कीमतें बदलती रहती हैं!"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;
  const getProfitabilityColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-leaf text-leaf-foreground";
      case "Medium":
        return "bg-earth text-earth-foreground";
      case "Low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getWaterColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-sky";
      case "Medium":
        return "text-accent";
      case "Low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "bg-leaf/20 text-leaf-foreground";
      case "Medium":
        return "bg-earth/20 text-earth-foreground";
      case "Hard":
        return "bg-destructive/20 text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎯</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          {t.subtitle}
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={onBackToHome} className="h-12">
            {t.home}
          </Button>
          <Button variant="outline" onClick={onBack} className="h-12">
            {t.changeDetails}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {recommendations.map((crop, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-card to-card/80 shadow-xl border-2 border-primary/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">🌾</span>
                  {crop.name}
                </h2>
                <p className="text-muted-foreground text-lg">{t.season} {crop.season}</p>
              </div>
              <Badge 
                variant={crop.profitability === "High" ? "default" : crop.profitability === "Medium" ? "secondary" : "outline"}
                className={`${getProfitabilityColor(crop.profitability)} font-bold text-lg px-4 py-2`}
              >
                💰 {t.profit} ({crop.profitability === "High" ? (language === 'hindi' ? 'उच्च' : 'High') : 
                         crop.profitability === "Medium" ? (language === 'hindi' ? 'मध्यम' : 'Medium') : 
                         (language === 'hindi' ? 'कम' : 'Low')})
              </Badge>
            </div>

            <p className="text-foreground mb-6 leading-relaxed text-lg">{crop.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-xl">💧</span>
                <span className="text-foreground font-medium">{t.water} {crop.waterRequirement === "High" ? (language === 'hindi' ? 'अधिक' : 'High') : 
                         crop.waterRequirement === "Medium" ? (language === 'hindi' ? 'मध्यम' : 'Medium') : 
                         (language === 'hindi' ? 'कम' : 'Low')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span className="text-foreground font-medium">{t.level} {crop.difficulty === "Easy" ? (language === 'hindi' ? 'आसान' : 'Easy') : 
                         crop.difficulty === "Medium" ? (language === 'hindi' ? 'मध्यम' : 'Medium') : 
                         (language === 'hindi' ? 'कठिन' : 'Hard')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-foreground font-medium">{crop.season}</span>
              </div>
            </div>

            {crop.warnings && crop.warnings.length > 0 && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-bold text-destructive mb-2 flex items-center gap-2">
                  {t.warnings}
                </h4>
                <ul className="space-y-1">
                  {crop.warnings.map((warning, warnIndex) => (
                    <li key={warnIndex} className="text-destructive font-medium">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {crop.fertilizer && (
              <div className="mb-6 p-4 bg-leaf/10 border border-leaf/20 rounded-lg">
                <h4 className="font-bold text-leaf mb-2 flex items-center gap-2">
                  {t.fertilizerGuide}
                </h4>
                <p className="text-foreground">{crop.fertilizer}</p>
              </div>
            )}

            <div>
              <h3 className="font-bold text-foreground mb-3 text-xl flex items-center gap-2">
                {t.quickTips}
              </h3>
              <ul className="space-y-2">
                {crop.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-foreground flex items-start gap-2 p-2 bg-primary/5 rounded">
                    <span className="text-primary text-lg">✓</span>
                    <span className="font-medium">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">💡</span>
          <span className="font-bold text-accent text-lg">{t.proTip}</span>
        </div>
        <p className="text-foreground font-medium">
          {t.proTipText}
        </p>
      </div>
    </div>
  );
};

export default CropRecommendations;