<template>
  <q-form ref="myForm" greedy>
    <q-tabs
      v-model="tab"
      dense
      class="text-accent"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="General" label="General" />
      <q-tab name="Caracteristicas" label="Caracteristicas" />
      <q-tab name="Categorias" label="Categorias" />
      <q-tab name="Imagenes" label="Imagenes" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="General">
        <q-item>
          <q-item-section>
            <q-input
              dense
              outlined
              color="secondary"
              v-model="formProduct.name"
              label="Nombre del producto"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
            />
          </q-item-section>
          <q-item-section>
            <q-input
              dense
              outlined
              color="secondary"
              v-model="formProduct.sku"
              label="SKU"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              outlined
              color="secondary"
              v-model="formProduct.description"
              label="Descripcion del producto"
              lazy-rules
              hint
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              prefix="$"
              dense
              outlined
              color="secondary"
              v-model="formProduct.price"
              label="Precio del producto"
              lazy-rules
              hint
            />
          </q-item-section>
          <q-item-section>
            <q-input
              prefix="$"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              dense
              outlined
              color="secondary"
              v-model="formProduct.sale_price"
              label="Precio de venta"
              lazy-rules
              hint
            />
          </q-item-section>
          <q-item-section>
            <q-input
              type="number"
              dense
              outlined
              color="secondary"
              v-model="formProduct.quantity"
              label="Cantidad"
              lazy-rules
              hint
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="formProduct.brand_id"
              :options="brands"
              color="secondary"
              label="Marca"
              option-value="id"
              option-label="name"
              option-disable="inactive"
              emit-value
              map-options
              transition-show="jump-up"
              transition-hide="jump-up"
              clearable
              outlined
              dense
              hint
            />
          </q-item-section>
          <q-item-section>
            <q-select
              v-model="formProduct.vendor_id"
              :options="vendors"
              label="Proveedor"
              option-value="id"
              option-label="name"
              option-disable="inactive"
              color="secondary"
              emit-value
              map-options
              transition-show="jump-up"
              transition-hide="jump-up"
              clearable
              outlined
              dense
              hint
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-toggle
              dense
              label="Activo"
              v-model="formProduct.active"
              color="secondary"
            />
          </q-item-section>
          <q-item-section>
            <q-toggle
              dense
              label="Featured"
              v-model="formProduct.featured"
              color="secondary"
            />
          </q-item-section>
        </q-item>
      </q-tab-panel>

      <q-tab-panel name="Caracteristicas">
        <div>
          <q-item v-for="(feature, index) in formProduct.features" :key="index">
            <q-item-section>
              <q-select
                v-model="feature.feature_id"
                :options="features"
                label="Caracteristica"
                option-value="id"
                option-label="name"
                option-disable="inactive"
                emit-value
                map-options
                transition-show="jump-up"
                transition-hide="jump-up"
                clearable
                outlined
                dense
                color="secondary"
                :rules="[(val) => val || 'Obligatorio']"
              />
            </q-item-section>
            <q-item-section>
              <q-input
                v-model="feature.value"
                label="Value"
                clearable
                outlined
                dense
                color="secondary"
                :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
              />
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                icon="delete"
                color="red"
                outlined
                @click="delFeature(index)"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn
                color="secondary"
                icon="add"
                label="Agregar caracteristica"
                @click="addFeature"
              />
            </q-item-section>
          </q-item>
        </div>
      </q-tab-panel>

      <q-tab-panel name="Categorias">
        <q-item>
          <q-item-section>
            <q-expansion-item
              dense
              v-for="(category, index) in categories"
              :key="index"
              :label="category.name"
              :content-inset-level="1"
            >
              <template v-slot:header>
                <q-item-section>
                  <q-item-label>
                    <q-toggle
                      color="secondary"
                      :label="category.name"
                      v-model="formProduct.category_id"
                      :val="category.id"
                    />
                  </q-item-label>
                </q-item-section>
              </template>

              <q-item>
                <q-item-section>
                  <q-toggle
                    v-for="(category1, index) in category.children_recursive"
                    :key="index"
                    color="secondary"
                    :label="category1.name"
                    v-model="formProduct.category_id"
                    :val="category1.id"
                  />
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-item-section>
        </q-item>
      </q-tab-panel>

      <q-tab-panel name="Imagenes">
        <q-item>
          <q-item-section>
            <q-file
              dense
              multiple
              outlined
              clearable
              lazy-rules
              max-files="3"
              color="secondary"
              @rejected="onRejected"
              v-model="formProduct.file"
              label="imagen del producto"
              hint="Solo hasta 3 imagenes"
              @input="convertirFile($event)"
              @clear="formProduct.images = []"
              accept=".jpg, .jpeg, .png, .jfif"
            />
          </q-item-section>
        </q-item>
        <q-item v-if="formProduct.images && formProduct.images.length > 0">
          <q-item-section v-for="image in formProduct.images" :key="image.id">
            <q-img :src="image" />
          </q-item-section>
        </q-item>
        <q-item v-if="images.length > 0">
          <q-item-section v-for="image in images" :key="image.id">
            <q-img :src="image.realpath">
              <q-btn
                class="all-pointer-events"
                size="xs"
                dense
                @click="delProductImage(image)"
                color="red"
                icon="delete"
              />
            </q-img>
          </q-item-section>
        </q-item>
      </q-tab-panel>
    </q-tab-panels>
  </q-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { sendRequest } from "src/boot/functions";
import { useQuasar } from "quasar";

const $q = useQuasar();

const myForm = ref(null);
const tab = ref("General");

const categories = ref(null);
const features = ref(null);
const brands = ref(null);
const vendors = ref(null);

const { product } = defineProps(["product"]);

const images = product ? product.images : [];

const formProduct = ref({
  id: product ? product.id : null,
  name: product ? product.name : null,
  sku: product ? product.sku : null,
  description: product ? product.description : null,
  active: product ? product.active : false,
  featured: product ? product.featured : false,
  price: product ? product.price : "0.00",
  sale_price: product ? product.sale_price : "0.00",
  quantity: product ? product.quantity : 0,
  brand_id: product ? product.brand_id : null,
  vendor_id: product ? product.vendor_id : null,
  category_id: [],
  features: [],
  images: [],
  file: [],
});

const addFeature = () => {
  formProduct.value.features.push({
    feature_id: null,
    value: null,
  });
};

const delFeature = (index) => {
  formProduct.value.features.splice(index, 1);
};

const getFormProduct = async () => {
  let res = await sendRequest("GET", null, "/api/formProduct", "");
  categories.value = res.categories;
  features.value = res.features;
  brands.value = res.brands;
  vendors.value = res.vendors;
};

const checkFeatures = () => {
  if (product) {
    for (const feature of product.features) {
      formProduct.value.features.push({
        feature_id: feature.pivot.feature_id,
        value: feature.pivot.value,
      });
    }
  }
};

const checkCategories = () => {
  if (product) {
    for (const category of product.categories) {
      formProduct.value.category_id.push(category.id);
    }
  }
};

const onRejected = (rejectedEntries) => {
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} archivos de mas solo se permiten hasta 3`,
  });
};

const convertirFile = (event) => {
  const archivos = event.target.files;
  if (archivos) {
    Array.from(archivos).forEach((archivo) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        formProduct.value.images.push(base64Data);
      };
      reader.readAsDataURL(archivo);
    });
  } else {
    formProduct.value.images = [];
  }
};

const delProductImage = async (image) => {
  const index = images.indexOf(image);

  if (index !== -1) {
    images.splice(index, 1);
  }
  let res = await sendRequest(
    "DELETE",
    null,
    "/api/product/image/" + image.id,
    ""
  );
};

const validate = async () => {
  return await myForm.value.validate();
};

onMounted(() => {
  getFormProduct();
  checkCategories();
  checkFeatures();
});

defineExpose({
  formProduct,
  validate,
});
</script>
