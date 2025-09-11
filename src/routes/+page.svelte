<script lang="ts">
	import GameModeSelection from '$lib/components/GameModeSelection.svelte';
	import TablesGame from '$lib/components/TablesGame.svelte';
	import StoryGame from '$lib/components/StoryGame.svelte';

	let selectedMode: 'taules' | 'historia' | null = null;

	function handleModeSelection(mode: 'taules' | 'historia') {
		selectedMode = mode;
	}

	function handleGoBack() {
		selectedMode = null;
	}
</script>

{#if selectedMode === null}
	<GameModeSelection modeSelected={handleModeSelection} />
{:else if selectedMode === 'taules'}
	<TablesGame goBack={handleGoBack} />
{:else if selectedMode === 'historia'}
	<StoryGame goBack={handleGoBack} />
{/if}
