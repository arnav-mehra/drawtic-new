<script>
    import { Button, P, Textarea } from "flowbite-svelte";
    import { PapperPlaneOutline, TrashBinOutline, UndoOutline } from "flowbite-svelte-icons";
    import { onMount } from "svelte";
    import GameManager from "../../lib/stores/game-manager";

    let imageSrc = "";
    let guess = "";

    onMount(() => {
        imageSrc = GameManager.loadGuessingImage();
    });

    const clearGuess = () => {
        guess = "";
    };

    const submitGuess = () => {
        GameManager.submitGuess(guess);
    };
</script>

<div class="pointer-events-none w-full flex flex-col items-center">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
        src={imageSrc}
        alt="Unable to load image."
        class="w-full"
        style="max-height: calc(100vh - 98px - 0.75rem * 5 - 128px)"
    />
</div>

<div class="w-full max-w-[800px]">
    <div class="flex justify-between items-center">
        <P color="white" weight="bold" size="lg">
            Make a Guess
        </P>
        <Button
            on:click={clearGuess}
            size="sm"
        >
            <TrashBinOutline/>
        </Button>
    </div>

    <Textarea
        placeholder="Enter your guess..."
        bind:value={guess}
        class="!text-lg mt-2"
    />
</div>

<div class="fixed bottom-3 right-3 flex gap-2">
    <Button on:click={submitGuess} color="blue" size="lg">
        <PapperPlaneOutline class="rotate-45 w-8 h-8 translate-x-[4px] translate-y-[-4px]"/>
    </Button>
</div>