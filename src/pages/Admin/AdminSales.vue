<!-- <template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="pedidos" label="pedidos" />
      <q-tab name="alarms" label="Alarms" />
      <q-tab name="movies" label="Movies" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="pedidos">
        <sales-index />
      </q-tab-panel>

      <q-tab-panel name="alarms">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import SalesIndex from "src/components/Admin/Sales/SalesIndex.vue";

const tab = ref("pedidos");
</script>

<style>
.q-tab-panel {
  padding: 0 !important;
}
</style> -->
<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md text-center">
      <img src="..\..\assets\logo.png" alt="App Logo" class="logo" />
      <div class="text-h3 mt-6">Nuevo módulo en proceso</div>
      <div class="text-subtitle1 mt-4">
        Estamos trabajando en el nuevo módulo pedidos para mejorar tu
        experiencia.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.logo {
  max-width: 150px;
  margin: 0 auto;
}
</style>

