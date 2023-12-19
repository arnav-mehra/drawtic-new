<script>
    import { onMount } from "svelte";
    import "../app.pcss";

    let icons = [];
    let tick = 0;

    const MAX_VEL = 2.5;
    const SIZE_INC = 0.1;
    const SIZE_INIT = 10;
    const OPACITY_INIT = 0.15;
    const OPACITY_INC = 0.0003; 
    const LIVE_TICKS = OPACITY_INIT / OPACITY_INC;

    const addIcon = () => {
        const newIcon = {
            id: tick,
            sz: SIZE_INIT,
            op: OPACITY_INIT,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            dx: Math.random() * MAX_VEL * 2 - MAX_VEL,
            dy: Math.random() * MAX_VEL * 2 - MAX_VEL,
            dz: Math.random() > 0.5,
            kill_tick: tick + LIVE_TICKS
        };
        icons.push(newIcon);
        icons = icons;
    };

    const iterate = () => {
        icons.forEach(ip => {
            ip.x += ip.dx;
            ip.y += ip.dy;
            ip.sz += SIZE_INC;
            ip.op += OPACITY_INC * (ip.dz ? 1 : -1);
        });
        icons = icons.filter(ip => 
            ip.kill_tick > tick
        );
    };

    onMount(() => {
        let af = requestAnimationFrame(function update() {
            tick++;
            if (tick % 8 == 0) {
                addIcon();
            }
            iterate();
            af = requestAnimationFrame(update);
        });
        return () => cancelAnimationFrame(af);
    });
</script>

<slot />

<div style="pointer-events: none;">
    {#each icons as {x, y, sz, op}}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            style={`position: fixed; top: ${y}px; left: ${x}px; opacity: ${op}; width: ${sz}px; height: ${sz}px`}
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
    {/each}
</div>