<script>
    import { StepIndicator } from "flowbite-svelte";
    import GameManager from "../stores/game-manager";

    const STEPS = [
        'Write Prompts', 'AirDraw',
        'Guess The Prompt', 'Review Results'
    ]

    const gameStore = GameManager.data;
    $: step = STEPS.indexOf($gameStore?.stage);
</script>

<StepIndicator
    steps={STEPS}
    currentStep={(step == -1 ? 0 : step) + 1}
    color="purple"
/>