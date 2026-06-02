import { Briefcase, MessageSquare, Users, Heart, LayoutGrid, Calendar, Video, TrendingUp, Image } from 'lucide-react';
import { FieldConfig } from './GenericEditor';

export const TABS = [
    { id: 'jobs', label: 'Oferty Pracy', icon: Briefcase },
    { id: 'faqs', label: 'FAQ', icon: MessageSquare },
    { id: 'testimonials', label: 'Opinie', icon: Users },
    { id: 'values', label: 'Wartości', icon: Heart },
    { id: 'internship', label: 'Ścieżki Stażowe', icon: LayoutGrid },
    { id: 'timeline', label: 'Oś Czasu', icon: Calendar },
    { id: 'videos', label: 'Wideo', icon: Video },
    { id: 'growth', label: 'Rozwój', icon: TrendingUp },
    { id: 'memories', label: 'Wspomnienia', icon: Image },
];

export const STATS_FIELDS: FieldConfig[] = [
    { key: 'label', label: 'Etykieta', type: 'text', required: true },
    { key: 'value', label: 'Wartość', type: 'text', required: true },
    { key: 'description', label: 'Opis (opcjonalny)', type: 'textarea' },
    { key: 'display_order', label: 'Kolejność', type: 'number', required: true },
];

export const GROWTH_FIELDS: FieldConfig[] = [
    { key: 'year', label: 'Rok', type: 'text', required: true },
    { key: 'count', label: 'Wartość', type: 'number', required: true },
];

export const MEMORIES_FIELDS: FieldConfig[] = [
    { key: 'year', label: 'Rok', type: 'text', placeholder: 'np. 2023', required: true },
    { key: 'label', label: 'Etykieta', type: 'text', placeholder: 'np. Hackathon Zwycięzcy', required: true },
    { key: 'image_url', label: 'Zdjęcie', type: 'image', required: true },
];

export const JOBS_FIELDS: FieldConfig[] = [
    { key: 'title', label: 'Tytuł', type: 'text', required: true },
    { key: 'salary', label: 'Wynagrodzenie', type: 'text', required: true },
    { key: 'location', label: 'Lokalizacja', type: 'text', required: true },
    { key: 'contract', label: 'Umowa', type: 'text', required: true },
    { key: 'description', label: 'Opis', type: 'textarea', required: true },
    { key: 'tags', label: 'Tagi', type: 'array-tags' },
    { key: 'tech_stack', label: 'Tech Stack', type: 'array-tags' },
    { key: 'responsibilities', label: 'Obowiązki', type: 'array' },
    { key: 'requirements', label: 'Wymagania', type: 'array' },
    { key: 'nice_to_have', label: 'Mile widziane', type: 'array' },
    { key: 'benefits', label: 'Co oferujemy', type: 'array' },
    { key: 'apply_url', label: 'Link aplikowania', type: 'text' },
];

export const FAQS_FIELDS: FieldConfig[] = [
    { key: 'question', label: 'Pytanie', type: 'text', required: true },
    { key: 'answer', label: 'Odpowiedź', type: 'textarea', required: true },
    { key: 'category', label: 'Kategoria', type: 'select', options: ['career', 'internship', 'practices'], required: true },
];

export const VALUES_FIELDS: FieldConfig[] = [
    { key: 'title', label: 'Tytuł', type: 'text', required: true },
    { key: 'description', label: 'Opis', type: 'textarea', required: true },
    { key: 'display_order', label: 'Kolejność', type: 'number', required: true },
];

export const TESTIMONIALS_FIELDS: FieldConfig[] = [
    { key: 'name', label: 'Imię', type: 'text', required: true },
    { key: 'role', label: 'Rola', type: 'text', required: true },
    { key: 'quote', label: 'Cytat', type: 'textarea', required: true },
];

export const INTERNSHIP_FIELDS: FieldConfig[] = [
    { key: 'title', label: 'Tytuł', type: 'text', required: true },
    { key: 'subtitle', label: 'Podtytuł', type: 'text' },
    { key: 'description', label: 'Opis', type: 'textarea', required: true },
    { key: 'icon_name', label: 'Ikona (Lucide Name)', type: 'text', placeholder: 'Code2, Users, Terminal...' },
    { key: 'learn_list', label: 'Czego się nauczysz?', type: 'array' },
    { key: 'stack_list', label: 'Tech Stack', type: 'array-tags' },
];

export const PROGRAM_GOALS_FIELDS: FieldConfig[] = [
    { key: 'title', label: 'Tytuł', type: 'text', required: true },
    { key: 'value', label: 'Wartość', type: 'text', required: true },
    { key: 'subtitle', label: 'Podtytuł', type: 'text' },
    { key: 'display_order', label: 'Kolejność', type: 'number', required: true },
];

export const INTERNSHIP_RULES_FIELDS: FieldConfig[] = [
    { key: 'rule', label: 'Zasada', type: 'textarea', required: true },
    { key: 'display_order', label: 'Kolejność', type: 'number', required: true },
];

export const TIMELINE_FIELDS: FieldConfig[] = [
    { key: 'date_display', label: 'Data (wyświetlana)', type: 'text', required: true },
    { key: 'title', label: 'Tytuł', type: 'text', required: true },
    { key: 'description', label: 'Opis (opcjonalny)', type: 'textarea' },
    { key: 'category', label: 'Kategoria', type: 'select', options: ['recruitment', 'internship', 'practices'], required: true },
    { key: 'align', label: 'Wyrównanie (Praktyki)', type: 'select', options: ['left', 'right', 'center'] },
];

export const VIDEO_FIELDS: FieldConfig[] = [
    { key: 'title', label: 'Tytuł', type: 'text', required: true },
    { key: 'url', label: 'URL YouTube', type: 'text', required: true },
];

export const PROJECTS_FIELDS: FieldConfig[] = [
    { key: 'year', label: 'Rok', type: 'text', required: true, placeholder: '2023' },
    { key: 'title', label: 'Tytuł Projektu', type: 'text', required: true },
    { key: 'goal', label: 'Cel Projektu', type: 'textarea' },
    { key: 'tools', label: 'Narzędzia', type: 'text', placeholder: 'Angular, .NET, Docker...' },
    { key: 'skills', label: 'Pozyskane Umiejętności', type: 'textarea' },
    { key: 'team', label: 'Zespół (imiona)', type: 'text', placeholder: 'Ania, Tomek...' },
    { key: 'description', label: 'Dodatkowy Opis', type: 'textarea' },
];
