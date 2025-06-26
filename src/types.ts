export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  techs: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
}

export interface MousePosition {
  x: number;
  y: number;
}
