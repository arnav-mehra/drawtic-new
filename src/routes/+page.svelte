<script>
    import { onMount } from 'svelte';
    import { ButtonGroup, Button, Input } from 'flowbite-svelte';
    import logo from '$lib/assets/logo.png';
    import NotifManager from '$lib/stores/notif-manager';

    let welcome_opacity = 0;
    let start_opacity = 0;

    onMount(() => {
        const ts = [
            setTimeout(() => welcome_opacity = 1, 1000),
            setTimeout(() => welcome_opacity = 0, 3000),
            setTimeout(() => start_opacity = 1, 5000),
        ];

        NotifManager.queue.subscribe(
            x => console.log(x))

        return () => ts.forEach(clearTimeout);
    });
</script>

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
        font-size: 18px;
        transition: opacity 2.0s;
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
        max-width: 400px;
        margin-bottom: 30px;
    }
</style>

<div id="container">
    <div id="welcome" style={`opacity: ${welcome_opacity}`}>
        Welcome to...
    </div>

    <div id="start" style={`opacity: ${start_opacity}`}>
        <div id="logo">
            <img id="logo-img" src={logo} alt="oh no"/>
        </div>

        <div class="flex">
            <ButtonGroup size="md" class="mr-1">
                <Input
                    id="input-addon-md"
                    type="text"
                    class="w-40"
                    placeholder="Enter Lobby Code"
                />
                <Button size="md" color="purple">
                    Join
                </Button>
            </ButtonGroup>
            <ButtonGroup size="md">
                <Button size="md" color="purple">
                    Create
                </Button>
            </ButtonGroup>
        </div>
    </div>
</div>