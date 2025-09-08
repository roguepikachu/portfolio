import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Calendar, MapPin } from "lucide-react";

interface Role {
  id: string;
  title: string;
  period: string;
  achievements: string[];
  responsibilities?: string[];
  milestones?: string[];
}

interface TimelineItem {
  id: string;
  company: string;
  location?: string;
  overallPeriod: string;
  roles: Role[];
  type: 'company';
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
          {items.map((item, companyIndex) => (
            <div key={item.id} className="relative">
              {/* Company Header */}
              <div className="relative flex items-start gap-8 mb-6">
                {/* Company timeline node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg flex items-center justify-center border-4 border-background">
                    <Building className="w-6 h-6 text-primary-foreground" />
                  </div>
                  {/* Connecting line to content */}
                  <div className="absolute top-8 left-16 w-8 h-0.5 bg-gradient-to-r from-primary/60 to-transparent" />
                </div>
                
                {/* Company header card */}
                <div className="flex-1 min-w-0">
                  <Card className="shadow-lg border-l-4 border-l-primary bg-primary/5">
                    <CardHeader className="pb-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold text-foreground">{item.company}</h3>
                          {item.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{item.location}</span>
                            </div>
                          )}
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.overallPeriod}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              {/* Roles Sub-timeline */}
              <div className="ml-12 relative">
                {/* Sub-timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-secondary/60 to-secondary/20" />
                
                <div className="space-y-8">
                  {item.roles.map((role, roleIndex) => (
                    <div key={role.id} className="relative flex items-start gap-6">
                      {/* Role timeline node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/60 shadow-md flex items-center justify-center border-3 border-background">
                          <div className="w-2 h-2 rounded-full bg-secondary-foreground" />
                        </div>
                        {/* Connecting line to content */}
                        <div className="absolute top-6 left-12 w-6 h-0.5 bg-gradient-to-r from-secondary/60 to-transparent" />
                      </div>
                      
                      {/* Role content card */}
                      <div className="flex-1 min-w-0">
                        <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-secondary/30">
                          <CardHeader className="pb-3">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <h4 className="text-lg font-bold text-foreground">{role.title}</h4>
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {role.period}
                              </Badge>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pt-0 space-y-4">
                            {/* Key Achievements */}
                            {role.achievements.length > 0 && (
                              <div>
                                <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  Key Achievements
                                </h5>
                                <ul className="space-y-1.5">
                                  {role.achievements.map((achievement, idx) => (
                                    <li key={idx} className="text-muted-foreground flex items-start gap-2">
                                      <div className="w-1 h-1 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                                      <span className="text-sm leading-relaxed">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Responsibilities */}
                            {role.responsibilities && role.responsibilities.length > 0 && (
                              <div>
                                <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                  Core Responsibilities
                                </h5>
                                <ul className="space-y-1.5">
                                  {role.responsibilities.map((responsibility, idx) => (
                                    <li key={idx} className="text-muted-foreground flex items-start gap-2">
                                      <div className="w-1 h-1 rounded-full bg-secondary/60 mt-2 flex-shrink-0" />
                                      <span className="text-sm leading-relaxed">{responsibility}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Milestones */}
                            {role.milestones && role.milestones.length > 0 && (
                              <div>
                                <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                  Key Milestones
                                </h5>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  {role.milestones.map((milestone, idx) => (
                                    <div key={idx} className="bg-accent/10 rounded-md p-2 border border-accent/20">
                                      <span className="text-xs text-foreground font-medium">{milestone}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        
                        {/* Role progression indicator */}
                        {roleIndex < item.roles.length - 1 && (
                          <div className="mt-4 ml-6 flex items-center gap-2 text-muted-foreground">
                            <div className="flex-1 h-px bg-gradient-to-r from-secondary/20 to-transparent" />
                            <div className="text-xs font-medium bg-secondary/10 px-2 py-1 rounded-full border border-secondary/20">
                              Promoted
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-l from-secondary/20 to-transparent" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Company progression indicator */}
              {companyIndex < items.length - 1 && (
                <div className="mt-8 ml-8 flex items-center gap-3 text-muted-foreground">
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                  <div className="text-xs font-medium bg-muted px-3 py-1 rounded-full">
                    New Opportunity
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-l from-primary/30 to-transparent" />
                </div>
              )}
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