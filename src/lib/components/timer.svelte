<script>
    import { P } from "flowbite-svelte";
    import { ClockOutline } from "flowbite-svelte-icons";
    import GameManager from "../stores/game-manager";
    import { onMount } from "svelte";
    
    const timeStore = GameManager.timer;
    $: time = $timeStore || 0;
    $: minutes = Math.floor(time / 60);
    $: seconds = time % 60;

    onMount(() => {
        let interval = setInterval(() => {
            timeStore.update(t => Math.max(t - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<div class="p-3 bg-purple-700 rounded-lg flex items-center">
    <ClockOutline
        class="w-8 h-8 mr-2"
    />
    <P size="xl" color="white">
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </P>
</div>