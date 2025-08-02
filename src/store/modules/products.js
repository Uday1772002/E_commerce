const state = {
  products: [
    {
      id: 1,
      name: "Laptop",
      price: 999,
      category: "Electronics",
      rating: 4.5,
      image: "/images/products/laptop.jpg",
      description: "High-performance laptop",
    },
    {
      id: 2,
      name: "Headphones",
      price: 199,
      category: "Electronics",
      rating: 4.2,
      image: "/images/products/headphones.jpg",
      description: "Wireless noise-canceling headphones",
    },
    {
      id: 3,
      name: "T-Shirt",
      price: 29,
      category: "Clothing",
      rating: 4.0,
      image: "/images/products/tshirt.jpg",
      description: "Comfortable cotton t-shirt",
    },
    {
      id: 4,
      name: "Earphones",
      price: 89,
      category: "Electronics",
      rating: 3.8,
      image: "/images/products/earphones.jpg",
      description: "Wireless earphones",
    },
    {
      id: 5,
      name: "Smartphone",
      price: 699,
      category: "Electronics",
      rating: 4.7,
      image: "/images/products/laptop.jpg",
      description: "Latest smartphone model",
    },
    {
      id: 6,
      name: "Jeans",
      price: 59,
      category: "Clothing",
      rating: 3.5,
      image: "/images/products/tshirt.jpg",
      description: "Comfortable denim jeans",
    },
    {
      id: 7,
      name: "Tablet",
      price: 399,
      category: "Electronics",
      rating: 4.3,
      image: "/images/products/laptop.jpg",
      description: "Portable tablet device",
    },
    {
      id: 8,
      name: "Sneakers",
      price: 79,
      category: "Clothing",
      rating: 4.1,
      image: "/images/products/tshirt.jpg",
      description: "Comfortable running shoes",
    },
  ],
  filteredProducts: [],
  filters: {
    category: "",
    priceRange: [0, 2000],
    rating: 0,
    searchQuery: "",
  },
  sortBy: "name",
  sortOrder: "asc",
};

const getters = {
  allProducts: (state) => state.products,
  filteredProducts: (state) => {
    let filtered = [...state.products];

    if (state.filters.category) {
      filtered = filtered.filter(
        (product) => product.category === state.filters.category
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= state.filters.priceRange[0] &&
        product.price <= state.filters.priceRange[1]
    );

    if (state.filters.rating > 0) {
      filtered = filtered.filter(
        (product) => product.rating >= state.filters.rating
      );
    }

    if (state.filters.searchQuery) {
      const query = state.filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      let aVal = a[state.sortBy];
      let bVal = b[state.sortBy];

      if (state.sortBy === "price" || state.sortBy === "rating") {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (state.sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  },
  categories: (state) => [...new Set(state.products.map((p) => p.category))],
  productById: (state) => (id) =>
    state.products.find((product) => product.id === parseInt(id)),
};

const mutations = {
  SET_FILTERS(state, filters) {
    state.filters = { ...state.filters, ...filters };
  },
  SET_SORT(state, { sortBy, sortOrder }) {
    state.sortBy = sortBy;
    state.sortOrder = sortOrder;
  },
};

const actions = {
  updateFilters({ commit }, filters) {
    commit("SET_FILTERS", filters);
  },
  updateSort({ commit }, sortOptions) {
    commit("SET_SORT", sortOptions);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
