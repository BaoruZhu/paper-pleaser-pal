import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HedgeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: "emotional" | "practical" | "community" | "gamified";
  points?: number;
  isActive?: boolean;
  onClick: () => void;
}

const typeStyles = {
  emotional: "bg-gradient-warm shadow-warm border-healing-warm/20",
  practical: "bg-gradient-calm shadow-soft border-healing-calm/20", 
  community: "bg-gradient-comfort shadow-glow border-healing-comfort/20",
  gamified: "bg-primary/10 shadow-soft border-primary/20"
};

const typeLabels = {
  emotional: "情感支持",
  practical: "实用建议", 
  community: "社区互助",
  gamified: "游戏化"
};

export function HedgeCard({ 
  title, 
  description, 
  icon, 
  type, 
  points,
  isActive,
  onClick 
}: HedgeCardProps) {
  return (
    <Card 
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2",
        typeStyles[type],
        isActive && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="secondary" className="text-xs">
            {typeLabels[type]}
          </Badge>
          {points && (
            <Badge variant="outline" className="text-xs font-mono">
              +{points}分
            </Badge>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4 w-full bg-background/50 hover:bg-background/80"
      >
        启动对冲机制
      </Button>
    </Card>
  );
}