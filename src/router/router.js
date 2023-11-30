import Home from "./../pages/Home.vue"
import About from "./../pages/About.vue"
import ProfilePage from "./../pages/ProfilePage.vue"
import Register from "./../pages/Register.vue"
import Login from "./../pages/Login.vue"
import PrivateChat from "./../pages/PrivateChat.vue"
import Administration from "./../pages/Administration.vue"
import FormAddProduct from "./../pages/FormAddProduct.vue"
import UserToChat from "./../pages/UserToChat.vue"
import SalePage from "./../pages/SalePage.vue"
import AllSalesPage from "./../pages/AllSalesPage.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import { subscribeToAuth } from "../services/auth"

const routes = [
    { path: "/", component: Home },
    { path: "/quienes-somos", component: About },
    { path: "/registro", component: Register },
    { path: "/iniciar-sesion", component: Login },
    { path: "/perfil", component: ProfilePage, meta: { requiresAuth: true } },
    {
        path: "/usuario/:id/chat",
        component: PrivateChat,
        meta: { requiresAuth: true },
    },
    {
        path: "/administration",
        component: Administration,
        meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
        path: "/ventas",
        component: AllSalesPage,
        meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
        path: "/cargar-hosting",
        component: FormAddProduct,
        meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
        path: "/usuario-chats",
        component: UserToChat,
        meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
        path: "/compra/:productId",
        component: SalePage,
        name: "SalePage",
        props: true,
        meta: { requiresAuth: true, requiresAdmin: false },
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

let user = {
    id: null,
    email: null,
    role: null,
}

subscribeToAuth((newUser) => (user = newUser))

router.beforeEach((to, from) => {
    if (user.id === null && to.meta.requiresAuth) {
        return "/iniciar-sesion"
    }
})

export default router
