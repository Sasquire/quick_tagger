// Things get defined elsewhere, so its fine.
/* eslint-disable no-undef */
(() => {
	// Drop-down menu to switch between functions
	$('setting_option', 'change', change_setting_menu);
	change_setting_menu(); // Run the command once to init

	$('add_blank_tag', 'click', settings.add_blank_tag); // Blank tag button

	$(undefined, 'keydown', handle_key_press); // Watch for hotkey press

	// Allow clicking buttons to submit, next, and previous
	$('submit_button', 'click', navigation.submit);
	$('next_button', 'click', navigation.next);
	$('previous_button', 'click', navigation.previous);
	// Turn the buttons into setting listeners
	['submit', 'next', 'previous']
		.map(e => `${e}_button_keycode`)
		.forEach(utils.setting_listener);

	settings.fill_selector(); // Load settings from memory and display
	$('local_saved_settings', 'change', settings.update_selector); // Watch for update

	// update userinfo button
	$('update_userinfo', 'click', local.save_userinfo);

	// Handle importing saving of settings
	$('save_settings', 'click', local.save_current);
	$('settings_import_button', 'click', settings.load_from_input);
	$('settings_export_button', 'click', settings.export);

	// Suppress keybinds when in text field
	Array.from(document.getElementsByTagName('input'))
		.map(e => e.id)
		.forEach(utils.suppress_keybinds);

	// Detect when query has changed and update search results
	$('search', 'input', api.query_change);

	function change_setting_menu(){
		const select = $d('setting_option');
		const value = select.value;
		$l(`Switching settings to display ${value}`);
		$q('div', select.parentNode).forEach(e => (e.style.display = 'none'));
		$d(`setting_${value}`, select.parentNode).style.display = 'inline';
	}

	// Add event listener to id with action and function
	function $(id, action, func){
		const node = document.getElementById(id) || document.body;
		node.addEventListener(action, func);
	}
})();
