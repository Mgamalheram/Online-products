export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("kabret_task_token").value;

  if (token) {
    if (to.fullPath.includes("auth")) {
      return navigateTo("/");
    }
  } else {
    if (!to.fullPath.includes("auth")) {
      return navigateTo("/auth/login");
    }
  }
});
