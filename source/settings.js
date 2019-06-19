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
