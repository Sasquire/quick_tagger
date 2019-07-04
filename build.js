const fs = require('fs');
const _ = (p) => fs.readFileSync(`./source/${p}`, 'utf8');

const full = `${_('header.js')}
// Here are some example setting strings
${
	fs.readFileSync('./example_settings.txt', 'utf8')
		.split('\n')
		.map(e => `// ${e}`) // Uses // because /* might get broke? */
		.join('\n')
}

// Todo ${''/* This is actual text, not a todo */}
${
	fs.readFileSync('./todo.txt', 'utf8')
		.split('\n')
		.map(e => `// ${e}`) // Uses // because /* might get broke? */
		.join('\n')
}

${_('utility_functions.js')}

${_('local_storage.js')}
${_('settings.js')}
${_('navigation.js')}
${_('utils.js')}
${_('rules.js')}
${_('api.js')}
${_('history.js')}



${_('init_clear.js')}
GM_addStyle(\`${_('main.css')}\`);
document.body.innerHTML = \`${_('main.html')}\`;
${_('init_start.js')}
`;

fs.writeFileSync('./quick_tagger.user.js', full, 'utf8');
