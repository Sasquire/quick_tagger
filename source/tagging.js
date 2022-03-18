const utils = require('./utils.js');
const network = require('./network.js');

async function update_from_saved_templates () {
	const select = document.getElementById('tag_template_list');
	utils.clear_node(select);

	const empty_option = utils.string_to_node('<option> </option>');
	select.appendChild(empty_option);

	const templates_raw = await utils.get_value('templates');
	const templates = JSON.parse(templates_raw);
	templates.forEach((e, i) => {
		const node = utils.string_to_node(`<option>${utils.escape_html(e.name)}</option>`);
		select.appendChild(node);
	});
}

async function update_current_template (event) {
	const select = document.getElementById('tag_template_list');
	const selected = select[select.selectedIndex];
	const name = selected.innerText;
	const template = await get_template_based_on_name(name);
	clear_post();
	clear_template();
	load_template(template);
}

async function get_template_based_on_name (name) {
	const templates_raw = await utils.get_value('templates');
	const templates = JSON.parse(templates_raw);

	// Can return undefined if the name isn't found
	return templates.filter(e => e.name === name)[0];
}

function clear_template () {
	utils.clear_node(document.getElementById('tag_hotkeys'));
	utils.clear_node(document.getElementById('tag_rules'));
	utils.clear_node(document.getElementById('tag_search_string'));
	utils.clear_node(document.getElementById('post_list'));
	POST_SEARCH_ITERATOR = null;
}

let POST_SEARCH_ITERATOR = null;

async function load_some_posts () {
	const is_searching = document.getElementById('tag_sidebar').classList.contains('tag_search_loading');
	if (is_searching === false) {
		document.getElementById('tag_sidebar').classList.add('tag_search_loading');

		if (POST_SEARCH_ITERATOR === null) {
			const api = await utils.get_api();
			const search = Array.from(document.getElementById('tag_search_string').children)
				.map(e => e.innerText)
				.join(' ');
			POST_SEARCH_ITERATOR = api.post_search_iterator(search);
		}

		for (let i = 0; i < 100; i++) {
			const { value } = await POST_SEARCH_ITERATOR.next();
			const node = make_small_post_node(value);
			document.getElementById('post_list').appendChild(node);
		}

		document.getElementById('tag_sidebar').classList.remove('tag_search_loading');
	}
}

function load_template (template) {
	if (template !== undefined) {
		load_search_string();
		load_hotkeys();
		load_rules();
		load_some_posts(); // async
	}

	function load_search_string () {
		const searches = template.query.split(' ')
			.filter(e => e)
			.map(e => utils.escape_html(e))
			.map(e => `<span>${e}</span>`)
			.map(e => utils.string_to_node(e));
		for (const child of searches) {
			document.getElementById('tag_search_string').appendChild(child);
		}
	}

	function load_hotkeys () {
		for (const child of Array.from(make_hotkeys(template).children)) {
			document.getElementById('tag_hotkeys').appendChild(child);
		}
	}

	function load_rules () {
		for (const rule of template.rules.map(e => make_rule_node(e))) {
			document.getElementById('tag_rules').appendChild(rule);
		}
	}

	function make_rule_node (rule) {
		const rule_node = utils.string_to_node(`
			<div class="tag_rule">
				<button class="tag_rule_button">${utils.escape_html(rule.keycode)}</button>	
				<label>
				<input type="checkbox"">
					${utils.escape_html(rule.tags_to_add)}
				</input>
			</div>
		`);

		rule_node.querySelector('button').addEventListener('click', e => {
			const checkbox = rule_node.querySelector('input');
			checkbox.checked = !checkbox.checked;
		});

		return rule_node;
	}

	function make_hotkeys (template) {
		const node = utils.string_to_node(`
			<div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_upvote_button">${utils.escape_html(template.upvote)}</button>
					<span><s>Upvote</s></span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_favorite_button">${utils.escape_html(template.favorite)}</button>
					<span><s>Favorite</s></span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_downvote_button">${utils.escape_html(template.downvote)}</button>
					<span><s>Downvote</s></span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_previous_button">${utils.escape_html(template.previous)}</button>
					<span>Previous</span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_submit_button">${utils.escape_html(template.submit)}</button>
					<span>Submit</span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_next_button">${utils.escape_html(template.next)}</button>
					<span>Next</span>
				</div>
			</div>
		`);

		add_listener('#tag_upvote_button', upvote_current_post);
		add_listener('#tag_favorite_button', favorite_current_post);
		add_listener('#tag_downvote_button', downvote_current_post);
		add_listener('#tag_previous_button', view_previous_post);
		add_listener('#tag_submit_button', submit_current_changes);
		add_listener('#tag_next_button', view_next_post);

		function add_listener (query, response) {
			node.querySelector(query).addEventListener('click', response);
		}

		return node;
	}
}

function clear_post () {
	utils.clear_node(document.getElementById('post_info_id'));
	document.getElementById('post_info_is_approved').textContent = '';
	document.getElementById('post_info_is_flagged').textContent = '';
	document.getElementById('post_info_file_type').textContent = '';
	utils.clear_node(document.getElementById('tag_main'));
	// Clear Rules
	Array.from(document.getElementsByClassName('tag_rule'))
		.map(e => e.querySelector('input'))
		.forEach(e => (e.checked = false));
}

function load_post (post_node) {
	// eslint-disable-next-line no-unused-expressions
	document.querySelector('.post_selected')?.classList.remove('post_selected');
	post_node.classList.add('post_selected');
	post_node.classList.add('post_visited');

	// Load Post Info
	document.getElementById('post_info_id').appendChild(utils.string_to_node(`
		<a href="https://e621.net/posts/${post_node.dataset.post_id}">${post_node.dataset.post_id}</a>
	`));
	document.getElementById('post_info_is_approved').textContent = post_node.dataset.is_approved;
	document.getElementById('post_info_is_flagged').textContent = post_node.dataset.is_flagged;
	document.getElementById('post_info_file_type').textContent = post_node.dataset.file_type;

	// Load Image
	const img_container = document.getElementById('tag_main');
	const file_type = post_node.dataset.file_type;
	if (['png', 'jpg', 'gif'].includes(file_type)) {
		img_container.appendChild(utils.string_to_node(`<img src="${post_node.dataset.full_file}"/>`));
	} else if (['webm'].includes(file_type)) {
		const video_node = utils.string_to_node(`
			<video controls playsinline autoplay muted src="${post_node.dataset.full_file}"></video<
		`);
		img_container.appendChild(video_node);
	} else if (['swf'].includes(file_type)) {
		// TODO tell the user that flash is not supported
	} else {
		// TODO new file types that are not supported
	}
}

function make_small_post_node (post) {
	const node = utils.string_to_node(`
		<div class="post_small">
			<img src="${post.preview.url}"/>
		</div>
	`);
	node.dataset.post_id = post.id;
	node.dataset.is_approved = post.flags.pending === false;
	node.dataset.is_flagged = post.flags.flagged;
	node.dataset.file_type = post.file.ext;
	node.dataset.full_file = post.file.url;
	node.addEventListener('click', () => {
		clear_post();
		load_post(node);
	});
	return node;
}

function upvote_current_post () {

}

function favorite_current_post () {

}

function downvote_current_post () {

}

function view_previous_post () {
	const selected = document.querySelector('.post_selected');
	if (selected !== null) {
		const previous = selected.previousElementSibling;
		if (previous !== null) {
			clear_post();
			load_post(previous);
			previous.scrollIntoView();
		}
	}
}

function view_next_post () {
	const selected = document.querySelector('.post_selected');
	if (selected !== null) {
		const next = selected.nextElementSibling;
		if (next !== null) {
			clear_post();
			load_post(next);
			next.scrollIntoView();
		}

		let this_one = next;
		for (let i = 0; i < 5; i++) {
			if (this_one === null) {
				load_some_posts();
				break;
			} else {
				this_one = this_one.nextElementSibling;
			}
		}
	}
}

async function submit_current_changes () {
	const post_id = parseInt(document.getElementById('post_info_id').innerText, 10);
	if (Number.isNaN(post_id) === false) {
		const edit_string = Array.from(document.getElementsByClassName('tag_rule'))
			.map(e => e.querySelector('input'))
			.filter(e => e.checked === true)
			.map(e => e.parentNode.innerText)
			.reduce((acc, e) => `${acc} ${e}`, '')
			.split(' ')
			.filter(e => e)
			.join(' ');

		await network.add({
			post_id: post_id,
			edit_string: edit_string,
			from_disk: false,
			complete: false,
			timestamp: new Date().getTime()
		});

		view_next_post();
	}
}

module.exports = {
	update_from_saved_templates: update_from_saved_templates,
	update_current_template: update_current_template
};
