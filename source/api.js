/* eslint-disable no-undef */
const api = {
	// Some globals for this
	last_field_change: 0, // Date for updating after typing stoped
	page: 1, // Page of results
	last_query: '------------------', // Last query to know if download new page
	posts: [], // Posts found from the current search
	index: 0, // Index in the posts array

	// Called every time the query is changed, will update search
	// results if it has been after a delay
	query_change: () => {
		const now = new Date();
		api.last_field_change = now;
		setTimeout(conditional_update, 1000); // Check back in 1 second

		function conditional_update(){
			if(api.last_field_change == now){
				api.search();
			}
		}
	},

	// Will search for results given the query and get a new page if needed
	search: async () => {
		// Find out if this is a new query or not
		const query = $d('search').value;
		if(query != api.last_query){
			api.page = 1;
			api.last_query = query;
			api.clear_posts();
		} else {
			api.page += 1;
		}

		// Load results from the query
		const posts = await api.get_search_results(query, api.page);
		api.add_posts(posts);

		$e(`Page ${api.page} loaded`);
	},

	// Sends a query to e621 based off of the query
	get_search_results: async (query, page) => {
		$m(`Getting page ${page} for [${query}]\nThis could take a while`);
		const url = new URL('https://e621.net/post/index.json');
		url.searchParams.set('tags', query);
		url.searchParams.set('page', page);
		url.searchParams.set('limit', 320);

		const res = await fetch(new Request(url));
		const text = await res.text();
		if(res.status != 200){
			$e(`Bad status code ${res.status}\n${text}`);
			throw new Error(`Bad status code ${res.status}\n${text}`);
		} else {
			const data = JSON.parse(text);
			return data;
		}
	},

	display_image: (file_ext, file_url, sample_url) => {
		// Todo find a better way to write this html.
		// It looks so funky because I try and keep
		// my lines under 80 characters wide

		if(file_ext == 'webm'){
			$d('image').innerHTML = `
			<video
				id="webm-container"
				controls=""
				loop="true"
				poster="${sample_url}"
			>
				<source src="${file_url}" type="video/webm">
			</video>`;
		} else if(file_ext == 'swf') {
			$d('image').innerHTML = `
			<object>
				<param name="movie" value="${file_url}">
				<embed
					type="application/x-shockwave-flash"
					src="${file_url}"
					allowscriptaccess="never"
				>
			</object>`;
		} else {
			$d('image').innerHTML = `<img src="${file_url}">`;
		}

		$d('image').setAttribute('data-file_type', file_ext);
	},

	// Takes an e621 post_obj and makes a DOM node
	post_to_node: (post) => {
		const link = `https://e621.net/post/show/${post.id}`;
		const node = utils.html_to_node(`
		<div id="post_${post.id}" class="post">
			<img src="${post.preview_url}">
			<span>Post <a href="${link}">#${post.id}</a></span>
		</div>`);

		return node;
	},

	// Adds posts to the left hand side
	add_posts: (posts) => {
		posts.forEach(e => {
			$d('navigation').appendChild(api.post_to_node(e));
			utils.post_switcher_listener(e.id);
		});
		api.posts = api.posts.concat(posts);
	},

	// Clears the stored posts, and the posts on the left hand side.
	clear_posts: () => {
		$l('Clearing the posts');
		api.posts = [];
		$c('post').forEach(node => node.parentNode.removeChild(node));
	},

	// Will edit the tags of a post, getting the current tags
	// sending the request and all that good stuff.
	edit_tags: async (post_id, tags_to_add, tags_to_remove) => {
		const adding_str = `Adding [${tags_to_add.join(' ')}]`;
		const remove_str = `Removing [${tags_to_remove.join(' ')}]`;
		$l(`Editing the tags of post ${post_id}. ${adding_str}. ${remove_str}`);
		const known_tags = await api.get_tags(post_id);

		// Edit tags
		const tags = new Set(known_tags);
		tags_to_add.forEach(e => tags.add(e));
		tags_to_remove.forEach(e => tags.delete(e));

		await api.set_tags(post_id, [...tags], known_tags);
	},

	// Get tags for a specific post_id
	get_tags: async (post_id) => {
		$e(`Getting tags from post ${post_id}`);
		const url = `https://e621.net/post/show.json?id=${post_id}`;
		return fetch(new Request(url))
			.then(res => res.text())
			.then(JSON.parse)
			.then(e => e.tags.split(' '));
	},

	// Set tags to a post
	set_tags: async (post_id, tags, old_tags) => {
		$e(`Sending request to update ${post_id}`);
		const url = 'https://e621.net/post/update.json';
		const username = await GM.getValue('username');
		const api_key = await GM.getValue('api_key');

		// I'm not sure what the values normally are
		const no_username = username == undefined || username == '';
		const no_api_key = api_key == undefined || api_key == '';
		if(no_username || no_api_key){
			$e('Username or API key is not set');
			return undefined;
		}

		const form = new FormData();
		form.set('id', post_id);
		form.set('post[tags]', tags.join(' '));
		form.set('post[old_tags]', old_tags.join(' '));
		form.set('login', username);
		form.set('password_hash', api_key);

		const result = await fetch(new Request(url), {
			method: 'POST',
			'User-Agent': `Idem's Quick-Tag-Adder, used by ${username}`,
			body: form
		});
		const text = await result.text();

		if(result.status != 200){
			$e(`Error with post ${post_id} - Status ${e.status}\n${text}`);
		}

		return undefined;
	},

	current_id: () => api.posts[api.index].id
};
