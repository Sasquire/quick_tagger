/* eslint-disable no-undef */
const rules = {
	// Given an id adds an eventlistener to toggle the rule on click
	rule_toggle_listener: (id) => {
		$el(`${id}_applied`, 'click', () => rules.toggle_rule(id));
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

	// Turns all the rules off
	rules_off: () => {
		$c('tag_rule').forEach(e => {
			e.setAttribute('data-activated', false);
			$q('input[type=checkbox]', e)[0].checked = false;
		});
	},

	// Gets the changes from the rules
	tag_changes: () => {
		const all_tags = $c('tag_rule')
			.filter(e => e.getAttribute('data-activated') === 'true')
			.map(e => $q('input.rule_tags', e)[0].value)
			.map(e => e.split(' '))
			.flat();

		return {
			to_add: all_tags.filter(e => e.charAt(0) != '-'),
			to_del: all_tags
				.filter(e => e.charAt(0) == '-')
				.map(e => e.substring(1))
		};
	},

	// Adds a blank tag to the tag listing
	add_blank_tag: () => {
		$l('Adding blank rule');
		const rule_count = $c('tag_rule').length;

		// Insert new node
		$d('tags').appendChild(utils.html_to_node(`
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
		rules.rule_toggle_listener(`rule_${rule_count}`);
		utils.suppress_keybinds(`rule_${rule_count}_tags`);
		utils.setting_listener(`rule_${rule_count}_keycode`);
	}
};
