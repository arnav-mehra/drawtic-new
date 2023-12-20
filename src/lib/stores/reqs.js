export const BACKEND_API = "idk.com/poop/";

export const createLobby = async () => {
    const res = await fetch(BACKEND_API + "create");
    return res.body.lobbyId;
};