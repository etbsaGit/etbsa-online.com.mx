<template>
  <q-layout view="lHh lpr lFf">
    <q-header reveal elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="src\assets\etbsa_logo_agricola.webp"
            style="max-width: 10%"
          />
        </q-toolbar-title>
      </q-toolbar>
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
            <q-tooltip class="bg-purple text-body2">
              Free Shipping over $300
            </q-tooltip>
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
            <q-tooltip class="bg-purple text-body2">
              30 Days Money Back Guarantee
            </q-tooltip>
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
            <q-tooltip class="bg-purple text-body2">
              020-800-456-747
            </q-tooltip>
          </q-btn>
        </q-item>
      </div>

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

