<script>
    import GameManager from "../../lib/stores/game-manager";
    import Draw from "./draw.svelte";
    import Guess from "./guess.svelte";
    import Prompt from "./prompt.svelte";
    import Results from "./results.svelte";

    const STAGE_COMPONENTS = {
        'prompt': Prompt,
        'draw': Draw,
        'guess': Guess,
        'results': Results,
    };
    const gameData = GameManager.data;
    $: stage_component = STAGE_COMPONENTS[$gameData?.stage || 'results']
</script>

<svelte:component
    this={stage_component}
/>