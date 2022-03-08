/// <reference types="@sveltejs/kit" />

interface Todo {
	uid: string;
	text: string;
	done: boolean;
	pending_delete?: boolean;
}

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		session: import('svelte-kit-cookie-session').Session<{ todos: Todo[], count: number, username: string; }>;
	}

	// interface Platform {}

	interface Session {
		username: string;
	}

	// interface Stuff {}
}
