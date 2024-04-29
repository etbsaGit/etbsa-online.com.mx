<template>
  <q-layout view="lHh lpr lFf">
    <q-header reveal elevated>
      <!-- Aqui va el header -->
    </q-header>

    <q-page-container>
      <coming-soon />
      <!-- <router-view /> -->
    </q-page-container>

    <q-footer reveal elevated class="bg-secondary text-white">
      <!-- <div class="flex justify-center bg-accent">
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
      </div> -->
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
        <div>{{ new Date().getFullYear() }} — <strong>ETBSA</strong></div>
      </q-item>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import ComingSoon from "src/pages/ComingSoon.vue";

const text = ref(null);
</script>

