import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="fixed top-4 right-4 z-40">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onLanguageChange(language === 'english' ? 'hindi' : 'english')}
        className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
      >
        <Globe className="w-4 h-4 mr-2" />
        {language === 'english' ? 'हिंदी' : 'English'}
      </Button>
    </div>
  );
};

export default LanguageToggle;