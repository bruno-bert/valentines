import type { StoreButtonsViewModel } from "../../lib/content/types";

import { StoreBadge } from "./StoreBadge";

type StoreButtonsGroupProps = StoreButtonsViewModel & {
  className?: string;
};

export function StoreButtonsGroup({
  sectionLabel,
  appStore,
  googlePlay,
  className = ""
}: StoreButtonsGroupProps) {
  return (
    <div className={className}>
      <p className="mb-3 text-landing-label uppercase text-landing-muted">{sectionLabel}</p>
      <div className="flex flex-wrap items-center gap-3">
        <StoreBadge {...appStore} />
        <StoreBadge {...googlePlay} />
      </div>
    </div>
  );
}
