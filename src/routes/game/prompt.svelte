<script>
    import { Button, P, Textarea } from "flowbite-svelte";
    import { PapperPlaneOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import GameManager from "../../lib/stores/game-manager";

    let prompt = "";
    let refreshes = 0;
    let suggestions = [
        "My name is slim shady",
        "That part in Morbius where he said \"Its Morbin time\" and proceeded to Morb.",
        "I dont know what is going on. Help me."
    ];

    const refreshSuggestions = async () => {
        suggestions = await GameManager.refreshSuggestions(refreshes);
        refreshes++;
    };

    const clearPrompt = () => {
        prompt = "";
    };

    const handleSubmit = () => {
        GameManager.submitPrompt(prompt);
    };
</script>

<div class="w-full max-w-[800px]">
    <div class="flex justify-between items-center">
        <P color="white" weight="bold" size="lg">
            Write a Prompt
        </P>
        <Button
            on:click={clearPrompt}
            size="sm"
        >
            <TrashBinOutline/>
        </Button>
    </div>

    <Textarea
        placeholder="Enter your prompt..."
        bind:value={prompt}
        class="!text-lg mt-2"
    />
</div>

<P class="my-4 font-bold" color="white" size="lg">
    OR
</P>

<div class="w-full max-w-[800px]">
    <div class="flex justify-between items-center">
        <P color="white" weight="bold" size="lg">
            Pick a Suggested Prompt
        </P>
        <Button
            on:click={refreshSuggestions}
            size="sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </Button>
    </div>
    <div class="flex flex-col gap-1 mt-2">
        {#each suggestions as suggestion}
            <button
                class="w-full rounded-lg bg-white text-black text-left p-2"
                on:click={e => prompt = e.target.innerHTML}
            >
                {suggestion}
            </button>
        {/each}
    </div>
</div>

<div class="fixed bottom-3 right-3 flex gap-2">
    <Button on:click={handleSubmit} color="blue" size="lg">
        <PapperPlaneOutline class="rotate-45 w-8 h-8 translate-x-[4px] translate-y-[-4px]"/>
    </Button>
</div>