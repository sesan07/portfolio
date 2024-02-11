export enum Badge {
    ANDROID = 'Android',
    ANGULAR = 'Angular',
    C_SHARP = 'C-Sharp',
    DESKTOP = 'Desktop',
    KOTLIN = 'Kotlin',
    NG_ZORRO = 'NG-Zorro',
    NGX_FORMLY = 'NGX-Formly',
    PYTHON = 'Python',
    TAILWIND = 'Tailwind-CSS',
    UNITY = 'Unity',
}

export interface ProjectResponse {
    name: string;
    summary: string;
    card_image_src: string;
    github_link: string;
    open_link: string;
    year: number;
    descriptions: {
        text: string;
    }[];
    badges: {
        badge_id: {
            key: string;
        };
    }[];
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

export interface IntroductionResponse {
    description: string;
    github_link: string;
    resume_link: string;
}

export interface Introduction {
    description: string;
    githubLink: string;
    resumeLink: string;
}
