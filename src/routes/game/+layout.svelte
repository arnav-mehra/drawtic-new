<script>
    import GameManager from "../../lib/stores/game-manager";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Timeline from "../../lib/components/timeline.svelte";
    import Settings from "../../lib/components/settings.svelte";
    import Timer from "../../lib/components/timer.svelte";
    import NotifManager from "../../lib/stores/notif-manager";

    const gameData = GameManager.data;

    onMount(() => {
        if (!$gameData) {
            NotifManager.push("warning", "Not in an active game. Navigating to home.");
            goto('/');
        }
    })
</script>

<div class="fixed w-full h-full p-3 flex flex-col gap-3">
    <Timeline/>

    <div class="w-full h-full flex flex-col justify-center items-center gap-2">
        <slot/>
    </div>

    <div class="flex w-full gap-2">
        <Settings/>
        <Timer/>
    </div>
</div>