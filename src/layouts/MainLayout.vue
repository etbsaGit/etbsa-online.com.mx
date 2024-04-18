<template>
  <q-layout view="lHh lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="src\assets\etbsa_logo_agricola.webp"
            style="max-width: 40%"
          />
        </q-toolbar-title>

        <q-space />

        <q-input
          label="search"
          dark
          dense
          filled
          v-model="text"
          style="width: 500px"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />

        <q-btn flat round dense icon="person" />
        <q-btn flat round dense icon="notifications" />
        <router-link to="/cart">
          <q-btn flat round dense color="white" icon="shopping_cart" />
        </router-link>
      </q-toolbar>
      <q-tabs align="center" class="bg-white" dense>
        <q-route-tab to="/" label="Home" class="text-black" />
        <q-route-tab to="/shop" label="Shop" class="text-black" />
        <q-route-tab to="/product" label="Product" class="text-black" />
        <q-route-tab to="/blog" label="Blog" class="text-black" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-secondary text-white">
      <div class="flex justify-center bg-accent">
        <q-item>
          <q-btn
            flat
            dense
            rounded
            icon="local_shipping"
            label="FREE SHIPPING & RETURN"
          >
            <q-tooltip class="bg-purple text-body2"
              >Free Shipping over $300</q-tooltip
            >
          </q-btn>
        </q-item>
        <q-item>
          <q-btn
            flat
            dense
            rounded
            icon="payments"
            label="MONEY BACK GUARANTEE"
          >
            <q-tooltip class="bg-purple text-body2"
              >30 Days Money Back Guarantee</q-tooltip
            >
          </q-btn>
        </q-item>
        <q-item>
          <q-btn
            flat
            dense
            rounded
            icon="support_agent"
            label="24/7 Available Support"
          >
            <q-tooltip class="bg-purple text-body2">020-800-456-747</q-tooltip>
          </q-btn>
        </q-item>
      </div>
      <!-- <div class="flex justify-center">
        <q-item>
          <q-btn dense rounded icon="home" />
        </q-item>
        <q-item>
          <q-btn dense rounded icon="email" />
        </q-item>
        <q-item>
          <q-btn dense rounded icon="calendar_month" />
        </q-item>
        <q-item>
          <q-btn dense rounded icon="delete" />
        </q-item>
      </div>
      <div class="flex justify-center">
        <q-item>
          <div>
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
            Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
            accumsan id ultrices nunc. Sed at orci sed massa consectetur
            dignissim a sit amet dui. Duis commodo vitae velit et faucibus.
            Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum
            ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel
            diam elementum tempor vel ut orci. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.
          </div>
        </q-item>
      </div> -->
      <q-item class="flex justify-center">
        <div>{{ new Date().getFullYear() }} — <strong>Quasar Dev</strong></div>
      </q-item>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const text = ref(null);
</script>

