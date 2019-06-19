const utils = {
	suppress_keybinds: (id) => {
		const node = $d(id);
		node.addEventListener('focus', utils.text_box_on);
		node.addEventListener('blur', utils.text_box_off);
	},
	rule_toggle_listener: (id) => {
		$d(id+'_applied').addEventListener('click', () => utils.toggle_rule(id));
	},
	toggle_rule: (id) => {
		$l(`Toggling rule ${id}`);
		const node = $d(id);
		const val = node.getAttribute('data-activated') === 'true' ? true : false;
		node.querySelector('input[type=checkbox]').checked = !val;
		node.setAttribute('data-activated', !val);
	},

	post_switcher_listener: (post_id) => {
		$d(`post_${post_id}`).addEventListener('click', () => api.switch_to_post(post_id));
	},
	toggle_post: (id) => {
		const node = $d(`post_${id}`);

	},

	setting_listener: (id) => {
		const btn = $d(id);
		btn.addEventListener('click', () => {
			if(utils.waiting_for_setting){ return; } // don't set multiple at once
			$l(`Waiting for keypress to assign to ${id}`);
			utils.waiting_on();
			set_keycode('<waiting>');
			btn.blur(); // allows for arrow keys
			document.body.addEventListener('keydown', watch_key_press);
		});

		function watch_key_press(e){
			if(utils.in_text_box){ return; } // dont set if typing
			$l(`Updating ${id} with keycode ${e.key}`);
			document.body.removeEventListener('keydown', watch_key_press);
			set_keycode(e.key);
			utils.waiting_off();
		}

		var set_keycode = (msg) => $d(id).innerText = msg;
	},

	waiting_for_setting: false,
	in_text_box: false,

	set_waiting: (val) => utils.waiting_for_setting = val,
	waiting_off: () => utils.set_waiting(false),
	waiting_on: () => utils.set_waiting(true),

	set_text_box: (val) => utils.in_text_box = val,
	text_box_off: () => utils.set_text_box(false),
	text_box_on: () => utils.set_text_box(true),

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

function handle_key_press(event){
	if(utils.waiting_for_setting || utils.in_text_box){ return; }

	$c('setting_button')
		.filter(e => e.innerText == event.key)
		.forEach(e => {switch(e.id){
			case 'submit_button_keycode': navigation.submit(); break;
			case 'next_button_keycode': navigation.next(); break;
			case 'previous_button_keycode': navigation.previous(); break;
			default: utils.toggle_rule(e.parentNode.id);
		}});
}
