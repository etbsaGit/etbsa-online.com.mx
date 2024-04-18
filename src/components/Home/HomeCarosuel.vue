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
    <q-carousel-slide
      :name="1"
      img-src="https://cdn.quasar.dev/img/mountains.jpg"
    >
      <div
        class="absolute-bottom absolute-center text-center text-white custom-caption"
      >
        <strong><h3>Upto 60% + Extra 10%</h3></strong>
      </div>
    </q-carousel-slide>
    <q-carousel-slide
      :name="2"
      img-src="https://cdn.quasar.dev/img/parallax1.jpg"
    >
      <div
        class="absolute-bottom absolute-center text-center text-white custom-caption"
      >
        <strong><h3>Upto 60% + Extra 10%</h3></strong>
      </div>
    </q-carousel-slide>
    <q-carousel-slide
      :name="3"
      img-src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <div
        class="absolute-bottom absolute-center text-center text-white custom-caption"
      >
        <strong><h3>Upto 60% + Extra 10%</h3></strong>
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg">
      <div
        class="absolute-bottom absolute-center text-center text-white custom-caption"
      >
        <strong><h3>Upto 60% + Extra 10%</h3></strong>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);
const autoplay = ref(true);
</script>
