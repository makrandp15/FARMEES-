import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Languages } from "lucide-react";

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const LanguageSelection = ({ onLanguageSelect }: LanguageSelectionProps) => {
  const languages = [
    { code: "english", name: "English", native: "English" },
    { code: "hindi", name: "Hindi", native: "हिंदी" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🌾</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">FARMEES</h1>
          <h2 className="text-xl font-semibold text-foreground mb-2">Choose Your Language</h2>
          <p className="text-muted-foreground">भाषा चुनें • Choose Language</p>
        </div>

        <div className="grid gap-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="outline"
              onClick={() => onLanguageSelect(lang.code)}
              className="h-14 text-left justify-start bg-card hover:bg-accent/20 border-2"
            >
              <Globe className="w-5 h-5 mr-3 text-primary" />
              <div>
                <div className="font-medium">{lang.name}</div>
                <div className="text-sm text-muted-foreground">{lang.native}</div>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LanguageSelection;