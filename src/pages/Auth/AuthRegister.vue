
<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Create account</div>
        <div class="text-grey-8">Sign in below to access your account</div>
      </q-card-section>
      <q-form @submit.prevent="register(form)" class="q-gutter-md">
        <q-card-section>
          <q-input dense outlined v-model="form.name" label="Username" />
          <q-input
            dense
            outlined
            v-model="form.email"
            label="Email Address"
            class="q-mt-md"
          />
          <q-input
            dense
            outlined
            class="q-mt-md"
            v-model="form.password"
            type="password"
            label="Password"
          />
          <q-input
            dense
            outlined
            class="q-mt-md"
            v-model="form.password_confirmation"
            type="password"
            label="Password Confirmed"
          />
        </q-card-section>
        <q-card-section>
          <q-btn
            style="border-radius: 8px"
            color="secondary"
            rounded
            size="md"
            label="Create account"
            no-caps
            class="full-width"
            type="submit"
          ></q-btn>
        </q-card-section>
      </q-form>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">
          Already registered?
          <q-btn color="primary" to="/auth/login"> Sign in </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";

const { register } = useAuthStore();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
</script>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>

