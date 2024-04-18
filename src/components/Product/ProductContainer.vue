<template>
  <q-item>
    <q-item-section>
      <q-carousel swipeable animated v-model="slide" thumbnails infinite>
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
        />
      </q-carousel>
    </q-item-section>
    <!-- -------------------------------------- -->
    <q-item-section>
      <q-item>
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" />
          <q-breadcrumbs-el label="Components" />
          <q-breadcrumbs-el label="Breadcrumbs" />
        </q-breadcrumbs>
      </q-item>
      <q-item>
        <q-item-label>
          <q-item>
            <span>Modern Black T-Shirt</span>
          </q-item>
          <q-item>
            <span>
              $65.00
              <del>$80.00</del>
            </span>
          </q-item>
        </q-item-label>
        <div class="col text-right">
          <q-rating v-model="ratingModel" size="2em" color="orange" readonly />
          <span class="body-2 font-weight-thin"> 25 REVIEWS</span>
        </div>
      </q-item>
      <q-item>
        <span class="subtitle-1 font-weight-thin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
          tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut
          etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique
          senectus et netus et malesuada.
        </span>
      </q-item>
      <q-item>
        <q-radio v-model="shape" val="line" label="Line" />
        <q-radio v-model="shape" val="rectangle" label="Rectangle" />
        <q-radio v-model="shape" val="ellipse" label="Ellipse" />
        <q-radio v-model="shape" val="polygon" label="Polygon" />
      </q-item>
      <q-item>
        <q-input outlined type="number" label="Piezas" dense />
      </q-item>
      <q-item>
        <q-btn color="primary" label="ADD TO CART"></q-btn>
        <q-btn color="secondary" label="ADD TO WISHLIST" flat></q-btn>
      </q-item>
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="description" label="description" />
          <q-tab name="materials" label="materials" />
          <q-tab name="reviews" label="reviews" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="description">
            <div class="text-h6">description</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="materials">
            <div class="text-h6">materials</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="reviews">
            <div class="text-h6">reviews</div>
            <q-list separator>
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
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-item-section>
  </q-item>
  <q-item>
    <q-card class="q-pa-xl">
      <q-item>
        <q-item-label>
          <strong> Deals of the Day </strong>
        </q-item-label>
      </q-item>
      <q-separator></q-separator>
      <q-item>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-card-actions vertical>
              <q-item-label class="text-secondary text-center">
                <div>Upto 60% + Extra 10%</div>
                <div>Baggit, Zara, Fossil</div>
              </q-item-label>
              <q-separator></q-separator>
              <q-btn flat color="primary">Explore</q-btn>
            </q-card-actions>
          </q-card>
        </q-item-section>
      </q-item>
    </q-card>
  </q-item>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);
const autoplay = ref(true);
const ratingModel = ref(3);
const shape = ref("line");
const tab = ref("description");

const items = ref([
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    title: "Lorem ipsum dolor?",
    name: "Ali Connors",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    title:
      'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
    name: "to Alex, Scott, Jennifer",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    title: "Lorem ipsum dolor",
    name: "Sandra Adams",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    title: "Lorem ipsum dolor",
    name: "",
    subtitle: "",
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    title: "Lorem ipsum dolor",
    name: "Britta Holt",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
]);
</script>
