<template>
  <q-list bordered padding class="rounded-borders">
    <q-item to="/admin/customers" class="text-black">
      <q-item-section avatar>
        <q-icon name="face" />
      </q-item-section>
      <q-item-section>Clientes</q-item-section>
    </q-item>

    <q-item to="/admin/products" class="text-black">
      <q-item-section avatar>
        <q-icon name="inventory_2" />
      </q-item-section>
      <q-item-section>Productos</q-item-section>
    </q-item>

    <q-item to="/admin/sales" class="text-black">
      <q-item-section avatar>
        <q-icon name="list_alt" />
      </q-item-section>
      <q-item-section>Pedidos</q-item-section>
    </q-item>

    <!-- <q-item to="/admin/customers" class="text-black">
      <q-item-section avatar>
        <q-icon name="face" />
      </q-item-section>
      <q-item-section>Pagina</q-item-section>
    </q-item> -->
  </q-list>
</template>
