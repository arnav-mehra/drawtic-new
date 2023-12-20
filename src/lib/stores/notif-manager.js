import { get, writable } from "svelte/store";

class NotifManager {
    static queue = writable([]);
    static show = writable(false);
    static interval = undefined;

    static push(status, msg) {
        NotifManager.queue.update(q => {
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

        NotifManager.queue.update(q => {
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