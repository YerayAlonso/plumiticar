<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import confetti from 'canvas-confetti';

	let selectedNumber: number | null = null;
	let currentMultiplier = 1;
	let userInput = '';
	let completedOperations: Array<{ multiplier: number; result: number }> = [];
	let isCorrect: boolean | null = null;
	let inputRef: HTMLInputElement | null = null;

	function ref(node: HTMLInputElement) {
		inputRef = node;
		return {
			destroy() {
				inputRef = null;
			}
		};
	}

	function selectNumber(num: number) {
		selectedNumber = num;
		currentMultiplier = 1;
		completedOperations = [];
		userInput = '';
		isCorrect = null;
		// Darle foco al input después de un breve momento para asegurar que está renderizado
		setTimeout(() => {
			inputRef?.focus();
		}, 0);
	}

	function checkAnswer() {
		if (!selectedNumber) return;

		const correctAnswer = selectedNumber * currentMultiplier;
		const userAnswer = parseInt(userInput);

		isCorrect = userAnswer === correctAnswer;

		if (isCorrect) {
			completedOperations = [
				...completedOperations,
				{ multiplier: currentMultiplier, result: correctAnswer }
			];

			if (currentMultiplier === 10) {
				// Tabla completada - lanzar confeti
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 }
				});
			} else {
				currentMultiplier++;
			}
			userInput = '';
		}

		inputRef?.focus();
	}
</script>

<div class="container mx-auto p-4">
	{#if !selectedNumber}
		<h1 class="mt-6 text-center text-2xl font-semibold">
			Practica les Taules de <s>Plumiticar</s> Multiplicar!
		</h1>
		<h2 class="my-10 text-center text-xl">Escull un nombre per practicar la seva taula:</h2>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-5">
			{#each Array(10) as _, i}
				<Button
					variant="outline"
					size="lg"
					class="h-24 cursor-pointer text-3xl"
					onclick={() => selectNumber(i + 1)}
				>
					{i + 1}
				</Button>
			{/each}
		</div>
	{:else}
		<div class="mx-auto max-w-2xl">
			<Button variant="outline" class="mb-4 cursor-pointer" onclick={() => (selectedNumber = null)}>
				← Escollir una altra taula
			</Button>

			<Card class="p-6">
				<h2 class="mb-4 text-2xl font-bold">Taula del {selectedNumber}</h2>

				{#if completedOperations.length > 0}
					<div class="mx-auto mb-6 space-y-2">
						{#each completedOperations as op}
							<div class="text-xl">
								{selectedNumber} × {op.multiplier} = {op.result}
							</div>
						{/each}
					</div>
				{/if}

				{#if completedOperations.length === 10}
					<div class="mt-6 text-center text-2xl font-bold text-green-600">
						Felicitats! Has completat la taula del {selectedNumber}!
					</div>
				{:else}
					<div class="mt-4 space-y-4">
						<div class="text-center text-2xl">
							{selectedNumber} × {currentMultiplier} = ?
						</div>
						<div class="flex justify-center gap-4">
							<input
								type="number"
								name="answer"
								bind:value={userInput}
								use:ref
								placeholder="Escriu la resposta"
								class="flex h-10 w-44 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 {isCorrect ===
								false
									? 'border-red-500'
									: ''}"
								onkeydown={(e) => e.key === 'Enter' && checkAnswer()}
							/>
							<Button onclick={checkAnswer} class="cursor-pointer">Comprovar</Button>
						</div>
						{#if isCorrect === false}
							<p class="text-red-500">Torna-ho a intentar!</p>
						{/if}
					</div>
				{/if}
			</Card>
		</div>
	{/if}
</div>
