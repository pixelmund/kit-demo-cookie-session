import { redirect } from '$lib/redirect';
import { v4 as uuid } from '@lukeed/uuid';

/**
 * @type {import('./').RequestHandler}
 */
export const get = async ({ locals }) => {
	return {
		// @ts-ignore
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
		todos: [todo, ...todos]
	};

	return {
		body: {}
	};
};

export const patch = async ({ request, locals }) => {
	const form = await request.formData();

	/**
	 * @type {Todo[]}
	 */
	let todos = locals.session.data?.todos ?? [];
	const todoIndex = todos.findIndex((todo) => todo.uid === form.get('uid'));

	if (todoIndex == null) {
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

	return redirect(request, '/todos');
};

export const del = async ({ request, locals }) => {
	const form = await request.formData();

	/**
	 * @type {Todo[]}
	 */
	let todos = locals.session.data?.todos ?? [];
	todos = todos.filter((todo) => todo.uid !== form.get('uid'));

	locals.session.data = {
		todos
	};

	return redirect(request, '/todos');
};
