<script>
    import { Card, Listgroup, Indicator, Button, P } from "flowbite-svelte";
    import { onMount } from "svelte";
    import GameManager from "../../lib/stores/game-manager";
    
    const gameStore = GameManager.data;

    let lobbyList = [
        {
            nickname: 'you',
            name: 'cybercrime: the last code bender',
            color: 'yellow',
        },
        {
            nickname: 'nando',
            name: 'nand-only circuits',
            color: 'blue',
        },
        {
            nickname: 'rn-graph',
            name: 'react native graph visualizer',
            color: 'red',
        },
        {
            nickname: 'a-stack',
            name: 'arnav\'s shitty web framework',
            color: 'green',
        }
    ];
    $: canStart = lobbyList.length >= 3;
    
    onMount(() => {
        const unsub = gameStore.subscribe(() => {
            // lobbyList = GameManager.getLobbyList();
        });

        return () => unsub();
    });
</script>

<Card padding="xl" size="md" class="w-96">
    <div class="flex justify-between items-center mb-4">
        <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
            Lobby Members
        </h5>
        {lobbyList.length}/8
    </div>

    <Listgroup items={lobbyList} let:item class="border-0 dark:!bg-transparent">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <Indicator
                color={item.color}
                size="xl"
            />
            <div class="flex-1 min-w-0">
                <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                    {item.nickname}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {item.name}
                </p>
            </div>
        </div>
    </Listgroup>

    {#if lobbyList.length < 3}
        <P class="text-red-500 mt-2" size="xs">
            The game requires at least 3 players to start.
        </P>
    {/if}
</Card>

<Button
    color="blue"
    class="w-96"
    checked={!canStart}
>
    Start
</Button>