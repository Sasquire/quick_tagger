const browserify = require('browserify');
const stringify = require('stringify');
const path = require('path');
const fs = require('fs');
const { performance } = require('perf_hooks');

const apply_header = require('./dependencies/prepend_text.js');
const info = {
	version: '2.00001',
	authors: 'Meras',
	updateURL: 'https://github.com/Sasquire/quick_tagger/raw/master/distribution/header.user.js',
	downloadURL: 'https://github.com/Sasquire/quick_tagger/raw/master/distribution/main.user.js',
	icon: 'https://github.com/Sasquire/quick_tagger/raw/master/static/icon32.png'
};

function bundle (header_string) {
	const entry = path.join('source', 'entry.js');

	return browserify()
		.add(entry)
		.transform(stringify(['.css', '.html']))
		.plugin(apply_header, header_string)
		.bundle();
}

function build_header () {
	return `// ==UserScript==
// @name         Idem's Quick Tagger
// @description  Adds a page to QUICKLY tag images by hand
// @version      ${info.version}
// @author       ${info.authors}

// @namespace    https://github.com/Sasquire/
// @supportURL   https://github.com/Sasquire/Idems-Sourcing-Suite
// @updateURL    ${info.updateURL}
// @downloadURL  ${info.downloadURL}
// @icon         ${info.icon}

// @license      Unlicense

// @noframes
// @connect      e621.net
// @grant        GM.addStyle
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest

//               Legacy userscript support
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest

// @match        http://e621.net/extensions/quick_tagger
// @match        https://e621.net/extensions/quick_tagger

// @match        http://e621.net/extensions
// @match        http://e621.net/extensions/
// @match        https://e621.net/extensions
// @match        https://e621.net/extensions/
// ==/UserScript==

`;
}

function build () {
	const start = performance.now();
	const output_main = path.join('distribution', 'main.user.js');
	const output_header = path.join('distribution', 'header.user.js');
	const header = build_header();

	fs.writeFileSync(output_header, header, 'utf8');

	const output_stream = fs.createWriteStream(output_main);
	bundle(header).pipe(output_stream).on('finish', () => {
		const end = performance.now();
		console.log(`Built package in ${Math.floor((end - start) * 100) / 100}ms`);
	});
}

build();
