<template>
</template>

<script>

    // import {Socket} from "Lib/phoenix";
    // import Player from "Game/Player";

    export default {
        mounted() {
            let GAME_ID = Math.floor(Math.random() * 1000000000);
            window.GAME_ID = GAME_ID;
            window.PLAYER_ID = GAME_ID;

            // assume we have a username
            let username = localStorage.getItem('username');

            SceneManager.run(Scene_Boot);

            let conn = new WebSocket("ws://localhost:8101/socket");
            conn.onclose = function (evt) {
                alert("Server closed the connection")
            };
            conn.onmessage = function (evt) {
                console.log(evt)
            };

            // let socket = new Socket("ws://localhost:8101/socket", {
            //     logger: (kind, msg, data) => {
            //         console.log(`${kind}: ${msg}`, data)
            //     },
            //     params: {
            //         player_id: PLAYER_ID,
            //         username: username
            //     }
            // });
            // socket.connect();

            // let player = new Player(PLAYER_ID, username);
            // player.setSocket(socket);
            // player.registerGameHooks();
            // // player.registerServerHooks();
            // player.connect();

        }
    }
</script>

<style>

</style>