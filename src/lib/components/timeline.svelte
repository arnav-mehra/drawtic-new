<script>
    import { StepIndicator } from "flowbite-svelte";
    import GameManager from "../stores/game-manager";

    const STEPS = [
        'Stage 1: Write a prompt.',
        'Stage 2: AirDraw the given prompt.',
        'Stage 3: Guess what prompt this artist was given.',
        'Stage 4: Review what your friends drew!'
    ];

    const gameStore = GameManager.data;
    $: step = STEPS.indexOf($gameStore?.stage);
</script>

<StepIndicator
    steps={STEPS}
    currentStep={(step == -1 ? 0 : step) + 1}
    color="purple"
/>