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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Get Crop Recommendations</h2>
        <p className="text-muted-foreground">
          Enter your farm details to receive personalized crop recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter your city/district"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Preferred Language</Label>
            <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="temperature" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-accent" />
              Average Temperature (°C)
            </Label>
            <Input
              id="temperature"
              type="number"
              placeholder="e.g., 25"
              value={formData.temperature}
              onChange={(e) => handleInputChange("temperature", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rainfall" className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-sky" />
              Annual Rainfall (mm)
            </Label>
            <Input
              id="rainfall"
              type="number"
              placeholder="e.g., 800"
              value={formData.rainfall}
              onChange={(e) => handleInputChange("rainfall", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="soilType">Soil Type</Label>
            <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">Clay</SelectItem>
                <SelectItem value="sandy">Sandy</SelectItem>
                <SelectItem value="loamy">Loamy</SelectItem>
                <SelectItem value="silt">Silt</SelectItem>
                <SelectItem value="peaty">Peaty</SelectItem>
                <SelectItem value="chalky">Chalky</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilPh" className="flex items-center gap-2">
              <Beaker className="w-4 h-4 text-leaf" />
              Soil pH Level
            </Label>
            <Input
              id="soilPh"
              type="number"
              step="0.1"
              placeholder="e.g., 6.5"
              value={formData.soilPh}
              onChange={(e) => handleInputChange("soilPh", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="farmSize">Farm Size (acres)</Label>
          <Input
            id="farmSize"
            type="number"
            placeholder="Enter farm size in acres"
            value={formData.farmSize}
            onChange={(e) => handleInputChange("farmSize", e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Get Recommendations
        </Button>
      </form>
    </Card>
  );
};

export default CropRecommendationForm;