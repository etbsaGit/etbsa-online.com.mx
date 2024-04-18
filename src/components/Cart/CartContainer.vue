<template>
  <div>
    <h5 class="text-center">SHOPPING CART</h5>
    <div class="row q-pa-md">
      <div class="col-9 q-pa-md">
        <q-table :rows="rows" :columns="columns" row-key="item" dense flat>
          <template v-slot:body-cell-item="props">
            <q-td :props="props">
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <img :src="props.row.avatar" alt="null" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ props.row.item }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template v-slot:body-cell-total="props">
            <q-td :props="props">
              {{ props.row.price * props.row.quantity }}
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn color="red" icon="delete"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-quantity="props">
            <q-td :props="props">
              <q-input
                type="number"
                outlined
                dense
                v-model="props.row.quantity"
                style="width: 80px"
              />
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="col-3 q-pa-md">
        <q-card class="bg-grey">
          <q-card-section>
            <div class="text-h6">Order Summary</div>
            <div class="text-subtitle2">
              Shipping and additional costs are calculated based on values you
              have entered.
            </div>
          </q-card-section>
          <div class="q-pa-md">
            <q-list bordered separator class="bg-white">
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in rows"
                :key="index"
              >
                <q-item-section class="col-9">{{ item.item }}</q-item-section>
                <q-item-section>
                  ${{ item.price * item.quantity }}
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section class="col-9">Tax</q-item-section>
                <q-item-section>$5</q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section class="col-9">
                  <strong>Total</strong>
                </q-item-section>
                <q-item-section>$285</q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator />

          <q-card-actions vertical>
            <q-btn dense color="green">PROCEED TO PAY</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
const columns = [
  { name: "item", label: "Item", align: "left", field: "item" },
  { name: "price", label: "Price", align: "left", field: "price" },
  { name: "quantity", label: "Quantity", align: "left", field: "quantity" },
  { name: "total", label: "Total", align: "left", field: "total" },
  { name: "actions", label: "Actions", align: "center", field: "actions" },
];

const rows = [
  {
    item: "Item 1",
    avatar: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    price: 40,
    quantity: 2,
  },
  {
    item: "Item 2",
    avatar: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
    price: 50,
    quantity: 4,
  },
];
</script>

