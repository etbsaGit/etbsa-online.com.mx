<template>
  <div class="row bg-primary">
    <div class="col-3 q-pa-sm">
      <q-list dense bordered separator style="border-radius: 10px">
        <q-form ref="myForm" greedy>
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 font-bold"> Filtros </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-btn
                dense
                color="warning"
                label="Limpiar filtros"
                @click="resetFilter"
              />
            </q-item-section>
          </q-item>

          <q-separator></q-separator>

          <q-item>
            <q-item-section>
              <q-item-label class="font-bold"> Categorias </q-item-label>
            </q-item-section>
          </q-item>

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
                        color="info"
                        :label="category.name"
                        v-model="filterForm.categories"
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
                      color="info"
                      :label="category1.name"
                      v-model="filterForm.categories"
                      :val="category1.id"
                    />
                  </q-item-section>
                </q-item>

                <!-- <q-expansion-item
                  v-for="(category1, index) in category.children_recursive"
                  :key="index"
                  :header-inset-level="1"
                  :label="category1.name"
                >
                  <template v-slot:header>
                    <q-item-section>
                      <q-item-label>
                        <q-toggle
                          color="blue"
                          :label="category1.name"
                          v-model="filterForm.categories"
                          :val="category1.id"
                      /></q-item-label>
                    </q-item-section>
                  </template>

                  <q-expansion-item
                    v-for="(category2, index) in category1.children_recursive"
                    :key="index"
                    :header-inset-level="2"
                    :label="category2.name"
                  >
                    <template v-slot:header>
                      <q-item-section>
                        <q-item-label>
                          <q-toggle
                            color="blue"
                            :label="category2.name"
                            v-model="filterForm.categories"
                            :val="category2.id"
                        /></q-item-label>
                      </q-item-section>
                    </template>
                  </q-expansion-item>
                </q-expansion-item> -->
              </q-expansion-item>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item>
            <q-item-section>
              <q-expansion-item label="Caracteristicas">
                <q-item
                  class="row"
                  v-for="(feature, index) in filterForm.features"
                  :key="index"
                >
                  <q-item-section class="col-8">
                    <q-select
                      v-model="feature.feature_id"
                      :options="features"
                      option-label="name"
                      option-value="id"
                      label="Tipo de caracteristica"
                      transition-show="jump-up"
                      transition-hide="jump-up"
                      color="secondary"
                      filled
                      dense
                      emit-value
                      map-options
                      :rules="[(val) => val !== null || 'Obligatorio']"
                      @input="updateFeatureValues(index)"
                    >
                      <template v-slot:before>
                        <q-avatar>
                          <q-btn
                            icon="delete"
                            color="negative"
                            filled
                            dense
                            @click="deleteFeature(index)"
                          />
                        </q-avatar>
                      </template>
                    </q-select>
                  </q-item-section>
                  <q-item-section>
                    <q-select
                      v-model="feature.value"
                      :options="getValuesForFeature(feature.feature_id)"
                      label="Valor"
                      transition-show="jump-up"
                      transition-hide="jump-up"
                      color="secondary"
                      filled
                      dense
                      emit-value
                      map-options
                      :rules="[(val) => val !== null || 'Obligatorio']"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-btn
                      outline
                      size="sm"
                      color="secondary"
                      icon="add"
                      label="Agregar filtro"
                      @click="addfeature"
                    />
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item>
            <q-item-section>
              <q-expansion-item dense label="Marcas">
                <div class="row items-start">
                  <q-toggle
                    class="col-6"
                    v-for="(brand, index) in brands"
                    :key="index"
                    color="info"
                    :label="brand.name"
                    v-model="filterForm.brands"
                    :val="brand.id"
                  />
                </div>
              </q-expansion-item>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item>
            <q-item-section>
              <q-btn
                dense
                color="info"
                icon="search"
                label="Buscar"
                @click="filterProducts"
              />
            </q-item-section>
          </q-item>
        </q-form>
      </q-list>
    </div>
    <div class="col-9 q-pa-md">
      <q-separator spaced />
      <div class="row q-col-gutter-lg">
        <div
          class="col-xl-2 col-md-4 col-lg-3 col-sm-6 col-xs-12"
          v-for="(product, index) in products"
          :key="index"
        >
          <q-card
            class="my-card"
            bordered
            style="height: 100%; max-width: 100%; border-radius: 10px"
          >
            <q-img
              v-if="product.images[0]"
              :src="product.images[0].realpath"
              height="220px"
            >
              <q-chip>
                <q-avatar>
                  <img :src="product.vendor.logopath" />
                </q-avatar>
                <q-item-label>
                  {{ product.vendor.name }}
                </q-item-label>
              </q-chip>
            </q-img>
            <q-img v-else src="../../assets/nonimage.png" height="220px">
              <q-chip>
                <q-avatar>
                  <img :src="product.vendor.logopath" />
                </q-avatar>
                <q-item-label>
                  {{ product.vendor.name }}
                </q-item-label>
              </q-chip>
            </q-img>

            <q-card-section>
              <div class="">SKU: {{ product.sku }}</div>
              <div class="text-h6">
                {{ product.name }}
              </div>
            </q-card-section>

            <q-card-section class="card-footer">
              <div class="col-12">
                <span class="text-h6">${{ product.sale_price }}</span>
                <span class="text-h6 float-right">
                  <q-btn
                    label="See Details"
                    rounded
                    color="secondary"
                    flat
                    @click="reloadComponent(product.id)"
                  ></q-btn>
                </span>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <!-- <q-card
          class="col-2 my-card"
          v-for="(product, index) in products"
          :key="index"
          style="
            margin: 10px;
            height: 300px;
            max-width: 100%;
            border-radius: 10px;
            position: relative;
          "
        >
          <div style="height: 100%">
            <q-img
              v-if="product.images[0]"
              :src="product.images[0].realpath"
              style="
                width: 100%;
                height: 40%;
                object-fit: cover;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
              "
            />
            <q-img
              v-else
              src="../../assets/nonimage.png"
              style="
                width: 100%;
                height: 40%;
                object-fit: cover;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
              "
            />
            <q-card-section
              class="q-pa-xs"
              style="
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
              "
            >
              <q-item-label class="text-center text-weight-bold">
                {{ product.name }}
              </q-item-label>
              <q-item-label>
                <q-chip>
                  <q-avatar>
                    <img :src="product.vendor.logopath" />
                  </q-avatar>
                  <q-item-label>
                    {{ product.vendor.name }}
                  </q-item-label>
                </q-chip>
              </q-item-label>
              <q-item-label>
                <div class="text-subtitle2">${{ product.sale_price }}</div>
              </q-item-label>
              <q-card-actions vertical>
                <q-btn
                  outline
                  label="View"
                  color="secondary"
                  size="xs"
                  @click="reloadComponent(product.id)"
                />
              </q-card-actions>
            </q-card-section>
          </div>
        </q-card> -->
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          color="secondary"
          v-model="current_page"
          :max="last_page"
          :max-pages="6"
          direction-links
          boundary-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import { sendRequest } from "src/boot/functions";
import { useRouter } from "vue-router";

const router = useRouter();

const products = ref(null);
const current_page = ref(1);
const next_page_url = ref("");
const prev_page_url = ref("");
const last_page = ref(0);

const categories = ref(null);
const features = ref(null);
const brands = ref(null);
const myForm = ref(null);

const filterForm = ref({
  categories: [],
  features: [],
  brands: [],
});

const updateFeatureValues = (index) => {
  const selectedFeatureId = filterForm.value.features[index].feature_id;
  const values = getValuesForFeature(selectedFeatureId);
  filterForm.value.features[index].values = values;
};

const getValuesForFeature = (featureId, ascending = true) => {
  const feature = features.value.find((f) => f.id === featureId);
  if (!feature) return [];

  const uniqueValues = new Set();
  feature.values.forEach((value) => uniqueValues.add(value.value));

  const sortedValues = Array.from(uniqueValues).sort();
  if (!ascending) sortedValues.reverse();

  return sortedValues;
};

const addfeature = () => {
  filterForm.value.features.push({
    feature_id: null,
    value: null,
  });
};

const deleteFeature = (index) => {
  filterForm.value.features.splice(index, 1);
};

const resetFilter = () => {
  (filterForm.value.categories = []), (filterForm.value.features = []);
};

const reloadComponent = async (id) => {
  router.push("/product/" + id);
};

watch(current_page, (newPage) => {
  filterProducts(newPage);
});

const getAll = async () => {
  let res = await sendRequest("GET", null, "/api/page/product/all", "");
  categories.value = res.categories;
  features.value = res.features;
  brands.value = res.brands;
};

const filterProducts = async (page = 1) => {
  const isValid = await validate();
  if (!isValid) {
    return;
  }
  let res = await sendRequest(
    "POST",
    filterForm.value,
    "/api/page/product/filter?page=" + page,
    ""
  );
  products.value = res.data;
  current_page.value = res.current_page;
  next_page_url.value = res.next_page_url;
  prev_page_url.value = res.prev_page_url;
  last_page.value = res.last_page;
};

const validate = async () => {
  return await myForm.value.validate();
};

onMounted(() => {
  const query = router.currentRoute.value.query;
  if (query.categories) {
    filterForm.value.categories.push(parseInt(query.categories));
  }
  getAll();

  filterProducts();
  router.push({ path: router.currentRoute.value.path, replace: true });
});
</script>

<style>
.my-card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 calc(25% - 26px); /* Para mostrar 4 tarjetas por fila */
  box-sizing: border-box;
  min-width: 250px;
}
.my-card:hover {
  transform: scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
}

.card-footer {
  margin-top: 0%; /* Empuja esta sección al fondo */
}
</style>
