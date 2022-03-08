import { handleSession } from 'svelte-kit-cookie-session';

/**
 * @type {import('@sveltejs/kit').GetSession}
 */
export const getSession = ({ locals }) => {
    return {
        username: locals.session.data?.username ?? ''
    }
}

export const handle = handleSession({ secret: 'USE_A_ENVIRONMENT_KEY_32_CHARS_OR_LONGER' });
