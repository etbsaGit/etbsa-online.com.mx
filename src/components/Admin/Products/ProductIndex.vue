<template>
  <q-item>
    <q-btn
      label="Registrar producto"
      dense
      color="primary"
      icon="add"
      @click="addProduct = true"
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
        label="Buscar producto"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section>
      <q-table bordered flat :rows="products" :columns="columns" row-key="name">
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
        <template v-slot:body-cell-active="props">
          <q-td :props="props">
            <q-btn
              round
              size="xs"
              icon="power_settings_new"
              :color="props.row.active == true ? 'green' : 'grey'"
              @click="changeActive(props.row)"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-featured="props">
          <q-td :props="props">
            <q-btn
              round
              size="xs"
              icon="power_settings_new"
              :color="props.row.featured == true ? 'green' : 'grey'"
              @click="changeFeatured(props.row)"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <q-item-section>
              <q-item-label>{{ props.row.name }}</q-item-label>
              <q-tooltip>{{ props.row.description }}</q-tooltip>
            </q-item-section>
          </q-td>
        </template>
        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <q-item-section>
              <q-item-label>${{ props.row.price }}</q-item-label>
            </q-item-section>
          </q-td>
        </template>
        <template v-slot:body-cell-sale_price="props">
          <q-td :props="props">
            <q-item-section>
              <q-item-label>${{ props.row.sale_price }}</q-item-label>
            </q-item-section>
          </q-td>
        </template>
        <template v-slot:body-cell-brand="props">
          <q-td :props="props">
            <q-item class="q-my-none" dense v-if="props.row.brand">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  v-if="props.row.brand.logopath"
                >
                  <img
                    :src="props.row.brand.logopath"
                    alt="Foto del empleado"
                  />
                </q-avatar>
                <q-avatar v-else color="primary" text-color="white">
                  {{ props.row.name.charAt(0).toUpperCase()
                  }}{{ props.row.name.charAt(1).toUpperCase() }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ props.row.brand.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-vendor="props">
          <q-td :props="props">
            <q-item class="q-my-none" dense v-if="props.row.vendor">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  v-if="props.row.vendor.logopath"
                >
                  <img
                    :src="props.row.vendor.logopath"
                    alt="Foto del empleado"
                  />
                </q-avatar>
                <q-avatar v-else color="primary" text-color="white">
                  {{ props.row.name.charAt(0).toUpperCase()
                  }}{{ props.row.name.charAt(1).toUpperCase() }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ props.row.vendor.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
      </q-table>
    </q-item-section>
  </q-item>

  <q-dialog
    v-model="addProduct"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Nueva producto</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Agregar producto"
            color="blue"
            @click="storeProduct()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <product-form ref="add" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="editProduct"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Editar producto {{ selectedProduct.name }}</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Actualizar producto"
            color="blue"
            @click="updateProduct()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <product-form
          ref="edit"
          :product="selectedProduct"
          :key="selectedProduct.images.length"
        />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="deleteProduct"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">
          Estas seguro de borrar producto {{ selectedProduct.name }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cerrar" color="red" v-close-popup />
        <q-btn label="Borrar producto" color="blue" @click="delProduct()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { sendRequest } from "src/boot/functions";
import ProductForm from "src/components/Admin/Products/ProductForm.vue";

const $q = useQuasar();

const searchTerm = ref("");
const addProduct = ref(false);
const editProduct = ref(false);
const deleteProduct = ref(false);
const products = ref([]);
const selectedProduct = ref(null);
const add = ref(null);
const edit = ref(null);

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
    name: "sku",
    label: "SKU",
    align: "left",
    field: "sku",
    sortable: true,
  },
  {
    name: "brand",
    label: "Marca",
    align: "left",
    field: "brand",
    sortable: true,
  },
  {
    name: "vendor",
    label: "Proveedor",
    align: "left",
    field: "vendor",
    sortable: true,
  },
  // {
  //   name: "description",
  //   label: "Descripcion",
  //   align: "left",
  //   field: "description",
  //   sortable: true,
  // },
  {
    name: "quantity",
    label: "Cantidad",
    align: "left",
    field: "quantity",
    sortable: true,
  },
  {
    name: "price",
    label: "Precio",
    align: "left",
    field: "price",
    sortable: true,
  },
  {
    name: "sale_price",
    label: "Precio de venta",
    align: "left",
    field: "sale_price",
    sortable: true,
  },
  {
    name: "active",
    label: "Activo",
    align: "left",
    field: "active",
    sortable: true,
  },
  {
    name: "featured",
    label: "featured",
    align: "left",
    field: "featured",
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
  selectedProduct.value = row;
  editProduct.value = true;
};

const onRowDelete = (row) => {
  selectedProduct.value = row;
  deleteProduct.value = true;
};

const getProducts = async () => {
  let res = await sendRequest("GET", null, "/api/products", "");
  products.value = res;
};

const storeProduct = async () => {
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
    ...add.value.formProduct,
  };
  let res = await sendRequest("POST", data, "/api/products", "");
  addProduct.value = false;
  getProducts();
};

const updateProduct = async () => {
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
    ...edit.value.formProduct,
  };
  let res = await sendRequest(
    "PUT",
    data,
    "/api/products/" + selectedProduct.value.id,
    ""
  );
  editProduct.value = false;
  getProducts();
};

const delProduct = async () => {
  let res = await sendRequest(
    "DELETE",
    null,
    "/api/products/" + selectedProduct.value.id,
    ""
  );
  deleteProduct.value = false;
  getProducts();
};

const changeActive = async (row) => {
  let res = await sendRequest("PUT", null, "/api/product/active/" + row.id, "");
  getProducts();
};

const changeFeatured = async (row) => {
  let res = await sendRequest(
    "PUT",
    null,
    "/api/product/featured/" + row.id,
    ""
  );
  getProducts();
};

onMounted(() => {
  getProducts();
});
</script>

<style>
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

