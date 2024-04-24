<template>
  <q-form ref="myForm" greedy>
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
  </q-form>
</template>

<script setup>
import { ref } from "vue";

const myForm = ref(null);

const { vendor } = defineProps(["vendor"]);

const formVendor = ref({
  id: vendor ? vendor.id : null,
  name: vendor ? vendor.name : null,
});

const validate = async () => {
  return await myForm.value.validate();
};

defineExpose({
  formVendor,
  validate,
});
</script>
