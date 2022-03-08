import { v4 as uuid } from '@lukeed/uuid';

/**
 * @typedef {{ uid: string, text: string, done: boolean}} Todo
 */

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async ({ locals }) => {
	return {
		body: {
			todos: locals.session.data?.todos ?? []
		}
	};
};

export const post = async ({ request, locals }) => {
	const form = await request.formData();

	/**
	 * @type {Todo[]}
	 */
	let todos = locals.session.data?.todos ?? [];

	/**
	 * @type {Todo}
	 */
	const todo = {
		uid: uuid(),
		text: form.get('text'),
		done: false
	};

	locals.session.data = {
		todos: [...todos, todo]
	};

	return {
		body: {
			todo
		}
	};
};

// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
const redirect = {
	status: 303,
	headers: {
		location: '/todos'
	}
};

export const patch = async ({ request, locals }) => {
	const form = await request.formData();

	/**
	 * @type {Todo[]}
	 */
	let todos = locals.session.data?.todos ?? [];
	const todoIndex = todos.findIndex((todo) => todo.uid === form.get('uid'));

	if (!todoIndex) {
		return {
			status: 404
		};
	}

	const todo = todos[todoIndex];
	todo.text = form.has('text') ? form.get('text') : todo.text;
	todo.done = form.has('done') ? !!form.get('done') : todo.done;

	todos[todoIndex] = todo;

	locals.session.data = {
		todos
	};

	return redirect;
};

export const del = async ({ request, locals }) => {
	const form = await request.formData();

	/**
	 * @type {Todo[]}
	 */
	let todos = locals.session.data?.todos ?? [];
	todos = todos.filter((todo) => todo.uid === form.get('uid'));

	locals.session.data = {
		todos
	};

	return redirect;
};
