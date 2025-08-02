import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/ProductList.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ShoppingCart from "@/views/ShoppingCart.vue";

const routes = [
  {
    path: "/",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
