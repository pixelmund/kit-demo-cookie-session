import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession({ secret: 'USE_A_ENVIRONMENT_KEY_32_CHARS_OR_LONGER' });
