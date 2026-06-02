export interface JobOffer {
    id: string;
    created_at?: string;
    title: string;
    tags: string[];
    salary: string;
    location: string;
    contract: string;
    description: string;
    tech_stack: string[];
    responsibilities: string[];
    requirements?: string[];
    nice_to_have?: string[];
    benefits?: string[];
    apply_url?: string;
}


export interface Faq {
    id: string;
    question: string;
    answer: string;
    category: 'career' | 'internship' | 'practices';
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    avatar_url?: string;
}

export interface CompanyValue {
    id: string;
    title: string;
    description: string;
    display_order: number;
}

export interface InternshipPath {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    learn_list: string[];
    stack_list: string[];
    icon_name: string;
}

export interface VideoItem {
    id: string;
    url: string;
    title: string;
    is_active: boolean;
}

export interface TimelineEvent {
    id: string;
    date_display: string;
    title: string;
    description?: string;
    category: 'recruitment' | 'practices' | 'internship';
    align?: 'left' | 'right' | 'center';
}

export interface Memory {
    id: string;
    year: string;
    label: string;
    image_url?: string;
}

export interface InternshipProject {
    id: string;
    year: string;
    title: string;
    goal?: string;
    tools?: string;
    skills?: string;
    team: string;
    created_at?: string;
}

export interface ProgramGoal {
    id: string;
    title: string;
    value: string;
    subtitle: string;
    display_order: number;
}

export interface InternshipRule {
    id: string;
    rule: string;
    display_order: number;
}

export interface InternshipPathWithIcon extends InternshipPath {
    icon: React.ComponentType<{ size?: number }>;
}

