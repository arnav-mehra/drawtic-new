<script>
    import { Button, Card, Label, P, Pagination, Textarea } from "flowbite-svelte";
    import { ChevronLeftOutline, ChevronRightOutline } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let prompt = "";
    
    const RESULTS_PER_PAGE = 4;
    let all_suggestions = [
        "My name is slim shady",
        "That part in Morbius where he said \"Its Morbin time\" and proceeded to Morb.",
        "I dont know what is going on. Help me."
    ];
    let page = 0;

    $: shown_suggestions = all_suggestions.slice(page * 4, (page + 1) * 4);
    $: num_pages = Math.ceil(all_suggestions.length / RESULTS_PER_PAGE);
    $: pages = new Array(num_pages).fill().map((x, i) => ({ name: i }));

    $: console.log({prompt})

    onMount(() => {
        for (let i = 0; i < 2; i++) {
            all_suggestions.push(...all_suggestions);
        }
        all_suggestions = all_suggestions;
    });

    const handleSubmit = () => {

    };
</script>

<Textarea
    placeholder="Enter your prompt here..."
    bind:value={prompt}
/>

<div
    class="mt-2 w-full p-2
    flex flex-col items-center bg-white
    border-white border-[1px] border-solid rounded-xl"
>
    <P size="md" class="font-bold">
        Suggested Prompts
    </P>

    <div class="my-1 text-start">
        {#each shown_suggestions as ps}
            <hr class="border-solid border-gray-200 my-1" />
            <button
                class="w-full rounded-lg text-black text-left"
                on:click={e => prompt = e.target.innerHTML}
            >
                {ps}
            </button>
        {/each}
        <hr class="border-solid border-gray-200 my-1" />
    </div>

    <Pagination
        {pages}
        large
        class="bg-transparent"
        on:previous={() => page = (page + num_pages - 1) % num_pages}
        on:next={() => page = (page + 1) % num_pages}
        on:click={e => page = Number(e.target.innerHTML)}
    >
        <svelte:fragment slot="prev">
            <span class="sr-only">Previous</span>
            <ChevronLeftOutline class="w-2.5 h-2.5" />
        </svelte:fragment>
        <svelte:fragment slot="next">
            <span class="sr-only">Next</span>
            <ChevronRightOutline class="w-2.5 h-2.5" />
        </svelte:fragment>
    </Pagination>
</div>

<Button
    class="w-full mt-2"
    on:click={handleSubmit}
    size="lg"
>
    Submit
</Button>