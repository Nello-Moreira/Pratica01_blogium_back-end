import fs from 'fs';

const postsDataPath = './data/posts.json';
const commentsDataPath = './data/comments.json';

const getStoredPosts = () => {
	if (!fs.existsSync(postsDataPath)) {
		return [];
	}
	return JSON.parse(fs.readFileSync(postsDataPath));
};

const getSingleStoredPost = postId =>
	getStoredPosts().filter(post => post.id === postId)[0];

const savePostData = newPostData => {
	const allPosts = getStoredPosts();
	allPosts.push(newPostData);
	fs.writeFileSync(postsDataPath, JSON.stringify(allPosts));
};

const getPostComments = postId => {
	if (!fs.existsSync(commentsDataPath)) {
		return [];
	}
	const allComments = JSON.parse(fs.readFileSync(commentsDataPath));

	return allComments.filter(comment => comment.postId === postId);
};

const saveNewComment = newComment => {
	let allComments = [];

	if (fs.existsSync(commentsDataPath)) {
		allComments = JSON.parse(fs.readFileSync(commentsDataPath));
	}
	allComments.push(newComment);

	fs.writeFileSync(commentsDataPath, JSON.stringify(allComments));
};

export {
	getStoredPosts,
	getSingleStoredPost,
	savePostData,
	getPostComments,
	saveNewComment,
};
