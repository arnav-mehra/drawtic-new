<script>
    import { onMount } from "svelte";

    let icons = [];
    let tick = 0;

    const ICON_RATE = 6;
    const MAX_VEL = 2.5;
    const SIZE_INC = 0.1;
    const SIZE_INIT = 10;
    const OPACITY_INIT = 0.15;
    const OPACITY_INC = 0.0003; 
    const LIVE_TICKS = OPACITY_INIT / OPACITY_INC;
    const ICON_SVGS = [
        "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
        "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
        "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
    ]

    const addIcon = () => {
        const newIcon = {
            id: tick,
            d: Math.floor(Math.random() * ICON_SVGS.length),
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
            if (tick % ICON_RATE == 0) {
                addIcon();
            }
            iterate();
            af = requestAnimationFrame(update);
        });

        return () => cancelAnimationFrame(af);
    });
</script>

<div style="pointer-events: none;">
    {#each icons as {x, y, sz, op, d}}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            style={`position: fixed; top: ${y}px; left: ${x}px; opacity: ${op}; width: ${sz}px; height: ${sz}px`}
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d={ICON_SVGS[d]}
            />
        </svg>
    {/each}
</div>