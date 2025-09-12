import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Calendar, MapPin } from "lucide-react";
import styles from './CareerTimeline.module.css';

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
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      
      <div className={styles.timelineContainer}>
        {/* Main timeline line */}
        <div className={styles.mainTimelineLine} />
        
        {/* Timeline items */}
        <div className={styles.timelineItems}>
          {items.map((item, companyIndex) => (
            <div key={item.id} className={styles.companyItem}>
              {/* Company Header */}
              <div className={styles.companyHeader}>
                {/* Company timeline node */}
                <div className={styles.companyNode}>
                  <div className={styles.companyNodeCircle}>
                    <Building className={styles.companyIcon} />
                  </div>
                  {/* Connecting line to content */}
                  <div className={styles.companyConnector} />
                </div>
                
                {/* Company header card */}
                <div className="flex-1 min-w-0">
                  <Card className={styles.companyCard}>
                    <CardHeader className={`${styles.companyCardHeader} px-4 py-3`}>
                      <div className={styles.companyInfo}>
                        <div className={styles.companyDetails}>
                          <h3 className={styles.companyName}>{item.company}</h3>
                          {item.location && (
                            <div className={styles.locationContainer}>
                              <MapPin className={styles.locationIcon} />
                              <span className={styles.locationText}>{item.location}</span>
                            </div>
                          )}
                        </div>
                        <Badge variant="outline" className={styles.periodBadge}>
                          <Calendar className={styles.periodIcon} />
                          {item.overallPeriod}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              {/* Roles Sub-timeline */}
              <div className={styles.rolesSection}>
                {/* Sub-timeline line */}
                <div className={styles.rolesTimelineLine} />
                
                <div className={styles.rolesItems}>
                  {item.roles.map((role, roleIndex) => (
                    <div key={role.id} className="relative flex items-start gap-6">
                      {/* Role timeline node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-500/60 shadow-md flex items-center justify-center border-2 border-background">
                          <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-900" />
                        </div>
                        {/* Connecting line to content */}
                        <div className="absolute top-4 left-8 w-6 h-0.5 bg-gradient-to-r from-blue-500/60 to-transparent" />
                      </div>
                      
                      {/* Role content card */}
                      <div className="flex-1 min-w-0">
                        <Card className={styles.roleCard}>
                          <CardHeader className={`${styles.roleCardHeader} px-4 py-2`}>
                            <div className={styles.roleInfo}>
                              <h4 className={styles.roleTitle}>{role.title}</h4>
                              <Badge variant="secondary" className={styles.periodBadge}>
                                <Calendar className={styles.periodIcon} />
                                {role.period}
                              </Badge>
                            </div>
                          </CardHeader>
                          
                          <CardContent className={`${styles.roleCardContent} px-4 py-2`}>
                            {/* Key Achievements */}
                            {role.achievements.length > 0 && (
                              <div>
                                <h5 className={styles.sectionHeader}>
                                  Key Achievements
                                </h5>
                                <ul className={styles.list}>
                                  {role.achievements.map((achievement, idx) => (
                                    <li key={idx} className={styles.listItem}>
                                      <div className={`${styles.listItemDot} ${styles.achievementsListDot}`} />
                                      <span className={styles.listItemText}>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Responsibilities */}
                            {role.responsibilities && role.responsibilities.length > 0 && (
                              <div>
                                <h5 className={styles.sectionHeader}>
                                  Core Responsibilities
                                </h5>
                                <ul className={styles.list}>
                                  {role.responsibilities.map((responsibility, idx) => (
                                    <li key={idx} className={styles.listItem}>
                                      <div className={`${styles.listItemDot} ${styles.responsibilitiesListDot}`} />
                                      <span className={styles.listItemText}>{responsibility}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Milestones */}
                            {role.milestones && role.milestones.length > 0 && (
                              <div>
                                <h5 className={styles.sectionHeader}>
                                  Key Milestones
                                </h5>
                                <div className={styles.milestonesGrid}>
                                  {role.milestones.map((milestone, idx) => (
                                    <div key={idx} className={styles.milestoneItem}>
                                      <span className={styles.milestoneText}>{milestone}</span>
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