import { createStore } from "vuex";
import products from "./modules/products";
import cart from "./modules/cart";
import theme from "./modules/theme";

export default createStore({
  modules: {
    products,
    cart,
    theme,
  },
});
