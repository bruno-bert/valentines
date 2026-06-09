import type { ImageViewModel } from "../../lib/content/types";
import { toStaticAssetPath } from "../../lib/static-paths";

type HeroVisualProps = {
  image: ImageViewModel;
  className?: string;
  priority?: boolean;
};

export function HeroVisual({ image, className = "", priority = false }: HeroVisualProps) {
  return (
    <div
      className={`motion-scale-in w-full overflow-hidden rounded-landing-xl shadow-landing-lift ${className}`.trim()}
    >
      <img
        src={toStaticAssetPath(image.src)}
        alt={image.alt}
        width={672}
        height={616}
        loading={priority ? "eager" : "lazy"}
        className="aspect-[4/5] h-auto w-full object-cover sm:aspect-square lg:aspect-[5/4]"
      />
    </div>
  );
}
