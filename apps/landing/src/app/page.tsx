import { AppComingSoonSection } from "../components/landing/AppComingSoonSection";
import { BenefitsSection } from "../components/landing/BenefitsSection";
import { DifferentiatorsSection } from "../components/landing/DifferentiatorsSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HeroSection } from "../components/landing/HeroSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { ProblemSection } from "../components/landing/ProblemSection";
import { SiteFooter } from "../components/landing/SiteFooter";
import { SiteHeader } from "../components/landing/SiteHeader";
import { SocialProofSection } from "../components/landing/SocialProofSection";
import { StudyModelsSection } from "../components/landing/StudyModelsSection";
import { getLandingPageViewModel } from "../lib/content/map-landing-page";

export default function Page() {
  const viewModel = getLandingPageViewModel();

  return (
    <>
      <SiteHeader {...viewModel.header} />
      <main>
        <HeroSection {...viewModel.hero} storeButtons={viewModel.storeButtons} />
        <HowItWorksSection {...viewModel.howItWorks} />
        <StudyModelsSection {...viewModel.studyModels} />
        <ProblemSection {...viewModel.problem} />
        <BenefitsSection {...viewModel.benefits} />
        <FeaturesSection {...viewModel.features} />
        <DifferentiatorsSection {...viewModel.differentiators} />
        <SocialProofSection {...viewModel.socialProof} />
        <AppComingSoonSection {...viewModel.appComingSoon} />
      </main>
      <SiteFooter {...viewModel.footer} />
    </>
  );
}
