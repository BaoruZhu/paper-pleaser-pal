import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StatsPanelProps {
  totalPoints: number;
  hedgesUsed: number;
  emotionalStability: number;
  resilience: number;
}

export function StatsPanel({ totalPoints, hedgesUsed, emotionalStability, resilience }: StatsPanelProps) {
  const level = Math.floor(totalPoints / 100) + 1;
  const levelProgress = (totalPoints % 100);

  return (
    <Card className="p-6 bg-gradient-calm">
      <h3 className="text-lg font-semibold mb-4 text-center">📊 治愈统计面板</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">当前等级</span>
          <Badge variant="secondary" className="font-mono">
            Lv.{level}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>升级进度</span>
            <span>{levelProgress}/100</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">治愈积分</div>
          </div>
          
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-healing-warm">{hedgesUsed}</div>
            <div className="text-xs text-muted-foreground">对冲次数</div>
          </div>
          
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-healing-soft">{emotionalStability}%</div>
            <div className="text-xs text-muted-foreground">情绪稳定度</div>
          </div>
          
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-healing-calm">{resilience}%</div>
            <div className="text-xs text-muted-foreground">韧性指数</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-healing-comfort/20 rounded-lg">
          <div className="text-sm font-medium mb-1">今日治愈建议</div>
          <div className="text-xs text-muted-foreground">
            {resilience >= 80 ? "你的韧性很强！继续保持！" : 
             resilience >= 60 ? "适当休息，补充正能量。" :
             "建议多使用情感支持类对冲机制。"}
          </div>
        </div>
      </div>
    </Card>
  );
}