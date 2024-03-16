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

export interface Link {
    label: string;
    url: string;
    icon: 'github' | 'open' | 'resume';
}

export interface ProjectResponse {
    name: string;
    summary: string;
    card_image_src: string;
    year: number;
    descriptions: {
        text: string;
    }[];
    badges: {
        badge_id: {
            key: string;
        };
    }[];
    links: Link[];
}

export interface Project {
    name: string;
    summary: string;
    shortDescriptions?: string[];
    cardImageSrc: string;
    badges: Badge[];
    year: number;
    links: Link[];
}

export interface IntroductionResponse {
    description: string;
    links: Link[];
}

export interface Introduction {
    description: string;
    links: Link[];
}
