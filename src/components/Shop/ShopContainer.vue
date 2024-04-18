<template>
  <div class="row">
    <div class="col-3 q-pa-md">
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6 font-bold"> Filters </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-expansion-item expand-separator label="Clothing">
              <q-card>
                <q-card-section>
                  <q-list>
                    <q-item clickable v-ripple>
                      <q-item-section>Single line item</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Item with caption</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Item with caption</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator label="Shoes">
              <q-card>
                <q-card-section>
                  <q-list>
                    <q-item clickable v-ripple>
                      <q-item-section>Single line item</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Item with caption</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section>
                        <q-item-label>Item with caption</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-h6 font-bold q-pa-md">Price</q-item-label>

            <q-range
              class="q-pa-md"
              v-model="standard"
              :min="0"
              :max="5000"
              label-always
            />
            <q-item>
              <q-item-section>
                <q-input
                  type="number"
                  outlined
                  dense
                  v-model="standard.min"
                  label="minimo"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input>
              </q-item-section>
              <q-item-section>
                <q-input
                  type="number"
                  outlined
                  dense
                  v-model="standard.max"
                  label="maximo"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-h6 font-bold">
              Customer Rating
            </q-item-label>
            <q-item dense>
              <q-item-section>
                <q-checkbox v-model="Five" label="5" />
              </q-item-section>
              <q-item-section>
                <div style="display: flex; justify-content: flex-end">
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                </div>
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-checkbox v-model="Four" label="4" />
              </q-item-section>
              <q-item-section>
                <div style="display: flex; justify-content: flex-end">
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                </div>
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-checkbox v-model="Three" label="3" />
              </q-item-section>
              <q-item-section>
                <div style="display: flex; justify-content: flex-end">
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                </div>
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-checkbox v-model="Two" label="2" />
              </q-item-section>
              <q-item-section>
                <div style="display: flex; justify-content: flex-end">
                  <q-icon name="star" color="orange" size="24px" />
                  <q-icon name="star" color="orange" size="24px" />
                </div>
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-checkbox v-model="One" label="1" />
              </q-item-section>
              <q-item-section>
                <div style="display: flex; justify-content: flex-end">
                  <q-icon name="star" color="orange" size="24px" />
                </div>
              </q-item-section>
            </q-item>
            <q-item dense>
              <q-item-section>
                <q-checkbox v-model="Zero" label="0" />
              </q-item-section>
              <q-item-section>
                <div style="display: flex; justify-content: flex-end">
                  <q-icon name="thumb_down" color="red" size="24px" />
                </div>
              </q-item-section>
            </q-item>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6 font-bold"> Size </q-item-label>
            <q-option-group
              v-model="group"
              :options="options"
              color="primary"
              type="checkbox"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-9 q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>
      <q-item style="display: flex; justify-content: flex-end">
        <q-item-section class="col-3">
          <q-select outlined dense v-model="select" :options="optionSelect" />
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <div class="row">
        <q-card
          class="col-2"
          v-for="(product, index) in products"
          :key="index"
          style="margin: 10px"
        >
          <img :src="product.src" />
          <q-card-section>
            <div class="text-subtitle2">
              <strong>{{ product.name }}</strong>
            </div>
            <div class="text-subtitle2">{{ product.type }}</div>
            <div class="text-subtitle2">${{ product.price }}</div>
          </q-card-section>

          <q-separator dark />

          <q-card-actions vertical>
            <router-link to="/product" class="q-btn"> View </router-link>
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="5" direction-links />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const Five = ref(false);
const Four = ref(false);
const Three = ref(false);
const Two = ref(false);
const One = ref(false);
const Zero = ref(false);
const current = ref(3);
const standard = ref({
  min: 0,
  max: 0,
});
const group = ref([]);
const options = ref([
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "XXXL", value: "XXXL" },
]);

const select = ref("Popularity");
const optionSelect = ref([
  "Default",
  "Popularity",
  "Relevance",
  "Price: Low to High",
  "Price: High to Low",
]);

const products = ref([
  {
    id: 1,
    name: "BLACK TEE",
    type: "Jackets",
    price: "18.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 2,
    name: "WHITE TEE",
    type: "Polo",
    price: "40.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 3,
    name: "Zara limited...",
    type: "Denim",
    price: "25.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 4,
    name: "SKULL TEE",
    type: "Jackets",
    price: "30.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 5,
    name: "MANGO WINTER",
    type: "Sweaters",
    price: "50.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 6,
    name: "SHIRT",
    type: "Denim",
    price: "34.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 7,
    name: "TRUCKER JACKET",
    type: "Jackets",
    price: "38.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 8,
    name: "COATS",
    type: "Jackets",
    price: "25.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 9,
    name: "MANGO WINTER",
    type: "Sweaters",
    price: "50.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 10,
    name: "SHIRT",
    type: "Denim",
    price: "34.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 11,
    name: "TRUCKER JACKET",
    type: "Jackets",
    price: "38.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
  {
    id: 12,
    name: "COATS",
    type: "Jackets",
    price: "25.00",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  },
]);
</script>
