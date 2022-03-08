<script>
	import { session } from '$app/stores';

	import Counter from '$lib/Counter.svelte';
	import { enhance } from '$lib/form';

	export let count;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<img src="svelte-welcome.png" alt="Welcome" />
		</div>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

	<Counter {count} />

	<div class="username">
		<form
			action="/"
			method="post"
			use:enhance={{
				skipInvalidate: true,
				result: ({ data }) => {
					session.set({ username: data.get('username') });
				}
			}}
		>
			<input type="text" name="username" value={$session.username} />
			<button type="submit">Set Username</button>
		</form>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	.username {
		margin-top: 44px;
	}

	.username input {
		border: 0;
		background-color: transparent;
		border-bottom: 1px solid cyan;
		padding: 0.66rem 0.3rem;
	}

	.username input:focus {
		outline: none;
		border-bottom-color: blue;
	}

	.username button {
		background-color: blue;
		color: #fff;
		border: 0;
		padding: 0.66rem 0.5rem;
		transition: all 0.3s ease-in-out;
	}

	.username button:hover {
		background-color: purple;
	}
</style>
