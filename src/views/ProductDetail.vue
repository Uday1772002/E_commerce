<template>
  <v-container v-if="product">
    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="product.image" height="400" cover></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="text-h3 mb-4">{{ product.name }}</h1>
        <v-chip :color="getCategoryColor(product.category)" class="mb-4">
          {{ product.category }}
        </v-chip>
        <div class="text-h4 mb-4">${{ product.price }}</div>
        <v-rating
          :model-value="product.rating"
          readonly
          class="mb-4"
        ></v-rating>
        <p class="text-body-1 mb-6">{{ product.description }}</p>

        <v-btn
          size="large"
          color="success"
          variant="elevated"
          :disabled="isInCart(product.id)"
          @click="addToCart(product)"
        >
          {{ isInCart(product.id) ? "Added to Cart" : "Add to Cart" }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Reviews Section -->
    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="text-h4 mb-4">Customer Reviews</h2>
        <v-card class="mb-4">
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <v-avatar size="40" class="mr-3">
                <v-img src="https://via.placeholder.com/40"></v-img>
              </v-avatar>
              <div>
                <div class="font-weight-bold">John Doe</div>
                <v-rating
                  :model-value="5"
                  readonly
                  density="compact"
                ></v-rating>
              </div>
            </div>
            <p>"Excellent product! Highly recommended."</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-alert type="error">Product not found</v-alert>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("products", ["productById"]),
    ...mapGetters("cart", ["isInCart"]),
    product() {
      return this.productById(this.id);
    },
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    getCategoryColor(category) {
      const colors = {
        Electronics: "blue",
        Clothing: "purple",
        Books: "green",
      };
      return colors[category] || "grey";
    },
  },
};
</script>
