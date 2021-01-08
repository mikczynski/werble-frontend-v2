/* Import Basic App functions */
import { createApp } from 'vue'
import App from './App.vue'
import ToastService from 'primevue/toastservice';


/* Import Vue Router & Vuex Store*/
import router from "@/router";
import store from "@/store";

/* Additional modules */
import PrimeVue from "primevue/config"
import Calendar from "primevue/components/calendar/Calendar";
import Fieldset from "primevue/components/fieldset/Fieldset";
import Dialog from "primevue/components/dialog/Dialog";
import Button from "primevue/components/button/Button";
import InputText from "primevue/components/inputtext/InputText";
import Menubar from "primevue/components/menubar/Menubar";
import Slider from "primevue/components/slider/Slider";
import Message from "primevue/components/message/Message";
import InputSwitch from "primevue/components/inputswitch/InputSwitch";
import Textarea from "primevue/components/textarea/Textarea";
import ProgressSpinner from "primevue/components/progressspinner/ProgressSpinner";
import InlineMessage from "primevue/components/inlinemessage/InlineMessage";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import ColumnGroup from "primevue/components/columngroup/ColumnGroup";
import Row from "primevue/components/row/Row";
import Toast from 'primevue/toast';
import Dropdown from "primevue/components/dropdown/Dropdown";

/* Make Axios global */
window.axios = require('axios');

/* Create Vue App */
const app = createApp(App);

/* Add modules to app */
app.use(router);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);

/* Global components */
app.component('Calendar',Calendar);
app.component('Fieldset',Fieldset);
app.component('Dialog', Dialog);
app.component('Button',Button);
app.component('InputText',InputText);
app.component('Menubar',Menubar);
app.component('Slider',Slider);
app.component('Message',Message);
app.component('InputSwitch',InputSwitch);
app.component('Textarea',Textarea);
app.component('ProgressSpinner',ProgressSpinner);
app.component('InlineMessage',InlineMessage);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('ColumnGroup',ColumnGroup);
app.component('Row',Row);
app.component('Toast',Toast);
app.component('Dropdown',Dropdown);

/* Mount Vue App */
app.mount('#app')
