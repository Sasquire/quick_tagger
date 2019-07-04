/* eslint-disable no-undef */
const navigation = {
	submit: async () => {
		$l('Submitting this post');

		const post_id = api.current_id();
		const { to_add, to_del } = rules.tag_changes();
		history.add(post_id, to_add, to_del);
		await api.edit_tags(post_id, to_add, to_del);

		navigation.next();
	},

	previous: async () => {
		$l('Going to the previous post');

		api.index -= 1;
		if(api.index < 0){
			api.index = 0;
			$l('No more posts to load. We are at the start.');
		} else {
			navigation.switch_to_post(api.current_id());
		}
		$l('');
	},

	next: async () => {
		$l('Going to the next post');

		api.index += 1;
		if(api.index > api.posts.length){
			api.index = api.posts.length - 1;
			$l('No more posts to load, some should load soon');
		} else {
			navigation.switch_to_post(api.current_id());
		}
		$l('');
	},

	switch_to_post: (post_id) => {
		$l(`Switching big display to post ${post_id}`);

		// Find post and set as selected
		const post_index = api.posts.findIndex(e => e.id == post_id);
		api.index = post_index;
		const post = api.posts[post_index];
		if(post_index == -1){
			return $e(`Error: post #${post_id} could not be found`);
		}
		$d(`post_${post_id}`).setAttribute('data-visited', true);

		rules.rules_off();

		api.display_image(post.file_ext, post.file_url, post.sample_url);

		// If there are not enough images after this one get more
		if(api.posts.length < api.index + 5){
			api.search();
		}

		// Scroll the scrollbar to this post
		$d('navigation').scrollTop = $d(`post_${post_id}`).offsetTop - 80;
		return undefined;
	}
};
