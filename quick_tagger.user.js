// ==UserScript==
// @name         e621 quick tagger
// @description  Custom page for quickly tagging sets of tags

// @namespace   http://tampermonkey.net/
// @version     1.00002

// @author      Sasquire

// @match       http://e621.net/extensions/quick_tag
// @match       https://e621.net/extensions/quick_tag

// @grant       GM_addStyle
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

// Init is run at bottom of script


// Todo 
// multi button hotkeys, for example
//   mm for m/m, mf for m/f, so on
//   sf for solo_focus, df for duo focus
// 
// save edit history
//   useful for going back and seeing what you've changed
//   would it be better to use localstorage or GM.setValue
// 
// apply tags on post load
//   if a post already has say male when it is loaded
//   highlight the male box, so users do not highlight it a second time
//   could be bad because then they turn the rule off.
//   but maybe make that not remove the rule.
// 
// get flash to work correctly
//   I didn't find it worth my time to get it working well
// 
// allow blacklist
//   I figure if you want to use this, you don't care about blacklist
//   but someone will want this feature, because i hope this
//   tool doesnt fall into obscurity
// 
// update post navigation
//   automatically scroll the thing when new posts are loaded
// 
// actually have pretty css
//   I don't into colors, so make a nice grayscale one
//   Just change all my bad decisions into good ones

// Getting elements, used because they get lengthy
function $d(id, node = document){
	return node.getElementById(id);
}

function $c(classname, node = document){
	return Array.from(node.getElementsByClassName(classname));
}

function $q(options, node = document){
	return Array.from(node.querySelectorAll(options));
}

// Logging, because its more useful to have good messages
function $e(message){
	$l(message);
	$m(message);
}

function $l(message){
	console.log(message);
}

function $m(message){
	document.getElementById('message_box').innerText = message;
}

// Add event listener to id with action and function
function $el(id, action, func){
	const node = $d(id) || document.body;
	node.addEventListener(action, func);
}


/* eslint-disable no-undef */
const local = {
	settings_name: 'quick_tag_settings',

	// Get the object of settings
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

	// Set the object of settings
	set: (obj) => {
		$l('Setting storage object');
		try {
			const str = JSON.stringify(obj);
			localStorage.setItem(local.settings_name, str);
			$l('Storage object saved');
		} catch(e) {
			$e('Problem saving storage object');
			throw e;
		}
	},

	// Names of settings
	names: () => Object.keys(local.get()),

	// Add current settings to storage
	save_current: () => {
		const name = $d('settings_name').value;
		$l(`Saving current settings as ${name}`);

		if(name == '') {
			$e('You must supply a setting name');
		} else if(local.names().includes(name)) {
			$e('Name is already taken');
		} else {
			$l('Loading settings from memory');
			const all_settings = local.get();

			$l('Getting current settings');
			all_settings[name] = settings.get();

			$l('Re-saving settings');
			local.set(all_settings);

			$e(`Settings saved as ${name}`);
		}
	},

	// Delete based on box
	delete_name: () => {
		const name = $d('settings_name').value;
		$l(`Deleting settings called ${name}`);

		if(name == '') {
			$e('You must supply a setting name');
		} else if(local.names().includes(name) == false) {
			$e(`No setting named ${name}`);
		} else {
			$l('Loading settings from memory');
			const all_settings = local.get();

			$l('Deleting current settings');
			delete all_settings[name];

			$l('Re-saving settings');
			local.set(all_settings);

			$e(`Setting named ${name} deleted`);
		}
	},

	save_userinfo: async () => {
		$l('Saving user info with GM.setValue');
		await GM.setValue('username', $d('username_info').value);
		await GM.setValue('api_key', $d('apikey_info').value);
		$l('Saved user info');
	}
};

/* eslint-disable no-undef */

// Testing settings string
// {"submit":"Enter","next":"ArrowRight","previous":"ArrowLeft","query":"-zero_pictured -solo -duo -group","rules":[{"tags_to_add":"zero_pictured","keycode":"z"},{"tags_to_add":"solo","keycode":"s"},{"tags_to_add":"duo","keycode":"d"},{"tags_to_add":"group","keycode":"g"}]}

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

	// Loads settings based on string
	load_from_input: () => {
		$l('Loading settings from input string');
		const opts = $d('settings_import').value;
		if(opts === null || opts == ''){
			return $e('No option string found');
		}

		try {
			$l('Attempting to set based on settings string');
			settings.set(JSON.parse(opts));
			$l('New settings loaded');
			return undefined;
		} catch(e) {
			$e('Invalid settings string');
			throw e;
		}
	},

	// Exports by setting a box to a string
	export: () => {
		$d('settings_import').value = JSON.stringify(settings.get());
	},

	// Creates the selection node for choosing saved elements
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

	// Called when the selector is updated. Will update settings
	update_selector: () => {
		const name = $d('local_saved_settings').value;
		$l(`Selector has changes and now has value of ${name}`);

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
			});
		}
	},

	// Sets UI based on settings object {
	//   submit:   '',
	//   next:     '',
	//   previous: '',
	//   query:    '',
	//   rules:    [
	//     {tags_to_add: '', keycode: ''},
	//     {tags_to_add: '', keycode: ''},
	//     ...
	//   ]}
	set: (obj) => {
		const $ = (id, prop, text) => ($d(id)[prop] = text);
		$l('Updating UI to have new settings');
		$l(obj);

		$('submit_button_keycode', 'innerText', obj.submit);
		$('next_button_keycode', 'innerText', obj.next);
		$('previous_button_keycode', 'innerText', obj.previous);
		$('search', 'value', obj.query);
		api.search().then(e => api.switch_to_post(api.posts[0].id));

		// Remove current rules
		$c('tag_rule').forEach(e => e.parentNode.removeChild(e));

		// Add new rules
		obj.rules.forEach((e, i) => {
			settings.add_blank_tag();
			$(`rule_${i}_tags`, 'value', e.tags_to_add);
			$(`rule_${i}_keycode`, 'innerText', e.keycode);
		});
	},

	// Returns the current settings as a setting object
	get: () => ({
		submit: $d('submit_button_keycode').innerText,
		next: $d('next_button_keycode').innerText,
		previous: $d('previous_button_keycode').innerText,
		query: $d('search').value,

		rules: $c('tag_rule').map(e => ({
			tags_to_add: $q('input.rule_tags', e).value,
			keycode: $q('.setting_button', e).innerText
		}))
	}),

	// Turns all the rules off
	rules_off: () => {
		$c('tag_rule').forEach(e => {
			e.setAttribute('data-activated', false);
			$q('input[type=checkbox]', e)[0].checked = false;
		});
	},

	// Gets the changes from the rules
	tag_changes: () => {
		return $c('tag_rule')
			.filter(e => e.getAttribute('data-activated') === 'true')
			.map(e => $q('input.rule_tags', e).value)
			.map(e => e.split(' '))
			.reduce((acc, e) => ({
				to_add: [...acc.to_add, ...(e.filter(t => t.charAt(0) != '-'))],
				to_del: [...acc.to_del, ...(e.filter(t => t.charAt(0) == '-'))]
			}), {
				to_add: [],
				to_del: []
			});
	},

	// Adds a blank tag to the tag listing
	add_blank_tag: () => {
		$l('Adding blank rule');
		const rule_count = $c('tag_rule').length;

		// Insert new node
		document.getElementById('tags').appendChild(utils.html_to_node(`
			<div id="rule_${rule_count}" class="tag_rule">
				<input
					id="rule_${rule_count}_applied"
					type="checkbox"
				></input>
				
				<input
					id="rule_${rule_count}_tags"
					class="rule_tags"
					placeholder="tags to add"
				></input>
				
				<button
					id="rule_${rule_count}_keycode"
					class="setting_button"
				>?</button>
			</div>
		`));

		// Add listeners
		utils.rule_toggle_listener(`rule_${rule_count}`);
		utils.suppress_keybinds(`rule_${rule_count}_tags`);
		utils.setting_listener(`rule_${rule_count}_keycode`);
	}
};

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

/* eslint-disable no-undef */
const utils = {
	// Will change a global that says when the user is in a
	// textbox. This is because you can't use hotkeys
	// while you are in a textbox
	suppress_keybinds: (idnode) => {
		// Idnode could be a string or a html node.
		// Makes things a little confusing to use, but helpful to have
		const node = (typeof idnode == 'string') ? $d(idnode) : idnode;
		node.addEventListener('focus', text_box_on);
		node.addEventListener('blur', text_box_off);

		// Toggles for being in a text box
		function text_box_on(){ utils.in_text_box = true; }
		function text_box_off(){ utils.in_text_box = false; }
	},

	// Given an id adds an eventlistener to toggle the rule on click
	rule_toggle_listener: (id) => {
		$el(`${id}_applied`, 'click', () => utils.toggle_rule(id));
	},

	// Toggles a rule with a given id
	toggle_rule: (id) => {
		$l(`Toggling rule ${id}`);
		// Get current value
		const node = $d(id);
		const val = node.getAttribute('data-activated') === 'true';

		// Update rule
		node.querySelector('input[type=checkbox]').checked = !val;
		node.setAttribute('data-activated', !val);
	},

	// Adds an eventlistener to a node for when its clicked
	post_switcher_listener: (post_id) => {
		$el(`post_${post_id}`, 'click', () => api.switch_to_post(post_id));
	},

	toggle_post: (id) => {
		// ?
	},

	// Turns a button into a setting button
	// This means that when the button is clicked
	// it waits for some input before it will update its innerText
	setting_listener: (id) => {
		const btn = $d(id);
		btn.addEventListener('click', () => {
			if(utils.waiting_for_setting){ return; } // Don't set multiple at once
			$l(`Waiting for keypress to assign to ${id}`);
			set_keycode('<waiting>');
			btn.blur(); // Allows for arrow keys
			document.body.addEventListener('keydown', watch_key_press);

			utils.waiting_for_setting = true;
		});

		function watch_key_press(e){
			if(utils.in_text_box){ return; } // Dont set if typing in text_box
			$l(`Updating ${id} with keycode ${e.key}`);
			document.body.removeEventListener('keydown', watch_key_press);
			set_keycode(e.key);

			utils.waiting_for_setting = false;
		}

		function set_keycode(msg){ $d(id).innerText = msg; }
	},

	waiting_for_setting: false,
	in_text_box: false,

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
		$d('quick_post_link').href = `https://e621.net/post/show/${post_id}`;
		$d('quick_post_link').innerText = post_id;

		api.display_image(post.file_ext, post.file_url, post.sample_url);

		// If there are not enough images after this one get more
		if(api.posts.length < api.index + 5){
			api.search();
		}

		// Scroll the scrollbar to this post
		$d('navigation').scrollTop = $d(`post_${post_id}`).offsetTop;
		return undefined;
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
	}
};




/* █████ █   █ █████ █████
     █   ██  █   █     █
     █   █ █ █   █     █
     █   █  ██   █     █
   █████ █   █ █████   █   */

(() => {
	function clear_node(node){
		while(node.children.length > 0){
			node.removeChild(node.children[0]);
		}
	}

	function remove_toJSON(){
		// This gave me a lot of greif. e621 changes the toJSON
		// methods and creates not optimal JSON.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
		delete Object.prototype.toJSON;
		delete Date.prototype.toJSON;
		delete String.prototype.toJSON;
		delete Array.prototype.toJSON;
		delete Number.prototype.toJSON;

		// Kira I don't know what this did, but it gave me errors. So I removed it.
		// eslint-disable-next-line no-undef
		jQuery.event.dispatch = () => '';
	}

	clear_node(document.head);
	clear_node(document.body);
	remove_toJSON();
})();

GM_addStyle(`body, body > * {
	padding: 0px;
	margin: 0px;
}
#main {
	height: 100vh;
	display: grid;
	grid-template-columns: 190px auto 200px;
	grid-template-rows: 75px auto;
}
#navigation {
	grid-column: 1 / 1;
	grid-row: 2 / 3;
	background-color:red;
	overflow-y: scroll;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
}
#settings {
	grid-column: 1 / 4;
	grid-row: 1 / 1;
	display: flex;
	justify-content: space-between;
	background-color:green;
}
#image {
	grid-column: 2 / 2;
	grid-row: 2 / 3;
	background-color:blue;
}

#setting_option { margin-right: 3em; }
#settings > * { margin-right: auto; }

#tags {
	grid-column: 3 / 3;
	grid-row: 2 / 3;
	display: flex;
	flex-direction: column;
	background-color:orange;
}
.tag_rule {
	padding: 10px 0px;
	display: flex;
}
#add_blank_rule { margin-bottom: 10px; }
.tag_rule > .rule_tags { width: 0px; flex-grow: 1; }
.tag_rule[data-activated=true] { background-color: red; }


#search {
	align-self: baseline;
	width: 95%;
}
.post {
	 border: 1px solid black;
	 padding: 0.25rem;
	 margin: 0.25rem;
	 width: 90%;
	 display: flex;
	 flex-direction: column;
}
.post > img { align-self: center; }
.post, .post > a, .post > a:visited { color: blue; }
.post[data-visited=true] { background-color: orange; }

#image {
	display:flex;
}
#image > * {
	max-width: 90%;
	max-height: 90%;
	margin: auto;
	align-self: center;
}
#quick_post_link {
	display: block;
	position: absolute;
	top: 75px;
	left: 190px;
	color: white;
}

.setting_button {
	background-color: lightcyan;
	border: none;
	border-radius: 0.3rem;
	color: darkblue;
}
.rule_tags {
	border: none;
	background-color: #fff8;
}
.tag_rule {
	color:red;
}
`);

document.body.innerHTML = `<div id="main">
	<div id="settings">
		<div id="setting_selects">
			<select id="setting_option">
				<option value="load">Load from disk</option>
				<option value="import">Import/Export</option>
				<option value="save">Save to disk</option>
				<option value="delete">Delete from disk</option>
				<option value="userinfo">Set user info</option>
			</select>
			<div id="setting_load">
				<span>Using Settings</span>
				<select id="local_saved_settings">
					<option value="">Blank</option>
				</select>
			</div>
			<div id="setting_import">
				<button id="settings_export_button">Export</button>
				<button id="settings_import_button">Import</button>
				<input id="settings_import" placeholder="Input settings string"></input>
			</div>
			<div id="setting_save">
				<button id="save_settings">Save</button>
				<span>as</span>
				<input id="settings_name" placeholder="settings name"></input>
			</div>
			<div id="setting_delete">
				<button id="delete_settings">Delete</button>
				<span>the setting named</span>
				<input id="setting_name_to_delete" placeholder="setting name"></input>
			</div>
			<div id="setting_userinfo">
				<button id="update_userinfo">Update</button>
				<input id="username_info" placeholder="username"></input>
				<input id="apikey_info" placeholder="api key"></input>
			</div>
		</div>
		<div class="nav_buttons">
			<div>
				<button id="previous_button">Previous Post</button>
				<button id="previous_button_keycode" class="setting_button">?</button>
			</div><div>
				<button id="submit_button">Submit</button>
				<button id="submit_button_keycode" class="setting_button">?</button>
			</div><div>
				<button id="next_button">Next Post</button>
				<button id="next_button_keycode" class="setting_button">?</button>
			</div>
		</div>
		<div>
			<span id="message_box">If this changes theres an error</span>
		</div>
	</div>
	<!-- End top section-->

	<div id="navigation">
		<input id="search" placeholder="search query"></input>
	</div>
	
	<div id="image"></div>

	<div id="tags">
		<button id="add_blank_tag">Add a blank rule</button>
	</div>
	
	<!-- Is an aboslute elem-->
	<a id="quick_post_link"></a>
</div>`;

// Things get defined elsewhere, so its fine.
/* eslint-disable no-undef */
(() => {
	// Drop-down menu to switch between functions
	$el('setting_option', 'change', change_setting_menu);
	change_setting_menu(); // Run the command once to init

	$el('add_blank_tag', 'click', settings.add_blank_tag); // Blank tag button

	$el(undefined, 'keydown', handle_key_press); // Watch for hotkey press

	// Allow clicking buttons to submit, next, and previous
	$el('submit_button', 'click', navigation.submit);
	$el('next_button', 'click', navigation.next);
	$el('previous_button', 'click', navigation.previous);
	// Turn the buttons into setting listeners
	['submit', 'next', 'previous']
		.map(e => `${e}_button_keycode`)
		.forEach(utils.setting_listener);

	settings.fill_selector(); // Load settings from memory and display
	$el('local_saved_settings', 'change', settings.update_selector); // Watch for update

	// update userinfo button
	$el('update_userinfo', 'click', local.save_userinfo);

	// Handle importing saving of settings
	$el('save_settings', 'click', local.save_current);
	$el('settings_import_button', 'click', settings.load_from_input);
	$el('settings_export_button', 'click', settings.export);

	// Suppress keybinds when in text field
	Array.from(document.getElementsByTagName('input'))
		.map(e => e.id)
		.forEach(utils.suppress_keybinds);

	// Detect when query has changed and update search results
	$el('search', 'input', api.query_change);

	function change_setting_menu(){
		const select = $d('setting_option');
		const value = select.value;
		$l(`Switching settings to display ${value}`);
		$q('div', select.parentNode).forEach(e => (e.style.display = 'none'));
		$d(`setting_${value}`).style.display = 'inline';
	}

	function handle_key_press(event){
		if(utils.waiting_for_setting || utils.in_text_box){
			return;
		}

		$c('setting_button')
			.filter(e => e.innerText == event.key)
			.forEach(e => pressed(e));
	}

	function pressed(node){
		switch (node.id) {
			case 'submit_button_keycode': navigation.submit(); break;
			case 'next_button_keycode': navigation.next(); break;
			case 'previous_button_keycode': navigation.previous(); break;
			default: utils.toggle_rule(node.parentNode.id);
		}
	}
})();

