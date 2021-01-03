import Store from "@/store";

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

    Store.dispatch('setResponseError','');
    Store.dispatch('setResponseMessage','');

    if (to.meta.requiresAuth && !Store.getters.isAuthenticated) {
        next('/login');
    }
    else if (to.meta.requiresUnauth && Store.getters.isAuthenticated) {
        next('/');
    }
    else {
        next();
    }
    console.log("(router.js)isAuthenticated: " + Store.getters.isAuthenticated);
});

export default router;