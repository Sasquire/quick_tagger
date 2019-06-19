/* eslint-disable no-undef */
const local = {
	settings_name: 'quick_tag_settings',

	// Get the object of settings
	get: () => {
		$l('Loading storage object');
		try {
			const stored = localStorage.getItem(local.settings_name) || '{}';
			const obj = JSON.parse(stored);
			$l('Storage object loaded');
			return obj;
		} catch(e) {
			$e('Problem loading storage object');
			throw e;
		}
	},

	// Set the object of settings
	set: (obj) => {
		$l('Setting storage object');
		try {
			const str = JSON.stringify(obj);
			localStorage.setItem(local.settings_name, str);
			$l('Storage object saved');
		} catch(e) {
			$e('Problem saving storage object');
			throw e;
		}
	},

	// Names of settings
	names: () => Object.keys(local.get()),

	// Add current settings to storage
	save_current: () => {
		const name = $d('settings_name').value;
		$l(`Saving current settings as ${name}`);

		if(name == '') {
			$e('You must supply a setting name');
		} else if(local.names().includes(name)) {
			$e('Name is already taken');
		} else {
			$l('Loading settings from memory');
			const all_settings = local.get();

			$l('Getting current settings');
			all_settings[name] = settings.get();

			$l('Re-saving settings');
			local.set(all_settings);

			$e(`Settings saved as ${name}`);
		}
	},

	// Delete based on box
	delete_name: () => {
		const name = $d('settings_name').value;
		$l(`Deleting settings called ${name}`);

		if(name == '') {
			$e('You must supply a setting name');
		} else if(local.names().includes(name) == false) {
			$e(`No setting named ${name}`);
		} else {
			$l('Loading settings from memory');
			const all_settings = local.get();

			$l('Deleting current settings');
			delete all_settings[name];

			$l('Re-saving settings');
			local.set(all_settings);

			$e(`Setting named ${name} deleted`);
		}
	},

	save_userinfo: async () => {
		$l('Saving user info with GM.setValue');
		await GM.setValue('username', $d('username_info').value);
		await GM.setValue('api_key', $d('apikey_info').value);
		$l('Saved user info');
	}
};
