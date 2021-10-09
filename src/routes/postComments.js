import { getPostComments, saveNewComment } from '../data/dataManager.js';

const getComments = (request, response) => {
	const postId = Number(request.params.id);

	response.send(getPostComments(postId));
};

const addNewComment = (request, response) => {
	const postId = Number(request.params.id);
	response.send(saveNewComment(postId, request.body));
};

const postComments = {
	getComments,
	addNewComment,
	route: '/posts/:id/comments',
};

export default postComments;
