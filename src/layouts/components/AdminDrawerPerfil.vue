<template>
  <q-item-label header> Perfil </q-item-label>
  <q-separator />
  <div class="avatar-container">
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
    label="Usuario autenticado"
    caption="Opciones de usuario"
  >
    <q-card>
      <q-card-section class="bg-blue-grey-6">
        <q-item-label>
          <strong>user:</strong>
          nombre usuario
        </q-item-label>
        <q-item-label>
          <strong>email:</strong>
          correo usuairo
        </q-item-label>
        <q-item-section>
          <q-btn label="Cambiar password" size="xs" color="purple" />
        </q-item-section>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<style>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
