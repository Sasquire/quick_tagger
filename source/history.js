/* eslint-disable no-undef */
const history = {
	settings_name: 'history_settings',

	// Get the object of settings
	get: () => {
		$l('Loading history object');
		try {
			const stored = localStorage.getItem(history.settings_name) || '[]';
			const obj = JSON.parse(stored);
			$l('History object loaded');
			return obj;
		} catch(e) {
			$e('Problem loading history object');
			throw e;
		}
	},

	// Set the object of settings
	set: (obj) => {
		$l('Setting history object');
		try {
			const str = JSON.stringify(obj);
			localStorage.setItem(history.settings_name, str);
			$l('History object saved');
		} catch(e) {
			$e('Problem saving history object');
			throw e;
		}
	},

	add: (id, adding, removing) => {
		$l('Adding item to history');
		const old = history.get();
		old.push({
			id: id,
			add: adding,
			del: removing,
			date: new Date().getTime()
		});
		history.set(old);
	},

	// https://stackoverflow.com/questions/16428835/save-data-from-localstorage-to-csv
	export: () => {
		$e('Exporting history to file');
		const data = JSON.stringify(history.get());
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = $d('export_history_hidden');
		a.href = url;
		a.download = `e621_tag_history_${new Date().getTime()}.json`;
		a.click();
	},

	clear: () => {
		history.export();
		$e('Clearing History');
		history.set([]);
	}
};
