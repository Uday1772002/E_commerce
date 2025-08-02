<template>
  <v-app :theme="currentTheme">
    <TheNavbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import TheNavbar from "@/components/TheNavbar.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
  },
  computed: {
    ...mapGetters("theme", ["currentTheme"]),
  },
  created() {
    // Set initial theme from localStorage
    this.$vuetify.theme.global.name = this.currentTheme;
  },
  watch: {
    currentTheme(newTheme) {
      this.$vuetify.theme.global.name = newTheme;
    },
  },
};
</script>

<style>
/* Global button improvements for better visibility */
.v-btn {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-btn--variant-elevated {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}

.v-btn--variant-outlined {
  border-width: 2px;
}

/* Improve contrast for disabled buttons */
.v-btn--disabled {
  opacity: 0.6;
}

/* Better hover effects */
.v-btn:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* Improve card button spacing */
.v-card-actions .v-btn {
  margin-right: 8px;
}

.v-card-actions .v-btn:last-child {
  margin-right: 0;
}

/* Better icon button visibility */
.v-btn--icon {
  border-radius: 50%;
}

/* Improve badge visibility */
.v-badge__badge {
  font-weight: 600;
}
</style>
