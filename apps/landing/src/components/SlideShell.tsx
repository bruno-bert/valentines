"use client";

import type { ReactNode } from "react";

interface SlideShellProps {
  children: ReactNode;
  navigation: ReactNode;
  pagination: ReactNode;
  backgroundImage?: string;
  className?: string;
}

export function SlideShell({
  children,
  navigation,
  pagination,
  backgroundImage,
  className = ""
}: SlideShellProps) {
  return (
    <section className={`romantic-slide-shell ${className}`}>
      {backgroundImage ? (
        <div
          aria-hidden="true"
          className="romantic-slide-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : null}
      <div aria-hidden="true" className="romantic-slide-vignette" />
      <div className="romantic-slide-content">{children}</div>
      {navigation}
      {pagination}
    </section>
  );
}
