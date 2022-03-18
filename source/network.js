const utils = require('./utils.js');

/* const POST_CHANGE_QUEUE = [ {
	post_id: int,
	edit_string: string,
	from_disk: bool,
	complete: bool,
	timestamp: int
} ]; */

async function get_changes_from_disk () {
	const changes_string = await utils.get_value('changes');
	const changes_json = JSON.parse(changes_string);
	// TODO decompress change
	for (const change of changes_json) {
		change.from_disk = true;
	}

	return changes_json;
}

async function save_changes_to_disk (changes) {
	// TODO compress change
	for (const change of changes) {
		delete change.from_disk;
	}

	const changes_string = JSON.stringify(changes);
	await utils.set_value('changes', changes_string);
}

async function add_saved_changes () {
	const changes = await get_changes_from_disk();
	changes.map(add);
}

async function add_change_to_disk (change) {
	const changes = await get_changes_from_disk();
	const is_saved_on_disk = changes.some(e => e.timestamp === changes.timestamp);
	if (is_saved_on_disk === false) {
		changes.push(change);
		await save_changes_to_disk(changes);
	}
}

async function remove_change_from_disk (timestamp) {
	const changes = await get_changes_from_disk();
	const index_on_disk = changes.findIndex(e => e.timestamp === timestamp);
	const is_saved_on_disk = index_on_disk !== -1;
	if (is_saved_on_disk === true) {
		changes.splice(index_on_disk, 1);
		await save_changes_to_disk(changes);
	}
}

async function set_complete_on_disk (timestamp) {
	const changes = await get_changes_from_disk();
	const index_on_disk = changes.findIndex(e => e.timestamp === timestamp);
	const is_saved_on_disk = index_on_disk !== -1;
	if (is_saved_on_disk === true) {
		changes[index_on_disk].complete = true;
		await save_changes_to_disk(changes);
	}
}

function add_change_to_list (change) {
	const is_in_element = Array.from(document.getElementsByClassName('network_timestamp'))
		.map(e => e.innerText)
		.filter(e => e === change.timestamp.toString())
		.some(e => e);

	if (is_in_element === false) {
		document.getElementById('network_queue_body').appendChild(create_change_node(change));
		update_time_remaining();
	}
}

function remove_change_from_list (timestamp) {
	const timestamp_element = Array.from(document.getElementsByClassName('network_timestamp'))
		.filter(e => e.innerText === timestamp.toString())[0];
	const element_is_real = timestamp_element !== undefined;
	if (element_is_real === true) {
		const row = timestamp_element.parentNode;
		row.parentNode.removeChild(row);
		update_time_remaining();
	}
}

async function update_time_remaining () {
	const node = document.getElementById('network_time_remaining');
	const num_children = document.getElementById('network_queue_body').children.length;
	const time_between_posts = await utils.get_value('network_delay');
	const seconds_remaining = num_children * time_between_posts;
	// https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
	const time_string = new Date(seconds_remaining * 1000).toISOString().substring(11, 19);
	node.innerText = `${num_children} post(s) in queue. ${time_string} remain until complete.`;
}

async function add (change) {
	const should_save = document.getElementById('network_save_local').checked;
	const should_upload = document.getElementById('network_edit_live').checked;

	if (change.from_disk === false && should_save === true) {
		await add_change_to_disk(change);
	}

	if (change.complete === false && should_upload === true) {
		add_change_to_list(change);
	}
}

async function remove (timestamp) {
	await remove_change_from_disk(timestamp);
	remove_change_from_list(timestamp);
}

async function complete (timestamp) {
	set_complete_on_disk(timestamp);
	remove_change_from_list(timestamp);
}

async function make_changes_from_node (node) {
	const post_id = parseInt(node.children[0].innerText, 10);
	const { to_add, to_remove } = node.children[1].innerText
		.split(' ')
		.reduce((acc, e) => {
			if (e.charAt(0) === '-') {
				acc.to_remove.push(e.substring(1));
			} else {
				acc.to_add.push(e);
			}
			return acc;
		}, { to_remove: [], to_add: [] });

	const is_api_good = await utils.can_api_be_authenticated();
	if (is_api_good === true) {
		const api = await utils.get_api();
		await api.post_update({ id: post_id, tags_to_add: to_add, tags_to_remove: to_remove });
	}
}

async function make_one_post_edit_from_queue () {
	console.log('Tag edit ', new Date().getTime());
	const queue = document.getElementById('network_queue_body');
	const first_in_queue = queue.children[0];
	if (first_in_queue !== undefined) {
		try {
			const post_timestamp = parseInt(first_in_queue.children[4].innerText, 10);
			await make_changes_from_node(first_in_queue);
			await complete(post_timestamp);
		} catch (err) {
			// TODO convey this error message to the user
			console.log('Could not edit the top item of the queue. Something is wrong!');
			console.log(err);
		}
	}
}

function create_change_node (change) {
	const node = utils.string_to_node(`
		<table>
			<tr>
				<td><a href="https://e621.net/posts/${utils.escape_html(change.post_id)}">${utils.escape_html(change.post_id)}</a></td>
				<td>${utils.escape_html(change.edit_string)}</td>
				<td>${change.from_disk ? 'yes' : 'no'}</td>
				<td><button class="danger_button">&nbsp;</button></td>
				<td class="network_timestamp">${utils.escape_html(change.timestamp)}</td>
			</tr>
		</table>
	`).querySelector('tr');

	node.querySelector('button').addEventListener('click', e => remove(change.timestamp));

	return node;
}

async function load_save_local () {
	const value = await utils.get_value('save_local');
	const node = document.getElementById('network_save_local');
	node.checked = value;
}

async function load_edit_live () {
	const value = await utils.get_value('upload_changes');
	const node = document.getElementById('network_edit_live');
	node.checked = value;
}

async function update_save_local (event) {
	const node = document.getElementById('network_save_local');
	await utils.set_value('save_local', node.checked);
}

async function update_edit_live (event) {
	const node = document.getElementById('network_edit_live');
	await utils.set_value('upload_changes', node.checked);
}

async function export_saved_data (event) {
	const changes = await get_changes_from_disk();
	utils.save_json_file(changes, `Idems_Quick_Tagger_Export-${new Date().getTime()}.json`);
}

async function delete_saved_data (event) {
	await save_changes_to_disk([]);
}

// TODO have a better name for this
async function check_if_api_key_is_set (event) {
	const is_set = await utils.can_api_be_authenticated();
	if (is_set === false) {
		document.getElementById('network_edit_live').checked = false;
		document.getElementById('network_edit_live').disabled = true;
		const button = document.getElementById('network_add_local');
		const warning = utils.string_to_node(`
			<div>
				<hr/>
				Your Username and/or API key is not set. <a href="https://e621.net/extensions">Use this link to set them.</a>
				<hr/>
			</div>
		`);
		button.parentNode.insertBefore(warning, button);
	}
}

module.exports = {
	add_saved_changes: add_saved_changes,
	add: add,
	remove: remove,
	update_save_local: update_save_local,
	update_edit_live: update_edit_live,
	load_save_local: load_save_local,
	load_edit_live: load_edit_live,
	export_saved_data: export_saved_data,
	delete_saved_data: delete_saved_data,
	check_if_api_key_is_set: check_if_api_key_is_set,
	make_one_post_edit_from_queue: make_one_post_edit_from_queue
};
