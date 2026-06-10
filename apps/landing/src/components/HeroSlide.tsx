import Image from "next/image";

import type { Slide } from "../data/romanticJourneyContent";

interface HeroSlideProps {
  slide: Slide;
}

function HeroHeadline() {
  return (
    <div className="romantic-hero-badge">
      <span aria-hidden="true">♥</span>
    </div>
  );
}

function HeroMusicCard() {
  return (
    <section className="romantic-hero-music-card" aria-label="Tocando agora">
      <div className="romantic-hero-music-row">
        <div className="romantic-hero-waveform" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="romantic-hero-track-meta">
          <strong>Perfect</strong>
          <span>Ed Sheeran</span>
        </div>
        <div className="romantic-hero-track-favorite" aria-hidden="true">
          <Image alt="" src="/assets/icons/heart.svg" width={20} height={20} />
        </div>
      </div>
      <p className="romantic-hero-music-label">Tocando agora</p>
    </section>
  );
}

function HeroDesktopLayout() {
  return (
    <div className="hidden md:flex relative w-full h-[100dvh] overflow-hidden items-center bg-[#07080c]">
      {/* Background Image Container - Right Aligned with Smoke Edges */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[70%] z-0">
        <Image
          src="/assets/photos/00-first-page.jpeg"
          alt="Casal"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Smoke overlays restricted to the edges so the image remains clear */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#07080c] via-[#07080c]/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07080c] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07080c] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07080c] to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full md:w-[65%] lg:w-[55%] h-full">
        
        {/* Top Left Floating Heart */}
        <div className="mb-6 mt-12 md:mt-0">
           <Image src="/assets/icons/heart.svg" alt="" width={24} height={24} className="opacity-80" />
        </div>

        {/* Headings */}
        <div className="mb-6">
          <h1 className="text-[#cb867a] font-script text-4xl lg:text-5xl leading-none tracking-wide">
            Feito com amor,
          </h1>
          <h2 className="text-[#cb867a] font-script text-5xl lg:text-6xl leading-none flex flex-wrap items-center gap-3 lg:gap-4 mt-2">
            só para você <Image src="/assets/icons/heart.svg" alt="" width={32} height={32} className="w-8 h-8 lg:w-10 lg:h-10" />
          </h2>
        </div>

        {/* First Serif Paragraph */}
        <p className="text-white/90 font-serif text-lg lg:text-xl leading-relaxed max-w-md md:max-w-lg mb-8">
          Fábia, ou Vida vidinha...vidona...Queria te surpreender com algo simples,<br className="hidden lg:block" />
          mas que vem do meu coração.<br className="hidden lg:block" />
          Essa página conta um pouco da nossa história,<br className="hidden lg:block" />
          dos momentos que vivemos e de tudo que ainda<br className="hidden lg:block" />
          sonho viver ao seu lado.
        </p>

        {/* Middle Script Line */}
        <p className="text-[#d88970] font-script text-3xl lg:text-4xl mb-6 flex flex-wrap items-center gap-3">
          Obrigado por ser meu porto seguro! <Image src="/assets/icons/heart.svg" alt="" width={24} height={24} />
        </p>

        {/* Divider with Heart */}
        <div className="flex items-center gap-4 max-w-md md:max-w-lg mb-8 opacity-70">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d88970] to-transparent"></div>
          <Image src="/assets/icons/heart.svg" alt="" width={16} height={16} />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d88970] to-transparent"></div>
        </div>

        {/* Bottom Script Paragraph */}
        <div className="text-[#d88970] font-script text-2xl lg:text-3xl max-w-md md:max-w-lg mb-12 leading-relaxed">
          <p>Desde que você entrou na minha vida,</p>
          <p>os dias passaram a ter mais cor, mais significado e mais amor.</p>
          <p>Graças a você, Tenho tentado melhorar todos os dias como homem, como pai, como filho, como amigo e como amante.</p>
        </div>

        {/* Music Player Card */}
        <div className="max-w-[320px]">
          <div className="border border-[#e8b875]/30 rounded-2xl p-4 flex items-center justify-between mb-4 bg-[#1d0c12]/50 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-4">
              <div className="romantic-hero-waveform" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="flex flex-col">
                <strong className="text-white font-serif text-lg leading-tight font-medium tracking-wide">Perfect</strong>
                <span className="text-white/70 font-serif text-sm tracking-wide">Ed Sheeran</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-white/5">
              <Image src="/assets/icons/heart.svg" alt="" width={20} height={20} />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <span className="uppercase tracking-[0.2em] text-[#d88970] text-xs font-serif font-semibold">
              Tocando agora
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

function HeroMobileLayout({ slide }: HeroSlideProps) {
  return (
    <div className="romantic-hero-root romantic-hero-mobile">
      <div className="romantic-mobile-image-wrapper">
        <Image
          alt="Foto do nosso pôr do sol juntos"
          src={slide.image}
          fill
          priority
          className="romantic-mobile-image"
        />
        <div className="romantic-mobile-image-overlay" />
        <div className="romantic-mobile-badge">
          <HeroHeadline />
        </div>
      </div>
      <div className="romantic-mobile-copy-panel">
        <h1 className="romantic-hero-title">Feito com amor, só para você</h1>
        <div className="romantic-hero-copy">
          <p>Fábia, vida, vidinha ou vidona..Queria te surpreender com algo simples, mas que vem do meu coração.</p>
          <p>Essa página conta um pouco da nossa história, dos momentos que vivemos e de tudo que ainda sonho viver ao seu lado.</p>
        </div>
         

        {/* Bottom Script Paragraph */}
        <div className="text-[#d88970] font-script text-2xl lg:text-3xl max-w-md md:max-w-lg mb-12 leading-relaxed">
          <p>Desde que você entrou na minha vida,</p>
          <p>os dias passaram a ter mais cor, mais significado e mais amor.</p>
          <p>Graças a você, Tenho tentado melhorar todos os dias como homem, como pai, como filho, como amigo e como amante.</p>
        </div>

         <p className="romantic-hero-note">Obrigado por ser meu porto seguro!</p>
      

        
        <HeroMusicCard />
      </div>
    </div>
  );
}

export function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <>
      <h1 className="romantic-visually-hidden">{slide.title}</h1>
      <HeroDesktopLayout />
      <HeroMobileLayout slide={slide} />
    </>
  );
}
