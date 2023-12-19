<script>
    import { userStore } from '../../stores/user';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        if (!$userStore) {
            goto('/login')
        }
    })
</script>

<div>
    <div>
        Navbar
    </div>
    
    <slot/>
</div>