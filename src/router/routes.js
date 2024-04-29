import { adminPage, guest } from "./middleware";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "product", component: () => import("pages/ProductPage.vue") },
      { path: "shop", component: () => import("pages/ShopPage.vue") },
      { path: "blog", component: () => import("pages/BlogPage.vue") },
      { path: "post", component: () => import("pages/PostPage.vue") },
      { path: "cart", component: () => import("pages/CartPage.vue") },
    ],
  },
  {
    path: "/auth/",
    component: () => import("layouts/AuthLayout.vue"),
    meta: {
      middlewares: [guest],
    },
    children: [
      { path: "login", component: () => import("pages/Auth/AuthLogin.vue") },
      // {
      //   path: "register",
      //   component: () => import("pages/Auth/AuthRegister.vue"),
      // },
    ],
  },
  {
    path: "/admin/",
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      middlewares: [adminPage],
    },
    children: [
      { path: "", component: () => import("pages/Admin/AdminHome.vue") },
      {
        path: "customers",
        component: () => import("pages/Admin/AdminCustomers.vue"),
      },
      {
        path: "products",
        component: () => import("pages/Admin/AdminProducts.vue"),
      },
      {
        path: "sales",
        component: () => import("pages/Admin/AdminSales.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
