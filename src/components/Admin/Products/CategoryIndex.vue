<template>
  <q-item>
    <q-btn
      label="Registrar Categoria"
      dense
      color="secondary"
      icon="add"
      @click="addCategory = true"
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
        label="Buscar Categoria"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section>
      <q-list dense bordered separator class="rounded-borders">
        <q-expansion-item
          dense
          switch-toggle-side
          v-for="(category, index) in filteredCategories"
          :key="index"
          :label="category.name"
          :content-inset-level="1"
        >
          <template v-slot:header>
            <q-item-section>{{ category.name }}</q-item-section>

            <q-item-section side>
              <div class="row items-center">
                <q-btn-dropdown flat color="grey" icon="menu" dense>
                  <q-list v-close-popup>
                    <q-item>
                      <q-btn
                        flat
                        size="sm"
                        label="Editar"
                        color="blue"
                        icon="edit"
                        @click="onRowEdit(category)"
                      />
                    </q-item>
                    <q-item>
                      <q-btn
                        flat
                        size="sm"
                        label="Borrar"
                        color="red"
                        icon="delete"
                        @click="onRowDelete(category)"
                      />
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </q-item-section>
          </template>
          <q-item>
            <q-item-section>
              <q-list dense bordered separator class="rounded-borders">
                <q-item
                  clickable
                  v-ripple
                  v-for="(category1, index) in category.children_recursive"
                  :key="index"
                >
                  <q-item-section>{{ category1.name }}</q-item-section>
                  <q-item-section side>
                    <q-btn-dropdown flat color="grey" icon="menu" dense>
                      <q-list v-close-popup>
                        <q-item>
                          <q-btn
                            flat
                            size="sm"
                            label="Editar"
                            color="blue"
                            icon="edit"
                            @click="onRowEdit(category1)"
                          />
                        </q-item>
                        <q-item>
                          <q-btn
                            flat
                            size="sm"
                            label="Borrar"
                            color="red"
                            icon="delete"
                            @click="onRowDelete(category1)"
                          />
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>

      <!-- <q-table
        bordered
        flat
        :rows="filteredCategories"
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
      </q-table> -->
    </q-item-section>
  </q-item>

  <q-dialog
    v-model="addCategory"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Nueva Categoria</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Agregar categoria"
            color="blue"
            @click="storeCategory()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <category-form ref="add" :categories="categories" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="editCategory"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">Editar Categoria {{ selectedCategory.name }}</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn
            label="Actualizar categoria"
            color="blue"
            @click="updateCategory()"
          />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <div class="q-pa-sm">
        <category-form
          ref="edit"
          :category="selectedCategory"
          :categories="categories"
        />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="deleteCategory"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex q-pa-sm">
        <div class="text-h6">
          Estas seguro de borrar Categoria {{ selectedCategory.name }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cerrar" color="red" v-close-popup />
        <q-btn label="Borrar categoria" color="blue" @click="delCategory()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { sendRequest } from "src/boot/functions";
import CategoryForm from "src/components/Admin/Products/CategoryForm.vue";

const $q = useQuasar();

const searchTerm = ref("");
const addCategory = ref(false);
const editCategory = ref(false);
const deleteCategory = ref(false);
const categories = ref([]);
const selectedCategory = ref(null);
const add = ref(null);
const edit = ref(null);

const filteredCategories = computed(() => {
  return categories.value.filter((category) => {
    return category.name.toLowerCase().includes(searchTerm.value.toLowerCase());
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
  selectedCategory.value = row;
  editCategory.value = true;
};

const onRowDelete = (row) => {
  selectedCategory.value = row;
  deleteCategory.value = true;
};

const getCategories = async () => {
  let res = await sendRequest("GET", null, "/api/categorie", "");
  categories.value = res;
};

const storeCategory = async () => {
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
    ...add.value.formCategory,
  };
  let res = await sendRequest("POST", data, "/api/categorie", "");
  addCategory.value = false;
  getCategories();
};

const updateCategory = async () => {
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
    ...edit.value.formCategory,
  };
  let res = await sendRequest(
    "PUT",
    data,
    "/api/categorie/" + selectedCategory.value.id,
    ""
  );
  editCategory.value = false;
  getCategories();
};

const delCategory = async () => {
  let res = await sendRequest(
    "DELETE",
    null,
    "/api/categorie/" + selectedCategory.value.id,
    ""
  );
  deleteCategory.value = false;
  getCategories();
};

onMounted(() => {
  getCategories();
});
</script>

<style>
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

