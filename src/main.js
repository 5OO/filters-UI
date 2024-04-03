
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import 'primevue/resources/themes/saga-blue/theme.css' // theme
import 'primevue/resources/primevue.min.css' // core css
import 'primeicons/primeicons.css' // icons
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue);

app.component('PvDialog', Dialog);
app.component('PvButton', Button);
app.component('PvInputText', InputText);
app.mount('#app');
