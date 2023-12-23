<script>
    import { onMount } from 'svelte';
    import { ButtonGroup, Button, Input, P } from 'flowbite-svelte';
    import Logo from '../lib/assets/logo.png';
    import GameManager from '../lib/stores/game-manager';

    let welcome_opacity = 0;
    let start_opacity = 0;

    let lobbyId = "";

    const actions = {
        createLobby: () => {
            GameManager.createLobby();
        },
        joinLobby: () => {
            GameManager.joinLobby(lobbyId);
        }
    };

    onMount(() => {
        const ts = [
            setTimeout(() => welcome_opacity = 1, 500),
            setTimeout(() => welcome_opacity = 0, 2000),
            setTimeout(() => start_opacity = 1, 4000),
        ];

        return () => ts.forEach(clearTimeout);
    });
</script>

<div id="container">
    <div id="welcome" style={`opacity: ${welcome_opacity}`}>
        <P size="xl" color="white">
            Welcome to...
        </P>
    </div>

    <div id="start" style={`opacity: ${start_opacity}`}>
        <div id="logo">
            <img id="logo-img" src={Logo} alt="oh no"/>
        </div>

        <div class="flex">
            <ButtonGroup size="lg" class="mr-1">
                <Input
                    id="input-addon-md"
                    type="text"
                    class="w-44"
                    placeholder="Enter Lobby Code"
                    bind:value={lobbyId}
                />
                <Button
                    size="lg" color="purple" 
                    on:click={actions.joinLobby}
                >
                    Join
                </Button>
            </ButtonGroup>
            
            <ButtonGroup size="lg">
                <Button
                    size="lg" color="purple"
                    on:click={actions.createLobby}
                >
                    Create
                </Button>
            </ButtonGroup>
        </div>
    </div>
</div>

<style>
    #container {
        width: 100vw;
        height: 100vh;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    #welcome {
        position: absolute;
        transition: opacity 1.5s;
    }

    #start {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: opacity 1.0s;
    }

    #logo {
        max-width: 500px;
        margin-bottom: 20px;
    }
</style>