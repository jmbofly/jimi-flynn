export interface Project {
    id?: string;
    imageSrc?: string;
    icon?: string;
    title?: string;
    letter?: string;
    text?: string;
    media?: any;
    backgroundColor?: string;
}

export const PROJECTS_DATA: Project[] = [
    {
        id: 'SVG_ANIMATION_DRAW',
        imageSrc: 'https://picsum.photos/id/1010/760',
        icon: 'fa-pencil',
        title: 'Animating SVG',
        letter: 'S',
        text: `Cillum ea deserunt ea eu elit officia occaecat ut fugiat cupidatat minim. Ipsum veniam adipisicing Lorem quis fugiat in pariatur non. Deserunt proident duis cillum aute laboris sint reprehenderit.`,
        backgroundColor: 'plumb',
    },
    {
        id: 'ANGULAR_FIREBASE_APP',
        imageSrc: 'https://picsum.photos/id/1001/760',
        icon: 'fa-database',
        title: 'Angular app w/ Firebase',
        letter: 'A',
        text: `Cillum ea deserunt ea eu elit officia occaecat ut fugiat cupidatat minim. Ipsum veniam adipisicing Lorem quis fugiat in pariatur non. Deserunt proident duis cillum aute laboris sint reprehenderit.`,
        backgroundColor: 'cherry',
    },
    {
        id: 'GSAP_LOADER_ANIMATION',
        imageSrc: 'https://picsum.photos/id/1002/760',
        icon: 'fa-spinner',
        title: 'GSAP loader animation',
        letter: 'G',
        text: `Cillum ea deserunt ea eu elit officia occaecat ut fugiat cupidatat minim. Ipsum veniam adipisicing Lorem quis fugiat in pariatur non. Deserunt proident duis cillum aute laboris sint reprehenderit.`,
        backgroundColor: 'kale',
    },
    {
        id: 'COVID_STATS',
        imageSrc: 'https://picsum.photos/id/1003/760',
        icon: 'fa-table',
        title: 'Real-time COVID-19 Data',
        letter: 'C',
        text: `Cillum ea deserunt ea eu elit officia occaecat ut fugiat cupidatat minim. Ipsum veniam adipisicing Lorem quis fugiat in pariatur non. Deserunt proident duis cillum aute laboris sint reprehenderit.`,
        backgroundColor: 'orange',
    }
]