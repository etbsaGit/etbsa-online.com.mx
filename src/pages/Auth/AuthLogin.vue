<template>
  <q-page class="flex flex-center bg-grey-4">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <q-img src="..\..\assets\logo.gif" alt="Logo" />
        <div class="text-grey-9 text-h5 text-weight-bold">
          Equipos y tractores del bajio
        </div>
      </q-card-section>
      <q-form @submit.prevent="login(form)" class="q-gutter-md">
        <q-card-section>
          <q-input
            dense
            outlined
            color="secondary"
            v-model="form.email"
            label="Email Address"
          />
          <q-input
            dense
            outlined
            color="secondary"
            class="q-mt-md"
            v-model="form.password"
            type="password"
            label="Password"
          />
        </q-card-section>
        <q-card-section>
          <q-btn
            style="border-radius: 8px"
            color="secondary"
            rounded
            size="md"
            label="Sign in"
            no-caps
            class="full-width"
            type="submit"
          />
        </q-card-section>
      </q-form>
      <!-- <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">
          Don't have an account yet?
          <q-btn color="secondary" to="/auth/register" class="text-dark">
            Create account
          </q-btn>
        </div>
      </q-card-section> -->
    </q-card>
  </q-page>
</template>
<script setup>
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";

const { login } = useAuthStore();
const form = ref({ email: "", password: "" });
</script>
<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>

