import mitt from "mitt";

export default defineNuxtPlugin((nuxtApp) => {
  const emitter = mitt();
  nuxtApp.provide("emitter", emitter);
});
