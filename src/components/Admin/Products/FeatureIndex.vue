<template>
  <q-item>
    <q-btn
      label="Registrar caracteristica"
      dense
      color="secondary"
      icon="add"
      @click="addFeature = true"
    />
  </q-item>
  <q-item>
    <q-item-section>
      <q-input
        outlined
        dense
        class="boton"
        color="green-9"
        v-model="searchTerm"
        label="Buscar caracteristica"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section>
      <q-table
        bordered
        flat
        :rows="filteredFeatures"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-dropdown flat color="grey" icon="menu" dense>
              <q-list v-close-popup>
                <q-item>
                  <q-btn
                    flat
                    size="sm"
                    label="Editar"
                    color="blue"
                    icon="edit"
                    @click="onRowEdit(props.row)"
                  />
                </q-item>
                <q-item>
                  <q-btn
                    flat
                    size="sm"
                    label="Borrar"
                    color="red"
                    icon="delete"
                    @click="onRowDelete(props.row)"
                  />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </q-table>
    </q-item-section>
  </q-item>

  <q-dialog
    v-model="addFeature"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Nueva caracteristica</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Agregar caracteristica"
            color="blue"
            @click="storeFeature()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <feature-form ref="add" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="editFeature"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">
          Editar caracteristica {{ selectedFeature.name }}
        </div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Actualizar caracteristica"
            color="blue"
            @click="updateFeature()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <feature-form ref="edit" :feature="selectedFeature" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="deleteFeature"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">
          Estas seguro de borrar caracteristica {{ selectedFeature.name }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cerrar" color="red" v-close-popup />
        <q-btn label="Borrar categoria" color="blue" @click="delFeature()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { sendRequest } from "src/boot/functions";
import FeatureForm from "src/components/Admin/Products/FeatureForm.vue";

const $q = useQuasar();

const searchTerm = ref("");
const addFeature = ref(false);
const editFeature = ref(false);
const deleteFeature = ref(false);
const features = ref([]);
const selectedFeature = ref(null);
const add = ref(null);
const edit = ref(null);

const filteredFeatures = computed(() => {
  return features.value.filter((feature) => {
    return feature.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

const columns = [
  // { name: "id", label: "ID", align: "left", field: "id", sortable: true },
  {
    name: "name",
    label: "Nombre",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "actions",
    label: "Acciones",
    align: "left",
    sortable: false,
  },
];

const onRowEdit = (row) => {
  selectedFeature.value = row;
  editFeature.value = true;
};

const onRowDelete = (row) => {
  selectedFeature.value = row;
  deleteFeature.value = true;
};

const getFeatures = async () => {
  let res = await sendRequest("GET", null, "/api/features", "");
  features.value = res;
};

const storeFeature = async () => {
  const add_valid = await add.value.validate();
  if (!add_valid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Por favor completa todos los campos obligatorios",
    });
    return;
  }
  const data = {
    ...add.value.formFeature,
  };
  let res = await sendRequest("POST", data, "/api/features", "");
  addFeature.value = false;
  getFeatures();
};

const updateFeature = async () => {
  const edit_valid = await edit.value.validate();
  if (!edit_valid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Por favor completa todos los campos obligatorios",
    });
    return;
  }
  const data = {
    ...edit.value.formFeature,
  };
  let res = await sendRequest(
    "PUT",
    data,
    "/api/features/" + selectedFeature.value.id,
    ""
  );
  editFeature.value = false;
  getFeatures();
};

const delFeature = async () => {
  let res = await sendRequest(
    "DELETE",
    null,
    "/api/features/" + selectedFeature.value.id,
    ""
  );
  deleteFeature.value = false;
  getFeatures();
};

onMounted(() => {
  getFeatures();
});
</script>

<style>
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

