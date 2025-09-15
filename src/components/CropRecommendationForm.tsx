import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Thermometer, CloudRain, MapPin, Beaker } from "lucide-react";

interface FormData {
  location: string;
  temperature: string;
  rainfall: string;
  soilType: string;
  soilPh: string;
  farmSize: string;
  language: string;
}

interface CropRecommendationFormProps {
  onSubmit: (data: FormData) => void;
  language: string;
}

const CropRecommendationForm = ({ onSubmit, language }: CropRecommendationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    temperature: "",
    rainfall: "",
    soilType: "",
    soilPh: "",
    farmSize: "",
    language: language
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...formData, language});
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const autoDetectLocation = () => {
    // Simulate location detection with dummy data
    setFormData(prev => ({
      ...prev,
      location: "Delhi",
      temperature: "28",
      rainfall: "850", 
      soilType: "loamy",
      soilPh: "6.8"
    }));
  };

  const translations = {
    english: {
      title: "Farm Details",
      subtitle: "Quick info about your farm",
      location: "📍 Your Location",
      locationPlaceholder: "City or District", 
      language: "🗣️ Language",
      temperature: "🌡️ Temperature (°C)",
      rainfall: "🌧️ Yearly Rain (mm)",
      soilType: "🏔️ Soil Type",
      soilTypePlaceholder: "Pick your soil type",
      soilPh: "🧪 Soil pH (Acid/Base)",
      soilPhHint: "💡 Normal range: 6.0-7.5",
      farmSize: "🚜 Farm Size (acres)",
      autoDetect: "📍 Enable Location (Demo)",
      submit: "🚀 Get My Crop Advice",
      soilTypes: {
        clay: "🧱 Clay (Heavy)",
        sandy: "🏖️ Sandy (Light)", 
        loamy: "🌱 Loamy (Best)",
        silt: "💧 Silt (Smooth)",
        peaty: "🌿 Peaty (Dark)",
        chalky: "⚪ Chalky (White)"
      }
    },
    hindi: {
      title: "खेत की जानकारी",
      subtitle: "अपने खेत के बारे में बताएं",
      location: "📍 आपका स्थान",
      locationPlaceholder: "शहर या जिला",
      language: "🗣️ भाषा", 
      temperature: "🌡️ तापमान (°C)",
      rainfall: "🌧️ वार्षिक बारिश (mm)",
      soilType: "🏔️ मिट्टी का प्रकार",
      soilTypePlaceholder: "अपनी मिट्टी चुनें",
      soilPh: "🧪 मिट्टी का pH",
      soilPhHint: "💡 सामान्य रेंज: 6.0-7.5",
      farmSize: "🚜 खेत का आकार (एकड़)",
      autoDetect: "📍 स्थान चालू करें (डेमो)",
      submit: "🚀 फसल की सलाह पाएं",
      soilTypes: {
        clay: "🧱 चिकनी मिट्टी",
        sandy: "🏖️ रेतीली मिट्टी",
        loamy: "🌱 दोमट मिट्टी (सबसे अच्छी)",
        silt: "💧 गाद मिट्टी", 
        peaty: "🌿 पीट मिट्टी",
        chalky: "⚪ चूना मिट्टी"
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-card shadow-lg">
      <div className="mb-6 text-center">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🌾</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.title}</h2>
        <p className="text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Auto-detect button */}
        <div className="text-center">
          <Button 
            type="button" 
            variant="outline" 
            onClick={autoDetectLocation}
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-300 hover:from-green-500/20 hover:to-blue-500/20"
          >
            {t.autoDetect}
          </Button>
          <p className="text-xs text-muted-foreground mt-1">Sample data will be filled</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2 text-lg">
              {t.location}
            </Label>
            <Input
              id="location"
              placeholder={t.locationPlaceholder}
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg">{t.language}</Label>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Selected: {
                language === 'english' ? 'English' : 'हिंदी'
              }</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="temperature" className="flex items-center gap-2 text-lg">
              {t.temperature}
            </Label>
            <Input
              id="temperature"
              type="number"
              placeholder="25"
              value={formData.temperature}
              onChange={(e) => handleInputChange("temperature", e.target.value)}
              required
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rainfall" className="flex items-center gap-2 text-lg">
              {t.rainfall}
            </Label>
            <Input
              id="rainfall"
              type="number"
              placeholder="800"
              value={formData.rainfall}
              onChange={(e) => handleInputChange("rainfall", e.target.value)}
              required
              className="h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="soilType" className="text-lg">{t.soilType}</Label>
            <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder={t.soilTypePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">{t.soilTypes.clay}</SelectItem>
                <SelectItem value="sandy">{t.soilTypes.sandy}</SelectItem>
                <SelectItem value="loamy">{t.soilTypes.loamy}</SelectItem>
                <SelectItem value="silt">{t.soilTypes.silt}</SelectItem>
                <SelectItem value="peaty">{t.soilTypes.peaty}</SelectItem>
                <SelectItem value="chalky">{t.soilTypes.chalky}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilPh" className="flex items-center gap-2 text-lg">
              {t.soilPh}
            </Label>
            <Input
              id="soilPh"
              type="number"
              step="0.1"
              placeholder="6.5"
              value={formData.soilPh}
              onChange={(e) => handleInputChange("soilPh", e.target.value)}
              required
              className="h-12 text-lg"
            />
            <p className="text-xs text-muted-foreground">{t.soilPhHint}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="farmSize" className="text-lg">{t.farmSize}</Label>
          <Input
            id="farmSize"
            type="number"
            placeholder="2"
            value={formData.farmSize}
            onChange={(e) => handleInputChange("farmSize", e.target.value)}
            required
            className="h-12 text-lg"
          />
        </div>

        <Button type="submit" className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg font-bold rounded-lg">
          {t.submit}
        </Button>
      </form>
    </Card>
  );
};

export default CropRecommendationForm;