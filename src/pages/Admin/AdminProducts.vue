<template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-accent"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="productos" label="productos" />
      <q-tab name="Categorias" label="Categorias" />
      <q-tab name="Marcas" label="Marcas" />
      <q-tab name="Caracteristicas" label="Caracteristicas" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="productos">
        <product-index />
      </q-tab-panel>

      <q-tab-panel name="Categorias">
        <category-index />
      </q-tab-panel>

      <q-tab-panel name="Marcas">
        <brand-index />
      </q-tab-panel>

      <q-tab-panel name="Caracteristicas">
        <feature-index />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import ProductIndex from "src/components/Admin/Products/ProductIndex.vue";
import BrandIndex from "src/components/Admin/Products/BrandIndex.vue";
import CategoryIndex from "src/components/Admin/Products/CategoryIndex.vue";
import FeatureIndex from "src/components/Admin/Products/FeatureIndex.vue";

const tab = ref("productos");
</script>

<style>
.q-tab-panel {
  padding: 0 !important;
}
</style>
