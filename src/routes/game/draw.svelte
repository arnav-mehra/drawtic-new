<script>
    import { Button } from "flowbite-svelte";
    import { CameraFotoOutline, PapperPlaneOutline, UndoOutline } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let videoRef;
    let photoRef;
    let canvasRef;
    let tookPhoto = false;

    onMount(() => {
        navigator.mediaDevices
                 .getUserMedia({ video: true })
                 .then(handleStream)
                 .catch(handleError);
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
        console.log("submit not impl")
    };
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<!-- svelte-ignore a11y-img-redundant-alt -->

<div class="w-full mb-2 pointer-events-none ">
    <video
        bind:this={videoRef}
        hidden={tookPhoto}
        class="w-full"
    />
    <canvas
        bind:this={canvasRef}
        hidden
        class="w-full"
    />
    <img
        bind:this={photoRef}
        alt="Unable to load image."
        class="w-full"
        hidden={!tookPhoto}
    />
</div>

<div class="flex w-full">
    {#if tookPhoto}
        <Button
            on:click={undoPhoto}
            class="w-full mr-2"
        >
            <UndoOutline/>
        </Button>
        <Button
            on:click={submitPhoto}
            color="blue"
        >
            <PapperPlaneOutline class="rotate-45 mb-1 ml-1"/>
        </Button>
    {:else}
        <Button
            on:click={takePhoto}
            class="w-full"
        >
           <CameraFotoOutline/>
        </Button>
    {/if}
</div>
