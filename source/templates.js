const utils = require('./utils.js');

const DEFAULT_UNBOUND_STRING = 'Unbound';
const DEFAULT_TEMPLATE_NAME = 'Untitled Template';

function apply_settings_listener (node) {
	node.addEventListener('click', event => {
		node.innerText = '<press a key>';
		node.blur(); // Allows for arrow keys
		document.body.addEventListener('keyup', watch_key_press);

		function watch_key_press (e) {
			document.body.removeEventListener('keyup', watch_key_press);
			node.innerText = utils.parse_keycode(e.key);
		}
	});
}

function create_blank_rule () {
	const node = utils.string_to_node(`
		<div class="rule">
			<button
				class="keybind_button"
			>${DEFAULT_UNBOUND_STRING}</button>	
			<input
				class="rule_tag_string"
				placeholder="tag string to apply"
			></input>
			<button class="rule_delete">Delete Rule</button>
		</div>
	`);

	node.querySelector('.rule_delete').addEventListener('click', e => {
		node.parentNode.removeChild(node);
	});

	apply_settings_listener(node.querySelector('.keybind_button'));

	return node;
}

function create_blank_template (id) {
	const node = utils.string_to_node(`
		<div class="template" id="template_${id}">
			<div>Template Name</div>
			<input class="template_name" placeholder="Template Name" value="${DEFAULT_TEMPLATE_NAME} ${id}"></input>
			<hr/>
			<div>Template Search String</div>
			<input class="template_search" placeholder="Search String"></input>		
			<hr/>
			<div>
				<button class="keybind_button template_upvote_button">${DEFAULT_UNBOUND_STRING}</button>	
				<span>Upvote</button>
			</div><div>
				<button class="keybind_button template_favorite_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Favorite</span>
			</div><div>
				<button class="keybind_button template_downvote_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Downvote</span>
			</div>
			<hr/>
			<div>
				<button class="keybind_button template_previous_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Previous Post</span>
			</div><div>
				<button class="keybind_button template_submit_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Submit</span>
			</div><div>
				<button class="keybind_button template_next_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Next Post</span>
			</div>
			<hr/>
			<div class="template_rules">
				<button class="template_new_rule">New Rule</button>
			</div>
		</div>
	`);

	node.querySelector('.template_new_rule').addEventListener('click', e => {
		node.querySelector('.template_rules').append(create_blank_rule());
	});

	apply_settings_listener(node.querySelector('.template_upvote_button'));
	apply_settings_listener(node.querySelector('.template_favorite_button'));
	apply_settings_listener(node.querySelector('.template_downvote_button'));
	apply_settings_listener(node.querySelector('.template_previous_button'));
	apply_settings_listener(node.querySelector('.template_submit_button'));
	apply_settings_listener(node.querySelector('.template_next_button'));

	node.querySelector('.template_name').addEventListener('change', e => update_template_name_in_list(node));

	return node;
}

function update_template_name_in_list (node) {
	// not using get_current_template_and_option() becuase it *could* give the wrong node
	const id = parseInt((/template_(\d+)/gm).exec(node.id)[1], 10);
	const select = document.getElementById('template_list');
	const option = select.querySelector(`#template_list_template_${id}`);
	option.innerText = node.querySelector('.template_name').value;
}

function select_template (id) {
	for (const node of document.getElementsByClassName('template')) {
		node.classList.add('hidden');
	}

	document.getElementById(`template_${id}`).classList.remove('hidden');
	document.getElementById(`template_list_template_${id}`).selected = true;
}

function list_selection_changed () {
	const selection_node = document.getElementById('template_list');
	const option_node = selection_node[selection_node.selectedIndex];
	select_template(option_node.value);
}

function add_blank_template () {
	const id = new_template_id();
	const node = create_blank_template(id);
	node.classList.add('hidden');

	document.getElementById('template_main').append(node);

	document.getElementById('template_list').prepend(
		utils.string_to_node(`<option value="${id}" id="template_list_template_${id}">${DEFAULT_TEMPLATE_NAME} ${id}</option>`)
	);

	select_template(id);

	return node;

	function new_template_id () {
		let max = 0;
		for (const node of document.getElementsByClassName('template')) {
			const id = parseInt((/template_(\d+)/gm).exec(node.id)[1], 10);
			if (max < id) {
				max = id;
			}
		}

		for (const node of document.getElementById('template_list').children) {
			const id = parseInt(node.value, 10);
			if (max < id) {
				max = id;
			}
		}

		return max + 1;
	}
}

function template_to_json (node) {
	return {
		name: node.querySelector('.template_name').value,
		query: node.querySelector('.template_search').value,
		upvote: node.querySelector('.template_upvote_button').innerText,
		downvote: node.querySelector('.template_downvote_button').innerText,
		favorite: node.querySelector('.template_favorite_button').innerText,
		previous: node.querySelector('.template_previous_button').innerText,
		next: node.querySelector('.template_next_button').innerText,
		submit: node.querySelector('.template_submit_button').innerText,
		rules: Array.from(node.querySelectorAll('.rule')).map(e => ({
			// tags_to_add is old terminology from v1. It can accept minus signs
			tags_to_add: e.querySelector('.rule_tag_string').value,
			keycode: e.querySelector('.keybind_button').innerText
		}))
	};
}

function add_json_as_template (json) {
	const node = add_blank_template();

	selective_set(node.querySelector('.template_name'), 'value', json.name);
	selective_set(node.querySelector('.template_search'), 'value', json.query);
	selective_set(node.querySelector('.template_upvote_button'), 'innerText', json.upvote);
	selective_set(node.querySelector('.template_downvote_button'), 'innerText', json.downvote);
	selective_set(node.querySelector('.template_favorite_button'), 'innerText', json.favorite);
	selective_set(node.querySelector('.template_previous_button'), 'innerText', json.previous);
	selective_set(node.querySelector('.template_next_button'), 'innerText', json.next);
	selective_set(node.querySelector('.template_submit_button'), 'innerText', json.submit);

	for (let i = 0; i < json.rules.length; i++) {
		node.querySelector('.template_new_rule').click();
	}
	Array.from(node.querySelectorAll('.rule')).forEach((e, i) => {
		// tags_to_add is old terminology from v1. It can accept minus signs
		selective_set(e.querySelector('.rule_tag_string'), 'value', json.rules[i].tags_to_add);
		selective_set(e.querySelector('.keybind_button'), 'innerText', json.rules[i].keycode);
	});

	update_template_name_in_list(node);

	return node;

	function selective_set (node, setting, value) {
		if (value) {
			node[setting] = value;
		}
	}
}

function export_current_template () {
	const { template } = get_current_template_and_option();
	const json = template_to_json(template);
	const json_string = JSON.stringify(json);
	document.getElementById('templates_export_string').value = json_string;
}

function import_template () {
	const raw_json = document.getElementById('templates_import_string').value;
	const json = JSON.parse(raw_json);
	add_json_as_template(json);
}

async function save_all_templates () {
	// TODO on save reload the tag tab template and template list
	const all_loaded_templates = Array.from(document.getElementsByClassName('template'))
		.map(e => template_to_json(e));

	const template_string = JSON.stringify(all_loaded_templates);
	await utils.set_value('templates', template_string);
}

function delete_current_template () {
	const { template, option } = get_current_template_and_option();
	template.parentNode.removeChild(template);
	option.parentNode.removeChild(option);
	list_selection_changed();
}

async function clear_and_load_all_templates () {
	utils.clear_node(document.getElementById('template_list'));
	utils.clear_node(document.getElementById('template_main'));

	utils.get_value('templates')
		.then(e => JSON.parse(e))
		.then(e => e.forEach(e => add_json_as_template(e)));
}

function get_current_template_and_option () {
	const select = document.getElementById('template_list');
	const option = select[select.selectedIndex];
	const id = option.value;
	const template = document.getElementById(`template_${id}`);
	return {
		template: template,
		option: option
	};
}

module.exports = {
	add_blank_template: add_blank_template,
	list_selection_changed: list_selection_changed,
	clear_and_load_all_templates: clear_and_load_all_templates,
	delete_current_template: delete_current_template,
	save_all_templates: save_all_templates,
	import_template: import_template,
	export_current_template: export_current_template
};
