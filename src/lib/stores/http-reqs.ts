export const BACKEND_API: string = "idk.com/poop/";

export const createLobbyReq: () => Promise<string> = async() => {
    const res = await fetch(BACKEND_API + "create", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const resJson: any = await res.json();
    return resJson.body.lobbyId;
};