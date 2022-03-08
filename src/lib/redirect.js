// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
export const redirect = (request, to = '') => {
	if (request.headers.get('accept').includes('application/json')) {
		return {
			body: {}
		}
	}

	return {
		status: 303,
		headers: {
			location: to
		}
	};
}