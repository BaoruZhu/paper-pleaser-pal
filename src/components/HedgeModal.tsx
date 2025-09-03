import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface HedgeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "emotional" | "practical" | "community" | "gamified";
  title: string;
  onComplete: (points: number) => void;
}

const hedgeContent = {
  emotional: {
    quotes: [
      "每一次拒绝都是通往成功的必经之路。",
      "被拒绝不是失败，而是筛选出更适合的机会。",
      "你的价值不由一次拒绝来定义。",
      "今天的拒绝是明天成功的垫脚石。"
    ],
    actions: [
      "深呼吸3次，感受当下的平静",
      "给自己一个温暖的拥抱",
      "回忆最近收到的积极反馈",
      "为自己今天的努力点个赞"
    ]
  },
  practical: {
    suggestions: [
      "分析拒稿原因，制定改进计划",
      "寻找3个类似期刊作为备选",
      "联系导师或同行获取建议",
      "优化论文标题和摘要",
      "检查期刊投稿要求是否完全符合"
    ],
    resources: [
      "期刊匹配工具推荐",
      "学术写作改进指南",
      "同行评议反馈解读",
      "投稿策略优化建议"
    ]
  },
  community: {
    stories: [
      "李同学：被拒7次后发表在顶级期刊",
      "张教授：分享投稿被拒后的调整经验",
      "科研小组：互相鼓励度过低谷期",
      "学术社区：分享拒稿后的成长故事"
    ]
  },
  gamified: {
    achievements: [
      "勇气徽章：直面拒绝",
      "坚持勋章：不放弃投稿",
      "成长印记：从拒绝中学习",
      "韧性标识：迅速重新振作"
    ]
  }
};

export function HedgeModal({ open, onOpenChange, type, title, onComplete }: HedgeModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (open && !isCompleted) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsCompleted(true);
            clearInterval(timer);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [open, isCompleted]);

  const handleComplete = () => {
    const points = Math.floor(Math.random() * 50) + 10;
    onComplete(points);
    onOpenChange(false);
    setProgress(0);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const renderContent = () => {
    switch (type) {
      case "emotional":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-warm rounded-lg">
              <h4 className="font-semibold mb-2">💝 治愈金句</h4>
              <p className="text-sm italic">
                "{hedgeContent.emotional.quotes[currentStep % hedgeContent.emotional.quotes.length]}"
              </p>
            </div>
            <div className="p-4 bg-healing-soft/20 rounded-lg">
              <h4 className="font-semibold mb-2">🫂 自我关怀行动</h4>
              <p className="text-sm">
                {hedgeContent.emotional.actions[currentStep % hedgeContent.emotional.actions.length]}
              </p>
            </div>
          </div>
        );
      
      case "practical":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-calm rounded-lg">
              <h4 className="font-semibold mb-2">💡 实用建议</h4>
              <ul className="text-sm space-y-1">
                {hedgeContent.practical.suggestions.slice(0, 3).map((suggestion, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case "community":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-comfort rounded-lg">
              <h4 className="font-semibold mb-2">🤝 社区力量</h4>
              <div className="space-y-2">
                {hedgeContent.community.stories.slice(0, 2).map((story, i) => (
                  <p key={i} className="text-sm p-2 bg-background/50 rounded">
                    {story}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      
      case "gamified":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">🏆 成就解锁</h4>
              <div className="grid grid-cols-2 gap-2">
                {hedgeContent.gamified.achievements.map((achievement, i) => (
                  <Badge key={i} variant="outline" className="text-xs p-2">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>对冲进度</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {renderContent()}
          
          {isCompleted && (
            <div className="text-center space-y-4">
              <div className="text-2xl">✨</div>
              <p className="text-lg font-semibold text-primary">
                对冲完成！心情已修复
              </p>
              <Button onClick={handleComplete} className="w-full">
                获得治愈积分
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}