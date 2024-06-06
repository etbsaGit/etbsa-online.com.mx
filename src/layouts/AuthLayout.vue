<template>
  <q-layout view="lHh lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title class="q-pa-sm">
          <router-link to="/">
            <q-img src="..\assets\logo.gif" style="max-width: 10%" />
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-secondary text-white">
      <q-item class="flex justify-center">
        <div>{{ new Date().getFullYear() }} — <strong>ETBSA</strong></div>
      </q-item>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const text = ref(null);
</script>

