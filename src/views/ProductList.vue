<template>
  <v-container>
    <v-row>
      <!-- Filters Sidebar -->
      <v-col cols="12" md="3">
        <ProductFilters
          :filters="currentFilters"
          @update:filters="handleFiltersUpdate"
        />
      </v-col>

      <!-- Products Section -->
      <v-col cols="12" md="9">
        <!-- Sort Options -->
        <v-card class="mb-4">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="sortBy"
                  :items="sortOptions"
                  label="Sort by"
                  variant="outlined"
                  density="compact"
                  @update:model-value="handleSortUpdate"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="sortOrder"
                  :items="[
                    { value: 'asc', title: 'Ascending' },
                    { value: 'desc', title: 'Descending' },
                  ]"
                  label="Order"
                  variant="outlined"
                  density="compact"
                  @update:model-value="handleSortUpdate"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Results Count -->
        <v-alert
          v-if="filteredProducts.length === 0"
          type="info"
          variant="tonal"
          class="mb-4"
        >
          No products found matching your criteria. Try adjusting your filters.
        </v-alert>

        <div v-else class="text-subtitle-1 mb-4">
          Showing {{ filteredProducts.length }} product(s)
        </div>

        <!-- Products Grid -->
        <v-row>
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
import ProductFilters from "@/components/ProductFilters.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
    ProductFilters,
  },
  data() {
    return {
      currentFilters: {
        searchQuery: "",
        category: "",
        priceRange: [0, 2000],
        rating: 0,
      },
      sortBy: "name",
      sortOrder: "asc",
      sortOptions: [
        { value: "name", title: "Name" },
        { value: "price", title: "Price" },
        { value: "rating", title: "Rating" },
      ],
    };
  },
  computed: {
    ...mapGetters("products", ["filteredProducts", "categories"]),
  },
  methods: {
    ...mapActions("products", ["updateFilters", "updateSort"]),

    // Handle filter updates from ProductFilters component
    handleFiltersUpdate(filters) {
      this.currentFilters = filters;
      this.updateFilters(filters); // Now calls the Vuex action
    },

    // Handle sort updates from select components
    handleSortUpdate() {
      this.updateSort({
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });
    },
  },
  mounted() {
    // Initialize filters and sort on component mount
    this.updateFilters(this.currentFilters);
    this.updateSort({
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    });
  },
};
</script>
