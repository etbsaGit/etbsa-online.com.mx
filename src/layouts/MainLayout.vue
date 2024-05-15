<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-secondary" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/">
            <q-img
              src="..\assets\etbsa_logo_agricola.webp"
              style="max-width: 20%"
            />
          </router-link>
        </q-toolbar-title>
        <q-space />
        <div v-if="user">Bienvenido {{ user.name }}</div>
        <q-btn
          v-if="user"
          label="Logout"
          class="q-ml-md"
          size="sm"
          color="red"
          @click="logout"
        ></q-btn>
        <q-btn
          v-else
          label="Login"
          color="blue"
          icon="person"
          class="q-ml-md"
          size="sm"
          @click="toLogin"
        ></q-btn>
        <q-btn
          v-if="user && checkRole('Admin')"
          label="Administracion"
          color="cyan"
          icon="admin_panel_settings"
          class="q-ml-md"
          size="sm"
          @click="toAdmin"
        ></q-btn>
      </q-toolbar>

      <q-separator></q-separator>

      <q-tabs
        align="center"
        dense
        active-color="tertiary"
        active-bg-color="tertiary"
      >
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/shop" label="Catálogo" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="q-py-md bg-secondary">
        <q-toolbar-title class="text-h6 text-center">
          ¡Pide tu cotización ahora mismo!
        </q-toolbar-title>
      </q-toolbar>

      <q-item class="text-center bg-secondary">
        <q-item-section>
          <div class="text-white">
            <strong>Correo electrónico:</strong> coordinacionMC@etbsa.com.mx
          </div>
          <div class="text-white">
            Carretera Panamericana Celaya-Salamanca Km 61 38120 Celaya GTO
          </div>
        </q-item-section>
        <q-item-section>
          <a
            class="text-green-4"
            href="https://wa.link/urpc3g"
            style="text-decoration: none"
          >
            <q-icon name="chat" />
            <strong> ¡Contáctanos!</strong>
          </a>
          <div class="text-white">
            <strong>WhatsApp y teléfono :</strong> 461-138-3265
          </div>
        </q-item-section>
      </q-item>

      <q-toolbar class="bg-accent text-white">
        <q-toolbar-title class="text-white">
          <q-item class="flex justify-center">
            <div>{{ new Date().getFullYear() }} — <strong>ETBSA</strong></div>
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { storeToRefs } from "pinia";
import { checkRole } from "src/boot/functions";

const router = useRouter();

const auth = useAuthStore();
const { logout } = auth;
const { user } = storeToRefs(auth);

const toLogin = async () => {
  router.push("/auth/login");
};

const toAdmin = async () => {
  router.push("/admin");
};
</script>

