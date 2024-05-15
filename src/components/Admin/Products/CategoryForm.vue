<template>
  <q-form ref="myForm" greedy>
    <q-item v-if="formCategory.base64 || path">
      <q-item-section>
        <q-img :src="formCategory.base64 ? formCategory.base64 : path" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-toggle
          v-model="subCategoria"
          label="Sub-Categoria"
          color="secondary"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-input
          dense
          outlined
          color="secondary"
          v-model="formCategory.name"
          label="Nombre de la categoria"
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
          color="secondary"
          v-model="formCategory.file"
          label="imagen de la proveedor"
          lazy-rules
          @clear="formCategory.base64 = null"
          accept=".jpg, .jpeg, .png, .jfif"
          @input="convertirFile($event)"
        />
      </q-item-section>
    </q-item>
    <q-item v-if="subCategoria">
      <q-item-section>
        <q-select
          v-model="formCategory.parent_id"
          :options="categories"
          label="Pertenece a"
          option-value="id"
          option-label="name"
          option-disable="inactive"
          color="secondary"
          emit-value
          map-options
          transition-show="jump-up"
          transition-hide="jump-up"
          outlined
          clearable
          dense
          hint
          :rules="[(val) => val || 'Obligatorio']"
        />
      </q-item-section>
    </q-item>
  </q-form>
</template>

<script setup>
import { ref } from "vue";

const { category, categories } = defineProps(["category", "categories"]);

const myForm = ref(null);
const path = category ? category.logopath : null;

const formCategory = ref({
  id: category ? category.id : null,
  name: category ? category.name : null,
  base64: null,
  file: [],
  parent_id: category ? category.parent_id : null,
});

const convertirFile = (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      formCategory.value.base64 = base64Data;
    };
    reader.readAsDataURL(archivo);
  } else {
    formCategory.value.base64.value = null; // Limpiar base64 cuando no hay archivo seleccionado
  }
};

const validate = async () => {
  return await myForm.value.validate();
};

defineExpose({
  formCategory,
  validate,
});

const subCategoria = ref(category && category.parent_id !== null);
</script>
