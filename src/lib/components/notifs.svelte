<script>
    import { CloseButton, Toast } from "flowbite-svelte";
    import { CheckCircleSolid, CloseCircleSolid, ExclamationCircleSolid, FireOutline } from 'flowbite-svelte-icons';
    import NotifManager from '$lib/stores/notif-manager';
    
    const STATUS_ICONS = [ CheckCircleSolid, ExclamationCircleSolid, FireOutline, CloseCircleSolid ];
    const STATUS_COLORS = [ "green", "yellow", "orange", "red" ]
    
    const notifs = NotifManager.queue;
    const show = NotifManager.show;

    $: notif = $notifs.length ? $notifs[0] : null;
    $: status = notif?.status || 0;
    $: StatusIcon = STATUS_ICONS[status];
    $: colorIcon = STATUS_COLORS[status];
</script>

<div
    class="fixed w-full flex justify-center transition-transform duration-300"
    style={`transform: translateY(${$show ? 5 : -80}px);`}
>
    <Toast class="w-fit">
        <svelte:component
            this={StatusIcon}
            slot="icon"
            color={colorIcon}
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