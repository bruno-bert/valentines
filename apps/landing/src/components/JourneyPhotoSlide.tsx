import Image from "next/image";
import type { Slide } from "../data/romanticJourneyContent";

interface JourneyPhotoSlideProps {
  slide: Slide;
  index?: number;
}

const renderDescription = (text: string | undefined) => {
  if (!text) return null;
  // Allow simple markdown-like asterisks to render romantic script font
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={i} className="font-script text-[#cb867a] text-3xl lg:text-4xl lowercase px-1 tracking-normal leading-none inline-block translate-y-1 lg:translate-y-2">
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

function JourneyPhotoDesktopLayout({ slide, index = 0 }: JourneyPhotoSlideProps) {
  const slideData = slide as unknown as { description?: string; caption?: string };
  const text = slideData.description || slideData.caption || "";
  const isEven = index % 2 === 0;

  return (
    <div className="hidden md:flex relative w-full h-[100dvh] overflow-hidden items-center justify-center bg-[#07080c] py-12">
      {/* Subtle Background Glow/Blur */}
      <div className="absolute inset-0 z-0">
        <Image src={slide.image} alt="" fill className="object-cover opacity-10 blur-2xl" />
        <div className="absolute inset-0 bg-[#07080c]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07080c]/50 to-[#07080c]" />
      </div>

      <div className={`relative z-10 flex items-center justify-center w-full max-w-6xl px-12 lg:px-20 h-full gap-10 lg:gap-16 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Photo Container */}
        <div className="w-1/2 flex justify-center">
          <div className="relative w-full max-w-sm lg:max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-[#cb867a]/30 shadow-[0_8px_32px_rgba(203,134,122,0.15)] bg-[#1d0c12]">
            <Image src={slide.image} alt={`Foto romantica: ${slide.title}`} fill className="object-cover object-center" priority />
          </div>
        </div>

        {/* Text Container */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center">
          {/* Title Row */}
          <div className="flex items-center gap-4 mb-8 w-full justify-center opacity-90">
            <Image src="/assets/icons/heart.svg" alt="" width={24} height={24} className="w-5 h-5 lg:w-6 lg:h-6 opacity-60" />
            <div className="h-[1px] w-12 lg:w-20 bg-gradient-to-r from-transparent to-[#cb867a]/40"></div>
            <h2 className="text-[#cb867a] font-script text-3xl lg:text-4xl text-center px-2 tracking-wide drop-shadow-md">
              {slide.title}
            </h2>
            <div className="h-[1px] w-12 lg:w-20 bg-gradient-to-l from-transparent to-[#cb867a]/40"></div>
            <Image src="/assets/icons/heart.svg" alt="" width={24} height={24} className="w-5 h-5 lg:w-6 lg:h-6 opacity-60" />
          </div>

          {/* Caption */}
          <div className="flex flex-col items-center max-w-lg text-center px-4">
            <Image src="/assets/icons/heart.svg" alt="" width={16} height={16} className="mb-6 opacity-80" />
            <p className="text-white/90 font-serif text-xl lg:text-[1.35rem] leading-relaxed whitespace-pre-line drop-shadow-md">
              {renderDescription(text)}
            </p>
          </div>
        </div>
      </div>

    
     
    </div>
  );
}

function JourneyPhotoMobileLayout({ slide }: JourneyPhotoSlideProps) {
  const slideData = slide as unknown as { description?: string; caption?: string };
  const text = slideData.description || slideData.caption || "";

  return (
    <div className="flex md:hidden relative w-full h-[100dvh] overflow-hidden flex-col items-center bg-[#07080c] py-8 px-6">
      {/* Subtle Background Glow/Blur */}
      <div className="absolute inset-0 z-0">
        <Image src={slide.mobileImage || slide.image} alt="" fill className="object-cover opacity-10 blur-xl" />
        <div className="absolute inset-0 bg-[#07080c]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-[#07080c]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full h-full max-w-sm justify-center py-4">
        {/* Title Row */}
        <div className="flex items-center gap-3 mb-6 w-full justify-center opacity-90">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#cb867a]/50"></div>
          <h2 className="text-[#cb867a] font-script text-2xl text-center px-1 tracking-wide drop-shadow-md">
            {slide.title}
          </h2>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#cb867a]/50"></div>
        </div>

        {/* Photo Container */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#cb867a]/30 shadow-[0_8px_24px_rgba(203,134,122,0.1)] mb-8 bg-[#1d0c12]">
          <Image src={slide.mobileImage || slide.image} alt={`Foto romantica: ${slide.title}`} fill className="object-cover object-center" priority />
        </div>

        {/* Caption */}
        <div className="flex flex-col items-center text-center px-2 flex-1 justify-center max-h-[30vh]">
          <Image src="/assets/icons/heart.svg" alt="" width={12} height={12} className="mb-3 opacity-80" />
          <p className="text-white/90 font-serif text-[1.05rem] leading-relaxed whitespace-pre-line drop-shadow-md">
            {renderDescription(text)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function JourneyPhotoSlide({ slide, index = 0 }: JourneyPhotoSlideProps) {
  return (
    <>
      <JourneyPhotoDesktopLayout slide={slide} index={index} />
      <JourneyPhotoMobileLayout slide={slide} index={index} />
    </>
  );
}
