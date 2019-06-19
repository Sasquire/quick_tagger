const local = {
	settings_name: 'quick_tag_settings',
	get: () => {
		$l('Loading storage object');
		try {
			const stored = localStorage.getItem(local.settings_name) || '{}';
			const obj = JSON.parse(stored);
			$l('Storage object loaded');
			return obj;
		} catch(e) {
			$e('Problem loading storage object');
			throw e;
		}
	},
	set: (obj) => {
		$l('Setting storage object');
		try {
			const str = JSON.stringify(obj)
			localStorage.setItem(local.settings_name, str);
			$l('Storage object saved');
		} catch(e) {
			$e('Problem saving storage object');
			throw e;
		}
	},
	names: () => Object.keys(local.get()),
	save_current: () => {
		$l('Saving current settings');
		const name = $d('settings_name').value;
		if(name == '') {
			$e('You must supply a setting name');
		} else if(local.names().includes(name)) {
			$e('Name is already taken');
		} else {
			$l('Loading settings from memory')
			const all_settings = local.get();

			$l('Getting current settings')
			all_settings[name] = settings.get();

			$l('Resaving settings');
			local.set(all_settings);

			$e(`Settings saved as ${name}`);
		}
	},
	save_userinfo: async () => {
		$l('Saving user info with GM.setValue');
		await GM.setValue('username', $d('username_info').value);
		await GM.setValue('api_key', $d('apikey_info').value);
		$l('Saved user info');
	}
}

const settings = {
	load_from_storage: (name) => {
		$l(`Loading settings named ${name}`);
		const opts = local.get()[name];
		if(opts == undefined){
			$e(`No setting named ${name}`);
		} else {
			$l('Updating settings with object');
			settings.set(opts);
		}
	},
	load_from_input: () => {
		$l('Loading settings from input string');
		const opts = $d('settings_import').value;
		if(opts == null || opts == ''){
			return $e('No option string found');
		}
		try {
			$l('Attempting to set based on settings string');
			settings.set(JSON.parse(opts));
			$l('New settings loaded');
		} catch(e) {
			$e('Invalid settings string');
			throw e
		}
	},
	export: () => {
		$d('settings_import').value = JSON.stringify(settings.get());
	},
	fill_selector: () => {
		$l('Clearing saved settings');
		utils.clear_node($d('local_saved_settings'));

		$l('Getting names of saved settings');
		const named_nodes = local.names().map($);
		const nodes = [$('blank')].concat(named_nodes);

		$l('Setting option values');
		nodes.forEach(e => $d('local_saved_settings').appendChild(e));

		function $(name){
			const node = document.createElement('option');
			node.value = name;
			node.innerText = name;
			return node;
		}
	},
	update_selector: () => {
		$l('Setting seletor has changed')
		const name = $d('local_saved_settings').value;
		$l(`Selector has value of ${name}`);
		if(name != 'blank'){
			settings.load_from_storage(name);
		} else {
			$l('Setting settings to default');
			settings.set({
				submit: '?',
				next: '?',
				previous: '?',
				query: '',
				rules: []
			})
		}
	},
// {"submit":"Enter","next":"ArrowRight","previous":"ArrowLeft","query":"-none_pictured -solo -duo -group","rules":[{"tags_to_add":"none_pictured","keycode":"n"},{"tags_to_add":"solo","keycode":"s"},{"tags_to_add":"duo","keycode":"d"},{"tags_to_add":"group","keycode":"g"}]}
	set: (obj) => {
		const $ = (id, prop, text) => $d(id)[prop] = text;
		$l('Updating UI to have new settings');
		$l(obj);

		$('submit_button_keycode', 'innerText', obj.submit);
		$('next_button_keycode', 'innerText', obj.next);
		$('previous_button_keycode', 'innerText', obj.previous);
		$('search', 'value', obj.query);
		$c('tag_rule').forEach(e => e.parentNode.removeChild(e));
		obj.rules.forEach((e, i) => {
			settings.add_blank_tag();
			$(`rule_${i}_tags`, 'value', e.tags_to_add);
			$(`rule_${i}_keycode`, 'innerText', e.keycode);
		});
		api.search().then(e => api.switch_to_post(api.posts[0].id));
	},
	get: () => ({
		submit: $d('submit_button_keycode').innerText,
		next: $d('next_button_keycode').innerText,
		previous: $d('previous_button_keycode').innerText,
		query: $d('search').value,
		rules: $c('tag_rule').map(e => ({
			tags_to_add: e.querySelector('input.rule_tags').value,
			keycode: e.querySelector('.setting_button').innerText
		}))
	}),
	rules_off: () => {
		// $l('Turning all rules off');
		$c('tag_rule').forEach(e => {
			e.setAttribute('data-activated', false)
			$q('input[type=checkbox]', e)[0].checked = false;
		})
	},
	tags_to_add: () => $c('tag_rule')
		.filter(e => e.getAttribute('data-activated') === 'true')
		.map(e => e.querySelector('input.rule_tags').value)
		.join(' '),
	add_blank_tag: () => {
		$l('Adding blank rule');
		const rule_count = $c('tag_rule').length;

		// insert new node
		document.getElementById('tags').appendChild(utils.html_to_node(`
			<div id="rule_${rule_count}" class="tag_rule">
				<input  id="rule_${rule_count}_applied" type="checkbox" ></input>
				<input  id="rule_${rule_count}_tags"	class="rule_tags" placeholder="tags to add"></input>
				<button id="rule_${rule_count}_keycode" class="setting_button">?</button>
			</div>`
		));

		// add listeners
		utils.rule_toggle_listener(`rule_${rule_count}`);
		utils.suppress_keybinds(`rule_${rule_count}_tags`);
		utils.setting_listener(`rule_${rule_count}_keycode`);
	}
}

const navigation = {
	submit: async () => {
		$l('Submitting this post');
		const tags_to_add = settings.tags_to_add().split(' ');
		const post_id = api.posts[api.index].id
		await api.edit_tags(post_id, tags_to_add, []);
		navigation.next();
	},
	previous: async () => {
		$l('Going to the previous post');
		api.index -= 1;
		if(api.index < 0){
			api.index = 0;
			return $l('No more posts to load. We are at the start.')
		}
		api.switch_to_post(api.posts[api.index].id);
		settings.rules_off();
	},
	next: async () => {
		$l('Going to the next post');
		api.index += 1;
		if(api.index > api.posts.length){
			return $l('No more posts to load, some should load soon')
		}
		api.switch_to_post(api.posts[api.index].id)
		settings.rules_off();
		return undefined;
	}
};

const utils = {
	suppress_keybinds: (id) => {
		const node = $d(id);
		node.addEventListener('focus', utils.text_box_on);
		node.addEventListener('blur', utils.text_box_off);
	},
	rule_toggle_listener: (id) => {
		$d(id+'_applied').addEventListener('click', () => utils.toggle_rule(id));
	},
	toggle_rule: (id) => {
		$l(`Toggling rule ${id}`);
		const node = $d(id);
		const val = node.getAttribute('data-activated') === 'true' ? true : false;
		node.querySelector('input[type=checkbox]').checked = !val;
		node.setAttribute('data-activated', !val);
	},

	post_switcher_listener: (post_id) => {
		$d(`post_${post_id}`).addEventListener('click', () => api.switch_to_post(post_id));
	},
	toggle_post: (id) => {
		const node = $d(`post_${id}`);

	},

	setting_listener: (id) => {
		const btn = $d(id);
		btn.addEventListener('click', () => {
			if(utils.waiting_for_setting){ return; } // don't set multiple at once
			$l(`Waiting for keypress to assign to ${id}`);
			utils.waiting_on();
			set_keycode('<waiting>');
			btn.blur(); // allows for arrow keys
			document.body.addEventListener('keydown', watch_key_press);
		});

		function watch_key_press(e){
			if(utils.in_text_box){ return; } // dont set if typing
			$l(`Updating ${id} with keycode ${e.key}`);
			document.body.removeEventListener('keydown', watch_key_press);
			set_keycode(e.key);
			utils.waiting_off();
		}

		var set_keycode = (msg) => $d(id).innerText = msg;
	},

	waiting_for_setting: false,
	in_text_box: false,

	set_waiting: (val) => utils.waiting_for_setting = val,
	waiting_off: () => utils.set_waiting(false),
	waiting_on: () => utils.set_waiting(true),

	set_text_box: (val) => utils.in_text_box = val,
	text_box_off: () => utils.set_text_box(false),
	text_box_on: () => utils.set_text_box(true),

	clear_node: (node) => {
		while(node.children.length > 0){
			node.removeChild(node.children[0]);
		}
	},

	html_to_node: (html) => {
		const temp_node = document.createElement('div');
		temp_node.innerHTML = html;
		return temp_node.firstElementChild;
	}
};

const api = {
	last_field_change: 0,
	page: 1,
	last_query: '------------------',
	posts: [],
	index: 0,
	query_change: () => {
		const now = new Date();
		api.last_field_change = now;
		setTimeout(() => {
			if(api.last_field_change != now){ return; }
			api.search()
		}, 1000);

	},
	search: async () => {
		const query = $d('search').value;
		if(query != api.last_query){
			api.page = 1;
			api.last_query = query;
		} else {
			api.page += 1;
		}
		const page = api.page

		$l(`Getting page ${page} for [${query}]`);
		$m(`Getting page ${page} for [${query}]\nThis could take a while`)
		const url = new URL('https://e621.net/post/index.json');
		url.searchParams.set('tags', query);
		url.searchParams.set('page', page);
		url.searchParams.set('limit', 320);

		const posts = await fetch(new Request(url))
			.then(res => {
				if(res.status != 200){
					throw new Error(`Bad status code ${res.status}`);
				} else {
					return res.text()
				}
			})
			.then(JSON.parse)
			.catch((e) => {
				$e('Something went really wrong\n' + e);
			});

		if(api.page == 1){
			api.clear_posts()
		}
		api.add_posts(posts);

		$e(`Page ${page} loaded`)
	},
	switch_to_post: (post_id) => {
		$l(`Switching big display to post ${post_id}`);

		// find post and set as selected
		const post_index = api.posts.findIndex(e => e.id == post_id);
		api.index = post_index;
		const post = api.posts[post_index]
		if(post_index == -1){
			return $e(`Something went wrong and the post #${post_id} could not be found`)
		}
		$d(`post_${post_id}`).setAttribute('data-visited', true);
		$d('quick_post_link').href = `https://e621.net/post/show/${post_id}`;
		$d('quick_post_link').innerText = post_id;

		// assign the display spot
		if(post.file_ext == 'webm'){
			$d('image').innerHTML = `<video id="webm-container" controls="" loop="true" poster="${post.sample_url}">
				<source src="${post.file_url}" type="video/webm">
			</video>`
		} else if(post.file_ext == 'swf'){
			$d('image').innerHTML = `<object>
				<param name="movie" value="${post.file_url}">
				<embed type="application/x-shockwave-flash" src="${post.file_url}" allowscriptaccess="never">
			</object>`
		} else {
			$d('image').innerHTML = `<img src="${post.file_url}">`
		}

		// if there are not enough images after this one
		// get more
		if(api.posts.length < api.index + 5){
			api.search();
		}

		// Scroll the scrollbar to this post
		$d('navigation').scrollTop = $d(`post_${post_id}`).offsetTop;
	},
	post_to_node: (post) => {
		return utils.html_to_node(`
			<div id="post_${post.id}" class="post">
				<img src="${post.preview_url}">
				<span>Post <a href="${`https://e621.net/post/show/${post.id}`}">#${post.id}</a></span>
			</div>`)
	},
	add_posts: (posts) => {
		posts.forEach(e => {
			$d('navigation').appendChild(api.post_to_node(e));
			utils.post_switcher_listener(e.id)
		})
		api.posts = api.posts.concat(posts);
	},
	clear_posts: () => {
		$l('Clearing the posts')
		api.posts = [];
		$c('post').forEach(node => node.parentNode.removeChild(node))
	},
	edit_tags: async (post_id, tags_to_add, tags_to_remove) => {
		$l(`Editing the tags of post ${post_id}. Adding [${tags_to_add.join(' ')}]. Removing [${tags_to_remove.join(' ')}]`);
		const known_tags = await api.get_tags(post_id);
		const tags = new Set(known_tags)
		tags_to_add.forEach(e => tags.add(e));
		tags_to_remove.forEach(e => tags.delete(e));
		await api.set_tags(post_id, [...tags], known_tags)
	},
	get_tags: async (post_id) => {
		$e(`Getting tags from post ${post_id}`);
		const url = `https://e621.net/post/show.json?id=${post_id}`;
		return fetch(new Request(url))
			.then(res => res.text())
			.then(JSON.parse)
			.then(e => e.tags.split(' '))
	},
	set_tags: async (post_id, tags, old_tags) => {
		$e(`Sending request to update ${post_id}`)
		const url = 'https://e621.net/post/update.json';
		const username = await GM.getValue('username');
		const api_key = await GM.getValue('api_key');

		if(username == undefined || username == '' || api_key == undefined || api_key == ''){
			return $e('Username or API key is not set');
		}

		const form = new FormData();
		form.set('id', post_id);
		form.set('post[tags]', tags.join(' '));
		form.set('post[old_tags]', old_tags.join(' '));
		form.set('login', username);
		form.set('password_hash', api_key);

		return fetch(new Request(url), {
			'method': 'POST',
			'User-Agent': `Idem's Quick-Tag-Adder, used by ${username}`,
			body: form
		}).then(async (e) => {
			if(e.status != 200){
				const error = await e.text();
				throw new Error(`Error with post ${post_id} - Status ${e.status}\n${error}`)
			}
		}).catch((e) => {
			$e('Something went really wrong\n' + e);
		});
	}
}

function handle_key_press(event){
	if(utils.waiting_for_setting || utils.in_text_box){ return; }

	$c('setting_button')
		.filter(e => e.innerText == event.key)
		.forEach(e => {switch(e.id){
			case 'submit_button_keycode': navigation.submit(); break;
			case 'next_button_keycode': navigation.next(); break;
			case 'previous_button_keycode': navigation.previous(); break;
			default: utils.toggle_rule(e.parentNode.id);
		}});
}
