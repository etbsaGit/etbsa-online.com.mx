<template>
  <h5 class="text-center">Best brands for fashion</h5>
  <p class="text-center">By <b>John Doe</b> | January 24,2020</p>
  <div class="q-pa-xl" v-for="(card, index) in cards" :key="index">
    <q-card style="margin: 5px">
      <img :src="card.src" />
      <q-card-section>
        <div class="text-subtitle2">
          <strong>{{ card.title }}</strong>
        </div>
        <div class="text-subtitle2" caption>{{ card.text }}</div>
      </q-card-section>
    </q-card>
  </div>
  <q-separator></q-separator>
  <div class="q-pa-xl">
    <div class="text-h6">reviews</div>
    <q-list separator bordered>
      <q-item v-for="(item, i) in items" :key="i" v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="item.avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-rating
            v-model="rating"
            color="warning"
            background-color="warning lighten-3"
          />
          <q-item-label caption>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.subtitle }}</q-item-label>
        </q-item-section>
        <q-separator spaced />
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from "vue";

const rating = ref(4.5);
const items = ref([
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    title: "Lorem ipsum dolor?",
    subtitle:
      "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
      "\n",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    title:
      'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
    subtitle:
      "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    title: "Lorem ipsum dolor",
    subtitle:
      "<span class='text--primary'>Sandra Adams</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    title: "Lorem ipsum dolor",
    subtitle: "",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    title: "Lorem ipsum dolor",
    subtitle:
      "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
]);

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

