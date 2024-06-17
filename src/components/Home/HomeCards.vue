<template>
  <q-item>
    <q-item-section class="q-pt-xl text-center text-italic text-h5">
      ¡No te quedes atrás! Descubre lo último en agricola y construcción
    </q-item-section>
  </q-item>
  <!-- <q-item class="q-pa-xl bg-primary"> -->
  <!-- <q-item-section class="q-pa-sm"> -->
  <div class="grid-container q-pa-xl">
    <q-card
      class="my-card"
      bordered
      v-for="(deal, index) in deals"
      :key="index"
    >
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-overline">{{ deal.vendor.name }}</div>
          <div class="text-h5">{{ deal.brand.name }}</div>
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
  </div>
  <!-- </q-item-section> -->
  <!-- </q-item> -->

  <q-item>
    <q-item-section class="q-pt-lg text-center text-italic text-h5">
      ¡Explora nuestras principales categorías!
    </q-item-section>
  </q-item>

  <!-- <q-item class="bg-primary">
    <q-item-section class="q-pa-sm"> -->
  <div class="grid-container q-pa-xl">
    <q-card
      bordered
      class="my-card"
      v-for="(category, index) in categories"
      :key="index"
    >
      <q-img
        v-if="category.logopath"
        :src="category.logopath"
        spinner-color="white"
        style="height: 300px; max-width: 100%"
      >
        <div class="absolute-bottom text-subtitle2 text-center">
          <strong>
            <h3
              class="text-h5 text-weight-bold text-white"
              style="text-shadow: 1px 1px 2px black"
            >
              {{ category.name }}
            </h3>
          </strong>
        </div>
      </q-img>
      <q-img
        v-else
        src="../../assets/nonimage.png"
        spinner-color="white"
        style="height: 300px; max-width: 100%"
      >
        <div class="absolute-bottom text-subtitle2 text-center">
          <strong>
            <h3
              class="text-h5 text-weight-bold text-white"
              style="text-shadow: 1px 1px 2px black"
            >
              {{ category.name }}
            </h3>
          </strong>
        </div>
      </q-img>
      <q-card-actions vertical>
        <q-btn
          class="view-button"
          label="Explorar"
          color="secondary"
          @click="redirectToNewPage(category.id)"
        />
      </q-card-actions>
    </q-card>
  </div>
  <!-- </q-item-section>
  </q-item> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { sendRequest } from "src/boot/functions";
import { useRouter } from "vue-router";

const categories = ref(null);
const deals = ref(null);
const router = useRouter();

const reloadComponent = async (id) => {
  router.push("/product/" + id);
};

const redirectToNewPage = (id) => {
  const query = {
    categories: [id],
  };

  router.push({
    path: "/shop",
    query: query,
  });
};

const getCategories = async () => {
  let res = await sendRequest("GET", null, "/api/page/categories", "");
  categories.value = res;
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
  getCategories();
  getDeals(4);
});
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* Ajusta el tamaño mínimo aquí 200px para que sean 6 y 300px px*/
  gap: 10px;
}

.my-card {
  height: 100%; /* Para asegurar que todas las tarjetas tengan la misma altura */
  box-sizing: border-box;
  font-size: 1.1em; /* Tamaño de fuente más pequeño */
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
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



