export default {
    state() {
        return {
            displayDialog: false,
            dialogChosenAction: null,
            dialogActions: {
                SHOW: 'SHOW',
                EDIT: 'EDIT',
                CREATE: 'CREATE'
            },
        }
    },
    getters: {
        displayDialog: state => state.displayDialog,
        dialogChosenAction: state => state.dialogChosenAction,
        dialogActions: state => state.dialogActions

    },
    mutations: {
        setDisplayDialog: (state, payload) => {
            state.displayDialog = payload
        },
        setDialogChosenAction: (state, payload) => {
            state.dialogChosenAction = payload
        },
        showDialog(state) {
            state.displayDialog = true;
        }
    },
    actions: {
        setDisplayDialog: (context, payload) => {
            context.commit("setDisplayDialog", payload)
        },
        setDialogChosenAction: (context, payload) => {
            context.commit("setDialogChosenAction", payload)
        },
        closeDialog(context) {
            context.commit('setDisplayDialog', false);
            context.commit('setDialogChosenAction', null);
        },

        async showEventInfo(context, id) {
            console.log('id: ' + id)
            await context.dispatch('getEvent', id);
            console.log('show event');
            context.commit('setDialogChosenAction', context.getters.dialogActions.SHOW);
            context.commit('showDialog');
        },

        showEventCreate(context) {
            context.commit('setDialogChosenAction', context.getters.dialogActions.CREATE);
            context.commit('showDialog');
        },

    }
}
