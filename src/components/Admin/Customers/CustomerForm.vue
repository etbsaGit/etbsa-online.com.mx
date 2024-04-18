<template>
  <q-form ref="myForm" greedy>
    <q-item>
      <q-item-section>
        <q-input dense outlined v-model="text" label="Nombre" />
      </q-item-section>
      <q-item-section>
        <q-input dense outlined v-model="text" label="Nombre" />
      </q-item-section>
      <q-item-section>
        <q-input dense outlined v-model="text" label="Nombre" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-input dense outlined v-model="text" label="Nombre" />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script setup>
import { ref } from "vue";

const text = ref(null);
const myForm = ref(null);
</script>
