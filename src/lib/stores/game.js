import { goto } from '$app/navigation';
import { createLobby, joinLobby, leaveLobby } from './reqs';

class GameManager {
    constructor(lobbyId) {
        this.init(lobbyId);
    }

    async init(lobbyId) {
        if (this.ws) {
            // alr connected err.
            return;
        }
        if (!lobbyId) {
            lobbyId = await createLobby();
            if (!lobbyId) {
                // unable to create lobby err.
                return;
            }
        }
        this.ws = new WebSocket(BACKEND_API + lobbyId);
        this.ws.onopen(this.open);
        this.ws.onclose(this.close);
        this.ws.onerror(this.error);
    }

    open(ws, e) {
        goto('/game');
        // notif of game connect.
    }

    close(ws, e) {
        // notif of game close.
        this.ws = null;
        this.gameData = null;
    }

    error(ws, e) {
        // notif of game err.
    }
}