import { FaApple } from "react-icons/fa6";
import { SiGoogleplay } from "react-icons/si";

import type { StorePlatformButtonViewModel } from "../../lib/content/types";

type StoreBadgeProps = StorePlatformButtonViewModel;

function AppStoreBadgeGraphic() {
  return (
    <span
      className="inline-flex h-10 min-w-[8.75rem] items-center gap-2 rounded-lg bg-black px-3 text-white"
      aria-hidden
    >
      <FaApple className="h-6 w-6 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="text-[9px] font-semibold">Disponível na</span>
        <span className="text-xs font-bold">App Store</span>
      </span>
    </span>
  );
}

function GooglePlayBadgeGraphic() {
  return (
    <span
      className="inline-flex h-10 min-w-[8.75rem] items-center gap-2 rounded-lg bg-black px-3 text-white"
      aria-hidden
    >
      <SiGoogleplay className="h-6 w-6 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="text-[9px] font-semibold">Disponível no</span>
        <span className="text-xs font-bold">Google Play</span>
      </span>
    </span>
  );
}

function StoreBadgeGraphic({ platform }: Pick<StorePlatformButtonViewModel, "platform">) {
  return platform === "ios" ? <AppStoreBadgeGraphic /> : <GooglePlayBadgeGraphic />;
}

function ComingSoonPill() {
  return (
    <span className="absolute -right-1 -top-2 rounded-full bg-landing-primary px-2 py-0.5 text-[10px] font-semibold leading-none text-white">
      Em breve
    </span>
  );
}

export function StoreBadge({ platform, status, href, ariaLabel }: StoreBadgeProps) {
  const badgeGraphic = (
    <span className="relative inline-flex">
      <StoreBadgeGraphic platform={platform} />
      {status === "comingSoon" ? <ComingSoonPill /> : null}
    </span>
  );

  if (status === "comingSoon" || !href) {
    return (
      <span
        role="img"
        aria-label={ariaLabel}
        aria-disabled="true"
        className="inline-flex cursor-default"
      >
        {badgeGraphic}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="inline-flex transition-opacity duration-nobu-fast hover:opacity-90"
    >
      {badgeGraphic}
    </a>
  );
}
