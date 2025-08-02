<template>
  <v-card>
    <v-img :src="product.image" height="200" cover></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>{{ product.category }}</v-card-subtitle>
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <span class="text-h6">${{ product.price }}</span>
        <v-rating
          :model-value="product.rating"
          readonly
          density="compact"
        ></v-rating>
      </div>
    </v-card-text>
    <v-card-actions class="product-card-actions">
      <v-btn
        color="primary"
        variant="outlined"
        class="action-btn"
        @click="$router.push(`/product/${product.id}`)"
      >
        View Details
      </v-btn>
      <v-btn
        color="success"
        variant="elevated"
        class="action-btn"
        :disabled="isInCart(product.id)"
        @click="handleAddToCart"
      >
        {{ isInCart(product.id) ? "In Cart" : "Add to Cart" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("cart", ["isInCart"]),
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    handleAddToCart() {
      try {
        this.addToCart(this.product);
        console.log("Product added to cart:", this.product.name);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-card-actions {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping */
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
}
.action-btn {
  flex: 1 1 0;
  min-width: 0;
  white-space: nowrap;
}
</style>
