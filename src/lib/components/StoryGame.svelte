<script lang="ts">
	import CharacterSelection from './CharacterSelection.svelte';
	import StoryGameplay from './StoryGameplay.svelte';
	import { type Character } from '$lib/characters';

	const { goBack } = $props<{
		goBack: () => void;
	}>();

	let selectedCharacter: Character | null = $state(null);

	function handleCharacterSelected(character: Character) {
		selectedCharacter = character;
	}

	function handleChangeCharacter() {
		selectedCharacter = null;
	}
</script>

{#if selectedCharacter === null}
	<CharacterSelection characterSelected={handleCharacterSelected} {goBack} />
{:else}
	<StoryGameplay character={selectedCharacter} {goBack} changeCharacter={handleChangeCharacter} />
{/if}
