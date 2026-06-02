const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tlidjpnumdiiwevqcyau.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaWRqcG51bWRpaXdldnFjeWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjE0NzIsImV4cCI6MjA4MTYzNzQ3Mn0.8L9738UghIY7a8l0EZDAtwUrdlSgwdYLZlkJRyc9Pwk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const offersToUpdate = [
  {
    id: '073e0947-4a28-49c7-9b1e-22367a6fdd40',
    title: 'Młodszy Specjalista / Młodsza Specjalistka ds. Wdrożeń Systemów Informatycznych',
    tags: ['Wdrożenia ECM', 'Bielsko-Biała', 'EZD', 'Low-Code'],
    salary: 'Do uzgodnienia',
    location: 'Bielsko-Biała',
    contract: 'Umowa o pracę',
    description: 'W związku z rozwojem Pionu Wdrożeń Systemów Informatycznych ECM planujemy rozszerzenie zespołu realizującego wdrożenia systemów informatycznych wspierających obieg i archiwizację dokumentów. Osoba zatrudniona na tym stanowisku będzie uczestniczyć we wdrożeniach u klientów (systemy EZD oraz aplikacje Low-Code), prowadzić szkolenia i prezentacje dla użytkowników oraz zapewniać bieżące wsparcie po wdrożeniu systemu.',
    tech_stack: ['Windows Server', 'Linux', 'SQL', 'PostgreSQL', 'Low-Code'],
    responsibilities: [
      'Udział w projektach wdrożeniowych systemów EZD oraz aplikacji typu Low/No Code u klientów (zdalnie oraz bezpośrednio w siedzibie klienta)',
      'Prowadzenie prezentacji oraz szkoleń dla użytkowników z zakresu obsługiwanych aplikacji',
      'Tworzenie dokumentacji technicznej oraz materiałów szkoleniowych',
      'Obsługa zgłoszeń serwisowych klientów oraz wsparcie techniczne w zakresie bieżącej analizy problemów',
      'Współpraca z zespołem deweloperskim podczas prac rozwojowych',
      'Wsparcie procesu testowania aplikacji oraz współpraca z zespołem projektowym'
    ]
  },
  {
    id: 'aceec75e-a45a-480b-8365-c81d8f3aca76',
    title: 'Młodszy Specjalista / Młodsza Specjalistka ds. Wsparcia Technicznego w Zespole DevOps',
    tags: ['DevOps / Sysadmin', 'Bielsko-Biała', 'Helpdesk', 'Linux / Windows'],
    salary: 'Do uzgodnienia',
    location: 'Bielsko-Biała',
    contract: 'Umowa o pracę',
    description: 'Dołącz do pionu wsparcia technicznego w zespole DevOps! Szukamy osoby, która wesprze nas w codziennej administracji systemami operacyjnymi Linux i Windows, serwisowaniu sprzętu komputerowego oraz obsłudze zgłoszeń typu Helpdesk dla pracowników. To świetna szansa na naukę technologii takich jak konteneryzacja, systemy bazodanowe (PostgreSQL) oraz wirtualizacja pod okiem doświadczonych inżynierów.',
    tech_stack: ['Linux', 'Windows 10/11', 'Git', 'Sieci IP', 'PostgreSQL', 'Docker'],
    responsibilities: [
      'Świadczenie wsparcia technicznego (Helpdesk) dla pracowników firmy',
      'Przygotowanie, konfiguracja oraz serwisowanie sprzętu komputerowego',
      'Bieżąca administracja systemami operacyjnymi i oprogramowaniem',
      'Instalacja i konfiguracja środowisk klienckich Linux oraz Windows',
      'Zarządzanie uprawnieniami użytkowników i dostępami',
      'Utrzymywanie wybranych usług sieciowych i infrastrukturalnych'
    ]
  }
];

async function main() {
  for (const offer of offersToUpdate) {
    const { data, error } = await supabase
      .from('job_offers')
      .update({
        title: offer.title,
        tags: offer.tags,
        salary: offer.salary,
        location: offer.location,
        contract: offer.contract,
        description: offer.description,
        tech_stack: offer.tech_stack,
        responsibilities: offer.responsibilities
      })
      .eq('id', offer.id);

    if (error) {
      console.error(`Error updating offer ${offer.id}:`, error);
    } else {
      console.log(`Successfully updated offer ${offer.id} (${offer.title})`);
    }
  }
}

main();
