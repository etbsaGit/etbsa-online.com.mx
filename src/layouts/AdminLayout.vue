<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-blue-grey-1 text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-pa-sm">
          <q-img src="..\assets\logo.png" style="max-width: 20%" />
          Administracion ETBSA
        </q-toolbar-title>
        <q-space />

        <div>Bienvenido {{ user.name }}</div>

        <q-btn
          label="Logout"
          class="q-ml-md"
          size="sm"
          color="red"
          @click="logout()"
        />
        <q-btn
          label="Home page"
          icon="home"
          class="q-ml-md"
          size="sm"
          color="cyan"
          @click="toHome"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-blue-grey-1"
    >
      <!-- drawer content -->
      <admin-drawer-perfil />
      <admin-drawer-list />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";

import AdminDrawerPerfil from "./components/AdminDrawerPerfil.vue";
import AdminDrawerList from "./components/AdminDrawerList.vue";

const leftDrawerOpen = ref(false);
const auth = useAuthStore();
const { logout } = auth;
const { user } = storeToRefs(auth);

const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toHome = async () => {
  router.push("/");
};
</script>
