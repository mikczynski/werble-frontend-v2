/* Import Vuex CreateStore */

import {createStore} from "vuex";


/* Global store parts */
import actions from "./actions";
import getters from './getters'
import state from "./state";
import mutations from "./mutations";
import auth from "@/store/modules/auth";
import events from './modules/events';
import user from "@/store/modules/user";

/* Store modules object*/
const modules = {
    auth: auth,
    events: events,
    user: user,
}

/* Global Store configuration object */
const storeConfig = {
    getters,
    actions,
    state,
    mutations,
    modules,
}


/* Init Global Store */
const store = createStore(storeConfig);
export default store;