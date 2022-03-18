const Settings = require('./../dependencies/extensions.js');
const utils = require('./utils.js');
const main_css = require('./main.css');
const main_html = require('./main.html');

const templates = require('./templates.js');
const network = require('./network.js');
const tagging = require('./tagging.js');

if (['/extensions/', '/extensions'].includes(location.pathname)) {
	init_settings();
} else if (['/extensions/quick_tagger', '/extensions/quick_tagger/'].includes(location.pathname)) {
	init_page();
}

function init_page () {
	utils.clear_node(document.body);
	utils.clear_node(document.head);
	utils.add_css(main_css);
	utils.node_append(document.body, utils.string_to_node(main_html));

	init_template_tab();
	init_network_tab();
	init_tagging();

	do_stuff();

	document.body.addEventListener('keydown', handle_hotkeys);

	utils.get_value('network_delay').then(e => {
		setInterval(network.make_one_post_edit_from_queue, e * 1000);
	});
}

function init_template_tab () {
	utils.listener('templates_new', 'click', templates.add_blank_template);
	utils.listener('template_list', 'change', templates.list_selection_changed);
	utils.listener('templates_export_current', 'click', templates.export_current_template);
	utils.listener('templates_import', 'click', templates.import_template);
	utils.listener('templates_save', 'click', templates.save_all_templates);
	utils.listener('templates_delete_current', 'click', templates.delete_current_template);
	utils.listener('templates_reload', 'click', templates.clear_and_load_all_templates);
	templates.clear_and_load_all_templates();
}

function init_network_tab () {
	network.load_save_local();
	network.load_edit_live();
	network.check_if_api_key_is_set();
	utils.listener('network_add_local', 'click', network.add_saved_changes);
	utils.listener('network_save_local', 'change', network.update_save_local);
	utils.listener('network_edit_live', 'change', network.update_edit_live);
	utils.listener('network_export', 'click', network.export_saved_data);
	utils.listener('network_delete', 'click', network.delete_saved_data);
}

function init_tagging () {
	utils.listener('tag_template_list', 'change', tagging.update_current_template);
	tagging.update_from_saved_templates();
}

function do_stuff () {
	const select = document.getElementById('setting_option');
	select.addEventListener('change', e => {
		const option = select[select.selectedIndex];
		Array.from(document.getElementById('main').children)
			.forEach(e => e.classList.add('hidden'));
		document.getElementById(`${option.value}_tab`).classList.remove('hidden');
	});
}

function handle_hotkeys (event) {
	const tag_page_is_hidden = document.getElementById('tag_tab').classList.contains('hidden');
	if (tag_page_is_hidden === false) {
		const rules = Array.from(document.getElementsByClassName('tag_rule'));
		const hotkeys = Array.from(document.getElementsByClassName('tag_hotkey'));
		const used_nodes = []
			.concat(rules)
			.concat(hotkeys)
			.map(e => ({
				element: e,
				button: e.querySelector('button'),
				keycode: e.querySelector('button').innerText,
				checkbox: e.querySelector('input')
			}))
			.filter(e => e.keycode === event.key);

		used_nodes
			.map(e => e.checkbox)
			.filter(e => e)
			.forEach(e => (e.checked = !e.checked));

		used_nodes
			.filter(e => e.checkbox === null)
			.forEach(e => e.button.click());
	}
}

function init_settings () {
	const settings = new Settings({
		name: 'Quick Tagger',
		description: 'A tool to make working on tagging projects easy',
		url: 'https://e621.net/extensions/quick_tagger'
	});

	settings.custom({
		name: 'Post edit delay',
		key: 'network_delay',
		description: 'How long to wait between API requests for tag-edits',
		default: utils.default_values.network_delay,
		placeholder: '25 is recommended',
		is_secret: false
	});

	settings.checkbox({
		name: 'Save changes',
		key: 'save_local',
		default: utils.default_values.save_local,
		description: 'Toggles whether changes should be saved'
	});

	settings.checkbox({
		name: 'Upload changes',
		key: 'upload_changes',
		default: utils.default_values.upload_changes,
		description: 'Toggles whether changes should be made to e621'
	});

	document.getElementById('update_credentials_button').addEventListener('click', async event => {
		const username = document.getElementById('credentials_username').value;
		const api_key = document.getElementById('credentials_api_key').value;

		await utils.set_value('api_username', username);
		await utils.set_value('api_key', api_key);
	});
}
