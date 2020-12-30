/* Import Vuex CreateStore */
import {createStore} from "vuex";

/* Global store parts */
import actions from "./actions";
import getters from './getters'
import state from "./state";
import mutations from "./mutations";

/* Store modules object*/
const modules = {
//
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