<script>
    import { onMount } from "svelte";
    import { Button, P } from "flowbite-svelte";
    import { CameraFotoOutline, PapperPlaneOutline, UndoOutline } from "flowbite-svelte-icons";
    import GameManager from "../../lib/stores/game-manager";
    
    const SRC_MAX_HEIGHT = "100vh - 98px - 27px * 2 - 0.75rem * 5";

    let videoRef;
    let photoRef;
    let canvasRef;
    let tookPhoto = false;
    let drawingPrompt = "";

    onMount(() => {
        navigator.mediaDevices
                 .getUserMedia({ video: true })
                 .then(handleStream)
                 .catch(handleError);
        drawingPrompt = GameManager.getDrawingPrompt();
    });

    const handleStream = (stream) => {
        videoRef.srcObject = stream;
        videoRef.play();
    };

    const handleError = (err) => {
        console.log({err});
    };

    const takePhoto = () => {
        const canvasCtx = canvasRef.getContext("2d");
        const { width, height } = videoRef.srcObject.getTracks()[0].getSettings();
        canvasRef.width = width;
        canvasRef.height = height;
        canvasCtx.drawImage(videoRef, 0, 0, canvasRef.width, canvasRef.height);
        photoRef.src = canvasRef.toDataURL("image/png");
        tookPhoto = true;
    };

    const undoPhoto = () => {
        tookPhoto = false;
    };

    const submitPhoto = () => {
        GameManager.submitPhoto(photoRef.src);
    };
</script>

<P color="white" size="lg">
    Prompt: {drawingPrompt}
</P>

<div class="pointer-events-none w-full flex flex-col items-center">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
        bind:this={videoRef}
        hidden={tookPhoto}
        class="w-full"
        style="max-height: calc({SRC_MAX_HEIGHT})"
    />
    <canvas
        bind:this={canvasRef}
        hidden
        class="w-full"
    />
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
        bind:this={photoRef}
        alt="Unable to load image."
        hidden={!tookPhoto}
        class="w-full"
        style="max-height: calc({SRC_MAX_HEIGHT})"
    />
</div>

<div class="fixed bottom-3 right-3 flex gap-2">
    {#if tookPhoto}
        <Button on:click={undoPhoto} size="lg">
            <UndoOutline class="w-8 h-8"/>
        </Button>
        <Button on:click={submitPhoto} color="blue" size="lg">
            <PapperPlaneOutline class="rotate-45 w-8 h-8 translate-x-[4px] translate-y-[-4px]"/>
        </Button>
    {:else}
        <Button on:click={takePhoto} size="lg">
           <CameraFotoOutline class="w-8 h-8"/>
        </Button>
    {/if}
</div>