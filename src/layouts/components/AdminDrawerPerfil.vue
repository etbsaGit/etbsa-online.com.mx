<template>
  <div class="avatar-container q-pa-sm">
    <q-avatar
      size="200px"
      color="dark"
      text-color="white"
      icon="admin_panel_settings"
    />
  </div>
  <q-expansion-item
    expand-separator
    icon="perm_identity"
    :label="user.name"
    caption="Opciones de usuario"
  >
    <q-card>
      <q-card-section class="bg-blue-grey-6">
        <q-item-label>
          <strong>user:</strong>
          {{ user.name }}
        </q-item-label>
        <q-item-label>
          <strong>email:</strong>
          {{ user.email }}
        </q-item-label>
        <q-item-section>
          <q-btn
            label="Cambiar password"
            size="xs"
            color="purple"
            @click="openPassword"
          />
        </q-item-section>
      </q-card-section>
    </q-card>
  </q-expansion-item>
  <q-dialog
    v-model="showChangePassword"
    transition-show="rotate"
    transition-hide="rotate"
    persistent
  >
    <q-card>
      <q-card-section class="d-flex justify-between items-center q-pa-sm">
        <div class="text-h6">Cambiar contraseña de {{ user.name }}</div>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="red" v-close-popup />
          <q-btn label="Actualizar" color="blue" @click="changePassword" />
        </q-card-actions>
      </q-card-section>
      <q-separator />
      <q-card class="q-pa-none scroll" flat>
        <div class="survey-form-container">
          <change-password-form ref="password" />
        </div>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { sendRequest } from "src/boot/functions";

import ChangePasswordForm from "src/components/Admin/User/ChangePasswordForm.vue";

const $q = useQuasar();

const auth = useAuthStore();
const { logout } = auth;
const { user } = storeToRefs(auth);

const showChangePassword = ref(false);
const authUser = ref(null);
const password = ref(null);

const openPassword = () => {
  authUser.value = user;
  showChangePassword.value = true;
};

const changePassword = async () => {
  const password_valid = await password.value.validate();
  if (!password_valid) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Por favor completa todos los campos obligatorios",
    });
    return;
  }
  const final = {
    ...password.value.formUser,
  };
  let res = await sendRequest("POST", final, "/api/auth/change", "");
  console.log(res);
  showChangePassword.value == false;
  logout();
};
</script>

<style>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
