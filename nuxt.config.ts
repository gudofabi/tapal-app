// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    host: process.env.VITE_HOST_URL,
    port: 3000,
  },

  modules: ["@nuxt/ui", "@qirolab/nuxt-sanctum-authentication", "@pinia/nuxt"],

  laravelSanctum: {
    // Replace with your Laravel API URL
    apiUrl: process.env.VITE_MIDDLEWARE_URL,
    authMode: "cookie",
    sanctumEndpoints: {
      /**
       * The endpoint to request a new CSRF token.
       * @default '/sanctum/csrf-cookie'
       */
      csrf: "/sanctum/csrf-cookie",

      /**
       * The endpoint to send user credentials to authenticate.
       * @default '/login'
       */
      login: "/api/login",

      /**
       * The endpoint to destroy current user session.
       * @default '/logout'
       */
      logout: "/api/logout",

      /**
       * The endpoint to fetch current user data.
       * @default '/api/user'
       */
      user: "/api/user",
    },
    redirect: {
      /**
       * Determines whether to keep the requested route when redirecting after login.
       * @default false
       */
      enableIntendedRedirect: false,

      /**
       * Path to redirect to when access requires user authentication.
       * If set to false, a 403 error is triggered.
       * @default '/login'
       */
      loginPath: "/login",

      /**
       * URL to redirect to when guest access is required (user must not be authenticated).
       * If set to false, the plugin will throw an 403 error.
       * @default '/'
       */
      guestOnlyRedirect: "/login",

      /**
       * URL to redirect to after a successful login.
       * If set to false, no redirection occurs.
       * @default '/'
       */
      redirectToAfterLogin: "/loans",

      /**
       * URL to redirect to after logout.
       * If set to false, no redirection occurs.
       * @default '/'
       */
      redirectToAfterLogout: "/login",
    },
  },

  compatibilityDate: "2025-01-20",
});
