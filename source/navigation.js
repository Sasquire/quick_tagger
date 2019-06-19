/* eslint-disable no-undef */
const navigation = {
	submit: async () => {
		$l('Submitting this post');
		const tags_to_add = settings.tags_to_add().split(' ');
		const post_id = api.posts[api.index].id;
		await api.edit_tags(post_id, tags_to_add, []);
		navigation.next();
	},
	previous: async () => {
		$l('Going to the previous post');
		api.index -= 1;
		if(api.index < 0){
			api.index = 0;
			return $l('No more posts to load. We are at the start.');
		}
		api.switch_to_post(api.posts[api.index].id);
		settings.rules_off();
		return undefined;
	},
	next: async () => {
		$l('Going to the next post');
		api.index += 1;
		if(api.index > api.posts.length){
			return $l('No more posts to load, some should load soon');
		}
		api.switch_to_post(api.posts[api.index].id);
		settings.rules_off();
		return undefined;
	}
};
