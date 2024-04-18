<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-blue-grey-10 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-img src="src\assets\logo.png" style="max-width: 20%" />
          Administracion ETBSA
        </q-toolbar-title>
        <q-space />

        <div>Usuario autenticado</div>

        <q-btn label="Logout" class="q-ml-md" size="sm" color="red" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-blue-grey-10"
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
import { ref } from "vue";
import AdminDrawerPerfil from "./components/AdminDrawerPerfil.vue";
import AdminDrawerList from "./components/AdminDrawerList.vue";

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
