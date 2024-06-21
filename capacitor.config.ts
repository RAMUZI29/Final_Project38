import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carrent.app',
  appName: 'Carrent App',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      clientId: "418249711917-id1t993m4kqinfv1toscjajkh2i0dmj2.apps.googleusercontent.com",
      serverClientId: "418249711917-id1t993m4kqinfv1toscjajkh2i0dmj2.apps.googleusercontent.com",
      androidClientId: "418249711917-id1t993m4kqinfv1toscjajkh2i0dmj2.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },
  }
};

export default config;

// 418249711917-id1t993m4kqinfv1toscjajkh2i0dmj2.apps.googleusercontent.com
