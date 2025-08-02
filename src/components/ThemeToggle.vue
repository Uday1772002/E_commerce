<template>
  <v-btn
    icon
    @click="handleToggleTheme"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <v-icon>{{ isDark ? "mdi-weather-sunny" : "mdi-weather-night" }}</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ThemeToggle",
  computed: {
    ...mapGetters("theme", ["isDark", "currentTheme"]),
  },
  methods: {
    ...mapActions("theme", ["toggleTheme"]),
    handleToggleTheme() {
      try {
        this.toggleTheme();
        console.log("Theme toggled to:", this.currentTheme);
      } catch (error) {
        console.error("Error toggling theme:", error);
      }
    },
  },
};
</script>
