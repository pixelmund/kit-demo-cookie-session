import { redirect } from '$lib/redirect';

export const get = ({ locals }) => {
    return {
        body: {
            count: locals.session.data?.count ?? 0
        }
    }
}

export const post = async ({ locals, request }) => {
    const formData = await request.formData();
    const sessionData = locals.session.data ?? { count: 0, todos: [], username: '' };

    const username = formData.get('username');

    locals.session.data = {
        ...sessionData,
        username
    }

    return redirect(request, '/');
}

/**
 * @type {import('./').RequestHandler}
 */
export const patch = ({ locals, url }) => {
    const sessionData = locals.session.data ?? { count: 0, todos: [], username: '' };
    let count = sessionData.count;

    const type = url.searchParams.get('type');

    if (type === 'increment') {
        count = count + 1;
    } else {
        count = count - 1;
    }

    locals.session.data = {
        ...sessionData,
        count
    }

    return {
        body: {
            count
        }
    }
}