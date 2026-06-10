import React from 'react';
import Image from 'next/image';
import type { Slide } from "../data/romanticJourneyContent";

interface FinalMessageSlideProps {
  slide?: Slide;
  title?: string;
  image?: string;
  message?: string[] | string;
  closing?: string;
}

export function FinalMessageSlide({
  slide,
  title,
  image,
  message,
  closing,
}: FinalMessageSlideProps) {
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-black text-white relative overflow-hidden">
      {/* Mobile Layout: Photo at the top fading into black */}
      <div className="md:hidden w-full h-[45dvh] relative shrink-0">
        <Image
          src="/assets/photos/finalmessagepicture.jpeg"
          alt="Final message photo"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient fade to black at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Text Content: Left side on Desktop, Bottom side on Mobile */}
      <div className="w-full md:w-[55%] h-full flex flex-col justify-center items-center p-6 md:p-12 z-10 overflow-y-auto">
        <div className="max-w-xl flex flex-col items-center text-center space-y-6 md:space-y-8 py-4 md:py-0">
          
          <div className="space-y-2 flex flex-col items-center">
            <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-rose-200/80 font-serif">
              Mensagem Final
            </span>
            <h2 
              className="text-4xl md:text-6xl font-script text-rose-300 transform -rotate-2 mt-2 flex items-center gap-3" 
              style={{ fontFamily: 'var(--font-brittany, cursive)' }}
            >
              Para o meu tudo! <span className="text-2xl text-rose-300 font-sans font-light not-italic">♡</span>
            </h2>
          </div>

          <div className="space-y-4 text-sm md:text-base text-rose-100/90 font-serif leading-relaxed px-2 md:px-8">
            <p>
              Se eu pudesse resumir o que sinto por você,<br className="hidden md:block"/>
              diria que é lar, é paz, é o melhor de mim. ♡
            </p>
            <p>
              Você transformou meus dias, meus planos e meus sonhos.<br className="hidden md:block"/>
              Me ensinou o verdadeiro significado do amor<br className="hidden md:block"/>
              e me mostrou que o melhor da vida é ter alguém<br className="hidden md:block"/>
              com quem compartilhar cada detalhe. ♡
            </p>
            <p>
              Obrigada por ser minha melhor escolha todos os dias.<br className="hidden md:block"/>
              Por caminhar ao meu lado, por me apoiar,<br className="hidden md:block"/>
              por me amar do seu jeito único e por fazer<br className="hidden md:block"/>
              de cada momento algo tão especial. ♡
            </p>
            <p>
              Que nossa história continue sendo escrita com muito amor,<br className="hidden md:block"/>
              companheirismo e aventuras. Eu mal posso esperar<br className="hidden md:block"/>
              por tudo que ainda vamos viver juntos. ♡
            </p>
          </div>

          <div className="pt-6 border-t border-rose-900/30 w-24 flex justify-center" />

          <div className="flex flex-col items-center relative">
            <div className="flex items-center gap-4">
              <span className="text-rose-300 text-xl font-light">♡</span>
              <span className="text-5xl md:text-7xl font-serif text-rose-300 tracking-[0.15em] ml-3">FIM</span>
              <span className="text-rose-300 text-xl font-light">♡</span>
            </div>
            <span 
              className="text-2xl md:text-3xl font-script text-rose-200 mt-2" 
              style={{ fontFamily: 'var(--font-brittany, cursive)' }}
            >
              (de um grande começo) <span className="text-lg font-sans not-italic">♡</span>
            </span>
          </div>

          <div className="pt-6 flex items-center gap-3 text-rose-200/70">
            <span className="text-lg">✧</span>
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-serif">
              O melhor ainda está por vir.
            </span>
            <span className="text-lg">✧</span>
          </div>

        </div>
      </div>

      {/* Desktop Layout: Full-height image on the right side */}
      <div className="hidden md:block absolute right-0 top-0 w-[45%] h-full z-0">
        <Image
          src="/assets/photos/finalmessagepicture.jpeg"
          alt="Final message photo"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Smooth gradient fading the image into the black background on the left */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

    </div>
  );
}