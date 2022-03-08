/// <reference types="@sveltejs/kit" />

interface Todo {
	uid: string;
	text: string;
	done: boolean;
}

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		session: import('svelte-kit-cookie-session').Session<{ todos: Todo[] }>;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}
}
