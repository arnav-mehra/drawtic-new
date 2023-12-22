<script>
    const dots = new Array(5)
        .fill(0)
        .map((_, i) => {
            const t = 4 / (i + 1);
            const c = i * 100 + 400;
            return { time: t, color: c };
        });
</script>

<style>
    .container {
        filter: url('#goo');
        width: 200px;
        height: 200px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @keyframes spinny {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes scaly {
        0% { transform: scale(1); }
        50% { transform: scale(1.4); }
        100% { transform: scale(1); }
    }
    
    .dot-container-1 {
        width: 200px;
        height: 200px;
        position: absolute;
        animation: scaly ease-in-out infinite;
    }

    .dot-container-2 {
        width: 200px;
        height: 200px;
        position: absolute;
        animation: spinny linear infinite;
    }

    .dot { 
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        transform: translateX(30px);
    }
</style>

<div class="container">
    {#each dots as dot}
        <div class="dot-container-1" style="animation-duration: {dot.time}s">
            <div class="dot-container-2" style="animation-duration: {dot.time}s">
                <div class="dot bg-purple-{dot.color}"/>
            </div>
        </div>
    {/each}
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
    <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
    </filter>
    </defs>
</svg>