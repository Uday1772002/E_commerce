<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-filter-variant</v-icon>
      Filters
    </v-card-title>
    <v-card-text>
      <!-- Search Bar -->
      <v-text-field
        v-model="localFilters.searchQuery"
        label="Search products..."
        prepend-icon="mdi-magnify"
        clearable
        variant="outlined"
        density="compact"
        class="mb-4"
        @input="emitFilters"
      ></v-text-field>

      <!-- Category Filter -->
      <v-select
        v-model="localFilters.category"
        :items="categoryItems"
        label="Category"
        prepend-icon="mdi-tag"
        variant="outlined"
        density="compact"
        clearable
        class="mb-4"
        @update:model-value="emitFilters"
      ></v-select>

      <!-- Price Range Filter -->
      <div class="mb-4">
        <v-subheader class="px-0">
          <v-icon class="mr-2">mdi-currency-usd</v-icon>
          Price Range
        </v-subheader>
        <v-range-slider
          v-model="localFilters.priceRange"
          :max="maxPrice"
          :min="0"
          :step="10"
          thumb-label="always"
          class="mt-4"
          @end="emitFilters"
        ></v-range-slider>
        <div class="d-flex justify-space-between text-caption">
          <span>${{ localFilters.priceRange[0] }}</span>
          <span>${{ localFilters.priceRange[1] }}</span>
        </div>
      </div>

      <!-- Rating Filter -->
      <div class="mb-4">
        <v-subheader class="px-0">
          <v-icon class="mr-2">mdi-star</v-icon>
          Minimum Rating
        </v-subheader>
        <v-slider
          v-model="localFilters.rating"
          :max="5"
          :min="0"
          :step="0.5"
          thumb-label="always"
          class="mt-4"
          @end="emitFilters"
        >
          <template v-slot:thumb-label="{ modelValue }">
            {{ modelValue }}★
          </template>
        </v-slider>
        <div class="text-center">
          <v-rating
            :model-value="localFilters.rating"
            readonly
            density="compact"
            half-increments
          ></v-rating>
        </div>
      </div>

      <!-- Clear Filters Button -->
      <v-btn block variant="outlined" color="error" @click="clearFilters">
        <v-icon class="mr-2">mdi-filter-remove</v-icon>
        Clear All Filters
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductFilters",
  props: {
    filters: {
      type: Object,
      default: () => ({
        searchQuery: "",
        category: "",
        priceRange: [0, 2000],
        rating: 0,
      }),
    },
  },
  data() {
    return {
      localFilters: {
        searchQuery: "",
        category: "",
        priceRange: [0, 2000],
        rating: 0,
      },
      maxPrice: 2000,
    };
  },
  computed: {
    ...mapGetters("products", ["categories", "allProducts"]),
    categoryItems() {
      return [
        { title: "All Categories", value: "" },
        ...this.categories.map((cat) => ({ title: cat, value: cat })),
      ];
    },
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.localFilters = { ...newFilters };
      },
      deep: true,
      immediate: true,
    },
    allProducts: {
      handler(products) {
        if (products.length > 0) {
          this.maxPrice = Math.max(...products.map((p) => p.price));
          // Update price range if it exceeds the new max
          if (this.localFilters.priceRange[1] > this.maxPrice) {
            this.localFilters.priceRange[1] = this.maxPrice;
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    emitFilters() {
      this.$emit("update:filters", { ...this.localFilters });
    },
    clearFilters() {
      this.localFilters = {
        searchQuery: "",
        category: "",
        priceRange: [0, this.maxPrice],
        rating: 0,
      };
      this.emitFilters();
    },
  },
};
</script>

<style scoped>
.v-subheader {
  font-weight: 600;
  color: var(--v-theme-primary);
}
</style>
