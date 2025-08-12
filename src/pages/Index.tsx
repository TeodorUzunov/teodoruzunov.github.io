
import { useEffect } from 'react';
import { Code, Database, Users, Terminal, Github, Linkedin } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import ParticleSystem from '../components/ParticleSystem';
import ScrollReveal from '../components/ScrollReveal';
import SkillCard from '../components/SkillCard';
import TechCarousel from '../components/TechCarousel';
import Navbar from '../components/Navbar';

import { Button } from '@/components/ui/button';

const Index = () => {
  useEffect(() => {
    // Disable default cursor on interactive elements
    const style = document.createElement('style');
    style.textContent = `
      a, button, [role="button"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const skills = [
    {
      icon: <Code />,
      title: "Backend Development",
      description: "Expert in PHP with Symfony framework, building scalable and maintainable backend systems. Passionate about clean code and solid architecture patterns.",
      technologies: ["PHP", "Symfony", "Java", "C#", "Python", "MySQL"]
    },
    {
      icon: <Database />,
      title: "System Architecture & Microservices", 
      description: "Designed and implemented RESTful APIs and microservices, automating integrations with CRM/DMS providers and building scalable, resilient systems.",
      technologies: ["Microservices", "REST APIs", "Integration", "Scalability"]
    },
    {
      icon: <Terminal />,
      title: "Full-Stack Development",
      description: "Comfortable working across the entire stack with JavaScript/TypeScript, bringing full-stack perspective to backend solutions.",
      technologies: ["JavaScript", "TypeScript", "Node.js", "React", "Angular", "HTML", "CSS"]
    },
    {
      icon: <Users />,
      title: "Team Leadership",
      description: "Growing into leadership roles, mentoring developers, and facilitating collaboration between backend, frontend, and design teams.",
      technologies: ["Mentoring", "Code Review", "Team Management", "Agile"]
    }
  ];

  const experience = [
    {
      company: "WebSolve",
      location: "Amsterdam, Netherlands",
      period: "2016 - 2025",
      role: "Senior Software Developer",
      achievements: [
        "Automated CRM/DMS data integrations, improving accuracy and streamlining workflows",
        "Developed and maintained RESTful APIs integrating third-party services",
        "Designed secure messaging (email/SMS/WhatsApp) with AWS-integrated flows and 2FA",
        "Optimized SQL databases for high-volume workloads and performance",
        "Collaborated with clients across Europe and Asia; led dev meetings and coordinated cross-functional teams",
        "Contributed to ISO 27001:2017 and ISO 27701:2019 certification efforts",
        "Improved reliability and scalability to deliver millions of messages with minimal downtime"
      ]
    }
  ];

  return (
    <div className="min-h-screen animated-bg relative">
      <CustomCursor />
      
      <ParticleSystem />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-[78vh] md:min-h-screen flex items-start md:items-center justify-center px-6 sm:px-8 md:px-12 pt-20 sm:pt-24 md:pt-28 lg:pt-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto w-full">
          <ScrollReveal>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
              <span className="hero-text block">Teodor</span>
              <span className="text-foreground block">UZUNOV</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto px-2">
              Software developer with over 10 years of experience specializing in backend & fullstack languages and scalable architectures.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-2">
              <Button 
                className="glow-button px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto max-w-xs"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Connect
              </Button>
              <Button 
                variant="outline" 
                className="px-6 sm:px-8 py-3 text-base sm:text-lg border-primary/30 hover:border-primary hover:bg-primary/10 w-full sm:w-auto max-w-xs"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </ScrollReveal>

          {/* Technology Carousel */}
          <ScrollReveal delay={600}>
            <div className="mt-6 sm:mt-10 px-2">
              <p className="text-xs sm:text-sm text-muted-foreground mb-6 uppercase tracking-wider px-2">
                TECHNOLOGIES & TOOLS I WORKED WITH
              </p>
              <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
                <TechCarousel />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              About <span className="hero-text">Me</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Hi, I'm Teo — a backend software developer with over 10 years of experience across a variety of 
                  programming languages and environments, both large and small-scale. My core expertise is in 
                  <span className="text-primary font-semibold"> PHP with Symfony</span> and <span className="text-primary font-semibold">SQL</span>, 
                  though I also regularly work with <span className="text-primary font-semibold">TypeScript</span> in full-stack roles.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm comfortable with other backend languages as well — to me, they all revolve around the same 
                  foundation: <span className="text-primary font-semibold">logic</span>. I have a strong passion for logic and mathematics, 
                  and I truly enjoy tackling complex problems collaboratively.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  In recent years, I've also taken on responsibilities as a <span className="text-primary font-semibold">team lead</span>, 
                  and I'm gradually growing into a managerial role. I really enjoy supporting other developers — 
                  whether it's through mentoring, pair programming, or helping debug issues.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="code-block">
                <div className="text-sm text-muted-foreground mb-2">// My approach to development</div>
                <div className="space-y-2 text-sm">
                  <div><span className="text-primary">class</span> <span className="text-accent">TeoUzunov</span> {`{`}</div>
                  <div className="ml-4"><span className="text-primary">private</span> expertise = [</div>
                  <div className="ml-8"><span className="text-green-400">"PHP/Symfony"</span>,</div>
                  <div className="ml-8"><span className="text-green-400">"SQL Databases"</span>,</div>
                  <div className="ml-8"><span className="text-green-400">"TypeScript"</span>,</div>
                  <div className="ml-8"><span className="text-green-400">"Team Leadership"</span></div>
                  <div className="ml-4">];</div>
                  <div className="ml-4"></div>
                  <div className="ml-4"><span className="text-primary">public</span> <span className="text-blue-400">solve</span>(problem) {`{`}</div>
                  <div className="ml-8"><span className="text-primary">return</span> <span className="text-yellow-400">this</span>.logic</div>
                  <div className="ml-12">.collaborate(team)</div>
                  <div className="ml-12">.optimize(solution);</div>
                  <div className="ml-4">{`}`}</div>
                  <div>{`}`}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              My <span className="hero-text">Skills</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {skills.map((skill, index) => (
              <div key={index} className="h-full">
                <ScrollReveal delay={index * 100}>
                  <SkillCard {...skill} />
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Latest <span className="hero-text">Experience</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <ScrollReveal key={index} delay={200}>
                <div className="skill-card p-8 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-2">{exp.role}</h3>
                      <h4 className="text-xl font-semibold mb-1">{exp.company}</h4>
                      <p className="text-muted-foreground">{exp.location}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Let's <span className="hero-text">Connect</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Feel free to reach out if you'd like to connect, share ideas, or explore new opportunities — 
              I'm always open to a good conversation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                className="glow-button px-8 py-3 text-lg font-semibold flex items-center gap-2"
                onClick={() => window.open('https://www.linkedin.com/in/teodoruzunov/', '_blank')}
              >
                <Linkedin size={20} />
                LinkedIn
              </Button>
              
              <Button 
                variant="outline"
                className="px-8 py-3 text-lg border-primary/30 hover:border-primary hover:bg-primary/10 flex items-center gap-2"
                onClick={() => window.open('https://teodoruzunov.github.io', '_blank')}
              >
                <Github size={20} />
                Portfolio
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Teodor Uzunov — crafted with passion for great user experiences.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
