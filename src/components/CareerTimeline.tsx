import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Calendar, MapPin } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  type: 'role' | 'milestone';
  achievements: string[];
  responsibilities?: string[];
  milestones?: string[];
}

interface CareerTimelineProps {
  items: TimelineItem[];
  title?: string;
}

export function CareerTimeline({ items, title = "Career Journey" }: CareerTimelineProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      <div className="relative">
        {/* Main timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20" />
        
        {/* Timeline items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <div key={item.id} className="relative flex items-start gap-8">
              {/* Timeline node */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg flex items-center justify-center border-4 border-background">
                  <Building className="w-6 h-6 text-primary-foreground" />
                </div>
                {/* Connecting line to content */}
                <div className="absolute top-8 left-16 w-8 h-0.5 bg-gradient-to-r from-primary/60 to-transparent" />
              </div>
              
              {/* Content card */}
              <div className="flex-1 min-w-0">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/30">
                  <CardHeader className="pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{item.company}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-6">
                    {/* Key Achievements */}
                    {item.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-muted-foreground flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Responsibilities */}
                    {item.responsibilities && item.responsibilities.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-secondary" />
                          Core Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {item.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="text-muted-foreground flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Milestones */}
                    {item.milestones && item.milestones.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          Key Milestones
                        </h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {item.milestones.map((milestone, idx) => (
                            <div key={idx} className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                              <span className="text-sm text-foreground font-medium">{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Progress indicator */}
                {index < items.length - 1 && (
                  <div className="mt-8 ml-8 flex items-center gap-3 text-muted-foreground">
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                    <div className="text-xs font-medium bg-muted px-3 py-1 rounded-full">
                      Career Progression
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-l from-primary/30 to-transparent" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeline end indicator */}
        <div className="absolute left-8 bottom-0 w-0.5 h-12 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute left-6 -bottom-2 w-4 h-4 rounded-full bg-primary/20 border-2 border-background" />
      </div>
    </section>
  );
}