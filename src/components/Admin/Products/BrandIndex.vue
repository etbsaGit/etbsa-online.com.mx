<template>
  <q-item>
    <q-btn
      label="Registrar Marca"
      dense
      color="primary"
      icon="add"
      @click="addBrand = true"
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
      <q-table bordered flat :rows="brands" :columns="columns" row-key="name">
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
    v-model="addBrand"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Nueva Marca</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn label="Agregar marca" color="blue" @click="storeBrand()" />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <brand-form ref="add" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="editBrand"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Editar Marca {{ selectedBrand.name }}</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn label="Actualizar marca" color="blue" @click="updateBrand()" />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <brand-form ref="edit" :brand="selectedBrand" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="deleteBrand"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">
          Estas seguro de borrar Marca {{ selectedBrand.name }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cerrar" color="red" v-close-popup />
        <q-btn label="Borrar marca" color="blue" @click="delBrand()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { sendRequest } from "src/boot/functions";
import BrandForm from "src/components/Admin/Products/BrandForm.vue";

const $q = useQuasar();

const searchTerm = ref("");
const addBrand = ref(false);
const editBrand = ref(false);
const deleteBrand = ref(false);
const brands = ref([]);
const selectedBrand = ref(null);
const add = ref(null);
const edit = ref(null);

const columns = [
  { name: "id", label: "ID", align: "left", field: "id", sortable: true },
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
  selectedBrand.value = row;
  editBrand.value = true;
};

const onRowDelete = (row) => {
  selectedBrand.value = row;
  deleteBrand.value = true;
};

const getBrands = async () => {
  let res = await sendRequest("GET", null, "/api/brands", "");
  brands.value = res.data.data;
};

const storeBrand = async () => {
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
    ...add.value.formBrand,
  };
  let res = await sendRequest(
    "POST",
    add.value.formBrand,
    "/api/brands",
    "",
    true
  );
  addBrand.value = false;
  getBrands();
};

const updateBrand = async () => {
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
    ...edit.value.formBrand,
    _method: "PUT",
  };
  let res = await sendRequest(
    "POST",
    data,
    "/api/brands/" + selectedBrand.value.id,
    ""
  );
  editBrand.value = false;
  getBrands();
};

const delBrand = async () => {
  let res = await sendRequest(
    "DELETE",
    null,
    "/api/brands/" + selectedBrand.value.id,
    ""
  );
  deleteBrand.value = false;
  getBrands();
};

onMounted(() => {
  getBrands();
});
</script>

<style>
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

