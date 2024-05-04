<template>
  <q-form ref="myForm" greedy>
    <q-item v-if="formVendor.base64 || path">
      <q-item-section>
        <q-img :src="formVendor.base64 ? formVendor.base64 : path" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-input
          dense
          outlined
          v-model="formVendor.name"
          label="Nombre del proveedor"
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
          v-model="formVendor.file"
          label="imagen de la proveedor"
          lazy-rules
          @clear="formVendor.base64 = null"
          accept=".jpg, .jpeg, .png, .jfif"
          @input="convertirFile($event)"
        />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script setup>
import { ref } from "vue";

const { vendor } = defineProps(["vendor"]);

const myForm = ref(null);
const path = vendor ? vendor.logopath : null;

const formVendor = ref({
  id: vendor ? vendor.id : null,
  base64: null,
  file: [],
  name: vendor ? vendor.name : null,
});

const convertirFile = (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      formVendor.value.base64 = base64Data;
    };
    reader.readAsDataURL(archivo);
  } else {
    formVendor.value.base64.value = null; // Limpiar base64 cuando no hay archivo seleccionado
  }
};

const validate = async () => {
  return await myForm.value.validate();
};

defineExpose({
  formVendor,
  validate,
});
</script>
