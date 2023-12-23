import { get, writable, type Writable } from "svelte/store";

class NotifManager {
    static queue: Writable<Array<Object>> = writable([]);
    static show: Writable<boolean> = writable(false);
    static interval: number = undefined;

    static push(status: string, msg: string) {
        NotifManager.queue.update((q: Array<Object>) => {
            q.push({ status, msg });
            return q;
        });

        if (!NotifManager.interval) {
            NotifManager.interval = setTimeout(NotifManager.pop, 2000);
            NotifManager.show.set(true);
        }
    }

    static async pop() {
        clearTimeout(NotifManager.interval);

        if (get(NotifManager.queue).length == 0) return;

        NotifManager.show.set(false);
        await new Promise((res, _) => setTimeout(res, 500));

        NotifManager.queue.update((q: Array<Object>) => {
            q.shift();
            NotifManager.show.set(q.length != 0);
            NotifManager.interval = (
                q.length != 0
                    ? setTimeout(NotifManager.pop, 2000)
                    : undefined
            );
            return q;
        });
    }
}

export default NotifManager;