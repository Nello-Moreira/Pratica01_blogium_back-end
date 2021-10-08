import { getPostComments } from '../data/dataManager.js';

const getComments = (request, response) => {
	const postId = Number(request.params.id);

	response.send(getPostComments(postId));
};

const postComments = {
	getComments,
	route: '/posts/:id/comments',
};

export default postComments;
