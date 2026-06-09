export type CtaLink = {
  label: string;
  targetId: string;
  ariaLabel?: string;
};

export type LayoutVariant =
  | "default"
  | "zigzag"
  | "bento"
  | "horizontalScroll"
  | "strip"
  | "gradientPanel"
  | "numberedCards"
  | "timeline"
  | "gridCards";

export type BrandContent = {
  name: string;
  tagline?: string;
  logoAlt: string;
  logoSrc?: string;
};

export type NavItem = {
  id: string;
  label: string;
  targetId: string;
};

export type NavigationContent = {
  items: NavItem[];
  primaryCta: CtaLink;
};

export type ImageRef = {
  src: string;
  alt: string;
};

export type HeroContent = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  visual: ImageRef;
};

export type StorePlatform = "ios" | "android";
export type StoreStatus = "comingSoon" | "live";

export type StorePlatformButton = {
  platform: StorePlatform;
  status: StoreStatus;
  href: string | null;
  ariaLabel?: string;
};

export type StoreButtonsContent = {
  sectionLabel: string;
  appStore: StorePlatformButton;
  googlePlay: StorePlatformButton;
};

export type PainPoint = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type HowItWorksStep = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type HowItWorksContent = {
  sectionId: string;
  layoutVariant?: LayoutVariant;
  title: string;
  description: string;
  steps: HowItWorksStep[];
};

export type StudyModelItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type StudyModelsContent = {
  sectionId: string;
  layoutVariant?: LayoutVariant;
  title: string;
  subtitle?: string;
  items: StudyModelItem[];
};

export type ProblemContent = {
  sectionId: string;
  layoutVariant?: LayoutVariant;
  title: string;
  introduction: string;
  painPoints: PainPoint[];
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
  audience?: "child" | "family" | "educator";
  icon?: string;
};

export type BenefitsContent = {
  sectionId: string;
  layoutVariant?: LayoutVariant;
  title: string;
  subtitle?: string;
  items: BenefitItem[];
};

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type FeaturesContent = {
  sectionId: string;
  layoutVariant?: LayoutVariant;
  title: string;
  items: FeatureItem[];
};

export type DifferentiatorItem = {
  id: string;
  title: string;
  description: string;
};

export type DifferentiatorsContent = {
  sectionId: string;
  layoutVariant?: LayoutVariant;
  title: string;
  items: DifferentiatorItem[];
};

export type TestimonialContent = {
  id: string;
  quote: string;
  attribution: string;
  disclaimer?: string;
};

export type SocialStatContent = {
  value: string;
  label: string;
};

export type TrustBadgeContent = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
};

export type SocialProofContent = {
  sectionId: string;
  title: string;
  testimonial: TestimonialContent;
  stat: SocialStatContent;
  trustBadges: TrustBadgeContent[];
};

export type AppComingSoonChip = {
  id: string;
  label: string;
  platform?: StorePlatform;
};

export type AppComingSoonContent = {
  sectionId: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  chips: AppComingSoonChip[];
};

export type FooterLink = {
  id: string;
  label: string;
  href?: string;
  category: "institutional" | "legal";
};

export type FooterContent = {
  copyright: string;
  tagline?: string;
  links: FooterLink[];
};

export type SeoContent = {
  title: string;
  description: string;
  ogImageAlt?: string;
  keywords?: string[];
};

export type LandingContentDocument = {
  brand: BrandContent;
  navigation: NavigationContent;
  hero: HeroContent;
  storeButtons: StoreButtonsContent;
  howItWorks: HowItWorksContent;
  studyModels: StudyModelsContent;
  problem: ProblemContent;
  benefits: BenefitsContent;
  features: FeaturesContent;
  differentiators: DifferentiatorsContent;
  socialProof: SocialProofContent;
  appComingSoon: AppComingSoonContent;
  footer: FooterContent;
  seo: SeoContent;
};

export type AnchorCtaViewModel = {
  id?: string;
  label: string;
  href: string;
  ariaLabel?: string;
};

export type AnchorNavItemViewModel = {
  id: string;
  label: string;
  href: string;
};

export type HeaderViewModel = {
  brandName: string;
  logoAlt: string;
  logoSrc?: string;
  tagline?: string;
  navItems: AnchorNavItemViewModel[];
  primaryCta: AnchorCtaViewModel;
};

export type ImageViewModel = {
  src: string;
  alt: string;
};

export type HeroViewModel = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: AnchorCtaViewModel;
  secondaryCta: AnchorCtaViewModel;
  visual: ImageViewModel;
};

export type StorePlatformButtonViewModel = {
  platform: StorePlatform;
  status: StoreStatus;
  href: string | null;
  ariaLabel: string;
};

export type StoreButtonsViewModel = {
  sectionLabel: string;
  appStore: StorePlatformButtonViewModel;
  googlePlay: StorePlatformButtonViewModel;
};

export type HowItWorksStepViewModel = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type HowItWorksSectionViewModel = {
  sectionId: string;
  layoutVariant: LayoutVariant;
  title: string;
  titleId: string;
  description: string;
  steps: HowItWorksStepViewModel[];
};

export type StudyModelCardViewModel = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type StudyModelsSectionViewModel = {
  sectionId: string;
  layoutVariant: LayoutVariant;
  title: string;
  titleId: string;
  subtitle?: string;
  items: StudyModelCardViewModel[];
};

export type ProblemSectionViewModel = {
  sectionId: string;
  layoutVariant: LayoutVariant;
  title: string;
  titleId: string;
  introduction: string;
  painPoints: PainPoint[];
};

export type BenefitCardViewModel = {
  id: string;
  title: string;
  description: string;
  audience?: BenefitItem["audience"];
};

export type BenefitsSectionViewModel = {
  sectionId: string;
  layoutVariant: LayoutVariant;
  title: string;
  titleId: string;
  subtitle?: string;
  items: BenefitCardViewModel[];
};

export type FeatureCardViewModel = {
  id: string;
  title: string;
  description: string;
};

export type FeaturesSectionViewModel = {
  sectionId: string;
  layoutVariant: LayoutVariant;
  title: string;
  titleId: string;
  items: FeatureCardViewModel[];
};

export type DifferentiatorCardViewModel = {
  id: string;
  title: string;
  description: string;
};

export type DifferentiatorsSectionViewModel = {
  sectionId: string;
  layoutVariant: LayoutVariant;
  title: string;
  titleId: string;
  items: DifferentiatorCardViewModel[];
};

export type TestimonialViewModel = {
  id: string;
  quote: string;
  attribution: string;
  disclaimer?: string;
};

export type SocialStatViewModel = {
  value: string;
  label: string;
};

export type TrustBadgeViewModel = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
};

export type SocialProofSectionViewModel = {
  sectionId: string;
  title: string;
  titleId: string;
  testimonial: TestimonialViewModel;
  stat: SocialStatViewModel;
  trustBadges: TrustBadgeViewModel[];
};

export type AppComingSoonChipViewModel = {
  id: string;
  label: string;
  platform?: StorePlatform;
};

export type AppComingSoonSectionViewModel = {
  sectionId: string;
  title: string;
  titleId: string;
  description: string;
  primaryCta: AnchorCtaViewModel;
  chips: AppComingSoonChipViewModel[];
};

export type FooterLinkViewModel = {
  id: string;
  label: string;
  href: string;
  isPlaceholder: boolean;
  category: FooterLink["category"];
};

export type FooterViewModel = {
  brandName: string;
  copyright: string;
  tagline?: string;
  links: FooterLinkViewModel[];
};

export type OpenGraphViewModel = {
  title: string;
  description: string;
  locale: string;
  type: string;
};

export type TwitterCardViewModel = {
  card: "summary" | "summary_large_image";
  title: string;
  description: string;
};

export type SeoViewModel = {
  title: string;
  description: string;
  locale: string;
  openGraph: OpenGraphViewModel;
  twitter: TwitterCardViewModel;
};

export type LandingPageViewModel = {
  header: HeaderViewModel;
  hero: HeroViewModel;
  storeButtons: StoreButtonsViewModel;
  howItWorks: HowItWorksSectionViewModel;
  studyModels: StudyModelsSectionViewModel;
  problem: ProblemSectionViewModel;
  benefits: BenefitsSectionViewModel;
  features: FeaturesSectionViewModel;
  differentiators: DifferentiatorsSectionViewModel;
  socialProof: SocialProofSectionViewModel;
  appComingSoon: AppComingSoonSectionViewModel;
  footer: FooterViewModel;
  seo: SeoViewModel;
};
