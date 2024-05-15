<template>
  <div
    v-if="product == null"
    class="q-gutter-md row justify-center q-pa-md bg-primary"
    style="font-size: 6em"
  >
    <q-spinner-grid color="teal" />
  </div>
  <div v-else class="q-pa-md bg-primary">
    <q-item>
      <q-item-section>
        <q-carousel
          v-if="product.images[0]"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          style="border-radius: 20px"
        >
          <q-carousel-slide
            v-for="(image, index) in product.images"
            :key="index"
            :name="index"
            :img-src="image.realpath"
          >
            <q-btn
              flat
              @click="openImageInNewTab(image.realpath)"
              icon="open_in_new"
              class="absolute-top-right"
              color="secondary"
            />
          </q-carousel-slide>
        </q-carousel>
        <img v-else src="../../assets/nonimage.png" />
      </q-item-section>
      <!-- -------------------------------------- -->
      <q-item-section class="text-body1">
        <q-item>
          <q-item-section>
            <q-item-label lines="2">
              <q-item>
                <span class="text-h6 font-weight-bold">{{ product.name }}</span>
              </q-item>
              <q-item>
                <span class="text-h5 font-weight-bold text-secondary">
                  $ {{ product.sale_price }}
                </span>
              </q-item>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-chip class="bg-accent text-white">
              <q-avatar>
                <img :src="product.vendor.logopath" />
              </q-avatar>
              <q-item-label>
                {{ product.vendor.name }}
              </q-item-label>
            </q-chip>
          </q-item-section>
          <q-item-section>
            <q-chip class="bg-accent text-white">
              <q-avatar>
                <img :src="product.brand.logopath" />
              </q-avatar>
              <q-item-label>
                {{ product.brand.name }}
              </q-item-label>
            </q-chip>
          </q-item-section>
        </q-item>

        <q-item>
          <q-input
            v-model="product.quantity"
            outlined
            readonly
            type="number"
            label="Cantidad disponible"
            dense
          />
        </q-item>

        <!-- <q-item>
          <q-btn color="primary" label="AGREGAR AL CARRITO" class="q-mr-sm" />
        </q-item>
        <q-item>
          <q-btn color="amber" label="AGREGAR A LA LISTA DE DESEOS" />
        </q-item> -->
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-card class="bg-primary">
          <q-tabs
            v-model="tab"
            dense
            class="text-secondary"
            active-color="secondary"
            indicator-color="secondary"
            align="left"
            narrow-indicator
          >
            <q-tab name="description" label="Descripcion" />
            <q-tab name="features" label="Caracteristicas" />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            class="bg-primary text-secondary"
          >
            <q-tab-panel name="description">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-uppercase font-weight-bold">
                    {{ product.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-tab-panel>

            <q-tab-panel name="features">
              <div class="q-pa-md">
                <div v-if="product.features.length > 0">
                  <q-list>
                    <q-item
                      v-for="feature in product.features"
                      :key="feature.id"
                      class="q-pa-xs"
                    >
                      <q-item-section>
                        <q-item-label
                          overline
                          class="text-uppercase font-weight-bold"
                        >
                          <strong>
                            {{ feature.name }}
                          </strong>
                        </q-item-label>
                        <q-item-label>{{ feature.pivot.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div v-else>
                  <p class="text-body1">No hay características disponibles.</p>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-item-section>
    </q-item>

    <q-item class="q-pa-xl bg-primary">
      <q-item-section
        class="q-pa-sm"
        v-for="(deal, index) in deals"
        :key="index"
      >
        <q-card class="my-card" bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ deal.vendor.name }}</div>
              <div class="text-subtitle1 q-mt-sm q-mb-xs">
                {{ deal.brand.name }}
              </div>
              <div class="text-caption text-secondary">{{ deal.name }}</div>
            </q-card-section>

            <q-card-section class="col-6 flex flex-center">
              <q-img
                class="rounded-borders"
                v-if="deal.images[0]"
                :src="deal.images[0].realpath"
              />
              <q-img
                class="rounded-borders"
                v-else
                src="../../assets/nonimage.png"
              />
            </q-card-section>
          </q-card-section>

          <q-card-actions vertical>
            <q-btn
              dense
              class="view-button"
              label="Ver"
              color="secondary"
              @click="reloadComponent(deal.id)"
            />
          </q-card-actions>
        </q-card>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { sendRequest } from "src/boot/functions";

const product = ref(null);
const deals = ref(null);
const route = useRoute();
const router = useRouter();
const slide = ref(1);
const tab = ref("description");

const reloadComponent = async (id) => {
  router.push("/product/" + id);
};

function openImageInNewTab(imageUrl) {
  window.open(imageUrl, "_blank");
}

const getProductDetails = async (id) => {
  let res = await sendRequest("GET", null, "/api/page/products/" + id, "");
  product.value = res;
};

const getDeals = async (num) => {
  let res = await sendRequest(
    "GET",
    null,
    "/api/page/product/random/" + num,
    ""
  );
  deals.value = res;
};

onMounted(() => {
  getProductDetails(route.params.id);
  getDeals(5);
});

router.beforeEach((to, from, next) => {
  if (to.params.id && to.params.id !== from.params.id) {
    getProductDetails(to.params.id);
  }
  next();
});
</script>

<style>
.my-card {
  height: 100%;
  max-height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.my-card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
  transform: scale(1.05);
}

.view-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(5);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
}

.my-card:hover .view-button {
  opacity: 1;
  transform: translate(-50%, -50%) scale(2);
}
</style>



