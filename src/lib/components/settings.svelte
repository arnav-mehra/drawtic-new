<script>
    import { SpeedDial, SpeedDialButton } from 'flowbite-svelte';
    import { ShareNodesSolid, PrintSolid, DownloadSolid, FileCopySolid, ArrowRightFromBracketSolid, UserSettingsSolid, CogOutline } from 'flowbite-svelte-icons';
</script>

<SpeedDial
    defaultClass="absolute end-3 bottom-3"
    pill={false}
    color="purple"
>
    <CogOutline
        slot="icon"
        class="w-8 h-8 transition-transform hover:rotate-45 duration-300"
    />
    <SpeedDialButton name="Share">
        <ShareNodesSolid class="w-5 h-5" />
    </SpeedDialButton>
    <SpeedDialButton name="Leave Game">
        <ArrowRightFromBracketSolid class="w-5 h-5" />
    </SpeedDialButton>
</SpeedDial>