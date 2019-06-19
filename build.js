const fs = require('fs');
const _ = (p) => fs.readFileSync(p);

const full = `${_('./header.js')}

${_('./main.js')}

utils.clear_page();
remove_toJSON();

// eslint-disable-next-line new-cap, no-undef
GM_addStyle(\`${_('./main.css')}\`);
document.body.innerHTML = \`${_('./main.html')}\`;

init();
`;

fs.writeFileSync('./quick_tagger.js', full, 'utf8');
