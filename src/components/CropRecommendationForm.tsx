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
}

const CropRecommendationForm = ({ onSubmit }: CropRecommendationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    temperature: "",
    rainfall: "",
    soilType: "",
    soilPh: "",
    farmSize: "",
    language: "english"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-card shadow-lg">
      <div className="mb-6 text-center">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🌾</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Farm Details</h2>
        <p className="text-muted-foreground">
          Quick info about your farm
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2 text-lg">
              📍 Your Location
            </Label>
            <Input
              id="location"
              placeholder="City or District"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg">🗣️ Language</Label>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Selected: {
                formData.language === 'english' ? 'English' :
                formData.language === 'hindi' ? 'हिंदी' :
                formData.language === 'tamil' ? 'தமிழ்' :
                formData.language === 'bengali' ? 'বাংলা' :
                formData.language === 'marathi' ? 'मराठी' :
                formData.language === 'telugu' ? 'తెలుగు' : 'English'
              }</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="temperature" className="flex items-center gap-2 text-lg">
              🌡️ Temperature (°C)
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
              🌧️ Yearly Rain (mm)
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
            <Label htmlFor="soilType" className="text-lg">🏔️ Soil Type</Label>
            <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Pick your soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">🧱 Clay (Heavy)</SelectItem>
                <SelectItem value="sandy">🏖️ Sandy (Light)</SelectItem>
                <SelectItem value="loamy">🌱 Loamy (Best)</SelectItem>
                <SelectItem value="silt">💧 Silt (Smooth)</SelectItem>
                <SelectItem value="peaty">🌿 Peaty (Dark)</SelectItem>
                <SelectItem value="chalky">⚪ Chalky (White)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilPh" className="flex items-center gap-2 text-lg">
              🧪 Soil pH (Acid/Base)
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
            <p className="text-xs text-muted-foreground">💡 Normal range: 6.0-7.5</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="farmSize" className="text-lg">🚜 Farm Size (acres)</Label>
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
          🚀 Get My Crop Advice
        </Button>
      </form>
    </Card>
  );
};

export default CropRecommendationForm;