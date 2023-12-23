import { goto } from '$app/navigation';
import { writable, type Writable } from 'svelte/store';
import NotifManager from './notif-manager';
import { createLobbyReq, BACKEND_API } from './http-reqs';

const LOBBY_ID_LENGTH: number = 5;

class GameManager {
    static ws: WebSocket = undefined;
    static data: Writable<Object> = writable({
        stage: "prompt"
    });
    static timer: Writable<number> = writable(100);

    // PRIVATE METHODS.

    static async _init(lobbyId: string) {
        if (GameManager.ws) {
            NotifManager.push("error", "You are already in a game. How did you manage to do this?");
            return;
        }

        const ws = new WebSocket(BACKEND_API + lobbyId);
        GameManager.ws = ws;
        ws.addEventListener("open", GameManager._open);
        ws.addEventListener("close", GameManager._close);
        ws.addEventListener("error", GameManager._error);
        ws.addEventListener("message", GameManager._message);
    }

    static _open(e: Event) {
        goto('/game');
        // notif of game connect.
    }

    static _close(e: Event) {
        // notif of game close.
        this.ws = null;
        this.data.set(null);
        this.timer.set(0);
    }

    static _error(e: Event) {
        // notif of game err.
    }

    static _message(e: Event) {
        // handle messages
    }

    // checks to be made prior to in-game reqs. returns true if passed.
    static _prechecks(): boolean {
        if (!GameManager.ws) {
            NotifManager.push("error", "Unable to handle request. You are not in a game.");
            return false;
        }
        return true;
    }

    // PUBLIC METHODS

    static async createLobby(): Promise<void> {
        const lobbyId = await createLobbyReq();
        if (!lobbyId) {
            NotifManager.push("error", "Unable to create a lobby. Try again later.");
            return;
        }

        GameManager._init(lobbyId);
    }

    static joinLobby(lobbyId: string) {
        if (!lobbyId || lobbyId.length != LOBBY_ID_LENGTH) {
            NotifManager.push("warning", "Please enter a valid lobby code.");
            return;
        }

        GameManager._init(lobbyId);
    }

    static getLobbyList(): Array<Object> {
        return [];
    }

    static getGuessingImage(): string {
        if (!GameManager._prechecks()) {
            return;
        }
        return "google.com";
    }

    static getDrawingPrompt(): string {
        if (!GameManager._prechecks()) {
            return;
        }
        return "this is a crazy gud prompt.";
    }

    static getResults(): Array<Object> {
        if (!GameManager._prechecks()) {
            return;
        }
        return [];
    }
    
    // async -> need to await a response.
    static async refreshSuggestions(refreshes: Number) {
        if (!GameManager._prechecks()) {
            return;
        }
        return [];
    }

    static submitPrompt(prompt: string) {
        if (!GameManager._prechecks()) {
            return;
        }
        return;
    }

    static submitImage(url: string) {
        if (!GameManager._prechecks()) {
            return;
        }
        return;
    }

    static submitGuess(guess: string) {
        if (!GameManager._prechecks()) {
            return;
        }
        return;
    }
}

export default GameManager;