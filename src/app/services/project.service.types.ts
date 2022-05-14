export enum Badge {
    ANDROID = 'Android',
    ANGULAR = 'Angular',
    C_SHARP = 'C#',
    DESKTOP = 'Desktop',
    KOTLIN = 'Kotlin',
    NG_ZORRO = 'NG-Zorro',
    NGX_FORMLY = 'NGX-Formly',
    PYTHON = 'Python',
    TAILWIND = 'Tailwind CSS',
    UNITY = 'Unity',
}

export interface Project {
    name: string;
    summary: string;
    shortDescriptions?: string[];
    cardImageSrc: string;
    badges: Badge[];
    githubLink?: string;
    openLink?: string;
    year: number;
}
