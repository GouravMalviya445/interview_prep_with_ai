const env = {
  firebase: {
    projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),

    // Firebase server config
    server: {
      privateKey: String(process.env.FIREBASE_PRIVATE_KEY),
      clientEmail: String(process.env.FIREBASE_CLIENT_EMAIL),
    },

    // Firebase client config
    client: {
      apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
      authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
      storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
      messagingSenderId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
      appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
      measurementId: String(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
    }
  },
  nodeEnv: String(process.env.NODE_ENV),
}

export default env;