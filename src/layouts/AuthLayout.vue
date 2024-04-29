<template>
  <q-layout view="lHh lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="..\assets\etbsa_logo_agricola.webp"
            style="max-width: 10%"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-secondary text-white">
      <q-item class="flex justify-center">
        <div>{{ new Date().getFullYear() }} — <strong>Quasar Dev</strong></div>
      </q-item>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const text = ref(null);
</script>

