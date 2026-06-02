import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { JobOffer as DBJobOffer, Faq, CompanyValue, TimelineEvent, VideoItem } from '../types/database';

import { GlassCard, SectionHeader } from '../components/UI';
import { VideoModal } from '../components/VideoModal';
import { ResponsiveGraph } from '../components/ResponsiveGraph';
import { ContactForm } from '../components/ContactForm';
import { FaqSection } from '../components/FaqSection';
import { JobOfferCard, JobOffer } from '../components/JobOfferCard';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { VideoGallery } from '../components/VideoGallery';
import { ValuesCarousel } from '../components/ValuesCarousel';
import { FloatingShapes } from '../components/FloatingShapes';
import { useAccordion } from '../hooks/useAccordion';

const CareerPage = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  // Data State
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [faqs, setFaqs] = useState<{ question: string, answer: string }[]>([]);
  const [values, setValues] = useState<{ title: string, desc: string }[]>([]);
  const [timeline, setTimeline] = useState<{ step: string, title: string, desc: string }[]>([]);
  const [videos, setVideos] = useState<{ id: string, title: string, url: string, author: string }[]>([]);

  const [growthData, setGrowthData] = useState<{ year: number, count: number }[]>([]);
  const [companyStats, setCompanyStats] = useState<{ label: string, value: string }[]>([]);

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const offerAccordion = useAccordion();
  const faqAccordion = useAccordion();

  useEffect(() => {
    const fetchContent = async () => {
      // Parallel fetching
      const [offersRes, faqsRes, valuesRes, timelineRes, videosRes, growthRes, statsRes] = await Promise.all([
        // Offers
        supabase.from('job_offers').select('*').order('created_at', { ascending: false }),
        // FAQs
        supabase.from('faqs').select('*').eq('category', 'career'),
        // Values
        supabase.from('company_values').select('*').order('display_order', { ascending: true }),
        // Timeline
        supabase.from('timeline_events').select('*').eq('category', 'recruitment').order('date_display', { ascending: true }),
        // Videos
        supabase.from('video_gallery').select('*').eq('is_active', true),
        // Growth & Stats
        supabase.from('growth_points').select('*').order('year', { ascending: true }),
        supabase.from('company_stats').select('*').order('display_order', { ascending: true })
      ]);

      if (offersRes.data) {
        setOffers(offersRes.data.map((o: DBJobOffer) => ({
          title: o.title,
          tags: o.tags || [],
          salary: o.salary || '',
          location: o.location || '',
          contract: o.contract || '',
          description: o.description || '',
          techStack: o.tech_stack || [],
          responsibilities: o.responsibilities || [],
          requirements: o.requirements || [],
          niceToHave: o.nice_to_have || [],
          benefits: o.benefits || []
        })));
      }

      if (faqsRes.data) setFaqs(faqsRes.data as Faq[]);
      if (valuesRes.data) setValues((valuesRes.data as CompanyValue[]).map(v => ({ title: v.title, desc: v.description })));

      if (timelineRes.data) {
        setTimeline((timelineRes.data as TimelineEvent[]).map(t => ({
          step: t.date_display,
          title: t.title,
          desc: t.description || ''
        })));
      }

      if (videosRes.data) {
        setVideos((videosRes.data as VideoItem[]).map(v => {
          const videoId = v.url.split('v=')[1]?.split('&')[0] || v.url;
          return {
            id: videoId,
            url: v.url,
            title: v.title,
            author: 'RekordSI'
          };
        }));
      }

      if (growthRes.data) setGrowthData(growthRes.data);
      if (statsRes.data) setCompanyStats(statsRes.data);
    };
    fetchContent();
  }, []);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
      <section className="min-h-[85vh] w-[100vw] ml-[calc(50%-50vw)] flex flex-col justify-center items-center text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl px-6 mx-auto"
        >


          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium mb-8 leading-[1.1] tracking-tight text-white">
            <span className="font-serif italic text-emerald-200 block mb-2">Rozwijaj się z</span>
            <span className="font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-emerald-300">
              Liderem Technologii IT
            </span>
          </h1>

          <p className="text-lg md:text-xl text-emerald-100/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Dołącz do zespołu 160+ ekspertów z <span className="text-white font-semibold">35-letnim doświadczeniem</span> w budowaniu systemów klasy Enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              className="group relative px-8 py-4 bg-lime-400 hover:bg-lime-300 text-emerald-950 text-base font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 translate-y-[100%] bg-white/20 blur-lg group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Zobacz oferty pracy <ArrowRight size={18} />
              </span>
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 border border-emerald-500/30 text-emerald-100 hover:border-lime-400 hover:text-lime-400 font-medium rounded-lg transition-all hover:bg-lime-400/5"
            >
              Porozmawiajmy o karierze
            </button>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Delphi', 'React', 'SQL Server', '.NET Core', 'Azure'].map((tech, i) => (
              <div key={i} className="flex items-center gap-2 group cursor-default">
                <span className="text-lg font-mono text-emerald-200/80 font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-6">
        <GlassCard className="border-lime-400/20 bg-emerald-900/40 p-8 md:p-12 min-h-[500px] flex flex-col md:flex-row gap-12 items-center overflow-hidden" noHover>
          <div className="md:w-1/3 relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
              Stabilny rozwój <br /> przez ponad <span className="text-lime-400 font-sans inline-block transform -rotate-2 decoration-wavy underline decoration-lime-500/30 underline-offset-8">35 lat</span>
            </h3>
            <p className="text-emerald-200/80 mb-10 leading-relaxed text-lg font-light">
              Nie jesteśmy start-upem, który zniknie po roku. Budujemy przyszłość na solidnych fundamentach, stale powiększając nasz zespół ekspertów i bazę technologiczną.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {companyStats.length > 0 ? (
                companyStats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-xs font-bold text-lime-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))
              ) : (
                <>

                  <div>
                    <div className="text-5xl font-bold text-white mb-2">...</div>
                    <div className="text-xs font-bold text-lime-400 uppercase tracking-widest">Ładowanie...</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex md:w-2/3 w-full h-[400px] relative mt-0 items-end">
            <div className="absolute inset-0 w-full h-full">
              {growthData.length > 0 && <ResponsiveGraph data={growthData} />}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* VALUES CAROUSEL */}
      {values.length > 0 && (
        <section>
          <SectionHeader title="Nasze wartości" subtitle="To co nas definiuje i napędza każdego dnia." />
          <ValuesCarousel values={values} />
        </section>
      )}

      {/* JOB OFFERS */}
      <section>
        <SectionHeader title="Oferty pracy" subtitle="Znajdź swoje miejsce w naszym zespole." />
        <div className="space-y-4 max-w-5xl mx-auto mb-16 px-4 md:px-0">
          {offers.length > 0 ? (
            offers.map((offer, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <JobOfferCard
                  offer={offer}
                  isActive={offerAccordion.isOpen(i)}
                  onToggle={() => offerAccordion.toggle(i)}
                  onApply={scrollToContact}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center text-emerald-500/60 font-hand text-xl py-12 border border-dashed border-emerald-800 rounded-xl">
              Aktualnie nie prowadzimy otwartych rekrutacji na stronie. <br />
              Sprawdź ponownie wkrótce!
            </div>
          )}
        </div>

        {/* CTA: No Offer? */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="absolute inset-0 bg-lime-400/10 blur-xl rounded-full" />
          <div className="relative border-4 border-dashed border-lime-400/50 rounded-[3rem] p-10 bg-emerald-900/60 backdrop-blur-md transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <h3 className="text-3xl md:text-4xl font-black mb-4">Nie widzisz oferty dla siebie?</h3>
            <p className="text-emerald-200 text-lg mb-8 max-w-2xl mx-auto">
              Ciągle się rozwijamy i chętnie poznajemy talenty. Napisz do nas, wyślij CV, a my odezwiemy się, gdy tylko pojawi się coś dla Ciebie!
            </p>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-emerald-800 text-lime-400 font-bold rounded-xl border border-lime-400/30 hover:bg-lime-400 hover:text-emerald-950 hover:border-lime-400 transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.2)] hover:shadow-[0_0_30px_rgba(132,204,22,0.6)] hover:-translate-y-1 text-lg"
            >
              Skontaktuj się z nami
            </button>
          </div>
        </motion.div>
      </section>

      {/* PROCESS TIMELINE */}
      {timeline.length > 0 && (
        <section>
          <SectionHeader title="Proces rekrutacji" />
          <ProcessTimeline steps={timeline} />
        </section>
      )}

      {/* VIDEO GALLERY */}
      {videos.length > 0 && (
        <section>
          <SectionHeader title="Zobacz nas w akcji" subtitle="Trochę kodu, trochę pizzy i dużo pasji." />
          <VideoGallery videos={videos} onVideoSelect={setSelectedVideo} />
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto">
          <SectionHeader title="FAQ" subtitle="Najczęściej zadawane pytania" />
          <FaqSection
            items={faqs}
            activeIndex={faqAccordion.activeIndex}
            onToggle={faqAccordion.toggle}
          />
        </section>
      )}

      {/* CONTACT FORM */}
      <section className="pb-20" ref={contactRef}>
        <ContactForm title="Masz pytania? Napisz do nas!" />
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            videoId={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerPage;