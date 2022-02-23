import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '../pages/Home.vue';
import Cadastrar from '../pages/Cadastrar.vue';
import Listar from '../pages/Listar.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/cadastrar',
        component: Cadastrar
    },
    {
        path: '/listar',
        component: Listar
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;