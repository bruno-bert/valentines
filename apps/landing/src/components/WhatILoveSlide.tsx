import Image from "next/image";
import type { Slide } from "../data/romanticJourneyContent";

interface WhatILoveSlideProps {
  slide: Slide;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface LoveItem {
  title: string;
  description: string;
  icon?: string;
}

function WhatILoveDesktopLayout({ slide, onNext, onPrevious }: WhatILoveSlideProps) {
  const items = slide.items || [];

  return (
    <div className="hidden md:flex relative w-full h-[100dvh] overflow-hidden bg-[#07080c]">
      {/* Right Side Image */}
      <div className="absolute inset-y-0 right-0 w-[40%] z-0">
        <Image
          src="/assets/photos/whatilovephoto.jpeg"
          alt="Nós"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Blending gradients for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#07080c]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07080c] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07080c] to-transparent" />
      </div>

      {/* Left Content Container */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[65%] h-full px-12 lg:px-20 py-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4 lg:mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#cb867a]/50"></div>
            <Image src="/assets/icons/heart.svg" alt="" width={16} height={16} className="opacity-70" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#cb867a]/50"></div>
          </div>
          <h2 className="text-[#cb867a] font-script text-4xl lg:text-6xl drop-shadow-md leading-none">
            {slide.title}
          </h2>
          <div className="mt-3 text-white/90 font-serif text-base max-w-lg leading-relaxed">
            São tantas coisas... mas tem detalhes que fazem<br/>
            meu coração escolher você, <span className="font-script text-[#cb867a] text-3xl lowercase px-1 inline-block translate-y-1">todos os dias.</span>
          </div>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 max-w-3xl mx-auto w-full">
          {items.map((item: LoveItem, idx: number) => {
            const isBottomRow = idx >= 6;
            const isRightCol = idx % 3 === 2;
            
            return (
              <div 
                key={idx} 
                className={`relative flex flex-col items-center text-center px-3 py-4 ${!isBottomRow ? 'border-b border-[#cb867a]/20' : ''} ${!isRightCol ? 'border-r border-[#cb867a]/20' : ''}`}
              >
                {/* Intersection hearts */}
                {(!isBottomRow && !isRightCol) && (
                  <div className="absolute -bottom-1.5 -right-1.5 z-10 bg-[#07080c] p-1 rounded-full flex items-center justify-center">
                    <Image src="/assets/icons/heart.svg" alt="" width={8} height={8} className="opacity-60" />
                  </div>
                )}
                
                <div className="h-8 flex items-center justify-center mb-2">
                  <Image src={item.icon || '/assets/icons/heart.svg'} alt="" width={24} height={24} className="opacity-80 drop-shadow-[0_2px_8px_rgba(203,134,122,0.4)]" />
                </div>
                <h3 className="text-[#d88970] font-serif font-medium text-[1rem] mb-1">{item.title}</h3>
                <div className="text-white/70 font-serif text-[0.7rem] leading-[1.15] max-w-[180px]">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer phrase */}
        <div className="mt-6 text-center flex items-center justify-center gap-3 opacity-90">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#cb867a]/40"></div>
          <div className="text-white/80 font-serif text-lg italic">
            E a lista poderia ser infinita, porque meu amor por você também é. <Image src="/assets/icons/heart.svg" alt="" width={14} height={14} className="inline opacity-80 ml-1" />
          </div>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#cb867a]/40"></div>
        </div>

      </div>

     

    </div>
  );
}

function WhatILoveMobileLayout({ slide }: WhatILoveSlideProps) {
  const items = slide.items || [];

  return (
    <div className="flex md:hidden relative w-full min-h-[100dvh] flex-col items-center bg-[#07080c] py-12 px-6 overflow-y-auto">
      {/* Background with blur */}
      <div className="absolute inset-0 z-0 fixed">
        <Image src="/assets/photos/whatilovephoto.jpeg" alt="Background" fill className="object-cover object-center opacity-15 blur-xl" />
        <div className="absolute inset-0 bg-[#07080c]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d0c12]/40 via-[#07080c]/80 to-[#07080c]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm pb-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 mt-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#cb867a]/50"></div>
            <Image src="/assets/icons/heart.svg" alt="" width={12} height={12} className="opacity-70" />
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#cb867a]/50"></div>
          </div>
          <h2 className="text-[#cb867a] font-script text-4xl drop-shadow-md leading-none mt-2">
            {slide.title}
          </h2>
          <div className="mt-3 text-white/90 font-serif text-sm leading-relaxed px-2">
            São tantas coisas... mas tem detalhes que fazem
            meu coração escolher você, <span className="font-script text-[#cb867a] text-3xl lowercase px-1 block mt-1">todos os dias.</span>
          </div>
        </div>

        {/* List (Stacked for Mobile) */}
        <div className="flex flex-col w-full mb-10 relative border border-[#cb867a]/20 rounded-3xl overflow-hidden bg-[#1d0c12]/50 backdrop-blur-sm shadow-xl">
          {items.map((item: LoveItem, idx: number) => {
            const isLast = idx === items.length - 1;
            return (
              <div key={idx} className={`flex flex-col items-center text-center p-4 ${!isLast ? 'border-b border-[#cb867a]/20' : ''}`}>
                <div className="h-8 flex items-center justify-center mb-2">
                  <Image src={item.icon || '/assets/icons/heart.svg'} alt="" width={20} height={20} className="opacity-80" />
                </div>
                <h3 className="text-[#d88970] font-serif font-medium text-base mb-1">{item.title}</h3>
                <div className="text-white/80 font-serif text-[0.7rem] leading-[1.15]">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-white/80 font-serif text-sm italic px-4 leading-relaxed">
            E a lista poderia ser infinita, porque meu amor por você também é. <Image src="/assets/icons/heart.svg" alt="" width={12} height={12} className="inline opacity-80 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatILoveSlide({ slide, onNext, onPrevious }: WhatILoveSlideProps) {
  return (
    <>
      <WhatILoveDesktopLayout slide={slide} onNext={onNext} onPrevious={onPrevious} />
      <WhatILoveMobileLayout slide={slide} />
    </>
  );
}
