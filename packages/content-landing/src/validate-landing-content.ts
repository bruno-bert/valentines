import type { CtaLink, LandingContentDocument, StorePlatformButton } from "./types";

const SECTION_IDS = [
  "how-it-works",
  "study-models",
  "problem",
  "benefits",
  "features",
  "differentiators",
  "app-coming-soon"
] as const;

const UNVERIFIED_STAT_PATTERN =
  /\d+\s*(famílias|familia|usuários|usuarios|inscritos|crianças|criancas|mil|milhões|milhoes|centenas|milhares)/i;

function assertNonEmpty(value: string | undefined, field: string): void {
  if (!value || value.trim().length === 0) {
    throw new Error(`Landing content validation failed: ${field} is required`);
  }
}

function assertMinLength<T>(items: T[] | undefined, min: number, field: string): void {
  if (!items || items.length < min) {
    throw new Error(`Landing content validation failed: ${field} requires at least ${min} items`);
  }
}

function assertExactLength<T>(items: T[] | undefined, count: number, field: string): void {
  if (!items || items.length !== count) {
    throw new Error(`Landing content validation failed: ${field} requires exactly ${count} items`);
  }
}

function assertLandingIconPath(icon: string | undefined, field: string): void {
  if (icon === undefined) {
    return;
  }
  if (!icon.startsWith("/landing/icons/")) {
    throw new Error(
      `Landing content validation failed: ${field} must start with "/landing/icons/", received "${icon}"`
    );
  }
}

function assertCtaTarget(cta: CtaLink, expectedTargetId: string, field: string): void {
  if (cta.targetId !== expectedTargetId) {
    throw new Error(
      `Landing content validation failed: ${field}.targetId must be "${expectedTargetId}", received "${cta.targetId}"`
    );
  }
}

function assertSectionId(sectionId: string, expected: string, field: string): void {
  if (sectionId !== expected) {
    throw new Error(
      `Landing content validation failed: ${field}.sectionId must be "${expected}", received "${sectionId}"`
    );
  }
}

function assertTargetExists(targetId: string, field: string): void {
  if (!SECTION_IDS.includes(targetId as (typeof SECTION_IDS)[number])) {
    throw new Error(
      `Landing content validation failed: ${field} references unknown targetId "${targetId}"`
    );
  }
}

function assertStoreButton(button: StorePlatformButton, field: string): void {
  assertNonEmpty(button.platform, `${field}.platform`);
  if (button.status !== "comingSoon" && button.status !== "live") {
    throw new Error(`Landing content validation failed: ${field}.status is invalid`);
  }
  if (button.status === "comingSoon" && button.href !== null) {
    throw new Error(
      `Landing content validation failed: ${field}.href must be null when status is comingSoon`
    );
  }
}

function assertSocialStat(value: string, label: string): void {
  const combined = `${value} ${label}`;
  if (UNVERIFIED_STAT_PATTERN.test(combined)) {
    throw new Error(
      `Landing content validation failed: socialProof.stat must not contain unverified user/family counts`
    );
  }
}

export function validateLandingContentDocument(doc: LandingContentDocument): void {
  assertNonEmpty(doc.brand?.name, "brand.name");
  assertNonEmpty(doc.brand?.logoAlt, "brand.logoAlt");
  if (doc.brand?.logoSrc && !doc.brand.logoSrc.startsWith("/landing/")) {
    throw new Error(
      `Landing content validation failed: brand.logoSrc must start with "/landing/", received "${doc.brand.logoSrc}"`
    );
  }

  assertMinLength(doc.navigation?.items, 1, "navigation.items");
  assertCtaTarget(doc.navigation.primaryCta, "how-it-works", "navigation.primaryCta");
  for (const item of doc.navigation.items) {
    assertNonEmpty(item.id, "navigation.items[].id");
    assertNonEmpty(item.label, "navigation.items[].label");
    assertTargetExists(item.targetId, "navigation.items[].targetId");
  }

  assertNonEmpty(doc.hero.headline, "hero.headline");
  assertNonEmpty(doc.hero.subheadline, "hero.subheadline");
  assertCtaTarget(doc.hero.primaryCta, "how-it-works", "hero.primaryCta");
  assertCtaTarget(doc.hero.secondaryCta, "study-models", "hero.secondaryCta");
  assertNonEmpty(doc.hero.visual?.src, "hero.visual.src");
  assertNonEmpty(doc.hero.visual?.alt, "hero.visual.alt");

  assertNonEmpty(doc.storeButtons?.sectionLabel, "storeButtons.sectionLabel");
  assertStoreButton(doc.storeButtons.appStore, "storeButtons.appStore");
  assertStoreButton(doc.storeButtons.googlePlay, "storeButtons.googlePlay");
  if (doc.storeButtons.appStore.status !== "comingSoon" || doc.storeButtons.googlePlay.status !== "comingSoon") {
    throw new Error(
      `Landing content validation failed: storeButtons must use comingSoon status in V1`
    );
  }

  assertSectionId(doc.howItWorks.sectionId, "how-it-works", "howItWorks");
  assertNonEmpty(doc.howItWorks.title, "howItWorks.title");
  assertNonEmpty(doc.howItWorks.description, "howItWorks.description");
  assertExactLength(doc.howItWorks.steps, 4, "howItWorks.steps");
  for (const [index, step] of doc.howItWorks.steps.entries()) {
    const prefix = `howItWorks.steps[${index}]`;
    assertNonEmpty(step.id, `${prefix}.id`);
    assertNonEmpty(step.title, `${prefix}.title`);
    assertNonEmpty(step.description, `${prefix}.description`);
    assertLandingIconPath(step.icon, `${prefix}.icon`);
  }

  assertSectionId(doc.studyModels.sectionId, "study-models", "studyModels");
  assertNonEmpty(doc.studyModels.title, "studyModels.title");
  assertMinLength(doc.studyModels.items, 3, "studyModels.items");
  for (const [index, item] of doc.studyModels.items.entries()) {
    const prefix = `studyModels.items[${index}]`;
    assertNonEmpty(item.id, `${prefix}.id`);
    assertNonEmpty(item.title, `${prefix}.title`);
    assertNonEmpty(item.description, `${prefix}.description`);
    assertLandingIconPath(item.icon, `${prefix}.icon`);
  }

  assertSectionId(doc.problem.sectionId, "problem", "problem");
  assertNonEmpty(doc.problem.title, "problem.title");
  assertNonEmpty(doc.problem.introduction, "problem.introduction");
  assertMinLength(doc.problem.painPoints, 2, "problem.painPoints");

  assertSectionId(doc.benefits.sectionId, "benefits", "benefits");
  assertNonEmpty(doc.benefits.title, "benefits.title");
  assertMinLength(doc.benefits.items, 3, "benefits.items");

  assertSectionId(doc.features.sectionId, "features", "features");
  assertNonEmpty(doc.features.title, "features.title");
  assertMinLength(doc.features.items, 3, "features.items");

  assertSectionId(doc.differentiators.sectionId, "differentiators", "differentiators");
  assertNonEmpty(doc.differentiators.title, "differentiators.title");
  assertMinLength(doc.differentiators.items, 3, "differentiators.items");

  assertSectionId(doc.socialProof.sectionId, "social-proof", "socialProof");
  assertNonEmpty(doc.socialProof.title, "socialProof.title");
  assertNonEmpty(doc.socialProof.testimonial?.quote, "socialProof.testimonial.quote");
  assertNonEmpty(doc.socialProof.testimonial?.attribution, "socialProof.testimonial.attribution");
  assertNonEmpty(doc.socialProof.stat?.value, "socialProof.stat.value");
  assertNonEmpty(doc.socialProof.stat?.label, "socialProof.stat.label");
  assertSocialStat(doc.socialProof.stat.value, doc.socialProof.stat.label);
  assertMinLength(doc.socialProof.trustBadges, 2, "socialProof.trustBadges");

  assertSectionId(doc.appComingSoon.sectionId, "app-coming-soon", "appComingSoon");
  assertNonEmpty(doc.appComingSoon.title, "appComingSoon.title");
  assertNonEmpty(doc.appComingSoon.description, "appComingSoon.description");
  assertCtaTarget(doc.appComingSoon.primaryCta, "how-it-works", "appComingSoon.primaryCta");
  assertMinLength(doc.appComingSoon.chips, 2, "appComingSoon.chips");
  for (const [index, chip] of doc.appComingSoon.chips.entries()) {
    const prefix = `appComingSoon.chips[${index}]`;
    assertNonEmpty(chip.id, `${prefix}.id`);
    assertNonEmpty(chip.label, `${prefix}.label`);
  }

  assertNonEmpty(doc.footer.copyright, "footer.copyright");
  assertMinLength(doc.footer.links, 1, "footer.links");

  assertNonEmpty(doc.seo.title, "seo.title");
  assertNonEmpty(doc.seo.description, "seo.description");
}
