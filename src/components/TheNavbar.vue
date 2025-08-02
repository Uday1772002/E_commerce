<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title @click="$router.push('/')" style="cursor: pointer">
      E-Commerce Store
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Theme Toggle with adaptive color -->
    <v-btn icon @click="toggleTheme" variant="text">
      <span
        :style="{
          color: iconColor === 'white' ? 'white' : '#1976D2',
          fontWeight: 'bold',
        }"
      >
        {{ isDark ? "☀" : "🌙" }}
      </span>
    </v-btn>

    <!-- Cart button with adaptive color -->
    <v-btn icon @click="$router.push('/cart')" variant="text">
      <v-badge
        :content="cartQuantity"
        color="error"
        :model-value="cartQuantity > 0"
      >
        <span
          :style="{
            color: iconColor === 'white' ? 'white' : '#1976D2',
            fontWeight: 'bold',
          }"
          >🛒</span
        >
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheNavbar",
  computed: {
    ...mapGetters("cart", ["cartQuantity"]),
    ...mapGetters("theme", ["isDark"]),
    iconColor() {
      return this.isDark ? "white" : "primary";
    },
  },
  methods: {
    ...mapActions("theme", ["toggleTheme"]),
  },
};
</script>
