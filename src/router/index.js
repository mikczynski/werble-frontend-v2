import store from "@/store";

/* Import Vue-Router createRouter */
import {createRouter} from "vue-router";
import {createWebHistory} from "vue-router";

/* Router parts */
import routes from "@/router/routes";

/* Router configuration object */
const routerConfig = {
    history: createWebHistory(),
    routes
}

/* Init Global Store */
const router = createRouter(routerConfig);


router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    }
    else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/');
    }
    else {
        next();
    }
    console.log("(router.js)isAuthenticated: " + store.getters.isAuthenticated);
});

export default router;