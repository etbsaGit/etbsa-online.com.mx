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

    <q-page-sticky position="bottom-right" :offset="[40, 40]">
      <q-btn flat round class="q-btn--highlight" @click="abrirWhatsApp">
        <q-avatar size="100px">
          <img src="../assets/whatsapplogo.jpg" />
        </q-avatar>
        <q-tooltip
          class="q-tooltip--custom bg-green text-body2"
          transition-show="flip-right"
          transition-hide="flip-left"
          anchor="center left"
          self="bottom end"
        >
          ¡Pide tu cotización ahora mismo!
        </q-tooltip>
      </q-btn>
    </q-page-sticky>

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

const abrirWhatsApp = () => {
  const newUrl = "https://wa.link/urpc3g";
  window.open(newUrl, "_blank");
};
</script>

<style scoped>
.q-btn--highlight {
  transition: transform 0.3s, background-color 0.3s;
}

.q-btn--highlight:hover {
  background-color: #e0f7fa; /* Cambia este color según tus necesidades */
  transform: scale(1.1); /* Ajusta el valor según la escala deseada */
}

.q-tooltip--custom {
  background-color: #4caf50; /* Color de fondo del tooltip */
  color: white; /* Color del texto del tooltip */
  font-size: 16px; /* Tamaño del texto del tooltip */
  border-radius: 4px; /* Bordes redondeados */
}
</style>

