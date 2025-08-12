import { ReactNode } from 'react';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  technologies: string[];
}

const SkillCard = ({ icon, title, description, technologies }: SkillCardProps) => {
  return (
    <div className="skill-card p-6 rounded-xl group h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-3 text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;