import { goto } from '$app/navigation';
import { writable } from 'svelte/store';
import NotifManager from './notif-manager';
import { createLobby } from './reqs';

class GameManager {
    static ws = undefined;
    static data = writable(undefined);
    static timer = writable(100);

    static async init(lobbyId) {
        if (GameManager.ws) {
            NotifManager.push("error", "You are already in a game. How did you manage to do this?");
            return;
        }

        if (!lobbyId) {
            lobbyId = await createLobby();
            if (!lobbyId) {
                NotifManager.push("error", "Unable to create a lobby. Try again later.");
                return;
            }
        }

        const ws = new WebSocket(BACKEND_API + lobbyId);
        GameManager.ws = ws;
        ws.onopen(GameManager.handleOpen);
        ws.onclose(GameManager.handleClose);
        ws.onerror(GameManager.handleError);
        ws.onmessage(GameManager.handleMessage);
    }

    static open(ws, e) {
        goto('/game');
        // notif of game connect.
    }

    static close(ws, e) {
        // notif of game close.
        this.ws = null;
        this.gameData = null;
    }

    static error(ws, e) {
        // notif of game err.
    }
}

export default GameManager;