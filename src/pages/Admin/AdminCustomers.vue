<template>
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
      <q-tab name="clientes" label="Clientes" />
      <q-tab name="proveedores" label="proveedores" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="clientes">
        <customer-index />
      </q-tab-panel>

      <q-tab-panel name="proveedores">
        <supplier-index />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import CustomerIndex from "src/components/Admin/Customers/CustomerIndex.vue";
import SupplierIndex from "src/components/Admin/Customers/SupplierIndex.vue";

const tab = ref("clientes");
</script>

<style>
.q-tab-panel {
  padding: 0 !important;
}
</style>
