<script>
    import GameManager from "../../lib/stores/game-manager";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Settings from "../../lib/components/settings.svelte";

    const gameData = GameManager.data;

    onMount(() => {
        if (!$gameData) {
            NotifManager.push("warning", "Not in an active game. Navigating to home.");
            goto('/');
        }
    });
</script>

<div class="fixed w-full h-full p-3 flex flex-col gap-3">
    <div class="w-full h-full flex flex-col justify-center items-center gap-2">
        <slot/>
    </div>

    <div class="flex w-full gap-2">
        <Settings/>
    </div>
</div>