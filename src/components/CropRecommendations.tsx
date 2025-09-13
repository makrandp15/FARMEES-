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
}

interface CropRecommendationsProps {
  recommendations: Crop[];
  language: string;
  onBack: () => void;
  onBackToHome: () => void;
}

const CropRecommendations = ({ recommendations, language, onBack, onBackToHome }: CropRecommendationsProps) => {
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Recommended Crops</h2>
          <p className="text-muted-foreground">
            Based on your location and soil conditions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBackToHome}>
            ← Home
          </Button>
          <Button variant="outline" onClick={onBack}>
            ← Back to Form
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {recommendations.map((crop, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Sprout className="w-6 h-6 text-leaf" />
                  <h3 className="text-xl font-semibold text-foreground">{crop.name}</h3>
                  <Badge variant="secondary">{crop.season}</Badge>
                </div>

                <p className="text-muted-foreground mb-4">{crop.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Droplets className={`w-4 h-4 ${getWaterColor(crop.waterRequirement)}`} />
                    <span className="text-sm text-muted-foreground">Water: {crop.waterRequirement}</span>
                  </div>
                  <Badge className={getProfitabilityColor(crop.profitability)}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {crop.profitability} Profit
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(crop.difficulty)}>
                    {crop.difficulty} to Grow
                  </Badge>
                </div>

                {crop.tips.length > 0 && (
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Growing Tips</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {crop.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-accent" />
          <span className="font-medium text-accent">Important Note</span>
        </div>
        <p className="text-sm text-muted-foreground">
          These recommendations are based on general agricultural knowledge. Please consult with local agricultural 
          experts and consider current market conditions before making planting decisions.
        </p>
      </div>
    </div>
  );
};

export default CropRecommendations;