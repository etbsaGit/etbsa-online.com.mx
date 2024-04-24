<template>
  <q-form ref="myForm" greedy>
    <q-item v-if="formBrand.logo || base64">
      <q-item-section>
        <q-img :src="base64 ? base64 : formBrand.logo" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-input
          dense
          outlined
          v-model="formBrand.name"
          label="Nombre de la marca"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-file
          clearable
          dense
          outlined
          v-model="formBrand.logo"
          label="imagen de la marca"
          lazy-rules
          @clear="base64 = null"
          @input="convertirFile($event)"
        />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script setup>
import { ref } from "vue";

const myForm = ref(null);
const base64 = ref(null);

const { brand } = defineProps(["brand"]);

const formBrand = ref({
  id: brand ? brand.id : null,
  logo: brand ? brand.logo : null,
  name: brand ? brand.name : null,
});

const convertirFile = (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = (e) => {
      base64.value = e.target.result;
    };
    reader.readAsDataURL(archivo);
  } else {
    base64.value = null; // Limpiar base64 cuando no hay archivo seleccionado
  }
};

const validate = async () => {
  return await myForm.value.validate();
};

defineExpose({
  formBrand,
  validate,
});
</script>
