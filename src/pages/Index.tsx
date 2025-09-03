import { useState } from "react";
import { HedgeCard } from "@/components/HedgeCard";
import { HedgeModal } from "@/components/HedgeModal";
import { StatsPanel } from "@/components/StatsPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-writing.jpg";

const Index = () => {
  const [selectedHedge, setSelectedHedge] = useState<{
    type: "emotional" | "practical" | "community" | "gamified";
    title: string;
  } | null>(null);
  
  const [stats, setStats] = useState({
    totalPoints: 245,
    hedgesUsed: 12,
    emotionalStability: 75,
    resilience: 68
  });

  const { toast } = useToast();

  const hedgeOptions = [
    {
      title: "情感修复疗法",
      description: "通过正念冥想、自我关怀练习和治愈金句来缓解被拒的负面情绪，重建内心平静。",
      icon: "💝",
      type: "emotional" as const,
      points: 15
    },
    {
      title: "策略重构系统", 
      description: "分析拒稿原因，制定改进计划，寻找替代期刊，优化投稿策略。",
      icon: "🎯",
      type: "practical" as const,
      points: 25
    },
    {
      title: "同行支持网络",
      description: "连接有相似经历的学者，分享经验，获得鼓励，建立学术互助关系。",
      icon: "🤝",
      type: "community" as const,
      points: 20
    },
    {
      title: "成就解锁游戏",
      description: "将拒稿经历转化为经验值，解锁韧性徽章，在挫折中获得成长感。",
      icon: "🏆",
      type: "gamified" as const,
      points: 30
    }
  ];

  const handleHedgeComplete = (points: number) => {
    setStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      hedgesUsed: prev.hedgesUsed + 1,
      emotionalStability: Math.min(100, prev.emotionalStability + 5),
      resilience: Math.min(100, prev.resilience + 3)
    }));

    toast({
      title: "对冲成功！",
      description: `获得 ${points} 治愈积分，心情已得到修复 ✨`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-warm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                学术治愈 · 心理对冲
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                文章被拒
                <br />
                <span className="text-primary">风险对冲机器</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                当论文被拒绝时，这里有科学的心理对冲机制帮你快速恢复，
                将挫折转化为成长动力。
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 shadow-warm"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                开始心理对冲 🚀
              </Button>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="学术写作治愈环境"
                className="w-full h-auto rounded-2xl shadow-glow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <StatsPanel {...stats} />
          </div>

          {/* Hedge Options */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">选择你的对冲策略</h2>
              <p className="text-muted-foreground">
                每种对冲机制都经过心理学验证，选择最适合当前心情的方式
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {hedgeOptions.map((hedge, index) => (
                <HedgeCard
                  key={index}
                  title={hedge.title}
                  description={hedge.description}
                  icon={hedge.icon}
                  type={hedge.type}
                  points={hedge.points}
                  onClick={() => setSelectedHedge({ type: hedge.type, title: hedge.title })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="bg-muted/30 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">🆘 紧急心理支持</h3>
          <p className="text-muted-foreground mb-6">
            如果当前情绪过于低落，建议先使用紧急修复模式
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setSelectedHedge({ type: "emotional", title: "紧急情感修复" })}
            className="bg-gradient-comfort border-healing-comfort/30"
          >
            启动紧急修复 🚨
          </Button>
        </div>
      </div>

      {/* Hedge Modal */}
      <HedgeModal
        open={!!selectedHedge}
        onOpenChange={(open) => !open && setSelectedHedge(null)}
        type={selectedHedge?.type || "emotional"}
        title={selectedHedge?.title || ""}
        onComplete={handleHedgeComplete}
      />
    </div>
  );
};

export default Index;
