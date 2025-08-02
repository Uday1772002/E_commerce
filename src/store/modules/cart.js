const state = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const getters = {
  cartItems: (state) => state.items,
  cartTotal: (state) => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  cartQuantity: (state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
  isInCart: (state) => (productId) => {
    return state.items.find((item) => item.id === productId);
  },
};

const mutations = {
  ADD_TO_CART(state, product) {
    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.items.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  REMOVE_FROM_CART(state, productId) {
    const index = state.items.findIndex((item) => item.id === productId);
    if (index > -1) {
      state.items.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  },
  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.items.find((item) => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        const index = state.items.findIndex((item) => item.id === productId);
        state.items.splice(index, 1);
      } else {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  },
};

const actions = {
  addToCart({ commit }, product) {
    commit("ADD_TO_CART", product);
  },
  removeFromCart({ commit }, productId) {
    commit("REMOVE_FROM_CART", productId);
  },
  updateQuantity({ commit }, payload) {
    commit("UPDATE_QUANTITY", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
