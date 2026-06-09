import { loadLandingContent } from "./load-landing-content";
import type {
  AnchorCtaViewModel,
  AnchorNavItemViewModel,
  CtaLink,
  FooterLink,
  FooterLinkViewModel,
  LandingContentDocument,
  LandingPageViewModel,
  LayoutVariant,
  SeoViewModel,
  StorePlatformButton,
  StorePlatformButtonViewModel
} from "./types";
import { validateLandingContentDocument } from "./validate-landing-content";

const DEFAULT_LAYOUT_VARIANTS: Record<string, LayoutVariant> = {
  howItWorks: "numberedCards",
  studyModels: "bento",
  problem: "gridCards",
  benefits: "bento",
  features: "horizontalScroll",
  differentiators: "strip"
};

function resolveLayoutVariant(
  sectionKey: keyof typeof DEFAULT_LAYOUT_VARIANTS,
  variant?: LayoutVariant
): LayoutVariant {
  return variant ?? DEFAULT_LAYOUT_VARIANTS[sectionKey];
}

function mapCtaLink(cta: CtaLink, id?: string): AnchorCtaViewModel {
  return {
    id,
    label: cta.label,
    href: `#${cta.targetId}`,
    ariaLabel: cta.ariaLabel
  };
}

function mapNavItem(item: { id: string; label: string; targetId: string }): AnchorNavItemViewModel {
  return {
    id: item.id,
    label: item.label,
    href: `#${item.targetId}`
  };
}

function mapFooterLink(link: FooterLink): FooterLinkViewModel {
  const href = link.href ?? "#";
  const isPlaceholder = href === "#" || href.trim().length === 0;

  return {
    id: link.id,
    label: link.label,
    href: isPlaceholder ? "#" : href,
    isPlaceholder,
    category: link.category
  };
}

function mapStoreButton(button: StorePlatformButton): StorePlatformButtonViewModel {
  const defaultAria =
    button.platform === "ios"
      ? "Baixar na App Store — em breve"
      : "Baixar no Google Play — em breve";

  return {
    platform: button.platform,
    status: button.status,
    href: button.href,
    ariaLabel: button.ariaLabel ?? defaultAria
  };
}

function titleIdFor(sectionId: string): string {
  return `${sectionId}-title`;
}

function mapSeo(doc: LandingContentDocument): SeoViewModel {
  return {
    title: doc.seo.title,
    description: doc.seo.description,
    locale: "pt_BR",
    openGraph: {
      title: doc.seo.title,
      description: doc.seo.description,
      locale: "pt_BR",
      type: "website"
    },
    twitter: {
      card: "summary",
      title: doc.seo.title,
      description: doc.seo.description
    }
  };
}

export function mapLandingPageViewModel(doc: LandingContentDocument): LandingPageViewModel {
  return {
    header: {
      brandName: doc.brand.name,
      logoAlt: doc.brand.logoAlt,
      logoSrc: doc.brand.logoSrc,
      tagline: doc.brand.tagline,
      navItems: doc.navigation.items.map(mapNavItem),
      primaryCta: mapCtaLink(doc.navigation.primaryCta, "header-primary-cta")
    },
    hero: {
      eyebrow: doc.hero.eyebrow,
      headline: doc.hero.headline,
      subheadline: doc.hero.subheadline,
      primaryCta: mapCtaLink(doc.hero.primaryCta, "hero-primary-cta"),
      secondaryCta: mapCtaLink(doc.hero.secondaryCta, "hero-secondary-cta"),
      visual: { src: doc.hero.visual.src, alt: doc.hero.visual.alt }
    },
    storeButtons: {
      sectionLabel: doc.storeButtons.sectionLabel,
      appStore: mapStoreButton(doc.storeButtons.appStore),
      googlePlay: mapStoreButton(doc.storeButtons.googlePlay)
    },
    howItWorks: {
      sectionId: doc.howItWorks.sectionId,
      layoutVariant: resolveLayoutVariant("howItWorks", doc.howItWorks.layoutVariant),
      title: doc.howItWorks.title,
      titleId: titleIdFor(doc.howItWorks.sectionId),
      description: doc.howItWorks.description,
      steps: doc.howItWorks.steps.map((step) => ({
        id: step.id,
        title: step.title,
        description: step.description,
        icon: step.icon
      }))
    },
    studyModels: {
      sectionId: doc.studyModels.sectionId,
      layoutVariant: resolveLayoutVariant("studyModels", doc.studyModels.layoutVariant),
      title: doc.studyModels.title,
      titleId: titleIdFor(doc.studyModels.sectionId),
      subtitle: doc.studyModels.subtitle,
      items: doc.studyModels.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon
      }))
    },
    problem: {
      sectionId: doc.problem.sectionId,
      layoutVariant: resolveLayoutVariant("problem", doc.problem.layoutVariant),
      title: doc.problem.title,
      titleId: titleIdFor(doc.problem.sectionId),
      introduction: doc.problem.introduction,
      painPoints: doc.problem.painPoints
    },
    benefits: {
      sectionId: doc.benefits.sectionId,
      layoutVariant: resolveLayoutVariant("benefits", doc.benefits.layoutVariant),
      title: doc.benefits.title,
      titleId: titleIdFor(doc.benefits.sectionId),
      subtitle: doc.benefits.subtitle,
      items: doc.benefits.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        audience: item.audience
      }))
    },
    features: {
      sectionId: doc.features.sectionId,
      layoutVariant: resolveLayoutVariant("features", doc.features.layoutVariant),
      title: doc.features.title,
      titleId: titleIdFor(doc.features.sectionId),
      items: doc.features.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description
      }))
    },
    differentiators: {
      sectionId: doc.differentiators.sectionId,
      layoutVariant: resolveLayoutVariant("differentiators", doc.differentiators.layoutVariant),
      title: doc.differentiators.title,
      titleId: titleIdFor(doc.differentiators.sectionId),
      items: doc.differentiators.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description
      }))
    },
    socialProof: {
      sectionId: doc.socialProof.sectionId,
      title: doc.socialProof.title,
      titleId: titleIdFor(doc.socialProof.sectionId),
      testimonial: {
        id: doc.socialProof.testimonial.id,
        quote: doc.socialProof.testimonial.quote,
        attribution: doc.socialProof.testimonial.attribution,
        disclaimer: doc.socialProof.testimonial.disclaimer
      },
      stat: {
        value: doc.socialProof.stat.value,
        label: doc.socialProof.stat.label
      },
      trustBadges: doc.socialProof.trustBadges.map((badge) => ({
        id: badge.id,
        label: badge.label,
        description: badge.description,
        icon: badge.icon
      }))
    },
    appComingSoon: {
      sectionId: doc.appComingSoon.sectionId,
      title: doc.appComingSoon.title,
      titleId: titleIdFor(doc.appComingSoon.sectionId),
      description: doc.appComingSoon.description,
      primaryCta: mapCtaLink(doc.appComingSoon.primaryCta, "app-coming-soon-primary-cta"),
      chips: doc.appComingSoon.chips.map((chip) => ({
        id: chip.id,
        label: chip.label,
        platform: chip.platform
      }))
    },
    footer: {
      brandName: doc.brand.name,
      copyright: doc.footer.copyright,
      tagline: doc.footer.tagline,
      links: doc.footer.links.map(mapFooterLink)
    },
    seo: mapSeo(doc)
  };
}

export function getLandingPageViewModel(): LandingPageViewModel {
  const doc = loadLandingContent();
  validateLandingContentDocument(doc);
  return mapLandingPageViewModel(doc);
}
