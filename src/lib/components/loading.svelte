<script>
    const dots = new Array(10)
        .fill(0)
        .map((_, i) => {
            const r = Math.floor(Math.random() * 8) + 2; // 2-9
            const t = i * 0.25 + 0.75;
            const c = r * 100;
            return { t, c };
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

    .dot-container {
        width: 200px;
        height: 200px;
        position: absolute;
    }

    .dot { 
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        transform: translateY(-40px);
    }

    @keyframes spin { 
        from { 
            transform: rotate(0deg); 
        } to { 
            transform: rotate(0deg); 
        }
    }
</style>

<div class="container">
    {#each dots as dot}
        <div
            class="dot-container"
            style={`animation: spin ${dot.t}s linear infinite;`}
        >
            <div class={`dot bg-purple-${dot.c}`}/>
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