// ==UserScript==
// @name         e621 quick tagger
// @description  Custom page for quickly and effectively working on tagging projects

// @namespace    https://github.com/sasquire
// @author       Sasquire
// @version      1.00008
// @updateURL    https://github.com/Sasquire/quick_tagger/raw/master/source/header.js
// @downloadURL  https://github.com/Sasquire/quick_tagger/raw/master/quick_tagger.user.js

// @homepage     https://github.com/Sasquire/quick_tagger
// @source       https://github.com/Sasquire/quick_tagger
// @supportURL   https://e621.net/user/show/170289
// @icon         https://github.com/Sasquire/quick_tagger/raw/master/icon32.png

// @match        http://e621.net/extensions/quick_tagger
// @match        https://e621.net/extensions/quick_tagger

// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/utility_functions.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/local_storage.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/settings.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/navigation.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/utils.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/rules.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/api.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/history.js
// @require      https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/init_clear.js
// @resource     qt_css https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/main.css
// @resource     qt_html https://raw.githubusercontent.com/Sasquire/quick_tagger/master/source/main.html

// @grant        GM_addStyle
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM_getResourceText
// ==/UserScript==

/* eslint-disable no-undef */
/* eslint-disable new-cap */
document.body.innerHTML = GM_getResourceText('qt_html');
GM_addStyle(GM_getResourceText('qt_css'));


// Things get defined elsewhere, so its fine.
(() => {
	// Drop-down menu to switch between functions
	$el('setting_option', 'change', change_setting_menu);
	change_setting_menu(); // Run the command once to init

	local.display_userinfo(); // Async but displays if username is known

	$el('add_blank_tag', 'click', rules.add_blank_tag); // Blank tag button

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
	$el('settings_import_button', 'click', settings.load_from_input);
	$el('settings_export_button', 'click', settings.export);

	// Save/delete buttons
	$el('save_settings', 'click', local.save_current);
	$el('delete_settings', 'click', local.delete_name);

	$el('delete_history', 'click', history.clear);
	$el('export_history', 'click', history.export);

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
			default: rules.toggle_rule(node.parentNode.id);
		}
	}
})();
