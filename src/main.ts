import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// PrimeVue
import PrimeVue from "primevue/config"
import Dialog from "primevue/dialog"
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.component('Dialog', Dialog)

app.mount("#app");
