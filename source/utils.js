/* eslint-disable no-undef */
const utils = {
	// Will change a global that says when the user is in a
	// textbox. This is because you can't use hotkeys
	// while you are in a textbox
	suppress_keybinds: (idnode) => {
		// Idnode could be a string or a html node.
		// Makes things a little confusing to use, but helpful to have
		const node = (typeof idnode == 'string') ? $d(idnode) : idnode;
		node.addEventListener('focus', text_box_on);
		node.addEventListener('blur', text_box_off);

		// Toggles for being in a text box
		function text_box_on(){ utils.in_text_box = true; }
		function text_box_off(){ utils.in_text_box = false; }
	},

	// Adds an eventlistener to a node for when its clicked
	post_switcher_listener: (post_id) => {
		$el(`post_${post_id}`, 'click', () => {
			navigation.switch_to_post(post_id);
		});
	},

	toggle_post: (id) => {
		// ?
	},

	// Turns a button into a setting button
	// This means that when the button is clicked
	// it waits for some input before it will update its innerText
	setting_listener: (id) => {
		const btn = $d(id);
		btn.addEventListener('click', () => {
			if(utils.waiting_for_setting){ return; } // Don't set multiple at once
			$l(`Waiting for keypress to assign to ${id}`);
			set_keycode('<press a key>');
			btn.blur(); // Allows for arrow keys
			document.body.addEventListener('keydown', watch_key_press);

			utils.waiting_for_setting = true;
		});

		function watch_key_press(e){
			if(utils.in_text_box){ return; } // Dont set if typing in text_box
			$l(`Updating ${id} with keycode ${e.key}`);
			document.body.removeEventListener('keydown', watch_key_press);
			set_keycode(e.key);

			utils.waiting_for_setting = false;
		}

		function set_keycode(msg){ $d(id).innerText = msg; }
	},

	waiting_for_setting: false,
	in_text_box: false,

	clear_node: (node) => {
		while(node.children.length > 0){
			node.removeChild(node.children[0]);
		}
	},

	html_to_node: (html) => {
		const temp_node = document.createElement('div');
		temp_node.innerHTML = html;
		return temp_node.firstElementChild;
	}
};
