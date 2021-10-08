import { getSingleStoredPost } from '../data/dataManager.js';

const getPost = (request, response) => {
	const postId = Number(request.params.id);

	response.send(getSingleStoredPost(postId));
};

const singlePost = {
	getPost,
	route: '/posts/:id',
};

export default singlePost;
