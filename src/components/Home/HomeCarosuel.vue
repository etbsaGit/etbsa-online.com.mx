<template>
  <q-carousel
    animated
    v-model="slide"
    navigation
    infinite
    :autoplay="autoplay"
    arrows
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
  >
    <q-carousel-slide :name="1" img-src="../../assets/home1.jpg">
      <div class="absolute-bottom absolute-center text-center custom-caption">
        <strong>
          <h3
            class="text-h3 text-weight-bold text-white"
            style="text-shadow: 1px 1px 2px black"
          >
            Juntos podemos mas
          </h3>
        </strong>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="2" img-src="../../assets/home2.avif">
      <div class="absolute-bottom absolute-center text-center custom-caption">
        <strong>
          <h3
            class="text-h4 text-weight-bold text-white"
            style="text-shadow: 1px 1px 2px black"
          >
            Creando un futuro más sostenible para todos con soluciones de riego
            por goteo accesibles
          </h3>
        </strong>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="3" img-src="../../assets/home3.avif">
      <div class="absolute-bottom absolute-center text-center custom-caption">
        <strong>
          <h3
            class="text-h3 text-weight-bold text-white"
            style="text-shadow: 1px 1px 2px black"
          >
            Juntos podemos mas
          </h3>
        </strong>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="4" img-src="../../assets/home4.avif">
      <div class="absolute-bottom absolute-center text-center custom-caption">
        <strong>
          <h3
            class="text-h4 text-weight-bold text-white"
            style="text-shadow: 1px 1px 2px black"
          >
            Creando un futuro más sostenible para todos con soluciones de riego
            por goteo accesibles
          </h3>
        </strong>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);
const autoplay = ref(true);
</script>

<style scoped>
.text-h3 {
  font-size: 50px; /* Tamaño de fuente para títulos */
}

.text-h4 {
  font-size: 40px; /* Tamaño de fuente para subtítulos */
}

.custom-caption {
  background-color: transparent; /* Fondo completamente transparente */
  padding: 10px; /* Añade espacio alrededor del texto */
}

@media (max-width: 768px) {
  .text-h3 {
    font-size: 50px; /* Reducción de tamaño de fuente para dispositivos móviles */
  }

  .text-h4 {
    font-size: 20px; /* Reducción de tamaño de fuente para dispositivos móviles */
  }

  .custom-caption {
    background-color: transparent; /* Fondo completamente transparente */
    padding: 10px; /* Añade espacio alrededor del texto */
  }
}
</style>
