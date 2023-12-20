import { goto } from '$app/navigation';
import NotifManager from './notif-manager';
import { createLobby, joinLobby, leaveLobby } from './reqs';

class GameManager {
    static ws = undefined;
    static data = undefined;

    static async init(lobbyId) {
        if (GameManager.ws) {
            // alr connected err.
            NotifManager.push("error", "You are already in a game. How did you manage to do this?");
            return;
        }

        if (!lobbyId) {
            lobbyId = await createLobby();
            if (!lobbyId) {
                // unable to create lobby err.
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