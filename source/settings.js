/* eslint-disable no-undef */
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
	// Todo set the query to blank everytime
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
		api.search().then(e => navigation.switch_to_post(api.posts[0].id));

		// Remove current rules
		$c('tag_rule').forEach(e => e.parentNode.removeChild(e));

		// Add new rules
		obj.rules.forEach((e, i) => {
			rules.add_blank_tag();
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
			tags_to_add: $q('input.rule_tags', e)[0].value,
			keycode: $q('.setting_button', e)[0].innerText
		}))
	})
};
