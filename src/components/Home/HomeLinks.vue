<template>
  <q-item>
    <q-item-section class="q-pa-md bg-primary">
      <q-card class="my-card" bordered>
        <q-img
          src="../../assets/tractor.gif"
          style="height: 400px; max-width: 100%"
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            <strong>
              <h3
                class="text-h5 text-weight-bold text-white"
                style="text-shadow: 1px 1px 2px black"
              >
                Experiencia 360°
              </h3>
            </strong>
          </div>
        </q-img>
        <q-card-actions vertical>
          <q-btn
            class="view-button"
            label="Explorar"
            color="secondary"
            @click="redirect360()"
          />
        </q-card-actions>
      </q-card>
    </q-item-section>
    <q-item-section class="q-pa-md bg-primary">
      <q-card class="my-card" bordered>
        <q-img
          src="../../assets/Refacciones.jpg"
          style="height: 400px; max-width: 100%"
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            <strong>
              <h3
                class="text-h5 text-weight-bold text-white"
                style="text-shadow: 1px 1px 2px black"
              >
                Refacciones
              </h3>
            </strong>
          </div>
        </q-img>
        <q-card-actions vertical>
          <q-btn
            class="view-button"
            label="Explorar"
            color="secondary"
            @click="redirectRefacciones()"
          />
        </q-card-actions>
      </q-card>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { sendRequest } from "src/boot/functions";
import { useRouter } from "vue-router";

const categories = ref(null);
const deals = ref(null);
const router = useRouter();

const redirectRefacciones = async () => {
  window.open("http://tienda-online.etbsa.com.mx/", "_blank");
};

const redirect360 = async () => {
  window.open("https://360.etbsa.com.mx/", "_blank");
};
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
