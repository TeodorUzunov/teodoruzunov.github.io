import * as si from 'simple-icons/icons';

const TechCarousel = () => {
  const entries = [
    { name: 'PHP', key: 'siPhp' },
    { name: 'Symfony', key: 'siSymfony' },
    { name: 'Java', key: 'siJava' },
    { name: 'C#', key: 'siCsharp' },
    { name: 'Python', key: 'siPython' },
    { name: 'MySQL', key: 'siMysql' },
    { name: 'Angular', key: 'siAngular' },
    { name: 'HTML5', key: 'siHtml5' },
    { name: 'CSS3', key: 'siCss3' },
    { name: 'JavaScript', key: 'siJavascript' },
    { name: 'TypeScript', key: 'siTypescript' },
    { name: 'React', key: 'siReact' },
    { name: 'Node.js', key: 'siNodedotjs' },
    { name: 'Docker', key: 'siDocker' },
    { name: 'Git', key: 'siGit' },
    { name: 'Laravel', key: 'siLaravel' },
    { name: 'AWS', key: 'siAmazonaws' },
    { name: 'GitHub Copilot', key: 'siGithubcopilot' },
  ] as const;

  const technologies = entries
    .map((e) => {
      const icon = (si as any)[e.key];
      return icon ? { name: e.name, path: icon.path } : null;
    })
    .filter(Boolean) as { name: string; path: string }[];

  const renderItem = (key: string, name: string, path: string, aria = true) => (
    <div key={key} className="flex-shrink-0" style={{ minWidth: '160px' }}>
      <div className="flex items-center gap-3 p-3 rounded-lg">
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-label={aria ? `${name} logo` : undefined}
          width={32}
          height={32}
          className="w-8 h-8 opacity-80"
        >
          <path d={path} fill="currentColor" />
        </svg>
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {name}
        </span>
      </div>
    </div>
  );

  return (
    <div className="marquee py-8" aria-label="Technologies and tools carousel">
      <div className="marquee-track">
        <div className="marquee-content">
          {technologies.map((t) => renderItem(t.name, t.name, t.path))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {technologies.map((t) => renderItem(`dup-${t.name}`, t.name, t.path, false))}
        </div>
      </div>
    </div>
  );
};

export default TechCarousel;
