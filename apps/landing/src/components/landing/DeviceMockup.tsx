import type { ImageViewModel } from "../../lib/content/types";
import { toStaticAssetPath } from "../../lib/static-paths";

type DeviceMockupProps = {
  image: ImageViewModel;
  className?: string;
  priority?: boolean;
};

export function DeviceMockup({ image, className = "", priority = false }: DeviceMockupProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-xs rounded-landing-xl border border-landing-border bg-landing-surface p-3 shadow-landing-lift ${className}`.trim()}
    >
      <div className="overflow-hidden rounded-landing-lg bg-landing-subtleBg">
        <img
          src={toStaticAssetPath(image.src)}
          alt={image.alt}
          width={320}
          height={640}
          loading={priority ? "eager" : "lazy"}
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
