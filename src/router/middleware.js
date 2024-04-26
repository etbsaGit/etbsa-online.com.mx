import { useAuthStore } from "src/stores/auth";
import { checkRole } from "src/boot/functions";

export function guest(/* { to, from, next } */ { to, next }) {
  const auth = useAuthStore();
  if (auth.user) {
    auth.returnUrl = to.fullPath;
    return next("/");
  }
  return next();
}

export function adminPage(/* { to, from, next } */ { to, next }) {
  const auth = useAuthStore();

  if (!auth.user) {
    auth.returnUrl = to.fullPath;
    return next("/auth/login");
  }

  if (!checkRole("Admin")) {
    return next("/");
  }

  return next();
}
