import Image from "next/image";
import { useEffect, useState } from "react";
import type { Slide } from "../data/romanticJourneyContent";

interface CounterSlideProps {
  slide: Slide;
  onNext: () => void;
}

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useLocalRelationshipTime(): TimeLeft {
  const [time, setTime] = useState<TimeLeft>({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Relationship start date: 14 January 2026 at 20:00 local time
    const startDate = new Date(2026, 0, 14, 20, 0, 0); 
    
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      if (diff < 0) {
        setTime({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      let y = now.getFullYear() - startDate.getFullYear();
      let m = now.getMonth() - startDate.getMonth();
      let d = now.getDate() - startDate.getDate();
      let h = now.getHours() - startDate.getHours();
      let min = now.getMinutes() - startDate.getMinutes();
      let s = now.getSeconds() - startDate.getSeconds();

      if (s < 0) { s += 60; min--; }
      if (min < 0) { min += 60; h--; }
      if (h < 0) { h += 24; d--; }
      if (d < 0) {
        const prev = new Date(now.getFullYear(), now.getMonth(), 0);
        d += prev.getDate();
        m--;
      }
      if (m < 0) { m += 12; y--; }

      setTime({ years: y, months: m, days: d, hours: h, minutes: min, seconds: s });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

const DesktopTimeBlock = ({ value, label, showSeparator = true }: { value: number, label: string, showSeparator?: boolean }) => (
  <div className="flex items-center">
    <div className="flex flex-col items-center mx-4 lg:mx-6 min-w-[70px] lg:min-w-[90px]">
      <span className="text-6xl lg:text-7xl xl:text-8xl font-serif text-[#cb867a] tracking-tighter mb-4 leading-none shadow-black drop-shadow-lg">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs lg:text-sm uppercase tracking-[0.3em] text-white/70 font-serif">
        {label}
      </span>
    </div>
    {showSeparator && (
      <div className="flex flex-col items-center justify-center opacity-50 mx-1 lg:mx-2">
        <div className="w-[1px] h-12 lg:h-16 bg-gradient-to-b from-transparent to-[#cb867a]"></div>
        <Image src="/assets/icons/heart.svg" alt="" width={8} height={8} className="my-2 opacity-60 w-2 h-2" />
        <div className="w-[1px] h-12 lg:h-16 bg-gradient-to-t from-transparent to-[#cb867a]"></div>
      </div>
    )}
  </div>
);

function CounterDesktopLayout({ onNext }: { onNext: () => void }) {
  const time = useLocalRelationshipTime();

  return (
    <div className="hidden md:flex relative w-full h-[100dvh] overflow-hidden flex-col items-center justify-center bg-[#07080c]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/photos/counter-bg.jpeg"
          alt="Casal"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Heavy romantic blur and dark overlays mapping perfectly to the image reference */}
        <div className="absolute inset-0 bg-[#07080c]/10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d0c12]/30 via-[#1d0c12]/10 to-[#07080c]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07080c_100%)] opacity-40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-8">
        
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <Image src="/assets/icons/heart.svg" alt="" width={16} height={16} className="mb-5 opacity-80" />
          <div className="flex items-center w-full max-w-[320px] gap-6 opacity-80">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#cb867a]/70"></div>
            <span className="uppercase tracking-[0.5em] text-white/90 font-serif text-sm">Juntos Há</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#cb867a]/70"></div>
          </div>
        </div>

        {/* Counter Blocks */}
        <div className="flex items-center justify-center">
          <DesktopTimeBlock value={time.years} label="ANO" />
          <DesktopTimeBlock value={time.months} label="MESES" />
          <DesktopTimeBlock value={time.days} label="DIAS" />
          <DesktopTimeBlock value={time.hours} label="HORAS" />
          <DesktopTimeBlock value={time.minutes} label="MINUTOS" />
          <DesktopTimeBlock value={time.seconds} label="SEGUNDOS" showSeparator={false} />
        </div>

        {/* Horizontal Divider */}
        <div className="flex items-center w-full max-w-xl mx-auto gap-6 mt-20 mb-12 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#cb867a] to-transparent"></div>
          <Image src="/assets/icons/heart.svg" alt="" width={16} height={16} />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#cb867a] to-transparent"></div>
        </div>

        {/* Quote Block */}
        <div className="text-center font-serif text-white/90 text-2xl leading-relaxed max-w-3xl mx-auto px-6 drop-shadow-md">
          <p className="mb-4">O tempo pode ser estranho...</p>
          <p className="mb-4">
            Quando você está longe, os dias passam <span className="font-script text-[#cb867a] text-5xl lowercase px-1">lentos.</span>
          </p>
          <p>
            Mas quando está perto, tudo passa <span className="font-script text-[#cb867a] text-5xl lowercase px-1">rápido demais.</span>
          </p>
        </div>

        {/* Bottom Hearts Element */}
        <div className="mt-12 flex items-center justify-center gap-4 text-[#cb867a] opacity-80">
          <span className="tracking-[0.4em] text-lg">. . .</span>
          <Image src="/assets/icons/heart.svg" alt="" width={24} height={24} className="w-6 h-6" />
          <span className="tracking-[0.4em] text-lg">. . .</span>
        </div>
      </div>

      {/* Right Navigation Button */}
      <button 
        onClick={onNext}
        type="button"
        aria-label="Ir para o próximo slide"
        className="absolute right-12 lg:right-16 top-1/2 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#d88970]/90 hover:bg-[#d88970] transition-transform hover:-translate-y-1 flex items-center justify-center z-20 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer"
      >
        <Image src="/assets/icons/arrow_right.svg" alt="Próximo" width={32} height={32} />
      </button>
    </div>
  );
}

/* --- Mobile Reusable Components --- */

const MobileTimeBlock = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center w-[28%]">
    <span className="text-[2.5rem] font-serif text-[#cb867a] tracking-tighter mb-2 leading-none shadow-black drop-shadow-md">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[9px] uppercase tracking-[0.15em] text-white/70 font-serif whitespace-nowrap">
      {label}
    </span>
  </div>
);

const MobileSeparator = () => (
  <div className="flex flex-col items-center justify-center opacity-50 w-[10%]">
    <div className="w-[1px] h-6 bg-gradient-to-b from-transparent to-[#cb867a]"></div>
    <Image src="/assets/icons/heart.svg" alt="" width={6} height={6} className="my-1 opacity-60 w-1.5 h-1.5" />
    <div className="w-[1px] h-6 bg-gradient-to-t from-transparent to-[#cb867a]"></div>
  </div>
);

function CounterMobileLayout({ onNext }: { onNext: () => void }) {
  const time = useLocalRelationshipTime();

  return (
    <div className="flex md:hidden relative w-full h-[100dvh] overflow-hidden flex-col items-center justify-center bg-[#07080c] py-12 px-6">
      <div className="absolute inset-0 z-0">
        <Image src="/assets/photos/counter-bg.jpeg" alt="Background" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[#07080c]/10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d0c12]/40 via-[#1d0c12]/20 to-[#07080c]/80" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full h-full max-w-sm justify-between py-6">
        <div className="flex flex-col items-center justify-center mt-2">
          <Image src="/assets/icons/heart.svg" alt="" width={14} height={14} className="mb-3 opacity-80" />
          <div className="flex items-center w-full max-w-[240px] gap-4 opacity-80">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#cb867a]/70"></div>
            <span className="uppercase tracking-[0.4em] text-white/90 font-serif text-xs">Juntos Há</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#cb867a]/70"></div>
          </div>
        </div>
        <div className="flex flex-col w-full my-6 relative">
          <div className="flex w-full justify-between items-center mb-8">
            <MobileTimeBlock value={time.years} label="ANO" /><MobileSeparator /><MobileTimeBlock value={time.months} label="MESES" /><MobileSeparator /><MobileTimeBlock value={time.days} label="DIAS" />
          </div>
          <div className="flex w-full justify-between items-center">
            <MobileTimeBlock value={time.hours} label="HORAS" /><MobileSeparator /><MobileTimeBlock value={time.minutes} label="MINUTOS" /><MobileSeparator /><MobileTimeBlock value={time.seconds} label="SEGUNDOS" />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center w-full gap-4 mb-6 opacity-60">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#cb867a] to-transparent"></div><Image src="/assets/icons/heart.svg" alt="" width={12} height={12} /><div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#cb867a] to-transparent"></div>
          </div>
          <div className="text-center font-serif text-white/90 text-base leading-relaxed drop-shadow-md">
            <p className="mb-2">O tempo pode ser estranho...</p>
            <p className="mb-2">Quando você está longe, os dias passam <br/> <span className="font-script text-[#cb867a] text-4xl lowercase leading-none block mt-2">lentos.</span></p>
            <p>Mas quando está perto, tudo passa <br/> <span className="font-script text-[#cb867a] text-4xl lowercase leading-none block mt-2">rápido demais.</span></p>
          </div>
        </div>
        <button onClick={onNext} type="button" aria-label="Ir para o próximo slide" className="w-14 h-14 rounded-full bg-[#d88970]/90 hover:bg-[#d88970] transition-transform active:scale-95 flex items-center justify-center z-20 backdrop-blur-md shadow-lg"><Image src="/assets/icons/arrow_right.svg" alt="Próximo" width={24} height={24} /></button>
      </div>
    </div>
  );
}

export function CounterSlide({ slide, onNext }: CounterSlideProps) {
  return (
    <>
      <CounterDesktopLayout onNext={onNext} />
      <CounterMobileLayout onNext={onNext} />
    </>
  );
}