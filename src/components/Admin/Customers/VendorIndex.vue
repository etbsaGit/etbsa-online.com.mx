<template>
  <q-item>
    <q-btn
      label="Registrar Marca"
      dense
      color="primary"
      icon="add"
      @click="addVendor = true"
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
        label="Buscar Marca"
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
        :rows="filteredVendors"
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
        <template v-slot:body-cell-id="props">
          <q-td>
            <q-item class="q-my-none" dense>
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  v-if="props.row.logo && props.row.logopath"
                >
                  <img :src="props.row.logopath" alt="Foto del proveedor" />
                </q-avatar>
                <q-avatar v-else color="primary" text-color="white">
                  {{ props.row.name.charAt(0).toUpperCase()
                  }}{{ props.row.name.charAt(1).toUpperCase() }}
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
      </q-table>
    </q-item-section>
  </q-item>

  <q-dialog
    v-model="addVendor"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Nueva Marca</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Agregar proveedor"
            color="blue"
            @click="storeVendor()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <vendor-form ref="add" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="editVendor"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Editar proveedor {{ selectedVendor.name }}</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Actualizar proveedor"
            color="blue"
            @click="updateVendor()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <vendor-form ref="edit" :vendor="selectedVendor" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="deleteVendor"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">
          Estas seguro de borrar Marca {{ selectedVendor.name }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cerrar" color="red" v-close-popup />
        <q-btn label="Borrar proveedor" color="blue" @click="delVendor()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { sendRequest } from "src/boot/functions";
import VendorForm from "src/components/Admin/Customers/VendorForm.vue";

const $q = useQuasar();

const searchTerm = ref("");
const addVendor = ref(false);
const editVendor = ref(false);
const deleteVendor = ref(false);
const vendors = ref([]);
const selectedVendor = ref(null);
const add = ref(null);
const edit = ref(null);

const filteredVendors = computed(() => {
  return vendors.value.filter((vendor) => {
    return vendor.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

const columns = [
  { name: "id", label: "Foto", align: "left", field: "id", sortable: true },
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
  selectedVendor.value = row;
  editVendor.value = true;
};

const onRowDelete = (row) => {
  selectedVendor.value = row;
  deleteVendor.value = true;
};

const getVendors = async () => {
  let res = await sendRequest("GET", null, "/api/vendors", "");
  vendors.value = res;
};

const storeVendor = async () => {
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
    ...add.value.formVendor,
  };
  let res = await sendRequest("POST", data, "/api/vendors", "");
  addVendor.value = false;
  getVendors();
};

const updateVendor = async () => {
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
    ...edit.value.formVendor,
  };
  let res = await sendRequest(
    "PUT",
    data,
    "/api/vendors/" + selectedVendor.value.id,
    ""
  );
  editVendor.value = false;
  getVendors();
};

const delVendor = async () => {
  let res = await sendRequest(
    "DELETE",
    null,
    "/api/vendors/" + selectedVendor.value.id,
    ""
  );
  deleteVendor.value = false;
  getVendors();
};

onMounted(() => {
  getVendors();
});
</script>

<style>
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

