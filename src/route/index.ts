import { createRouter, createWebHistory } from "vue-router"

import CsvList from "../views/CsvList.vue"
import CsvDetails from "../views/CsvDetails.vue"

const routes = [
  {
    path: "/",
    name: "CsvList",
    component: CsvList,
  },
  {
    path: "/csv/:id",
    name: "CsvDetails",
    component: CsvDetails,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
