import { goto } from '$app/navigation';
import { writable } from 'svelte/store';
import NotifManager from './notif-manager';
import { createLobby } from './http-reqs';

class GameManager {
    static ws = undefined;
    static data = writable(undefined);
    static timer = writable(100);

    static async _init(lobbyId) {
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

    static _open(ws, e) {
        goto('/game');
        // notif of game connect.
    }

    static _close(ws, e) {
        // notif of game close.
        this.ws = null;
        this.gameData = null;
    }

    static _error(ws, e) {
        // notif of game err.
    }

    // PUBLIC METHODS

    static getGuessingImage() {
        return "google.com";
    }

    static getDrawingPrompt() {
        return "this is a crazy gud prompt.";
    }

    static async getResults() {
        return [];
    }
    
    static async refreshSuggestions(refreshes) {
        return [];
    }

    static async submitPrompt(prompt) {
        return;
    }

    static async submitImage(url) {
        return;
    }

    static async submitGuess(guess) {
        return;
    }
}

export default GameManager;