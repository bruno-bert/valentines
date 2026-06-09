import type { ExpoConfig } from "expo/config";

const contentSplashImage = "packages/content-mobile/content/images/jpg/splash.jpeg";

const config: ExpoConfig = {
  name: "Valentines Mobile",
  slug: "valentines-mobile",
  scheme: "valentines",
  version: "0.1.0",
  orientation: "portrait",
  platforms: ["ios", "android", "web"],
  userInterfaceStyle: "automatic",
  splash: {
    image: contentSplashImage,
    resizeMode: "cover",
    backgroundColor: "#080B24"
  },
  plugins: [
    [
      "expo-splash-screen",
      {
        image: contentSplashImage,
        resizeMode: "cover",
        backgroundColor: "#080B24"
      }
    ]
  ],
  experiments: {
    typedRoutes: false
  },
  extra: {
    eas: {
      projectId: "00000000-0000-0000-0000-000000000000"
    }
  }
};

export default config;
