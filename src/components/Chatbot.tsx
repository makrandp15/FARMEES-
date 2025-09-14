import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Mic, Send, X, Globe } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const Chatbot = ({ language, onLanguageChange }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === 'hindi' ? "नमस्ते! मैं आपकी खेती में मदद करूंगा। क्या पूछना चाहते हैं?" : "Hello! I'm here to help with your farming. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const translations = {
    english: {
      title: "🤖 Farm Assistant",
      placeholder: "Ask about crops, soil, weather...",
      samples: [
        "Which crop should I grow?",
        "What's the best fertilizer?", 
        "When to plant wheat?"
      ],
      responses: [
        "Based on your soil and weather, Wheat is suitable for your area.",
        "For your soil type, NPK fertilizer works best. Apply 50kg per acre.",
        "Best time to plant wheat is November-December in your region."
      ]
    },
    hindi: {
      title: "🤖 खेती सहायक",
      placeholder: "फसल, मिट्टी, मौसम के बारे में पूछें...",
      samples: [
        "मुझे कौन सी फसल उगानी चाहिए?",
        "सबसे अच्छा खाद कौन सा है?",
        "गेहूं कब लगाना चाहिए?"
      ],
      responses: [
        "आपकी मिट्टी और मौसम के अनुसार गेहूं उपयुक्त है।",
        "आपकी मिट्टी के लिए NPK खाद सबसे अच्छा है। 50 किलो प्रति एकड़ डालें।",
        "आपके क्षेत्र में गेहूं लगाने का सबसे अच्छा समय नवंबर-दिसंबर है।"
      ]
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: t.responses[Math.floor(Math.random() * t.responses.length)],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText("");
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Simulate voice input after 2 seconds
    if (!isListening) {
      setTimeout(() => {
        setInputText(t.samples[Math.floor(Math.random() * t.samples.length)]);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Chat Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md h-[500px] flex flex-col p-0">
          <DialogHeader className="p-4 border-b bg-gradient-to-r from-primary to-leaf text-white">
            <DialogTitle className="flex items-center justify-between">
              <span>{t.title}</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onLanguageChange(language === 'english' ? 'hindi' : 'english')}
                  className="text-white hover:bg-white/20"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {language === 'english' ? 'हिंदी' : 'English'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.placeholder}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleListening}
                className={isListening ? 'bg-red-100 border-red-300' : ''}
              >
                <Mic className={`w-4 h-4 ${isListening ? 'text-red-600' : ''}`} />
              </Button>
              <Button size="sm" onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {isListening && (
              <p className="text-xs text-muted-foreground mt-2 animate-pulse">
                🎤 Listening... (Demo mode)
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;