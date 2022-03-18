// ==UserScript==
// @name         Idem's Quick Tagger
// @description  Adds a page to QUICKLY tag images by hand
// @version      1.00011
// @author       Meras

// @namespace    https://github.com/Sasquire/
// @supportURL   https://github.com/Sasquire/Idems-Sourcing-Suite
// @updateURL    undefined
// @downloadURL  undefined
// @icon         undefined

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

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/blip/create/blip_create.js":
/*!*******************************************!*\
  !*** ./source/blip/create/blip_create.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blip_create": () => (/* binding */ blip_create)
/* harmony export */ });
const { raw_blip_create } = __webpack_require__(/*! ./raw_blip_create.js */ "./source/blip/create/raw_blip_create.js");

async function blip_create (text, in_response_to) {
	return raw_blip_create.call(this, {
		'blip[response_to]': in_response_to === undefined ? null : in_response_to,
		'blip[body]': text
	});
}




/***/ }),

/***/ "./source/blip/create/raw_blip_create.js":
/*!***********************************************!*\
  !*** ./source/blip/create/raw_blip_create.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_blip_create": () => (/* binding */ raw_blip_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_blip_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/blips',
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	if (settings['blip[response_to]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['blip[response_to]'], 'blip[response_to]');
	}

	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['blip[body]'], 'blip[body]');
}

function make_data (settings) {
	const return_object = {
		'blip[body]': settings['blip[body]']
	};

	if (settings['blip[response_to]'] !== null) {
		return_object['blip[response_to]'] = settings['blip[response_to]'];
	}

	return return_object;
}




/***/ }),

/***/ "./source/comment/create/comment_create.js":
/*!*************************************************!*\
  !*** ./source/comment/create/comment_create.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comment_create": () => (/* binding */ comment_create)
/* harmony export */ });
const { raw_comment_create } = __webpack_require__(/*! ./raw_comment_create.js */ "./source/comment/create/raw_comment_create.js");

async function comment_create (post_id, text) {
	return raw_comment_create.call(this, {
		'comment[post_id]': post_id,
		'comment[body]': text
	});
}




/***/ }),

/***/ "./source/comment/create/raw_comment_create.js":
/*!*****************************************************!*\
  !*** ./source/comment/create/raw_comment_create.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_comment_create": () => (/* binding */ raw_comment_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// Add support for ['do_not_bump_post', 'is_sticky', 'is_hidden']

async function raw_comment_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/comments',
		response: 'JSON',

		format: 'FORM',
		data: {
			'comment[post_id]': settings['comment[post_id]'],
			'comment[body]': settings['comment[body]']
		},
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['comment[post_id]'], 'comment[post_id]');
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['comment[body]'], 'comment[body]');
}




/***/ }),

/***/ "./source/download/download.userscript.js":
/*!************************************************!*\
  !*** ./source/download/download.userscript.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* Input to this method is structured like this
{
	method: 'POST' | 'GET' // Defines how the request should be made
	path: <string> // The path of the URL that is being accessed
	response: 'JSON' | 'XML' | 'HTML' // Defines the response type

	format: 'URL' | 'FORM' | undefined // Defines how the data is passed
	data: <object> | undefined // Data being passed in the request
}

*/
async function download (settings) {
	const request_options = build_request_options.call(this, settings);

	return new Promise((resolve, reject) => {
		const on_load = (e) => {
			if (e.status >= 200 && e.status <= 299) {
				resolve(e.response); // This will likely cause errors later
			} else {
				// eslint-disable-next-line prefer-promise-reject-errors
				reject({
					response: {
						status: e.status,
						data: e.response
					}
				});
			}
		};

		request_options.onload = on_load;
		request_options.onerror = on_load;

		// eslint-disable-next-line no-undef
		GM.xmlHttpRequest(request_options);
	});
}

function build_request_options (settings) {
	const url = new URL('https://e621.net/');
	url.pathname = settings.path + '.' + settings.response.toLowerCase();

	if (settings.format === 'URL') {
		Object.entries(settings.data).forEach(([key, value]) => {
			url.searchParams.set(key, value);
		});
	}

	const request_options = {
		url: url.href,
		method: settings.method,
		responseType: settings.response === 'JSON' ? 'json' : 'text',
		headers: {
			'user-agent': this.useragent
		}
	};

	const has_credentials = (this.username !== undefined && this.api_key !== undefined);
	if (settings.authenticate || has_credentials) {
		const key = `Basic ${btoa(`${this.username}:${this.api_key}`)}`;
		request_options.headers.Authorization = key;
	}

	if (settings.format === 'FORM') {
		const form = new FormData();
		Object.entries(settings.data).forEach(([key, value]) => {
			if (value.constructor === ArrayBuffer) {
				form.append(key, new Blob([value]));
			} else {
				form.append(key, value);
			}
		});

		request_options.data = form;
	}

	return request_options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (download);


/***/ }),

/***/ "./source/post/bvas/post_bvas.js":
/*!***************************************!*\
  !*** ./source/post/bvas/post_bvas.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_bvas": () => (/* binding */ post_bvas)
/* harmony export */ });
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");


// settings = {
//   post_id: id of the post to be replaced
//   replacement: the replacement file/URL
//   comment: boolean if a comment should be posted to the new post
//   description: boolean if the description should be edited.
//   message: message of superior quality. '%' replaced with old_id
//   delete: boolean. If true will try to delete post. if false will flag
// }

async function post_bvas (settings) {
	settings = apply_defaults(settings);
	const old_post = await this.post_show(settings.post_id);
	settings.message = settings.message.replace('%', old_post.id);

	const new_post = await this.post_create({
		tags: filter_tags(old_post.tags),
		sources: old_post.sources,
		description: settings.description === true ? `${settings.message}\n${old_post.description}` : old_post.description,
		rating: old_post.rating,
		parent_id: old_post.relationships.parent_id,

		upload: settings.replacement
	});

	if (settings.comment === true) {
		await this.comment_create(new_post.post_id, settings.message);
	}

	await set_parent.call(this, old_post.id, new_post.post_id);
	for (const child_id of old_post.relationships.children) {
		await set_parent.call(this, child_id, new_post.post_id);
	}
	// Fix with pool

	await this.post_copy_notes(old_post.id, new_post.post_id);

	// optionally delete the post
	await this.post_flag_create(this.post_flag_reasons.inferior, old_post.id, new_post.post_id);
}

function apply_defaults (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_0__.validate_counting_number)(settings.post_id, 'post_id');
	if (settings.replacement === undefined) {
		throw new Error('replacement must be defined');
	}

	return {
		post_id: settings.post_id,
		comment: nullish(settings.comment, false),
		description: nullish(settings.description, true),
		message: nullish(settings.message, 'Superior version of post #%'),
		delete: nullish(settings.delete, false),
		replacement: settings.replacement
	};
}

function nullish (value, replacement) {
	if (value === null || value === undefined) {
		return replacement;
	} else {
		return value;
	}
}

async function set_parent (post_id, new_parent) {
	return this.post_update({
		id: post_id,
		parent_id: new_parent
	});
}

function filter_tags (tag_object) {
	const tags_to_remove = [
		'better_version_at_source',
		'smaller_version_at_source',
		'compression_artifacts',
		'cropped',
		'upscale'
	];

	return Object.values(tag_object)
		.reduce((acc, e) => acc.concat(e))
		.filter(e => tags_to_remove.includes(e) === false);
}




/***/ }),

/***/ "./source/post/copy_notes/post_copy_notes.js":
/*!***************************************************!*\
  !*** ./source/post/copy_notes/post_copy_notes.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_copy_notes": () => (/* binding */ post_copy_notes)
/* harmony export */ });
const { raw_post_copy_notes } = __webpack_require__(/*! ./raw_post_copy_notes.js */ "./source/post/copy_notes/raw_post_copy_notes.js");

async function post_copy_notes (post_id, to_id) {
	return raw_post_copy_notes.call(this, {
		id: post_id,
		other_post_id: to_id
	});
}




/***/ }),

/***/ "./source/post/copy_notes/raw_post_copy_notes.js":
/*!*******************************************************!*\
  !*** ./source/post/copy_notes/raw_post_copy_notes.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_copy_notes": () => (/* binding */ raw_post_copy_notes)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_copy_notes (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'PUT',
		path: `/posts/${settings.id}/copy_notes`,
		response: 'JSON',

		format: 'URL',
		data: {
			id: settings.id,
			other_post_id: settings.other_post_id
		}
	}).catch(handle_error);
}

function handle_error (error) {
	if (error.response.data.reason === 'Post has no notes') {
		return null; // Expected behavior is to have no errors thrown if post has no notes
	} else {
		// Todo
		console.log(error);
		throw error;
	}
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'id');
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.other_post_id, 'other_post_id');
}




/***/ }),

/***/ "./source/post/create/post_create.js":
/*!*******************************************!*\
  !*** ./source/post/create/post_create.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_create": () => (/* binding */ post_create)
/* harmony export */ });
const { raw_post_create } = __webpack_require__(/*! ./raw_post_create.js */ "./source/post/create/raw_post_create.js");

async function post_create (settings) {
	validate_settings(settings);
	return raw_post_create.call(this, transform_settings(settings));
}

function validate_settings (settings) {
	if (settings.upload === undefined) {
		throw new Error('You must supply an upload file to upload a post');
	}

	if (typeof settings.rating !== 'string') {
		throw new Error('rating must be of type string');
	} else if (['e', 'q', 's'].includes(settings.rating.charAt(0)) === false) {
		throw new Error('first character of rating must be one of [\'e\', \'q\', \'s\']');
	}

	if (settings.tags !== undefined) {
		if (Array.isArray(settings.tags === false)) {
			throw new Error('tags must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('every element of tags must of of type string');
		}
	}

	if (settings.sources !== undefined) {
		if (Array.isArray(settings.sources === false)) {
			throw new Error('sources must be of type array');
		} else if (settings.tags.every(e => typeof e === 'string') === false) {
			throw new Error('every element of sources must of of type string');
		}
	}
}

function transform_settings (settings) {
	const return_object = {
		'upload[tag_string]': (settings.tags || []).join(' '),
		'upload[rating]': settings.rating.charAt(0),
		'upload[source]': (settings.sources || []).join('\n'),
		'upload[description]': (settings.description || ''),
		'upload[parent_id]': (settings.parent_id || null)
	};

	if (settings.upload.constructor === ArrayBuffer) {
		return_object['upload[file]'] = settings.upload;
	} else {
		return_object['upload[direct_url]'] = settings.upload;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post/create/raw_post_create.js":
/*!***********************************************!*\
  !*** ./source/post/create/raw_post_create.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_create": () => (/* binding */ raw_post_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// upload[tag_string] A space delimited list of tags.
// upload[file] The file data encoded as a multipart form.
// upload[rating] The rating for the post. Can be: s, q or e for safe, questionable, and explicit respectively.
// upload[direct_url] If this is a URL, e621 will download the file.
// upload[source] This will be used as the post's 'Source' text. Separate multiple URLs with %0A (url-encoded newline) to define multiple sources. Limit of ten URLs
// upload[description] The description for the post.
// upload[parent_id] The ID of the parent post.
// upload[referer_url]         ?
// upload[md5_confirmation]    useless
// upload[as_pending] If true post will be posted as pending

// tag_string, rating, source (file || direct_ulr) are required
// all others should be null

async function raw_post_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/uploads',
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function make_data (settings) {
	const new_settings = {
		'upload[tag_string]': settings['upload[tag_string]'],
		'upload[rating]': settings['upload[rating]'],
		'upload[source]': settings['upload[source]']
	};

	if (settings['upload[file]'] !== undefined) {
		new_settings['upload[file]'] = settings['upload[file]'];
	} else {
		new_settings['upload[direct_url]'] = settings['upload[direct_url]'];
	}

	if (settings['upload[description]'] !== null) {
		new_settings['upload[description]'] = settings['upload[description]'];
	}

	if (settings['upload[parent_id]'] !== null) {
		new_settings['upload[parent_id]'] = settings['upload[parent_id]'];
	}

	return new_settings;
}

function validate_settings (settings) {
	if (settings['upload[tag_string]'] === undefined) {
		throw new Error('upload[tag_string] must be present');
	} else if (typeof settings['upload[tag_string]'] !== 'string') {
		throw new Error('upload[tag_string] must be of type string');
	}

	if (settings['upload[file]'] !== undefined && settings['upload[direct_url]'] !== undefined) {
		throw new Error('Both upload[file] and upload[direct_url] can not be defined');
	} else if (settings['upload[file]'] === undefined && settings['upload[direct_url]'] === undefined) {
		throw new Error('Either upload[file] or upload[direct_url] must be defined');
	}

	// todo test this
	if (settings['upload[file]']) {
		if (settings['upload[file]'].constructor !== ArrayBuffer) {
			throw new Error('upload[file] must be of type ArrayBuffer');
		}

		// Check for data in the array buffer?
	}

	if (settings['upload[direct_url]']) {
		if (typeof settings['upload[direct_url]'] !== 'string') {
			throw new Error('upload[direct_url] must be of type string');
		}

		// Check it is an actual url?
	}

	if (['s', 'q', 'e'].includes(settings['upload[rating]']) === false) {
		throw new Error('upload[rating] must be one of [\'s\', \'q\', \'e\']');
	}

	if (settings['upload[source]'] === undefined) {
		throw new Error('upload[source] must be present');
	} else if (typeof settings['upload[source]'] !== 'string') {
		throw new Error('upload[source] must be undefined or of type string or null');
	}

	if (settings['upload[description]'] === undefined) {
		throw new Error('upload[description] must be present');
	} else if (typeof settings['upload[description]'] !== 'string') {
		throw new Error('upload[description] must be of type string');
	}

	if (settings['upload[parent_id]'] === undefined) {
		throw new Error('upload[parent_id] must present');
	} else if (settings['upload[parent_id]'] === null) {
		// It is fine if parent_id is null
	} else {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['upload[parent_id]'], 'upload[parent_id]');
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/post_search.js":
/*!******************************************!*\
  !*** ./source/post/index/post_search.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_search": () => (/* binding */ post_search)
/* harmony export */ });
/* harmony import */ var _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_search.js */ "./source/post/index/raw_post_search.js");


async function post_search (tag_string, page = 0) {
	return _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_search.call(this, {
		limit: 320,
		tags: tag_string,
		page: page.toString()
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/post_search_iterator.js":
/*!***************************************************!*\
  !*** ./source/post/index/post_search_iterator.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_search_iterator": () => (/* binding */ post_search_iterator)
/* harmony export */ });
/* harmony import */ var _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_search.js */ "./source/post/index/raw_post_search.js");


const posts_per_page = 320;

// You can not have a different order when searching through posts like this
async function* post_search_iterator (search_string) {
	// "Providing arbitrarily large values to obtain the most recent posts
	// is not portable and may break in the future". (wiki)
	// I do what I want
	let max_id = 1e9;
	while (true) {
		// https://github.com/zwagoth/e621ng/issues/202
		const { posts } = await _raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_search.call(this, {
			tags: search_string,
			limit: posts_per_page,
			page: `b${max_id}`
		}).catch(handle_error);

		yield* posts;
		max_id = posts.reduce((acc, e) => acc.id < e.id ? acc : e).id;

		if (posts.length < posts_per_page) {
			return;
		}
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/index/raw_post_search.js":
/*!**********************************************!*\
  !*** ./source/post/index/raw_post_search.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_search": () => (/* binding */ raw_post_search)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



// There is an edge case where the data can be md5=<md5>

async function raw_post_search (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: '/posts',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings)
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	if (settings.tags !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings.tags, 'tags');
	}

	if (settings.limit !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.limit, 'limit');
	}

	if (settings.page !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_page_string)(settings.page, 'page');
	}
}

function make_data (settings) {
	const return_object = {};

	if (settings.limit !== null) {
		return_object.limit = settings.limit;
	}

	if (settings.tags !== null) {
		return_object.tags = settings.tags;
	}

	if (settings.page !== null) {
		return_object.page = settings.page;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post/show/post_show.js":
/*!***************************************!*\
  !*** ./source/post/show/post_show.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_show_id": () => (/* binding */ post_show_id),
/* harmony export */   "post_show_md5": () => (/* binding */ post_show_md5),
/* harmony export */   "post_show": () => (/* binding */ post_show)
/* harmony export */ });
/* harmony import */ var _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../index/raw_post_search.js */ "./source/post/index/raw_post_search.js");
/* harmony import */ var _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw_post_show.js */ "./source/post/show/raw_post_show.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");




async function post_show_id (post_id) {
	return _raw_post_show_js__WEBPACK_IMPORTED_MODULE_1__.raw_post_show.call(this, {
		id: post_id
	}).then(e => e.post);
}

async function post_show_md5 (md5) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_2__.validate_md5)(md5);
	return _index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_search.call(this, {
		tags: `md5:${md5}`,
		limit: 1,
		page: null
	}).then(e => {
		if (e.posts.length === 0) {
			return null;
		} else {
			return e.posts[0];
		}
	});
}

async function post_show (id_md5) {
	if (typeof id_md5 === 'string' && id_md5.length === 32) {
		return post_show_md5.call(this, id_md5);
	} else {
		return post_show_id.call(this, Number(id_md5));
	}
}




/***/ }),

/***/ "./source/post/show/raw_post_show.js":
/*!*******************************************!*\
  !*** ./source/post/show/raw_post_show.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_show": () => (/* binding */ raw_post_show)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_show (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'post_id');

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: `/posts/${settings.id}`,
		response: 'JSON',

		format: undefined,
		data: null
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/post/update/post_update.js":
/*!*******************************************!*\
  !*** ./source/post/update/post_update.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_update": () => (/* binding */ post_update)
/* harmony export */ });
/* harmony import */ var _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_update.js */ "./source/post/update/raw_post_update.js");


async function post_update (settings) {
	return _raw_post_update_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_update.call(this, {
		id: settings.id,
		'post[tag_string_diff]': get_differences(settings, 'tags_to_add', 'tags_to_remove', ' '),
		'post[tag_string]': optional_join(settings.tags, ' '),
		'post[old_tag_string]': optional_join(settings.old_tags, ' '),
		'post[source_diff]': get_differences(settings, 'sources_to_add', 'sources_to_remove', '\n'),
		'post[source]': optional_join(settings.sources, '\n'),
		'post[old_source]': optional_join(settings.old_sources, '\n'),
		'post[description]': settings.description || null,
		'post[old_description]': settings.old_description || null,
		'post[parent_id]': settings.parent_id || null,
		'post[old_parent_id]': settings.old_parent_id || null,
		'post[rating]': get_rating(settings.rating),
		'post[old_rating]': get_rating(settings.old_rating),
		'post[edit_reason]': settings.reason || null
	});
}

// Idea for a different type of update function. Maybe its better in some cases
// async function transform_post (post_id, transform_function) {
//   const post = await get_post(post_id);
//   const new_post = await transform_function(post_id)
//   return post_update(post, new_post);
// }

function get_rating (rating) {
	if (rating !== undefined) {
		return rating.charAt(0);
	} else {
		return null;
	}
}

function optional_join (list, joiner) {
	if (list !== undefined) {
		return list.join(joiner);
	} else {
		return null;
	}
}

function get_differences (settings, add_string, remove_string, joiner) {
	if (settings[add_string] !== undefined || settings[remove_string] !== undefined) {
		const adds = (settings[add_string] || [])
			.join(joiner);
		const removes = (settings[remove_string] || [])
			.map(e => `-${e.toString()}`)
			.join(joiner);

		return `${adds}${joiner}${removes}`;
	} else {
		return null; // If no changes return null
	}
}




/***/ }),

/***/ "./source/post/update/raw_post_update.js":
/*!***********************************************!*\
  !*** ./source/post/update/raw_post_update.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_update": () => (/* binding */ raw_post_update)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_update (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'PATCH',
		path: `/posts/${settings.id}`,
		response: 'JSON',

		format: 'FORM',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'id');

	[
		'post[tag_string_diff]',
		'post[tag_string]',
		'post[old_tag_string]',
		'post[source_diff]',
		'post[source]',
		'post[old_source]',
		'post[description]',
		'post[old_description]',
		// parent_id
		'post[rating]',
		'post[old_rating]',
		'post[edit_reason]'
		// has_embedded_notes will be removed at some point.
	].forEach(e => {
		if (settings[e] === undefined) {
			throw new Error(`${e} must be present`);
		} else if (settings[e] === null) {
			// all of these can be null
		} else if (typeof settings[e] !== 'string') {
			throw new Error(`${e} must be of type string`);
		}
	});

	if (settings['post[parent_id]'] === undefined) {
		throw new Error('post[parent_id] must be present');
	}

	if (settings['post[old_parent_id]'] === undefined) {
		throw new Error('post[old_parent_id] must be present');
	}

	[
		'tag_string',
		'source',
		'description',
		'parent_id',
		'rating'
	].forEach(e => {
		if (settings[`post[old_${e}]`] !== null && settings[`post[${e}]`] === null) {
			throw new Error(`old_${e} must not be present if ${e} is not present`);
		}
	});

	if (settings['post[tag_string]'] !== null && settings['post[tag_string_diff]'] !== null) {
		throw new Error('at most one of tag_string and tag_string_diff can be non-null');
	}

	if (settings['post[source]'] !== null && settings['post[source_diff]'] !== null) {
		throw new Error('at most one of source and source_diff can be non-null');
	}

	// Parent_id
	if (settings['post[parent_id]'] === undefined) {
		throw new Error('parent_id must be present');
	} else if (settings['post[parent_id]'] === null) {
		// it can be null without issue
	} else {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post[parent_id]'], 'parent_id');
	}

	if (settings['post[old_parent_id]'] === undefined) {
		throw new Error('old_parent_id must be present');
	} else if (settings['post[old_parent_id]'] === null) {
		// it can be null without issue
	} else {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post[old_parent_id]'], 'old_parent_id');
	}

	// Rating
	if (settings['post[rating]'] !== null && ['e', 'q', 's'].includes(settings['post[rating]']) === false) {
		throw new Error('rating must be one of [\'e\', \'q\', \'s\']');
	}

	if (settings['post[old_rating]'] !== null && ['e', 'q', 's'].includes(settings['post[old_rating]']) === false) {
		throw new Error('old_rating must be one of [\'e\', \'q\', \'s\']');
	}
}

function make_data (settings) {
	return [
		'post[tag_string_diff]',
		'post[tag_string]',
		'post[old_tag_string]',
		'post[source_diff]',
		'post[source]',
		'post[old_source]',
		'post[description]',
		'post[old_description]',
		'post[parent_id]',
		'post[old_parent_id]',
		'post[rating]',
		'post[old_rating]',
		'post[edit_reason]'
	].reduce((acc, e) => {
		if (settings[e] !== null) {
			acc[e] = settings[e];
		}

		return acc;
	}, {});
}




/***/ }),

/***/ "./source/post/vote/post_vote.js":
/*!***************************************!*\
  !*** ./source/post/vote/post_vote.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_vote_up": () => (/* binding */ post_vote_up),
/* harmony export */   "post_vote_down": () => (/* binding */ post_vote_down)
/* harmony export */ });
/* harmony import */ var _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_vote.js */ "./source/post/vote/raw_post_vote.js");


async function post_vote_up (post_id) {
	return _raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_vote.call(this, {
		id: post_id,
		score: 1,
		no_unvote: true
	});
}

async function post_vote_down (post_id) {
	_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_vote.call(this, {
		id: post_id,
		score: -1,
		no_unvote: true
	});
}




/***/ }),

/***/ "./source/post/vote/raw_post_vote.js":
/*!*******************************************!*\
  !*** ./source/post/vote/raw_post_vote.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_vote": () => (/* binding */ raw_post_vote),
/* harmony export */   "post_vote_remove": () => (/* binding */ post_vote_remove)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_vote (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: `/posts/${settings.id}/votes`,
		response: 'JSON',

		format: 'URL',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

async function post_vote_remove (id) {
	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'DELETE',
		path: `/posts/${id}/votes`,
		response: 'JSON',

		format: undefined,
		data: undefined,
		authenticate: true
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.id, 'post_id');
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_vote_option)(settings.score);

	if (settings.no_unvote !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings.no_unvote, 'no_unvote');
	}
}

function make_data (settings) {
	const return_object = {
		score: settings.score
	};

	if (settings.no_unvote !== null) {
		return_object.no_unvote = settings.no_unvote;
	}

	return return_object;
}




/***/ }),

/***/ "./source/post_flag/create/post_flag_create.js":
/*!*****************************************************!*\
  !*** ./source/post_flag/create/post_flag_create.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post_flag_create": () => (/* binding */ post_flag_create),
/* harmony export */   "post_flag_reasons": () => (/* binding */ post_flag_reasons)
/* harmony export */ });
/* harmony import */ var _raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_post_flag_create.js */ "./source/post_flag/create/raw_post_flag_create.js");


const post_flag_reasons = {
	deletion: 'deletion',
	inferior: 'inferior',
	custom: 'user',
	dnp: 'dnp_artist',
	pay_content: 'pay_content',
	trace: 'trace',
	previously_deleted: 'previously_deleted',
	real: 'real_porn',
	corrupt: 'corrupt'
};

async function post_flag_create (reason, post_id, extra) {
	if (post_flag_reasons[reason] === undefined) {
		throw new Error(`Reason must be one of [${Object.keys(post_flag_reasons).join(', ')}]`);
	}

	const data = {
		'post_flag[post_id]': post_id,
		'post_flag[reason_name]': post_flag_reasons[reason],
		'post_flag[user_reason]': null,
		'post_flag[parent_id]': null
	};

	if (reason === post_flag_reasons.custom) {
		data['post_flag[user_reason]'] = extra;
	} else if (reason === post_flag_reasons.inferior) {
		data['post_flag[parent_id]'] = extra;
	}

	return _raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_flag_create.call(this, data);
}




/***/ }),

/***/ "./source/post_flag/create/raw_post_flag_create.js":
/*!*********************************************************!*\
  !*** ./source/post_flag/create/raw_post_flag_create.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_post_flag_create": () => (/* binding */ raw_post_flag_create)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_post_flag_create (settings) {
	validate_settings(settings);

	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'POST',
		path: '/post_flags',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings),
		authenticate: true
	}).catch(handle_error);
}

function validate_settings (settings) {
	(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post_flag[post_id]'], 'post_flag[post_id]');
	const valid_reason = [
		'deletion',
		'inferior',
		'user',
		'dnp_artist',
		'pay_content',
		'trace',
		'previously_deleted',
		'real_porn',
		'corrupt'
	];

	if (valid_reason.includes(settings['post_flag[reason_name]']) === false) {
		throw new Error(`post_flag[reason_name] must be one of [${valid_reason.join(', ')}]`);
	}

	if (settings['post_flag[reason_name]'] === 'user') {
		if (typeof settings['post_flag[user_reason]'] !== 'string')	{
			throw new Error('if post_flag[reason_name] is \'user\' then post_flag[user_reason] must be a string');
		}
	} else if (settings['post_flag[user_reason]'] !== null) {
		throw new Error('post_flag[user_reason] must be null unless post_flag[reason_name] is \'user\'');
	}

	if (settings['post_flag[reason_name]'] === 'inferior') {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['post_flag[parent_id]'], 'post_flag[parent_id]');
	} else if (settings['post_flag[parent_id]'] !== null) {
		throw new Error('post_flag[parent_id] must be null unless post_flag[parent_id] is \'inferior\'');
	}
}

function make_data (settings) {
	const return_object = {
		'post_flag[post_id]': settings['post_flag[post_id]'],
		'post_flag[reason_name]': settings['post_flag[reason_name]']
	};

	if (settings['post_flag[reason_name]'] === 'user') {
		return_object['post_flag[user_reason]'] = settings['post_flag[user_reason]'];
	} else if (settings['post_flag[reason_name]'] === 'inferior') {
		return_object['post_flag[parent_id]'] = settings['post_flag[parent_id]'];
	}

	return return_object;
}

function handle_error (err) {
	console.log(err);
	throw err;
};




/***/ }),

/***/ "./source/tags/index/raw_tag_search.js":
/*!*********************************************!*\
  !*** ./source/tags/index/raw_tag_search.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "raw_tag_search": () => (/* binding */ raw_tag_search)
/* harmony export */ });
/* harmony import */ var _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../download/download.__TARGET__.js */ "./source/download/download.userscript.js");
/* harmony import */ var _validation_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../validation/validation.js */ "./source/validation/validation.js");



async function raw_tag_search (settings) {
	validate_settings(settings);
	return _download_download_TARGET_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, {
		method: 'GET',
		path: '/tags',
		response: 'JSON',

		format: 'URL',
		data: make_data(settings)
	}).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function validate_settings (settings) {
	if (settings['search[id]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['search[id]'], 'search[id]');
	}

	if (settings['search[fuzzy_name_matches]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['search[fuzzy_name_matches]'], 'search[fuzzy_name_matches]');
	}

	if (settings['search[name_matches]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['search[name_matches]'], 'search[name_matches]');
	}

	if (settings['search[name]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_string)(settings['search[name]'], 'search[name]');
	}

	if (settings['search[category]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings['search[category]'], 'search[category]');
	}

	if (settings['search[hide_empty]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[hide_empty]'], 'search[hide_empty]');
	}

	if (settings['search[has_wiki]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[has_wiki]'], 'search[has_wiki]');
	}

	if (settings['search[has_artist]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[has_artist]'], 'search[has_artist]');
	}

	if (settings['search[is_locked]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[is_locked]'], 'search[is_locked]');
	}

	if (settings['search[hide_wiki]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_boolean)(settings['search[hide_wiki]'], 'search[hide_wiki]');
	}

	if (settings['search[order]'] !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_from_list)(settings['search[order]'], ['name', 'date', 'count', 'similarity'], 'search[order]');
	}

	if (settings.limit !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_counting_number)(settings.limit, 'limit');
	}

	if (settings.page !== null) {
		(0,_validation_validation_js__WEBPACK_IMPORTED_MODULE_1__.validate_page_string)(settings.page, 'page');
	}
}

function make_data (settings) {
	const return_object = {};

	if (settings['search[id]'] !== null) {
		return_object['search[id]'] = settings['search[id]'];
	}

	if (settings['search[fuzzy_name_matches]'] !== null) {
		return_object['search[fuzzy_name_matches]'] = settings['search[fuzzy_name_matches]'];
	}

	if (settings['search[name_matches]'] !== null) {
		return_object['search[name_matches]'] = settings['search[name_matches]'];
	}

	if (settings['search[name]'] !== null) {
		return_object['search[name]'] = settings['search[name]'];
	}

	if (settings['search[category]'] !== null) {
		return_object['search[category]'] = settings['search[category]'];
	}

	if (settings['search[hide_empty]'] !== null) {
		return_object['search[hide_empty]'] = settings['search[hide_empty]'];
	}

	if (settings['search[has_wiki]'] !== null) {
		return_object['search[has_wiki]'] = settings['search[has_wiki]'];
	}

	if (settings['search[has_artist]'] !== null) {
		return_object['search[has_artist]'] = settings['search[has_artist]'];
	}

	if (settings['search[is_locked]'] !== null) {
		return_object['search[is_locked]'] = settings['search[is_locked]'];
	}

	if (settings['search[order]'] !== null) {
		return_object['search[order]'] = settings['search[order]'];
	}

	if (settings.limit !== null) {
		return_object.limit = settings.limit;
	}

	if (settings.page !== null) {
		return_object.page = settings.page;
	}

	return return_object;
}




/***/ }),

/***/ "./source/tags/index/tag_search.js":
/*!*****************************************!*\
  !*** ./source/tags/index/tag_search.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tag_search": () => (/* binding */ tag_search)
/* harmony export */ });
/* harmony import */ var _raw_tag_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw_tag_search.js */ "./source/tags/index/raw_tag_search.js");


const tag_category = {
	general: 0,
	artist: 1,
	copyright: 3,
	character: 4,
	species: 5,
	invalid: 6,
	meta: 7,
	lore: 8
};

async function tag_search (settings, page = 0) {
	if (settings.page === null || settings.page === undefined) {
		settings.page = page.toString();
	} // else page is already set

	return _raw_tag_search_js__WEBPACK_IMPORTED_MODULE_0__.raw_tag_search.call(this, make_settings(settings)).catch(handle_error);
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}

function make_settings (settings) {
	const return_object = {
		'search[id]': null,
		'search[fuzzy_name_matches]': null,
		'search[name_matches]': null,
		'search[name]': null,
		'search[category]': null,
		'search[hide_empty]': null,
		'search[has_wiki]': null,
		'search[has_artist]': null,
		'search[is_locked]': null,
		'search[hide_wiki]': null,
		'search[order]': null,
		limit: null,
		page: settings.page
	};

	if (settings.id !== undefined && settings.id !== null) {
		return_object['search[id]'] = settings.id;
	} else if (settings.fuzzy_match !== undefined && settings.fuzzy_match !== null) {
		return_object['search[fuzzy_name_matches]'] = settings.fuzzy_match;
	} else if (settings.wild_match !== undefined && settings.wild_match !== null) {
		return_object['search[name_matches]'] = settings.wild_match;
	} else if (settings.exact_match !== undefined && settings.exact_match !== null) {
		return_object['search[name]'] = settings.exact_match;
	}

	for (const term of ['hide_empty', 'has_wiki', 'has_artist', 'is_locked', 'hide_wiki', 'order']) {
		if (settings[term] !== undefined && settings[term] !== null) {
			return_object[`search[${term}]`] = settings[term];
		}
	}

	if (settings.category !== null && settings.category !== undefined) {
		if (tag_category[settings.category] === undefined) {
			throw new Error(`Category must be one of [${Object.keys(tag_category).join(', ')}]`);
		} else {
			return_object['search[category]'] = settings.category;
		}
	}

	if (settings.limit !== null && settings.limit !== undefined) {
		return_object.limit = settings.limit;
	} else {
		return_object.limit = 1000;
	}

	return return_object;
}




/***/ }),

/***/ "./source/tags/index/tag_search_iterator.js":
/*!**************************************************!*\
  !*** ./source/tags/index/tag_search_iterator.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tag_search_iterator": () => (/* binding */ tag_search_iterator)
/* harmony export */ });
/* harmony import */ var _tag_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag_search.js */ "./source/tags/index/tag_search.js");


const tags_per_page = 1000;

// You can not have a different order when searching through posts like this
async function* tag_search_iterator (search_options) {
	// "Providing arbitrarily large values to obtain the most recent posts
	// is not portable and may break in the future". (wiki)
	// I do what I want
	search_options.page = null;
	search_options.limit = null;

	let max_id = 1e9;
	while (true) {
		// https://github.com/zwagoth/e621ng/issues/202
		const tags = await _tag_search_js__WEBPACK_IMPORTED_MODULE_0__.tag_search.call(this, {
			...search_options,
			page: `b${max_id}`,
			limit: 1000
		}).catch(handle_error);

		yield* tags;
		max_id = tags.reduce((acc, e) => acc.id < e.id ? acc : e).id;

		if (tags.length < tags_per_page) {
			return;
		}
	}
}

function handle_error (error) {
	// Todo
	console.log(error);
	throw error;
}




/***/ }),

/***/ "./source/validation/validation.js":
/*!*****************************************!*\
  !*** ./source/validation/validation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate_md5": () => (/* binding */ validate_md5),
/* harmony export */   "validate_counting_number": () => (/* binding */ validate_counting_number),
/* harmony export */   "validate_string": () => (/* binding */ validate_string),
/* harmony export */   "validate_vote_option": () => (/* binding */ validate_vote_option),
/* harmony export */   "validate_page_string": () => (/* binding */ validate_page_string),
/* harmony export */   "validate_boolean": () => (/* binding */ validate_boolean),
/* harmony export */   "validate_from_list": () => (/* binding */ validate_from_list)
/* harmony export */ });
function validate_md5 (md5) {
	if (typeof md5 !== 'string') {
		throw new Error('md5 must be of type string');
	}

	if (md5.length !== 32) {
		throw new Error('md5 must be of length 32');
	}

	const contains_non_hex = /[^0-9a-fA-F]/g;
	if (contains_non_hex.test(md5)) {
		throw new Error('md5 contains non-hexadecimal character');
	}
}

function validate_counting_number (number, name) {
	if (typeof number !== 'number') {
		throw new Error(`${name} must be a number`);
	}

	if (Number.isInteger(number) === false) {
		throw new Error(`${name}must be an integer`);
	}

	if (number < 0) {
		throw new Error(`${name} must be greater than zero`);
	}
}

function validate_string (string, name) {
	if (typeof string !== 'string') {
		throw new Error(`${name} is not a string`);
	}
}

function validate_vote_option (vote) {
	if (vote !== -1 && vote !== 0 && vote !== 1) {
		throw new Error('vote is not of the values [-1, 1]');
	}
}

function validate_page_string (string, name) {
	validate_string(string, name);

	if ((/[ab]?\d+/).test(string) === false) {
		throw new Error(`${name} does not match the format /[ab]?\\d+/`);
	}
}

function validate_boolean (boolean, name) {
	if (boolean !== false && boolean !== true) {
		throw new Error(`${name} is not of the type boolean`);
	}
}

function validate_from_list (value, list, name) {
	if (list.some(e => e === value) === false) {
		throw new Error(`Value ${value} not in list [${list.join(', ')}] for ${name}`);
	}
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _post_show_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post/show/raw_post_show.js */ "./source/post/show/raw_post_show.js");
/* harmony import */ var _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post/show/post_show.js */ "./source/post/show/post_show.js");
/* harmony import */ var _post_index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post/index/raw_post_search.js */ "./source/post/index/raw_post_search.js");
/* harmony import */ var _post_index_post_search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post/index/post_search.js */ "./source/post/index/post_search.js");
/* harmony import */ var _post_index_post_search_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./post/index/post_search_iterator.js */ "./source/post/index/post_search_iterator.js");
/* harmony import */ var _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post/vote/raw_post_vote.js */ "./source/post/vote/raw_post_vote.js");
/* harmony import */ var _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./post/vote/post_vote.js */ "./source/post/vote/post_vote.js");
/* harmony import */ var _post_create_raw_post_create_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./post/create/raw_post_create.js */ "./source/post/create/raw_post_create.js");
/* harmony import */ var _post_create_post_create_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./post/create/post_create.js */ "./source/post/create/post_create.js");
/* harmony import */ var _post_update_raw_post_update_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./post/update/raw_post_update.js */ "./source/post/update/raw_post_update.js");
/* harmony import */ var _post_update_post_update_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./post/update/post_update.js */ "./source/post/update/post_update.js");
/* harmony import */ var _post_copy_notes_raw_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./post/copy_notes/raw_post_copy_notes.js */ "./source/post/copy_notes/raw_post_copy_notes.js");
/* harmony import */ var _post_copy_notes_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./post/copy_notes/post_copy_notes.js */ "./source/post/copy_notes/post_copy_notes.js");
/* harmony import */ var _post_flag_create_raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./post_flag/create/raw_post_flag_create.js */ "./source/post_flag/create/raw_post_flag_create.js");
/* harmony import */ var _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./post_flag/create/post_flag_create.js */ "./source/post_flag/create/post_flag_create.js");
/* harmony import */ var _comment_create_raw_comment_create_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./comment/create/raw_comment_create.js */ "./source/comment/create/raw_comment_create.js");
/* harmony import */ var _comment_create_comment_create_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./comment/create/comment_create.js */ "./source/comment/create/comment_create.js");
/* harmony import */ var _post_bvas_post_bvas_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./post/bvas/post_bvas.js */ "./source/post/bvas/post_bvas.js");
/* harmony import */ var _blip_create_raw_blip_create_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./blip/create/raw_blip_create.js */ "./source/blip/create/raw_blip_create.js");
/* harmony import */ var _blip_create_blip_create_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./blip/create/blip_create.js */ "./source/blip/create/blip_create.js");
/* harmony import */ var _tags_index_raw_tag_search_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./tags/index/raw_tag_search.js */ "./source/tags/index/raw_tag_search.js");
/* harmony import */ var _tags_index_tag_search_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./tags/index/tag_search.js */ "./source/tags/index/tag_search.js");
/* harmony import */ var _tags_index_tag_search_iterator_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./tags/index/tag_search_iterator.js */ "./source/tags/index/tag_search_iterator.js");


































class E621API {
	// Any of these can be anything, but errors will be thrown
	// when any requests are trying to be made.
	constructor (useragent, username, api_key) {
		this.useragent = useragent;
		this.username = username;
		this.api_key = api_key;
	}
}

E621API.prototype.version = '1.00100';

E621API.prototype.raw_post_show = _post_show_raw_post_show_js__WEBPACK_IMPORTED_MODULE_0__.raw_post_show;
E621API.prototype.post_show_id = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__.post_show_id;
E621API.prototype.post_show_md5 = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__.post_show_md5;
E621API.prototype.post_show = _post_show_post_show_js__WEBPACK_IMPORTED_MODULE_1__.post_show;

E621API.prototype.raw_post_search = _post_index_raw_post_search_js__WEBPACK_IMPORTED_MODULE_2__.raw_post_search;
E621API.prototype.post_search = _post_index_post_search_js__WEBPACK_IMPORTED_MODULE_3__.post_search;
E621API.prototype.post_search_iterator = _post_index_post_search_iterator_js__WEBPACK_IMPORTED_MODULE_4__.post_search_iterator;

E621API.prototype.raw_post_vote = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__.raw_post_vote;
E621API.prototype.post_vote_up = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__.post_vote_up;
E621API.prototype.post_vote_down = _post_vote_post_vote_js__WEBPACK_IMPORTED_MODULE_6__.post_vote_down;
E621API.prototype.post_vote_remove = _post_vote_raw_post_vote_js__WEBPACK_IMPORTED_MODULE_5__.post_vote_remove;

E621API.prototype.raw_post_create = _post_create_raw_post_create_js__WEBPACK_IMPORTED_MODULE_7__.raw_post_create;
E621API.prototype.post_create = _post_create_post_create_js__WEBPACK_IMPORTED_MODULE_8__.post_create;

E621API.prototype.raw_post_update = _post_update_raw_post_update_js__WEBPACK_IMPORTED_MODULE_9__.raw_post_update;
E621API.prototype.post_update = _post_update_post_update_js__WEBPACK_IMPORTED_MODULE_10__.post_update;

E621API.prototype.raw_post_copy_notes = _post_copy_notes_raw_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_11__.raw_post_copy_notes;
E621API.prototype.post_copy_notes = _post_copy_notes_post_copy_notes_js__WEBPACK_IMPORTED_MODULE_12__.post_copy_notes;

E621API.prototype.raw_post_flag_create = _post_flag_create_raw_post_flag_create_js__WEBPACK_IMPORTED_MODULE_13__.raw_post_flag_create;
E621API.prototype.post_flag_create = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__.post_flag_create;
E621API.prototype.post_flag_reasons = _post_flag_create_post_flag_create_js__WEBPACK_IMPORTED_MODULE_14__.post_flag_reasons;

E621API.prototype.raw_comment_create = _comment_create_raw_comment_create_js__WEBPACK_IMPORTED_MODULE_15__.raw_comment_create;
E621API.prototype.comment_create = _comment_create_comment_create_js__WEBPACK_IMPORTED_MODULE_16__.comment_create;

E621API.prototype.post_bvas = _post_bvas_post_bvas_js__WEBPACK_IMPORTED_MODULE_17__.post_bvas;

E621API.prototype.raw_blip_create = _blip_create_raw_blip_create_js__WEBPACK_IMPORTED_MODULE_18__.raw_blip_create;
E621API.prototype.blip_create = _blip_create_blip_create_js__WEBPACK_IMPORTED_MODULE_19__.blip_create;

E621API.prototype.raw_tag_search = _tags_index_raw_tag_search_js__WEBPACK_IMPORTED_MODULE_20__.raw_tag_search;
E621API.prototype.tag_search = _tags_index_tag_search_js__WEBPACK_IMPORTED_MODULE_21__.tag_search;
E621API.prototype.tag_search_iterator = _tags_index_tag_search_iterator_js__WEBPACK_IMPORTED_MODULE_22__.tag_search_iterator;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (E621API);

})();

module.exports.E621API = __webpack_exports__["default"];
/******/ })()
;

},{}],2:[function(require,module,exports){
((base_html, base_css, GM) => {
	/*
	Example settings
	const a = new Setting({
		name: 'Testing',
		url: 'https://e621.net/extensions',
		description: 'things for that one thing that does stuff'
	});

	a.checkbox({
		name: 'Good Setting',
		key: 'setting_key',
		default: false,
		description: 'This is supposed to be a setting that does very good things'
	});

	a.list({
		name: 'Things that are listed',
		key: 'list_key',
		description: 'This is the testing for a list option',
		default: 'random',
		values: [
			{ name: '1', value: 'option1' },
			{ name: '2', value: 'what' },
			{ name: 'great', value: 'more' },
			{ name: 'bad', value: 'random' },
			{ name: 'ooops', value: 'norepeats' }
		]
	});

	a.custom({
		name: 'what',
		key: 'testtttt',
		description: 'does stuff',
		default: 'both',
		placeholder: 'ahhhh',
		is_secret: true
	}); */

	function load_page_and_defaults () {
		const is_correct_url = window.location.href === 'https://e621.net/extensions';
		const is_loaded = document.body.dataset.page_loaded === 'true';

		if (is_correct_url && is_loaded === false) {
			// This is the first time that the page has been loaded.
			clear_page();
			init_css();
			init_page();
			init_common();
		}

		// Export so it can be used in both browserify and greasemonkey
		if (module && module.exports) {
			module.exports = Setting;
		} else {
			window.Setting = Setting;
		}

		return null;

		function init_css () {
			const node = document.createElement('style');
			node.type = 'text/css';
			node.textContent = base_css;
			document.head.appendChild(node);
		}

		function clear_page () {
			while (document.head.firstChild) {
				document.head.removeChild(document.head.firstChild);
			}
			while (document.body.firstChild) {
				document.body.removeChild(document.body.firstChild);
			}
		}

		function init_page () {
			document.body.innerHTML = base_html;
			document.body.dataset.page_loaded = true;
		}

		function init_common () {
			const settings = new Setting({
				// Zero width space to ensure this is at the top
				name: '\u200BCommon',
				description: 'Settings that are common throughout many userscripts'
			});

			settings.button({
				name: 'Update Scripts',
				id: 'update_credentials_button',
				value: 'Update',
				description: 'Pressing this button should update username and API key on all relevant userscripts'
			});

			settings.custom({
				name: 'Username',
				placeholder: 'username',
				description: 'This should be your username on e621.net',
				key: null,
				id: 'credentials_username',
				is_secret: false
			});

			settings.custom({
				name: 'API Key',
				placeholder: 'API Key',
				description: 'Your api key which can be found from your <a href="https://e621.net/users/home">homepage</a>',
				key: null,
				id: 'credentials_api_key',
				is_secret: true
			});
		}
	}

	function do_constructor (options) {
		// Must have options.name
		// If options.url is not present, will not link anywhere
		// If options.description is not present, will have no description
		const container = document.createElement('div');
		container.id = options.name;
		container.classList.add('setting_section');

		// Title
		container.appendChild((() => {
			const type = options.url !== undefined ? 'a' : 'span';
			const title = document.createElement(type);
			title.textContent = options.name + '\u200B'; // Add zerowidth space
			title.classList.add('setting_header');
			if (options.url !== undefined) {
				title.href = options.url;
			}
			return title;
		})());

		// Description
		container.appendChild((() => {
			const description = document.createElement('span');
			description.classList.add('setting_description');
			if (options.description !== undefined) {
				description.textContent = options.description;
			}
			return description;
		})());

		// Setting values
		const settings_div = document.createElement('div');
		settings_div.classList.add('setting_values');
		['Name', 'Value', 'Description']
			.map(e => {
				const span = document.createElement('span');
				span.textContent = e;
				span.classList.add('settings_table_head');
				return span;
			})
			.forEach(e => settings_div.appendChild(e));
		container.appendChild(settings_div);

		return container;
	}

	async function get_value (key, default_value) {
		return GM.getValue(key)
			.then(e => e === undefined ? default_value : e);
	}

	function do_checkbox (options) {
		// Must have options.name, options.key, and options.section
		// options.default defaults to false
		const checkbox_name = `${options.section}_${options.key}`;

		// Title
		const title = document.createElement('label');
		title.textContent = options.name;
		title.htmlFor = checkbox_name;

		// Checkbox with load saved setting
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = checkbox_name;
		get_value(options.key, options.default || false)
			.then(e => (checkbox.checked = e));
		checkbox.addEventListener('change', () => {
			GM.setValue(options.key, checkbox.checked);
		});

		return [title, checkbox, options.description || ''];
	}

	function do_list (options) {
		const select = document.createElement('select');

		// Fill options
		options.values.map(e => {
			const option = document.createElement('option');
			option.textContent = e.name;
			option.value = e.value;
			if (e.title) {
				option.title = e.title;
			}
			return option;
		}).forEach(e => {
			select.appendChild(e);
		});

		// Listen for change
		select.addEventListener('change', () => {
			GM.setValue(options.key, select.value);
		});

		// Set default
		get_value(options.key, options.default).then(set_value => {
			Array.from(select.getElementsByTagName('option'))
				.map((e, i) => ({ index: i, value: e.value }))
				.filter(e => e.value === set_value)
				.forEach(e => (select.selectedIndex = e.index));
		});

		return [options.name || '', select, options.description || ''];
	}

	function do_custom (options) {
		const input = document.createElement('input');
		input.type = options.is_secret ? 'password' : 'text';
		input.placeholder = options.placeholder || '';

		// You can set options.key to null to have this be a dummy
		// placeholder. If you do then you can set it's id
		if (options.key !== null) {
			input.addEventListener('change', () => {
				GM.setValue(options.key, input.value);
			});

			get_value(options.key, options.default || '')
				.then(e => (input.value = e));
		} else {
			input.id = options.id;
		}

		return [options.name || '', input, options.description || ''];
	}

	class Setting {
		constructor (options) {
			// Insert the new node in alphabetical order. A nice qol feature
			const container = do_constructor(options);
			const other_sections = document.getElementsByClassName('setting_section');
			const last_item = Array.from(other_sections)
				.filter(e => section_compare(e, container) > 0)
				.sort(section_compare)[0];
			document.getElementById('settings').insertBefore(container, last_item);

			this.setting_node = container.getElementsByClassName('setting_values')[0];
			this.name = options.name;

			function section_compare (a, b) {
				const first = a.id.toLowerCase();
				const second = b.id.toLowerCase();
				return first.localeCompare(second);
			}
		}

		append (node) {
			const container = document.createElement('span');
			if (typeof node === 'string') {
				// innerHTML isn't usually liked, but what is a userscript
				// going to do that it can't already do?
				container.innerHTML = node;
			} else {
				container.appendChild(node);
			}

			this.setting_node.appendChild(container);
		}

		checkbox (options) {
			// options = { name, key, section, default }
			do_checkbox({
				...options,
				section: this.setting_node.parentNode.id
			}).forEach(this.append.bind(this));
		}

		list (options) {
			// options = {
			//   name, description, default, key
			//   values = [{ name, value, title? }],
			// }
			do_list(options).forEach(this.append.bind(this));
		}

		custom (options) {
			// options = {
			//   name, default?, key?, id?
			//   placeholder, description, is_secret,
			// }
			do_custom(options).forEach(this.append.bind(this));
		}

		button (options) {
			const button = document.createElement('button');
			button.textContent = options.value || '';
			button.id = options.id;

			[options.name || '', button, options.description || '']
				.forEach(this.append.bind(this));
		}
	};

	load_page_and_defaults();
})(`
<h1>e621 Extension Hub</h1>
<div id="settings"></div>
`, `
:root {
	--background-blue: #031131;
	--home-blue: #012e56;
	--standard-blue: #152f56;
	--comment-blue: #213a5f;
	--quote-blue: #284a81;
	--link-blue: #b4c7d9;
	--hover-blue: #2e76b4;

	--other-blue: #174891;

	--yellow: #fdba31;
	--light-yellow: #ffde9b;
	--dark-yellow: #d8b162;
}

body {
	background-color: var(--background-blue);
	background-image: url(https://e621.net/images/stripe.png);
}

/* Title at the top of the page */
h1 {
	padding: 1rem 3rem;
	color: var(--yellow);
	background-color: var(--standard-blue);
	border-radius: 1rem;
}

.setting_section {
	background-color: var(--standard-blue);
	margin: 1rem 0px;
	padding: 0.5rem 1.5rem 1.5rem 1.5rem;
    border-radius: 1rem;
}

/* Header and description */
.setting_header {
	color: var(--yellow);
    margin: 0px 0.5rem 0.5rem 1rem;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
}

.setting_description {
	color: #ccc;
}

/* Actual settings to be changed */
.setting_values {
	display: grid;
	grid-template-columns: 1fr 100px 4fr;
	color: #ccc;
}

.setting_values > * {
	border-bottom: 1px solid white;
	margin-bottom: 0.5rem;
	padding-bottom: 0.2rem;
}

.setting_values > span > input[type=text],
.setting_values > span > input[type=password] {
	width: 90px;
}

.settings_table_head {
	color: var(--hover-blue);
    text-decoration: underline;
}

.setting_values a, .setting_values a:visited {
	color: var(--link-blue);
}
`,
(() => {
	// eslint-disable-next-line no-undef
	const gm_object = window.GM ? window.GM : GM;
	wrap_generic('GM_setValue', 'setValue');
	wrap_generic('GM_getValue', 'getValue');
	return gm_object;

	async function wrap_generic (generic_name, new_name) {
		if (gm_object[new_name]) {
			return; // Already exists
		}

		if (window[generic_name] === undefined) {
			return; // No old function
		}

		gm_object[new_name] = async (...args) => new Promise((resolve, reject) => {
			try {
				resolve(window[generic_name](...args));
			} catch (e) {
				reject(e);
			}
		});
	}
})());

},{}],3:[function(require,module,exports){
let gm_object = null;
try {
	if (window.GM) {
		// We are not in a sandbox
		gm_object = window.GM;
	} else {
		// We are in a sandbox
		// eslint-disable-next-line no-undef
		gm_object = GM;
	}
} catch (e) { // e should be a ReferenceError
	// We have no access to the GM object. Something is wrong
	// Attempt to recover and hope we can make something out of it
	gm_object = {};
}

const transitions = [
	// Values
	['GM_getValue', 'getValue'],
	['GM_setValue', 'setValue'],
	['GM_listValues', 'listValues'],
	['GM_deleteValue', 'deleteValue'],

	// GM_getResourceText and GM_getResourceURL
	// are not supported in this version because of the
	// incompatibility between the GM_* functions and GM 4

	// Other
	['GM_notification', 'notification'],
	['GM_openInTab', 'openInTab'],
	['GM_setClipboard', 'setClipboard'],
	['GM_xmlhttpRequest', 'xmlHttpRequest'],
	['GM_addStyle', 'addStyle']
];

transitions.forEach(([old_id, new_id]) => {
	// If this is ever true, we are not in a sandbox. I do not think
	// there is a userscript manager that uses both the old GM_* functions
	// and sandboxes the code. The day I am wrong is the day this breaks.
	const old_function = window[old_id];
	if (old_function === undefined) {
		return;
	}

	// Why would we overwrite the new function with a worse old one
	if (gm_object[new_id] !== undefined) {
		return;
	}

	// Again, there should not be a time when we get here that the
	gm_object[new_id] = (...args) => new Promise((resolve, reject) => {
		try {
			resolve(old_function(...args));
		} catch (error) {
			reject(error);
		}
	});
});

function add_style (css) {
	const node = document.createElement('style');
	node.type = 'text/css';
	node.textContent = css;

	const head = document.head;
	const body = document.body;
	head ? head.appendChild(node) : body.appendChild(node);
}

// If its not present, overwrite with our own function
if (gm_object.addStyle === undefined) {
	gm_object.addStyle = add_style;
}

module.exports = gm_object;

},{}],4:[function(require,module,exports){
const Settings = require('./../dependencies/extensions.js');
const utils = require('./utils.js');
const main_css = require('./main.css');
const main_html = require('./main.html');

const templates = require('./templates.js');
const network = require('./network.js');
const tagging = require('./tagging.js');

if (['/extensions/', '/extensions'].includes(location.pathname)) {
	init_settings();
} else if (['/extensions/quick_tagger', '/extensions/quick_tagger/'].includes(location.pathname)) {
	init_page();
}

function init_page () {
	utils.clear_node(document.body);
	utils.clear_node(document.head);
	utils.add_css(main_css);
	utils.node_append(document.body, utils.string_to_node(main_html));

	init_template_tab();
	init_network_tab();
	init_tagging();

	do_stuff();

	document.body.addEventListener('keydown', asssssss);

	utils.get_value('network_delay').then(e => {
		setInterval(network.make_one_post_edit_from_queue, e * 1000);
	});
}

function init_template_tab () {
	utils.listener('templates_new', 'click', templates.add_blank_template);
	utils.listener('template_list', 'change', templates.list_selection_changed);
	utils.listener('templates_export_current', 'click', templates.export_current_template);
	utils.listener('templates_import', 'click', templates.import_template);
	utils.listener('templates_save', 'click', templates.save_all_templates);
	utils.listener('templates_delete_current', 'click', templates.delete_current_template);
	utils.listener('templates_reload', 'click', templates.clear_and_load_all_templates);
	templates.clear_and_load_all_templates();
}

function init_network_tab () {
	network.load_save_local();
	network.load_edit_live();
	network.check_if_api_key_is_set();
	utils.listener('network_add_local', 'click', network.add_saved_changes);
	utils.listener('network_save_local', 'change', network.update_save_local);
	utils.listener('network_edit_live', 'change', network.update_edit_live);
	utils.listener('network_export', 'click', network.export_saved_data);
	utils.listener('network_delete', 'click', network.delete_saved_data);
}

function init_tagging () {
	utils.listener('tag_template_list', 'change', tagging.update_current_template);
	tagging.update_from_saved_templates();
}

function do_stuff () {
	const select = document.getElementById('setting_option');
	select.addEventListener('change', e => {
		const option = select[select.selectedIndex];
		Array.from(document.getElementById('main').children)
			.forEach(e => e.classList.add('hidden'));
		document.getElementById(`${option.value}_tab`).classList.remove('hidden');
	});
}

function asssssss (event) {
	const tag_page_is_hidden = document.getElementById('tag_tab').classList.contains('hidden');
	if (tag_page_is_hidden === false) {
		const rules = Array.from(document.getElementsByClassName('tag_rule'));
		const hotkeys = Array.from(document.getElementsByClassName('tag_hotkey'));
		const used_nodes = []
			.concat(rules)
			.concat(hotkeys)
			.map(e => ({
				element: e,
				button: e.querySelector('button'),
				keycode: e.querySelector('button').innerText,
				checkbox: e.querySelector('input')
			}))
			.filter(e => e.keycode === event.key);

		used_nodes
			.map(e => e.checkbox)
			.filter(e => e)
			.forEach(e => (e.checked = !e.checked));

		used_nodes
			.filter(e => e.checkbox === null)
			.forEach(e => e.button.click());
	}
}

function init_settings () {
	const settings = new Settings({
		name: 'Quick Tagger',
		description: 'A tool to make working on tagging projects easy',
		url: 'https://e621.net/extensions/quick_tagger'
	});

	settings.custom({
		name: 'Post edit delay',
		key: 'network_delay',
		description: 'How long to wait between API requests for tag-edits',
		default: utils.default_values.network_delay,
		placeholder: '25 is recommended',
		is_secret: false
	});

	settings.checkbox({
		name: 'Save changes',
		key: 'save_local',
		default: utils.default_values.save_local,
		description: 'Toggles whether changes should be saved'
	});

	settings.checkbox({
		name: 'Upload changes',
		key: 'upload_changes',
		default: utils.default_values.upload_changes,
		description: 'Toggles whether changes should be made to e621'
	});

	document.getElementById('update_credentials_button').addEventListener('click', async event => {
		const username = document.getElementById('credentials_username').value;
		const api_key = document.getElementById('credentials_api_key').value;

		await utils.set_value('api_username', username);
		await utils.set_value('api_key', api_key);
	});
}

},{"./../dependencies/extensions.js":2,"./main.css":5,"./main.html":6,"./network.js":7,"./tagging.js":8,"./templates.js":9,"./utils.js":10}],5:[function(require,module,exports){
module.exports = "/* TODO make a list of common e621 colors */\n:root {\n\t--dark-blue: #031131;\n\t--blue: #284a81;\n\t--other-blue: #174891;\n\t--more-blue: #152f56;\n\n\t--yellow: #fdba31;\n\t--light-yellow: #ffde9b;\n\t--dark-yellow: #d8b162;\n}\n\n/* Couple of helper functions */\n.hidden { display: none !important; }\nhr { width: 100%; }\n.danger_button {\n\tbackground-color: indianred;\n\tborder-color: red;\n}\n\n/* Get #body to take up 100vh and automatically expand to take up more */\n/* https://stackoverflow.com/questions/6654958/make-body-have-100-of-the-browser-height */\nhtml { height: 100%; }\nbody { min-height: 100%; }\nbody { display: flex; }\n#body { flex-grow: 1; }\n\n/* Set color on body and links so it matches the rest of the theme */\nbody, a { color: white; }\na:visited { color: #aaa; }\n\n/* Avoid unintended side effects. Easiest to just change settings manually */\nbody, body > * {\n\tpadding: 0px;\n\tmargin: 0px;\n}\n\n/* Setup main view setting */\n#body {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n#header {\n\theight: 10vh;\n\tbackground-color: var(--dark-blue);\n}\n\n#main {\n\tbackground-color: var(--blue);\n\tflex-grow: 1;\n}\n\n\n/* Settings for each tab */\n.tab {\n\twidth: 100%;\n\theight: 100%;\n\n\tdisplay: flex;\n\tflex-direction: row;\n\talign-content: center;\n}\n\n.main {\n\theight: calc(100vh - 10vh - 2rem);\n\toverflow-y: auto;\n\toverflow-x: hidden;\n\tflex-grow: 1;\n\tpadding: 1rem;\n\n\tdisplay: flex;\n}\n\n.sidebar {\n\tflex-shrink: 0; /* Doesn't allow it to shrink */\n\twidth: 16rem;\n\t/* I don't like using calc like this, but I want the sidebar to scroll for\n\t   the tagging tab, and this was the first thing I could think of for an\n\t   element that also had flex-grow */\n\theight: calc(100vh - 10vh - 2rem - 5px);\n\tbackground-color: var(--dark-blue);\n\tborder-top: 5px solid var(--dark-yellow);\n\tpadding: 1rem;\n\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.sidebar > span:first-child, .sidebar > hr + span {\n\tfont-size: 2rem;\n}\n\n\n\n\n\n/*\nTemplate-Tab Specific Settings\n*/\n\n.keybind_button {\n\tborder: none;\n\tborder-radius: 0.3rem;\n\tbackground-color: var(--yellow);\n\tmin-width: 6rem;\n}\n\n/*\nNetwork-Tab Specific Settings\n*/\n\n#network_main {\n\tflex-direction: column;\n}\n\n#network_main > div:first-child {\n\tfont-size: 2rem;\n}\n\n#network_queue {\n\tborder-collapse: collapse;\n\n\tdisplay: block;\n\theight: 0px;\n\tflex-grow: 1;\n\toverflow-y: auto;\n}\n\n#network_queue > thead > tr {\n\ttop: -1px;\n\tposition: sticky;\n\tbackground-color: var(--dark-blue);\n\theight: 2rem;\n}\n\n#network_queue td {\n\tborder: 1px solid black;\n\tpadding: 0.2rem 0.5rem;\n}\n\n#network_queue button {\n\twidth: 100%;\n}\n\n#network_queue_body > :nth-child(odd) { background-color: transparent; }\n#network_queue_body > :nth-child(even) { background-color: #ffffff22; }\n\n/*\nTag-Tab Specific Settings\n*/\n\n#tag_search_string > * {\n\tdisplay: inline-block;\n\tmargin: 0 0.3rem;\n}\n\n#tag_rules_and_hotkeys {\n\tflex-grow: 1;\n\toverflow-y: auto;\n\toverflow-x: hidden;\n}\n\n.tag_hotkey_button { min-width: 6rem; }\n.tag_rule_button { min-width: 2rem; }\n\n#tag_main {\n\tdisplay:flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n#tag_main > * {\n\tmax-width: 90%;\n\tmax-height: 90%;\n}\n\n/*\nTag-Tab Left Posts Sidebar\n*/\n#post_list {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\toverflow: auto;\n}\n\n#tag_sidebar.tag_search_loading {\n\tbackground-color: #ff330077;\n}\n\n.post_small {\n\tborder: 1px solid white;\n\tmargin: 0.5rem;\n\tpadding: 0.3rem;\n\twidth: 10rem;\n\theight: 10rem;\n\tmin-height: 10rem;\n\tmin-width: 10rem;\n\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.post_small > img {\n\tmax-height: 10rem;\n\tmax-width: 10rem;\n}\n\n.post_visited {\n\tbackground-color: var(--light-yellow);\n}\n";

},{}],6:[function(require,module,exports){
module.exports = "<div id=\"body\">\n\t<div id=\"header\">\n\t\t<select id=\"setting_option\">\n\t\t\t<option value=\"tag\" selected=\"selected\">Tag</option>\n\t\t\t<option value=\"template\">Template Editor</option>\n\t\t\t<option value=\"network\">Network Option</option>\n\t\t</select>\n\n\t\t<div id=\"network\">\n\t\t</div>\n\n\t\t<div id=\"template\">\n\t\t</div>\n\n\t\t<a href=\"https://e621.net/extensions\">set apikey/username</a>\n\t</div>\n\t<div id=\"main\">\n\t\t<div id=\"tag_tab\" class=\"tab\">\n\t\t\t<div id=\"tag_sidebar\" class=\"sidebar\">\n\t\t\t\t<span>Current Search</span>\n\t\t\t\t<div id=\"tag_search_string\"></div>\n\t\t\t\t<hr/>\n\t\t\t\t<div id=\"post_list\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"tag_main\" class=\"main\">\n\t\t\t\t<div id=\"tag_main_container\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"tag_sidebar_right\" class=\"sidebar\">\n\t\t\t\t<span>Current Template</span>\n\t\t\t\t<select id=\"tag_template_list\"></select>\n\t\t\t\t<hr/>\n\t\t\t\t<span>Rules and Hotkeys</span>\n\t\t\t\t<div id=\"tag_rules_and_hotkeys\">\n\t\t\t\t\t<div id=\"tag_hotkeys\"></div>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<div id=\"tag_rules\"></div>\n\t\t\t\t</div>\n\t\t\t\t<hr/>\n\t\t\t\t<span>Post Info</span>\n\t\t\t\t<table id=\"post_info\">\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>Post Id</td>\n\t\t\t\t\t\t\t<td id=\"post_info_id\"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>Is Approved</td>\n\t\t\t\t\t\t\t<td id=\"post_info_is_approved\"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>Is Flagged</td>\n\t\t\t\t\t\t\t<td id=\"post_info_is_flagged\"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>File Type</td>\n\t\t\t\t\t\t\t<td id=\"post_info_file_type\"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id=\"template_tab\" class=\"hidden tab\">\n\t\t\t<div id=\"templates_sidebar\" class=\"sidebar\">\n\t\t\t\t<span>Templates</span>\n\t\t\t\t<select id=\"template_list\"></select>\n\t\t\t\t<hr/>\n\t\t\t\t<button id=\"templates_new\">Create Blank Template</button>\n\t\t\t\t<button id=\"templates_save\">Save All Templates</button>\n\t\t\t\t<hr/>\n\t\t\t\t<button id=\"templates_delete_current\" class=\"danger_button\">Delete Current Template</button>\n\t\t\t\t<button id=\"templates_reload\">Abort All Changes</button>\n\t\t\t\t<hr/>\n\t\t\t\t<button id=\"templates_export_current\">Export Current Template</button>\n\t\t\t\t<input id=\"templates_export_string\" placeholder=\"Exported template will show here\"></input>\n\t\t\t\t<hr/>\n\t\t\t\t<button id=\"templates_import\">Import Template</button>\n\t\t\t\t<input id=\"templates_import_string\" placeholder=\"Place template text here\"></input>\n\t\t\t</div>\n\t\t\t<div id=\"template_main\" class=\"main\">\n\t\t\t</div>\n\t\t</div>\n\t\t<div id=\"network_tab\" class=\"hidden tab\">\n\t\t\t<div id=\"network_sidebar\" class=\"sidebar\">\n\t\t\t\t<span>Network</span>\n\t\t\t\t<hr/>\n\t\t\t\t<label>\n\t\t\t\t\t<input type=\"checkbox\" id=\"network_save_local\">Save changes locally</input>\n\t\t\t\t</label>\n\t\t\t\t<label>\n\t\t\t\t\t<input type=\"checkbox\" id=\"network_edit_live\">Make changes to e621</input>\n\t\t\t\t</label>\n\t\t\t\t<button id=\"network_add_local\">Add local changes to queue</button>\n\t\t\t\t<hr/>\n\t\t\t\t<button id=\"network_export\">Download Saved Changes</button>\n\t\t\t\t<button id=\"network_import\"><s>Import Changes</s> To Be Fixed</button>\n\t\t\t\t<hr/>\n\t\t\t\t<button id=\"network_delete\" class=\"danger_button\">Delete All Saved Changes</button>\n\t\t\t</div>\n\t\t\t<div id=\"network_main\" class=\"main\">\n\t\t\t\t<div>Current Change Queue</div>\n\t\t\t\t<div id=\"network_time_remaining\">0 post(s) in queue. 0s remain until complete.</div>\n\t\t\t\t<hr/>\n\t\t\t\t<table id=\"network_queue\">\n\t\t\t\t\t<thead><tr>\n\t\t\t\t\t\t<!-- Using Non-Breaking spaces is a hack, but it works -->\n\t\t\t\t\t\t<td>Post&nbsp;Id</td>\n\t\t\t\t\t\t<td style=\"width: 100%\">Edit&nbsp;String</td>\n\t\t\t\t\t\t<td>From&nbsp;Disk</td>\n\t\t\t\t\t\t<td>Remove</td>\n\t\t\t\t\t\t<td>Timestamp</td>\n\t\t\t\t\t</tr></thead>\n\t\t\t\t\t<tbody id=\"network_queue_body\">\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

},{}],7:[function(require,module,exports){
const utils = require('./utils.js');

/* const POST_CHANGE_QUEUE = [ {
	post_id: int,
	edit_string: string,
	from_disk: bool,
	complete: bool,
	timestamp: int
} ]; */

async function get_changes_from_disk () {
	const changes_string = await utils.get_value('changes');
	const changes_json = JSON.parse(changes_string);
	// TODO decompress change
	for (const change of changes_json) {
		change.from_disk = true;
	}

	return changes_json;
}

async function save_changes_to_disk (changes) {
	// TODO compress change
	for (const change of changes) {
		delete change.from_disk;
	}

	const changes_string = JSON.stringify(changes);
	await utils.set_value('changes', changes_string);
}

async function add_saved_changes () {
	const changes = await get_changes_from_disk();
	changes.map(add);
}

async function add_change_to_disk (change) {
	const changes = await get_changes_from_disk();
	const is_saved_on_disk = changes.some(e => e.timestamp === changes.timestamp);
	if (is_saved_on_disk === false) {
		changes.push(change);
		await save_changes_to_disk(changes);
	}
}

async function remove_change_from_disk (timestamp) {
	const changes = await get_changes_from_disk();
	const index_on_disk = changes.findIndex(e => e.timestamp === timestamp);
	const is_saved_on_disk = index_on_disk !== -1;
	if (is_saved_on_disk === true) {
		changes.splice(index_on_disk, 1);
		await save_changes_to_disk(changes);
	}
}

async function set_complete_on_disk (timestamp) {
	const changes = await get_changes_from_disk();
	const index_on_disk = changes.findIndex(e => e.timestamp === timestamp);
	const is_saved_on_disk = index_on_disk !== -1;
	if (is_saved_on_disk === true) {
		changes[index_on_disk].complete = true;
		await save_changes_to_disk(changes);
	}
}

function add_change_to_list (change) {
	const is_in_element = Array.from(document.getElementsByClassName('network_timestamp'))
		.map(e => e.innerText)
		.filter(e => e === change.timestamp.toString())
		.some(e => e);

	if (is_in_element === false) {
		document.getElementById('network_queue_body').appendChild(create_change_node(change));
		update_time_remaining();
	}
}

function remove_change_from_list (timestamp) {
	const timestamp_element = Array.from(document.getElementsByClassName('network_timestamp'))
		.filter(e => e.innerText === timestamp.toString())[0];
	const element_is_real = timestamp_element !== undefined;
	if (element_is_real === true) {
		const row = timestamp_element.parentNode;
		row.parentNode.removeChild(row);
		update_time_remaining();
	}
}

async function update_time_remaining () {
	const node = document.getElementById('network_time_remaining');
	const num_children = document.getElementById('network_queue_body').children.length;
	const time_between_posts = await utils.get_value('network_delay');
	const seconds_remaining = num_children * time_between_posts;
	// https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
	const time_string = new Date(seconds_remaining * 1000).toISOString().substring(11, 19);
	node.innerText = `${num_children} post(s) in queue. ${time_string} remain until complete.`;
}

async function add (change) {
	const should_save = document.getElementById('network_save_local').checked;
	const should_upload = document.getElementById('network_edit_live').checked;

	if (change.from_disk === false && should_save === true) {
		await add_change_to_disk(change);
	}

	if (change.complete === false && should_upload === true) {
		add_change_to_list(change);
	}
}

async function remove (timestamp) {
	await remove_change_from_disk(timestamp);
	remove_change_from_list(timestamp);
}

async function complete (timestamp) {
	set_complete_on_disk(timestamp);
	remove_change_from_list(timestamp);
}

async function make_changes_from_node (node) {
	const post_id = parseInt(node.children[0].innerText, 10);
	const { to_add, to_remove } = node.children[1].innerText
		.split(' ')
		.reduce((acc, e) => {
			if (e.charAt(0) === '-') {
				acc.to_remove.push(e.substring(1));
			} else {
				acc.to_add.push(e);
			}
			return acc;
		}, { to_remove: [], to_add: [] });

	const is_api_good = await utils.can_api_be_authenticated();
	if (is_api_good === true) {
		const api = await utils.get_api();
		await api.post_update({ id: post_id, tags_to_add: to_add, tags_to_remove: to_remove });
	}
}

async function make_one_post_edit_from_queue () {
	console.log('Tag edit ', new Date().getTime());
	const queue = document.getElementById('network_queue_body');
	const first_in_queue = queue.children[0];
	if (first_in_queue !== undefined) {
		try {
			const post_timestamp = parseInt(first_in_queue.children[4].innerText, 10);
			await make_changes_from_node(first_in_queue);
			await complete(post_timestamp);
		} catch (err) {
			// TODO convey this error message to the user
			console.log('Could not edit the top item of the queue. Something is wrong!');
			console.log(err);
		}
	}
}

function create_change_node (change) {
	const node = utils.string_to_node(`
		<table>
			<tr>
				<td><a href="https://e621.net/posts/${utils.escape_html(change.post_id)}">${utils.escape_html(change.post_id)}</a></td>
				<td>${utils.escape_html(change.edit_string)}</td>
				<td>${change.from_disk ? 'yes' : 'no'}</td>
				<td><button class="danger_button">&nbsp;</button></td>
				<td class="network_timestamp">${utils.escape_html(change.timestamp)}</td>
			</tr>
		</table>
	`).querySelector('tr');

	node.querySelector('button').addEventListener('click', e => remove(change.timestamp));

	return node;
}

async function load_save_local () {
	const value = await utils.get_value('save_local');
	const node = document.getElementById('network_save_local');
	node.checked = value;
}

async function load_edit_live () {
	const value = await utils.get_value('upload_changes');
	const node = document.getElementById('network_edit_live');
	node.checked = value;
}

async function update_save_local (event) {
	const node = document.getElementById('network_save_local');
	await utils.set_value('save_local', node.checked);
}

async function update_edit_live (event) {
	const node = document.getElementById('network_edit_live');
	await utils.set_value('upload_changes', node.checked);
}

async function export_saved_data (event) {
	const changes = await get_changes_from_disk();
	utils.save_json_file(changes, `Idems_Quick_Tagger_Export-${new Date().getTime()}.json`);
}

async function delete_saved_data (event) {
	await save_changes_to_disk([]);
}

// TODO have a better name for this
async function check_if_api_key_is_set (event) {
	const is_set = await utils.can_api_be_authenticated();
	if (is_set === false) {
		document.getElementById('network_edit_live').checked = false;
		document.getElementById('network_edit_live').disabled = true;
		const button = document.getElementById('network_add_local');
		const warning = utils.string_to_node(`
			<div>
				<hr/>
				Your Username and/or API key is not set. <a href="https://e621.net/extensions">Use this link to set them.</a>
				<hr/>
			</div>
		`);
		button.parentNode.insertBefore(warning, button);
	}
}

module.exports = {
	add_saved_changes: add_saved_changes,
	add: add,
	remove: remove,
	update_save_local: update_save_local,
	update_edit_live: update_edit_live,
	load_save_local: load_save_local,
	load_edit_live: load_edit_live,
	export_saved_data: export_saved_data,
	delete_saved_data: delete_saved_data,
	check_if_api_key_is_set: check_if_api_key_is_set,
	make_one_post_edit_from_queue: make_one_post_edit_from_queue
};

},{"./utils.js":10}],8:[function(require,module,exports){
const utils = require('./utils.js');
const network = require('./network.js');

async function update_from_saved_templates () {
	const select = document.getElementById('tag_template_list');
	utils.clear_node(select);

	const empty_option = utils.string_to_node('<option> </option>');
	select.appendChild(empty_option);

	const templates_raw = await utils.get_value('templates');
	const templates = JSON.parse(templates_raw);
	templates.forEach((e, i) => {
		const node = utils.string_to_node(`<option>${utils.escape_html(e.name)}</option>`);
		select.appendChild(node);
	});
}

async function update_current_template (event) {
	const select = document.getElementById('tag_template_list');
	const selected = select[select.selectedIndex];
	const name = selected.innerText;
	const template = await get_template_based_on_name(name);
	clear_post();
	clear_template();
	load_template(template);
}

async function get_template_based_on_name (name) {
	const templates_raw = await utils.get_value('templates');
	const templates = JSON.parse(templates_raw);

	// Can return undefined if the name isn't found
	return templates.filter(e => e.name === name)[0];
}

function clear_template () {
	utils.clear_node(document.getElementById('tag_hotkeys'));
	utils.clear_node(document.getElementById('tag_rules'));
	utils.clear_node(document.getElementById('tag_search_string'));
	utils.clear_node(document.getElementById('post_list'));
	POST_SEARCH_ITERATOR = null;
}

let POST_SEARCH_ITERATOR = null;

async function load_some_posts () {
	const is_searching = document.getElementById('tag_sidebar').classList.contains('tag_search_loading');
	if (is_searching === false) {
		document.getElementById('tag_sidebar').classList.add('tag_search_loading');

		if (POST_SEARCH_ITERATOR === null) {
			const api = await utils.get_api();
			const search = Array.from(document.getElementById('tag_search_string').children)
				.map(e => e.innerText)
				.join(' ');
			POST_SEARCH_ITERATOR = api.post_search_iterator(search);
		}

		for (let i = 0; i < 100; i++) {
			const { value } = await POST_SEARCH_ITERATOR.next();
			const node = make_small_post_node(value);
			document.getElementById('post_list').appendChild(node);
		}

		document.getElementById('tag_sidebar').classList.remove('tag_search_loading');
	}
}

function load_template (template) {
	if (template !== undefined) {
		load_search_string();
		load_hotkeys();
		load_rules();
		load_some_posts(); // async
	}

	function load_search_string () {
		const searches = template.query.split(' ')
			.filter(e => e)
			.map(e => utils.escape_html(e))
			.map(e => `<span>${e}</span>`)
			.map(e => utils.string_to_node(e));
		for (const child of searches) {
			document.getElementById('tag_search_string').appendChild(child);
		}
	}

	function load_hotkeys () {
		for (const child of Array.from(make_hotkeys(template).children)) {
			document.getElementById('tag_hotkeys').appendChild(child);
		}
	}

	function load_rules () {
		for (const rule of template.rules.map(e => make_rule_node(e))) {
			document.getElementById('tag_rules').appendChild(rule);
		}
	}

	function make_rule_node (rule) {
		const rule_node = utils.string_to_node(`
			<div class="tag_rule">
				<button class="tag_rule_button">${utils.escape_html(rule.keycode)}</button>	
				<label>
				<input type="checkbox"">
					${utils.escape_html(rule.tags_to_add)}
				</input>
			</div>
		`);

		rule_node.querySelector('button').addEventListener('click', e => {
			const checkbox = rule_node.querySelector('input');
			checkbox.checked = !checkbox.checked;
		});

		return rule_node;
	}

	function make_hotkeys (template) {
		const node = utils.string_to_node(`
			<div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_upvote_button">${utils.escape_html(template.upvote)}</button>
					<span><s>Upvote</s></span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_favorite_button">${utils.escape_html(template.favorite)}</button>
					<span><s>Favorite</s></span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_downvote_button">${utils.escape_html(template.downvote)}</button>
					<span><s>Downvote</s></span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_previous_button">${utils.escape_html(template.previous)}</button>
					<span>Previous</span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_submit_button">${utils.escape_html(template.submit)}</button>
					<span>Submit</span>
				</div>
				<div class="tag_hotkey">
					<button class="tag_hotkey_button" id="tag_next_button">${utils.escape_html(template.next)}</button>
					<span>Next</span>
				</div>
			</div>
		`);

		add_listener('#tag_upvote_button', upvote_current_post);
		add_listener('#tag_favorite_button', favorite_current_post);
		add_listener('#tag_downvote_button', downvote_current_post);
		add_listener('#tag_previous_button', view_previous_post);
		add_listener('#tag_submit_button', submit_current_changes);
		add_listener('#tag_next_button', view_next_post);

		function add_listener (query, response) {
			node.querySelector(query).addEventListener('click', response);
		}

		return node;
	}
}

function clear_post () {
	utils.clear_node(document.getElementById('post_info_id'));
	document.getElementById('post_info_is_approved').textContent = '';
	document.getElementById('post_info_is_flagged').textContent = '';
	document.getElementById('post_info_file_type').textContent = '';
	utils.clear_node(document.getElementById('tag_main'));
	// Clear Rules
	Array.from(document.getElementsByClassName('tag_rule'))
		.map(e => e.querySelector('input'))
		.forEach(e => (e.checked = false));
}

function load_post (post_node) {
	// eslint-disable-next-line no-unused-expressions
	document.querySelector('.post_selected')?.classList.remove('post_selected');
	post_node.classList.add('post_selected');
	post_node.classList.add('post_visited');

	// Load Post Info
	document.getElementById('post_info_id').appendChild(utils.string_to_node(`
		<a href="https://e621.net/posts/${post_node.dataset.post_id}">${post_node.dataset.post_id}</a>
	`));
	document.getElementById('post_info_is_approved').textContent = post_node.dataset.is_approved;
	document.getElementById('post_info_is_flagged').textContent = post_node.dataset.is_flagged;
	document.getElementById('post_info_file_type').textContent = post_node.dataset.file_type;

	// Load Image
	const img_container = document.getElementById('tag_main');
	const file_type = post_node.dataset.file_type;
	if (['png', 'jpg', 'gif'].includes(file_type)) {
		img_container.appendChild(utils.string_to_node(`<img src="${post_node.dataset.full_file}"/>`));
	} else if (['webm'].includes(file_type)) {
		const video_node = utils.string_to_node(`
			<video controls playsinline autoplay muted src="${post_node.dataset.full_file}"></video<
		`);
		img_container.appendChild(video_node);
	} else if (['swf'].includes(file_type)) {
		// TODO tell the user that flash is not supported
	} else {
		// TODO new file types that are not supported
	}
}

function make_small_post_node (post) {
	const node = utils.string_to_node(`
		<div class="post_small">
			<img src="${post.preview.url}"/>
		</div>
	`);
	node.dataset.post_id = post.id;
	node.dataset.is_approved = post.flags.pending === false;
	node.dataset.is_flagged = post.flags.flagged;
	node.dataset.file_type = post.file.ext;
	node.dataset.full_file = post.file.url;
	node.addEventListener('click', () => {
		clear_post();
		load_post(node);
	});
	return node;
}

function upvote_current_post () {

}

function favorite_current_post () {

}

function downvote_current_post () {

}

function view_previous_post () {
	const selected = document.querySelector('.post_selected');
	if (selected !== null) {
		const previous = selected.previousElementSibling;
		if (previous !== null) {
			clear_post();
			load_post(previous);
			previous.scrollIntoView();
		}
	}
}

function view_next_post () {
	const selected = document.querySelector('.post_selected');
	if (selected !== null) {
		const next = selected.nextElementSibling;
		if (next !== null) {
			clear_post();
			load_post(next);
			next.scrollIntoView();
		}

		let this_one = next;
		for (let i = 0; i < 5; i++) {
			if (this_one === null) {
				load_some_posts();
				break;
			} else {
				this_one = this_one.nextElementSibling;
			}
		}
	}
}

async function submit_current_changes () {
	const post_id = parseInt(document.getElementById('post_info_id').innerText, 10);
	if (Number.isNaN(post_id) === false) {
		const edit_string = Array.from(document.getElementsByClassName('tag_rule'))
			.map(e => e.querySelector('input'))
			.filter(e => e.checked === true)
			.map(e => e.parentNode.innerText)
			.reduce((acc, e) => `${acc} ${e}`, '')
			.split(' ')
			.filter(e => e)
			.join(' ');

		await network.add({
			post_id: post_id,
			edit_string: edit_string,
			from_disk: false,
			complete: false,
			timestamp: new Date().getTime()
		});

		view_next_post();
	}
}

module.exports = {
	update_from_saved_templates: update_from_saved_templates,
	update_current_template: update_current_template
};

},{"./network.js":7,"./utils.js":10}],9:[function(require,module,exports){
const utils = require('./utils.js');

const DEFAULT_UNBOUND_STRING = 'Unbound';
const DEFAULT_TEMPLATE_NAME = 'Untitled Template';

function apply_settings_listener (node) {
	node.addEventListener('click', event => {
		node.innerText = '<press a key>';
		node.blur(); // Allows for arrow keys
		document.body.addEventListener('keyup', watch_key_press);

		function watch_key_press (e) {
			document.body.removeEventListener('keyup', watch_key_press);
			node.innerText = utils.parse_keycode(e.key);
		}
	});
}

function create_blank_rule () {
	const node = utils.string_to_node(`
		<div class="rule">
			<button
				class="keybind_button"
			>${DEFAULT_UNBOUND_STRING}</button>	
			<input
				class="rule_tag_string"
				placeholder="tag string to apply"
			></input>
			<button class="rule_delete">Delete Rule</button>
		</div>
	`);

	node.querySelector('.rule_delete').addEventListener('click', e => {
		node.parentNode.removeChild(node);
	});

	apply_settings_listener(node.querySelector('.keybind_button'));

	return node;
}

function create_blank_template (id) {
	const node = utils.string_to_node(`
		<div class="template" id="template_${id}">
			<div>Template Name</div>
			<input class="template_name" placeholder="Template Name" value="${DEFAULT_TEMPLATE_NAME} ${id}"></input>
			<hr/>
			<div>Template Search String</div>
			<input class="template_search" placeholder="Search String"></input>		
			<hr/>
			<div>
				<button class="keybind_button template_upvote_button">${DEFAULT_UNBOUND_STRING}</button>	
				<span>Upvote</button>
			</div><div>
				<button class="keybind_button template_favorite_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Favorite</span>
			</div><div>
				<button class="keybind_button template_downvote_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Downvote</span>
			</div>
			<hr/>
			<div>
				<button class="keybind_button template_previous_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Previous Post</span>
			</div><div>
				<button class="keybind_button template_submit_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Submit</span>
			</div><div>
				<button class="keybind_button template_next_button">${DEFAULT_UNBOUND_STRING}</button>
				<span>Next Post</span>
			</div>
			<hr/>
			<div class="template_rules">
				<button class="template_new_rule">New Rule</button>
			</div>
		</div>
	`);

	node.querySelector('.template_new_rule').addEventListener('click', e => {
		node.querySelector('.template_rules').append(create_blank_rule());
	});

	apply_settings_listener(node.querySelector('.template_upvote_button'));
	apply_settings_listener(node.querySelector('.template_favorite_button'));
	apply_settings_listener(node.querySelector('.template_downvote_button'));
	apply_settings_listener(node.querySelector('.template_previous_button'));
	apply_settings_listener(node.querySelector('.template_submit_button'));
	apply_settings_listener(node.querySelector('.template_next_button'));

	node.querySelector('.template_name').addEventListener('change', e => update_template_name_in_list(node));

	return node;
}

function update_template_name_in_list (node) {
	// not using get_current_template_and_option() becuase it *could* give the wrong node
	const id = parseInt((/template_(\d+)/gm).exec(node.id)[1], 10);
	const select = document.getElementById('template_list');
	const option = select.querySelector(`#template_list_template_${id}`);
	option.innerText = node.querySelector('.template_name').value;
}

function select_template (id) {
	for (const node of document.getElementsByClassName('template')) {
		node.classList.add('hidden');
	}

	document.getElementById(`template_${id}`).classList.remove('hidden');
	document.getElementById(`template_list_template_${id}`).selected = true;
}

function list_selection_changed () {
	const selection_node = document.getElementById('template_list');
	const option_node = selection_node[selection_node.selectedIndex];
	select_template(option_node.value);
}

function add_blank_template () {
	const id = new_template_id();
	const node = create_blank_template(id);
	node.classList.add('hidden');

	document.getElementById('template_main').append(node);

	document.getElementById('template_list').prepend(
		utils.string_to_node(`<option value="${id}" id="template_list_template_${id}">${DEFAULT_TEMPLATE_NAME} ${id}</option>`)
	);

	select_template(id);

	return node;

	function new_template_id () {
		let max = 0;
		for (const node of document.getElementsByClassName('template')) {
			const id = parseInt((/template_(\d+)/gm).exec(node.id)[1], 10);
			if (max < id) {
				max = id;
			}
		}

		for (const node of document.getElementById('template_list').children) {
			const id = parseInt(node.value, 10);
			if (max < id) {
				max = id;
			}
		}

		return max + 1;
	}
}

function template_to_json (node) {
	return {
		name: node.querySelector('.template_name').value,
		query: node.querySelector('.template_search').value,
		upvote: node.querySelector('.template_upvote_button').innerText,
		downvote: node.querySelector('.template_downvote_button').innerText,
		favorite: node.querySelector('.template_favorite_button').innerText,
		previous: node.querySelector('.template_previous_button').innerText,
		next: node.querySelector('.template_next_button').innerText,
		submit: node.querySelector('.template_submit_button').innerText,
		rules: Array.from(node.querySelectorAll('.rule')).map(e => ({
			// tags_to_add is old terminology from v1. It can accept minus signs
			tags_to_add: e.querySelector('.rule_tag_string').value,
			keycode: e.querySelector('.keybind_button').innerText
		}))
	};
}

function add_json_as_template (json) {
	const node = add_blank_template();

	selective_set(node.querySelector('.template_name'), 'value', json.name);
	selective_set(node.querySelector('.template_search'), 'value', json.query);
	selective_set(node.querySelector('.template_upvote_button'), 'innerText', json.upvote);
	selective_set(node.querySelector('.template_downvote_button'), 'innerText', json.downvote);
	selective_set(node.querySelector('.template_favorite_button'), 'innerText', json.favorite);
	selective_set(node.querySelector('.template_previous_button'), 'innerText', json.previous);
	selective_set(node.querySelector('.template_next_button'), 'innerText', json.next);
	selective_set(node.querySelector('.template_submit_button'), 'innerText', json.submit);

	for (let i = 0; i < json.rules.length; i++) {
		node.querySelector('.template_new_rule').click();
	}
	Array.from(node.querySelectorAll('.rule')).forEach((e, i) => {
		// tags_to_add is old terminology from v1. It can accept minus signs
		selective_set(e.querySelector('.rule_tag_string'), 'value', json.rules[i].tags_to_add);
		selective_set(e.querySelector('.keybind_button'), 'innerText', json.rules[i].keycode);
	});

	update_template_name_in_list(node);

	return node;

	function selective_set (node, setting, value) {
		if (value) {
			node[setting] = value;
		}
	}
}

function export_current_template () {
	const { template } = get_current_template_and_option();
	const json = template_to_json(template);
	const json_string = JSON.stringify(json);
	document.getElementById('templates_export_string').value = json_string;
}

function import_template () {
	const raw_json = document.getElementById('templates_import_string').value;
	const json = JSON.parse(raw_json);
	add_json_as_template(json);
}

async function save_all_templates () {
	// TODO on save reload the tag tab template and template list
	const all_loaded_templates = Array.from(document.getElementsByClassName('template'))
		.map(e => template_to_json(e));

	const template_string = JSON.stringify(all_loaded_templates);
	await utils.set_value('templates', template_string);
}

function delete_current_template () {
	const { template, option } = get_current_template_and_option();
	template.parentNode.removeChild(template);
	option.parentNode.removeChild(option);
	list_selection_changed();
}

async function clear_and_load_all_templates () {
	utils.clear_node(document.getElementById('template_list'));
	utils.clear_node(document.getElementById('template_main'));

	utils.get_value('templates')
		.then(e => JSON.parse(e))
		.then(e => e.forEach(e => add_json_as_template(e)));
}

function get_current_template_and_option () {
	const select = document.getElementById('template_list');
	const option = select[select.selectedIndex];
	const id = option.value;
	const template = document.getElementById(`template_${id}`);
	return {
		template: template,
		option: option
	};
}

module.exports = {
	add_blank_template: add_blank_template,
	list_selection_changed: list_selection_changed,
	clear_and_load_all_templates: clear_and_load_all_templates,
	delete_current_template: delete_current_template,
	save_all_templates: save_all_templates,
	import_template: import_template,
	export_current_template: export_current_template
};

},{"./utils.js":10}],10:[function(require,module,exports){
const { E621API } = require('./../dependencies/e621_API.commonjs2.userscript.js');
const GM = require('./../dependencies/gm_functions.js');

const defaults = {
	templates: '[]',
	changes: '[]',
	save_local: true,
	upload_changes: false,
	network_delay: 25
};

async function get_value (key) {
	return GM.getValue(key).then(e => e === undefined ? defaults[key] : e);
}

async function set_value (key, value) {
	return GM.setValue(key, value);
}

function clear_node (node) {
	while (node.children.length > 0) {
		node.removeChild(node.children[0]);
	}
}

function add_css (css) {
	GM.addStyle(css);
}

function string_to_node (string) {
	// Thanks to https://davidwalsh.name/convert-html-stings-dom-nodes
	// for showing this awesome method
	return document.createRange().createContextualFragment(string).firstElementChild;
}

function node_append (parent, node) {
	if (node) {
		parent.appendChild(node);
	}
}

function parse_keycode (message) {
	if (message === ' ') {
		return 'Space';
	} else {
		return message;
	}
}

function escape_html (string) {
	const node = document.createElement('div');
	node.appendChild(document.createTextNode(string));
	return node.innerHTML;
}

// Adapted roughly from
// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
function save_json_file (json, name) {
	const data_string = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));
	const download_node = document.createElement('a');
	download_node.setAttribute('href', data_string);
	download_node.setAttribute('download', name);
	document.body.appendChild(download_node);
	download_node.click();
	download_node.remove();
}

function listener (id, type, response) {
	return document.getElementById(id).addEventListener(type, response);
}

let known_api = null;
async function get_api () {
	const user_agent_string = 'Idem\'s Quick Tagger';

	if (known_api === null) {
		const api_key = await get_value('api_key');
		const username = await get_value('api_username');
		const is_api_good = await can_api_be_authenticated();
		if (is_api_good === true) {
			known_api = new E621API(user_agent_string, username, api_key);
		} else {
			known_api = new E621API(user_agent_string);
		}
	}

	return known_api;
}

async function can_api_be_authenticated () {
	const api_key = await get_value('api_key');
	const username = await get_value('api_username');
	const api_is_set = api_key !== undefined && api_key !== null && api_key !== '';
	const username_is_set = username !== undefined && username !== null && username !== '';
	return api_is_set && username_is_set;
}

module.exports = {
	clear_node: clear_node,
	add_css: add_css,
	string_to_node: string_to_node,
	node_append: node_append,
	parse_keycode: parse_keycode,
	get_value: get_value,
	set_value: set_value,
	escape_html: escape_html,
	save_json_file: save_json_file,
	listener: listener,
	get_api: get_api,
	can_api_be_authenticated: can_api_be_authenticated,
	default_values: defaults
};

},{"./../dependencies/e621_API.commonjs2.userscript.js":1,"./../dependencies/gm_functions.js":3}]},{},[4]);
