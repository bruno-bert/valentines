import type { StoreButtonsViewModel } from "../src/lib/content/types";

export const mockStoreButtons: StoreButtonsViewModel = {
  sectionLabel: "Disponível em breve nas lojas",
  appStore: {
    platform: "ios",
    status: "comingSoon",
    href: null,
    ariaLabel: "Baixar na App Store — em breve"
  },
  googlePlay: {
    platform: "android",
    status: "comingSoon",
    href: null,
    ariaLabel: "Baixar no Google Play — em breve"
  }
};
