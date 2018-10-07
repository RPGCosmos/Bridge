/*:
 * @plugindesc Bifrost - Connects with Heimdall to provide MMO features to MV games
 * @author clone1018       
 */

import "./hooker";
import "./bus";
import "./debug";

// import "./Lib/OrangeCustomEvents";
// import "./Lib/CmdInp";

// import "./Events/Game_Party";
import "./Events/Game_Player";
// import "./Events/Scene_Battle";
// import "./Events/Scene_Map";
// import "./Events/Scene_Menu";
// import "./Events/Scene_Boot";

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './Components/App.vue';

//import "../node_modules/rpgui/rpgui.js";

import CharacterCreator from './Components/CharacterCreator/CharacterCreator.vue';
import Login from './Components/Auth/Login.vue';
import DemoAuth from './Components/Auth/DemoAuth.vue';
import Game from './Components/Game.vue';

(function () {
    var parameters = PluginManager.parameters('Bifrost');

    Vue.use(VueRouter);

    function mustAuth(to, from, next) {
        if(localStorage.getItem('username') == null) {
            next(false);
        } else {
            next();
        }
    }

    const routes = [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/character-creator',
            component: CharacterCreator,
            beforeEnter: mustAuth
        },
        {
            path: '/login',
            component: DemoAuth
        },
        {
            path: '/game',
            component: Game,
            beforeEnter: mustAuth
        }
    ];
    const router = new VueRouter({
        routes 
    });

    const app = new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');

})();