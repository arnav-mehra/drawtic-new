<script>
    import { CloseButton, Toast } from "flowbite-svelte";
    import { CheckCircleSolid, CloseCircleSolid, ExclamationCircleSolid, FireOutline } from 'flowbite-svelte-icons';
    import NotifManager from '$lib/stores/notif-manager';
    
    const STATUS_ICONS = {
        "success": [ "green",  CheckCircleSolid ],
        "warning": [ "yellow", ExclamationCircleSolid ],
        "hot":     [ "orange", FireOutline ],
        "error":   [ "red",    CloseCircleSolid ]
    };
    
    const notifs = NotifManager.queue;
    const show = NotifManager.show;

    $: notif = $notifs.length ? $notifs[0] : null;
    $: status = notif?.status;
    $: [ status_color, status_icon ] = STATUS_ICONS[status] || STATUS_ICONS["error"];
</script>

<div
    class="fixed w-full flex justify-center transition-transform duration-300"
    style={`transform: translateY(${$show ? 5 : -80}px);`}
>
    <Toast class="w-fit" color={status_color}>
        <svelte:component
            this={status_icon}
            slot="icon"
        />
        
        {notif?.msg}

        <CloseButton
            slot="close-button"
            on:click={e => {
                e.stopPropagation();
                NotifManager.pop();
            }}
        />
    </Toast>
</div>