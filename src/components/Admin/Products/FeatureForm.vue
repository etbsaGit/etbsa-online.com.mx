<template>
  <q-form ref="myForm" greedy>
    <q-item>
      <q-item-section>
        <q-input
          color="secondary"
          dense
          outlined
          v-model="formFeature.name"
          label="Nombre de la caracteristica"
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

const { feature } = defineProps(["feature"]);

const formFeature = ref({
  id: feature ? feature.id : null,
  name: feature ? feature.name : null,
});

const validate = async () => {
  return await myForm.value.validate();
};

defineExpose({
  formFeature,
  validate,
});
</script>
