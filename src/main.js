// import './assets/main.css'

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

app.component('Dialog-component', Dialog);
app.component('Button-component', Button);
app.component('InputText', InputText);
app.mount('#app');
