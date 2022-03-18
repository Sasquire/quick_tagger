const { E621API } = require('./../dependencies/e621_API.commonjs2.userscript.js');
const GM = require('./../dependencies/gm_functions.js');

const defaults = {
	templates: '[]',
	changes: '[]',
	save_local: true,
	upload_changes: false,
	network_delay: 25
};

async function get_value (key) {
	return GM.getValue(key).then(e => e === undefined ? defaults[key] : e);
}

async function set_value (key, value) {
	return GM.setValue(key, value);
}

function clear_node (node) {
	while (node.children.length > 0) {
		node.removeChild(node.children[0]);
	}
}

function add_css (css) {
	GM.addStyle(css);
}

function string_to_node (string) {
	// Thanks to https://davidwalsh.name/convert-html-stings-dom-nodes
	// for showing this awesome method
	return document.createRange().createContextualFragment(string).firstElementChild;
}

function node_append (parent, node) {
	if (node) {
		parent.appendChild(node);
	}
}

function parse_keycode (message) {
	if (message === ' ') {
		return 'Space';
	} else {
		return message;
	}
}

function escape_html (string) {
	const node = document.createElement('div');
	node.appendChild(document.createTextNode(string));
	return node.innerHTML;
}

// Adapted roughly from
// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
function save_json_file (json, name) {
	const data_string = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));
	const download_node = document.createElement('a');
	download_node.setAttribute('href', data_string);
	download_node.setAttribute('download', name);
	document.body.appendChild(download_node);
	download_node.click();
	download_node.remove();
}

function listener (id, type, response) {
	return document.getElementById(id).addEventListener(type, response);
}

let known_api = null;
async function get_api () {
	const user_agent_string = 'Idem\'s Quick Tagger';

	if (known_api === null) {
		const api_key = await get_value('api_key');
		const username = await get_value('api_username');
		const is_api_good = await can_api_be_authenticated();
		if (is_api_good === true) {
			known_api = new E621API(user_agent_string, username, api_key);
		} else {
			known_api = new E621API(user_agent_string);
		}
	}

	return known_api;
}

async function can_api_be_authenticated () {
	const api_key = await get_value('api_key');
	const username = await get_value('api_username');
	const api_is_set = api_key !== undefined && api_key !== null && api_key !== '';
	const username_is_set = username !== undefined && username !== null && username !== '';
	return api_is_set && username_is_set;
}

module.exports = {
	clear_node: clear_node,
	add_css: add_css,
	string_to_node: string_to_node,
	node_append: node_append,
	parse_keycode: parse_keycode,
	get_value: get_value,
	set_value: set_value,
	escape_html: escape_html,
	save_json_file: save_json_file,
	listener: listener,
	get_api: get_api,
	can_api_be_authenticated: can_api_be_authenticated,
	default_values: defaults
};
