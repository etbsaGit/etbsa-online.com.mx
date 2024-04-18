<template>
  <div><h4 class="font-weight-light text-center">Read About Fashion</h4></div>
  <div class="row">
    <div class="col-4" v-for="(card, index) in cards" :key="index">
      <q-card style="margin: 5px">
        <img :src="card.src" />
        <q-card-section>
          <div class="text-subtitle2">
            <strong>{{ card.title }}</strong>
          </div>
          <div class="text-subtitle2">{{ card.text }}</div>
        </q-card-section>

        <q-separator dark />

        <q-card-actions vertical>
          <router-link to="/post" class="q-btn"> Read more </router-link>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

const lorem = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Enim praesent elementum facilisis leo vel fringilla est ullamcorper"
);

const cards = ref([
  {
    title: "Clone",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    flex: 4,
    text: lorem,
  },
  {
    title: "Favorite road trips",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    flex: 4,
    text: lorem,
  },
  {
    title: "Best airlines",
    src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    flex: 4,
    text: lorem,
  },
]);
</script>
