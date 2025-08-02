<template>
  <v-container>
    <h1 class="text-h3 mb-6">Shopping Cart</h1>

    <v-row v-if="cartItems.length > 0">
      <v-col cols="12" md="8">
        <v-card v-for="item in cartItems" :key="item.id" class="mb-4">
          <v-row no-gutters>
            <v-col cols="3">
              <v-img :src="item.image" height="120" cover></v-img>
            </v-col>
            <v-col cols="9">
              <v-card-body>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>${{ item.price }}</v-card-subtitle>
                <v-card-text>
                  <div class="d-flex align-center">
                    <v-btn
                      icon
                      size="small"
                      color="primary"
                      variant="outlined"
                      @click="
                        updateQuantity({
                          productId: item.id,
                          quantity: item.quantity - 1,
                        })
                      "
                    >
                      <span style="color: #1976d2; font-weight: bold">-</span>
                    </v-btn>
                    <span class="mx-4">{{ item.quantity }}</span>
                    <v-btn
                      icon
                      size="small"
                      color="primary"
                      variant="outlined"
                      @click="
                        updateQuantity({
                          productId: item.id,
                          quantity: item.quantity + 1,
                        })
                      "
                    >
                      <span style="color: #1976d2; font-weight: bold">+</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error"
                      variant="elevated"
                      icon
                      @click="removeFromCart(item.id)"
                    >
                      <span style="color: white; font-weight: bold">X</span>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card-body>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span>Items ({{ cartQuantity }}):</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex justify-space-between text-h6">
              <span>Total:</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" variant="elevated" block size="large">
              Checkout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-icon size="64" class="mb-4">mdi-cart-outline</v-icon>
        <h2 class="text-h4 mb-4">Your cart is empty</h2>
        <v-btn color="primary" variant="elevated" @click="$router.push('/')">
          Continue Shopping
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotal", "cartQuantity"]),
  },
  methods: {
    ...mapActions("cart", ["removeFromCart", "updateQuantity"]),
  },
};
</script>
