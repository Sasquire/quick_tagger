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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9ibGlwL2NyZWF0ZS9yYXdfYmxpcF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9jb21tZW50L2NyZWF0ZS9jb21tZW50X2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL2NvbW1lbnQvY3JlYXRlL3Jhd19jb21tZW50X2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL2Rvd25sb2FkL2Rvd25sb2FkLnVzZXJzY3JpcHQuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2J2YXMvcG9zdF9idmFzLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9jb3B5X25vdGVzL3Bvc3RfY29weV9ub3Rlcy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvY29weV9ub3Rlcy9yYXdfcG9zdF9jb3B5X25vdGVzLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9jcmVhdGUvcG9zdF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2NyZWF0ZS9yYXdfcG9zdF9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L2luZGV4L3Bvc3Rfc2VhcmNoLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9pbmRleC9wb3N0X3NlYXJjaF9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3QvaW5kZXgvcmF3X3Bvc3Rfc2VhcmNoLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC9zaG93L3Bvc3Rfc2hvdy5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3Bvc3Qvc2hvdy9yYXdfcG9zdF9zaG93LmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC91cGRhdGUvcG9zdF91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3VwZGF0ZS9yYXdfcG9zdF91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0L3ZvdGUvcG9zdF92b3RlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvcG9zdC92b3RlL3Jhd19wb3N0X3ZvdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0X2ZsYWcvY3JlYXRlL3Bvc3RfZmxhZ19jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9wb3N0X2ZsYWcvY3JlYXRlL3Jhd19wb3N0X2ZsYWdfY3JlYXRlLmpzIiwid2VicGFjazovL0U2MjFBUEkvLi9zb3VyY2UvdGFncy9pbmRleC9yYXdfdGFnX3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaF9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJLy4vc291cmNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9FNjIxQVBJL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0U2MjFBUEkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0U2MjFBUEkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9FNjIxQVBJL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRTYyMUFQSS8uL3NvdXJjZS9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgcmF3X2JsaXBfY3JlYXRlIH0gPSByZXF1aXJlKCcuL3Jhd19ibGlwX2NyZWF0ZS5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBibGlwX2NyZWF0ZSAodGV4dCwgaW5fcmVzcG9uc2VfdG8pIHtcblx0cmV0dXJuIHJhd19ibGlwX2NyZWF0ZS5jYWxsKHRoaXMsIHtcblx0XHQnYmxpcFtyZXNwb25zZV90b10nOiBpbl9yZXNwb25zZV90byA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGluX3Jlc3BvbnNlX3RvLFxuXHRcdCdibGlwW2JvZHldJzogdGV4dFxuXHR9KTtcbn1cblxuZXhwb3J0IHsgYmxpcF9jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyLFxuXHR2YWxpZGF0ZV9zdHJpbmdcbn0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfYmxpcF9jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogJy9ibGlwcycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncyksXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0aWYgKHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddLCAnYmxpcFtyZXNwb25zZV90b10nKTtcblx0fVxuXG5cdHZhbGlkYXRlX3N0cmluZyhzZXR0aW5nc1snYmxpcFtib2R5XSddLCAnYmxpcFtib2R5XScpO1xufVxuXG5mdW5jdGlvbiBtYWtlX2RhdGEgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7XG5cdFx0J2JsaXBbYm9keV0nOiBzZXR0aW5nc1snYmxpcFtib2R5XSddXG5cdH07XG5cblx0aWYgKHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnYmxpcFtyZXNwb25zZV90b10nXSA9IHNldHRpbmdzWydibGlwW3Jlc3BvbnNlX3RvXSddO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7IHJhd19ibGlwX2NyZWF0ZSB9O1xuIiwiY29uc3QgeyByYXdfY29tbWVudF9jcmVhdGUgfSA9IHJlcXVpcmUoJy4vcmF3X2NvbW1lbnRfY3JlYXRlLmpzJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbW1lbnRfY3JlYXRlIChwb3N0X2lkLCB0ZXh0KSB7XG5cdHJldHVybiByYXdfY29tbWVudF9jcmVhdGUuY2FsbCh0aGlzLCB7XG5cdFx0J2NvbW1lbnRbcG9zdF9pZF0nOiBwb3N0X2lkLFxuXHRcdCdjb21tZW50W2JvZHldJzogdGV4dFxuXHR9KTtcbn1cblxuZXhwb3J0IHsgY29tbWVudF9jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyLFxuXHR2YWxpZGF0ZV9zdHJpbmdcbn0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG4vLyBBZGQgc3VwcG9ydCBmb3IgWydkb19ub3RfYnVtcF9wb3N0JywgJ2lzX3N0aWNreScsICdpc19oaWRkZW4nXVxuXG5hc3luYyBmdW5jdGlvbiByYXdfY29tbWVudF9jcmVhdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogJy9jb21tZW50cycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IHtcblx0XHRcdCdjb21tZW50W3Bvc3RfaWRdJzogc2V0dGluZ3NbJ2NvbW1lbnRbcG9zdF9pZF0nXSxcblx0XHRcdCdjb21tZW50W2JvZHldJzogc2V0dGluZ3NbJ2NvbW1lbnRbYm9keV0nXVxuXHRcdH0sXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydjb21tZW50W3Bvc3RfaWRdJ10sICdjb21tZW50W3Bvc3RfaWRdJyk7XG5cdHZhbGlkYXRlX3N0cmluZyhzZXR0aW5nc1snY29tbWVudFtib2R5XSddLCAnY29tbWVudFtib2R5XScpO1xufVxuXG5leHBvcnQgeyByYXdfY29tbWVudF9jcmVhdGUgfTtcbiIsIi8qIElucHV0IHRvIHRoaXMgbWV0aG9kIGlzIHN0cnVjdHVyZWQgbGlrZSB0aGlzXG57XG5cdG1ldGhvZDogJ1BPU1QnIHwgJ0dFVCcgLy8gRGVmaW5lcyBob3cgdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIG1hZGVcblx0cGF0aDogPHN0cmluZz4gLy8gVGhlIHBhdGggb2YgdGhlIFVSTCB0aGF0IGlzIGJlaW5nIGFjY2Vzc2VkXG5cdHJlc3BvbnNlOiAnSlNPTicgfCAnWE1MJyB8ICdIVE1MJyAvLyBEZWZpbmVzIHRoZSByZXNwb25zZSB0eXBlXG5cblx0Zm9ybWF0OiAnVVJMJyB8ICdGT1JNJyB8IHVuZGVmaW5lZCAvLyBEZWZpbmVzIGhvdyB0aGUgZGF0YSBpcyBwYXNzZWRcblx0ZGF0YTogPG9iamVjdD4gfCB1bmRlZmluZWQgLy8gRGF0YSBiZWluZyBwYXNzZWQgaW4gdGhlIHJlcXVlc3Rcbn1cblxuKi9cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkIChzZXR0aW5ncykge1xuXHRjb25zdCByZXF1ZXN0X29wdGlvbnMgPSBidWlsZF9yZXF1ZXN0X29wdGlvbnMuY2FsbCh0aGlzLCBzZXR0aW5ncyk7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCBvbl9sb2FkID0gKGUpID0+IHtcblx0XHRcdGlmIChlLnN0YXR1cyA+PSAyMDAgJiYgZS5zdGF0dXMgPD0gMjk5KSB7XG5cdFx0XHRcdHJlc29sdmUoZS5yZXNwb25zZSk7IC8vIFRoaXMgd2lsbCBsaWtlbHkgY2F1c2UgZXJyb3JzIGxhdGVyXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXByb21pc2UtcmVqZWN0LWVycm9yc1xuXHRcdFx0XHRyZWplY3Qoe1xuXHRcdFx0XHRcdHJlc3BvbnNlOiB7XG5cdFx0XHRcdFx0XHRzdGF0dXM6IGUuc3RhdHVzLFxuXHRcdFx0XHRcdFx0ZGF0YTogZS5yZXNwb25zZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJlcXVlc3Rfb3B0aW9ucy5vbmxvYWQgPSBvbl9sb2FkO1xuXHRcdHJlcXVlc3Rfb3B0aW9ucy5vbmVycm9yID0gb25fbG9hZDtcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHRcdEdNLnhtbEh0dHBSZXF1ZXN0KHJlcXVlc3Rfb3B0aW9ucyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZF9yZXF1ZXN0X29wdGlvbnMgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHVybCA9IG5ldyBVUkwoJ2h0dHBzOi8vZTYyMS5uZXQvJyk7XG5cdHVybC5wYXRobmFtZSA9IHNldHRpbmdzLnBhdGggKyAnLicgKyBzZXR0aW5ncy5yZXNwb25zZS50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmIChzZXR0aW5ncy5mb3JtYXQgPT09ICdVUkwnKSB7XG5cdFx0T2JqZWN0LmVudHJpZXMoc2V0dGluZ3MuZGF0YSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHR1cmwuc2VhcmNoUGFyYW1zLnNldChrZXksIHZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHJlcXVlc3Rfb3B0aW9ucyA9IHtcblx0XHR1cmw6IHVybC5ocmVmLFxuXHRcdG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuXHRcdHJlc3BvbnNlVHlwZTogc2V0dGluZ3MucmVzcG9uc2UgPT09ICdKU09OJyA/ICdqc29uJyA6ICd0ZXh0Jyxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQndXNlci1hZ2VudCc6IHRoaXMudXNlcmFnZW50XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGhhc19jcmVkZW50aWFscyA9ICh0aGlzLnVzZXJuYW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hcGlfa2V5ICE9PSB1bmRlZmluZWQpO1xuXHRpZiAoc2V0dGluZ3MuYXV0aGVudGljYXRlIHx8IGhhc19jcmVkZW50aWFscykge1xuXHRcdGNvbnN0IGtleSA9IGBCYXNpYyAke2J0b2EoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmFwaV9rZXl9YCl9YDtcblx0XHRyZXF1ZXN0X29wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0ga2V5O1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLmZvcm1hdCA9PT0gJ0ZPUk0nKSB7XG5cdFx0Y29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdE9iamVjdC5lbnRyaWVzKHNldHRpbmdzLmRhdGEpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0aWYgKHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuXHRcdFx0XHRmb3JtLmFwcGVuZChrZXksIG5ldyBCbG9iKFt2YWx1ZV0pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmVxdWVzdF9vcHRpb25zLmRhdGEgPSBmb3JtO1xuXHR9XG5cblx0cmV0dXJuIHJlcXVlc3Rfb3B0aW9ucztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZG93bmxvYWQ7XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbi8vIHNldHRpbmdzID0ge1xuLy8gICBwb3N0X2lkOiBpZCBvZiB0aGUgcG9zdCB0byBiZSByZXBsYWNlZFxuLy8gICByZXBsYWNlbWVudDogdGhlIHJlcGxhY2VtZW50IGZpbGUvVVJMXG4vLyAgIGNvbW1lbnQ6IGJvb2xlYW4gaWYgYSBjb21tZW50IHNob3VsZCBiZSBwb3N0ZWQgdG8gdGhlIG5ldyBwb3N0XG4vLyAgIGRlc2NyaXB0aW9uOiBib29sZWFuIGlmIHRoZSBkZXNjcmlwdGlvbiBzaG91bGQgYmUgZWRpdGVkLlxuLy8gICBtZXNzYWdlOiBtZXNzYWdlIG9mIHN1cGVyaW9yIHF1YWxpdHkuICclJyByZXBsYWNlZCB3aXRoIG9sZF9pZFxuLy8gICBkZWxldGU6IGJvb2xlYW4uIElmIHRydWUgd2lsbCB0cnkgdG8gZGVsZXRlIHBvc3QuIGlmIGZhbHNlIHdpbGwgZmxhZ1xuLy8gfVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0X2J2YXMgKHNldHRpbmdzKSB7XG5cdHNldHRpbmdzID0gYXBwbHlfZGVmYXVsdHMoc2V0dGluZ3MpO1xuXHRjb25zdCBvbGRfcG9zdCA9IGF3YWl0IHRoaXMucG9zdF9zaG93KHNldHRpbmdzLnBvc3RfaWQpO1xuXHRzZXR0aW5ncy5tZXNzYWdlID0gc2V0dGluZ3MubWVzc2FnZS5yZXBsYWNlKCclJywgb2xkX3Bvc3QuaWQpO1xuXG5cdGNvbnN0IG5ld19wb3N0ID0gYXdhaXQgdGhpcy5wb3N0X2NyZWF0ZSh7XG5cdFx0dGFnczogZmlsdGVyX3RhZ3Mob2xkX3Bvc3QudGFncyksXG5cdFx0c291cmNlczogb2xkX3Bvc3Quc291cmNlcyxcblx0XHRkZXNjcmlwdGlvbjogc2V0dGluZ3MuZGVzY3JpcHRpb24gPT09IHRydWUgPyBgJHtzZXR0aW5ncy5tZXNzYWdlfVxcbiR7b2xkX3Bvc3QuZGVzY3JpcHRpb259YCA6IG9sZF9wb3N0LmRlc2NyaXB0aW9uLFxuXHRcdHJhdGluZzogb2xkX3Bvc3QucmF0aW5nLFxuXHRcdHBhcmVudF9pZDogb2xkX3Bvc3QucmVsYXRpb25zaGlwcy5wYXJlbnRfaWQsXG5cblx0XHR1cGxvYWQ6IHNldHRpbmdzLnJlcGxhY2VtZW50XG5cdH0pO1xuXG5cdGlmIChzZXR0aW5ncy5jb21tZW50ID09PSB0cnVlKSB7XG5cdFx0YXdhaXQgdGhpcy5jb21tZW50X2NyZWF0ZShuZXdfcG9zdC5wb3N0X2lkLCBzZXR0aW5ncy5tZXNzYWdlKTtcblx0fVxuXG5cdGF3YWl0IHNldF9wYXJlbnQuY2FsbCh0aGlzLCBvbGRfcG9zdC5pZCwgbmV3X3Bvc3QucG9zdF9pZCk7XG5cdGZvciAoY29uc3QgY2hpbGRfaWQgb2Ygb2xkX3Bvc3QucmVsYXRpb25zaGlwcy5jaGlsZHJlbikge1xuXHRcdGF3YWl0IHNldF9wYXJlbnQuY2FsbCh0aGlzLCBjaGlsZF9pZCwgbmV3X3Bvc3QucG9zdF9pZCk7XG5cdH1cblx0Ly8gRml4IHdpdGggcG9vbFxuXG5cdGF3YWl0IHRoaXMucG9zdF9jb3B5X25vdGVzKG9sZF9wb3N0LmlkLCBuZXdfcG9zdC5wb3N0X2lkKTtcblxuXHQvLyBvcHRpb25hbGx5IGRlbGV0ZSB0aGUgcG9zdFxuXHRhd2FpdCB0aGlzLnBvc3RfZmxhZ19jcmVhdGUodGhpcy5wb3N0X2ZsYWdfcmVhc29ucy5pbmZlcmlvciwgb2xkX3Bvc3QuaWQsIG5ld19wb3N0LnBvc3RfaWQpO1xufVxuXG5mdW5jdGlvbiBhcHBseV9kZWZhdWx0cyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLnBvc3RfaWQsICdwb3N0X2lkJyk7XG5cdGlmIChzZXR0aW5ncy5yZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyZXBsYWNlbWVudCBtdXN0IGJlIGRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cG9zdF9pZDogc2V0dGluZ3MucG9zdF9pZCxcblx0XHRjb21tZW50OiBudWxsaXNoKHNldHRpbmdzLmNvbW1lbnQsIGZhbHNlKSxcblx0XHRkZXNjcmlwdGlvbjogbnVsbGlzaChzZXR0aW5ncy5kZXNjcmlwdGlvbiwgdHJ1ZSksXG5cdFx0bWVzc2FnZTogbnVsbGlzaChzZXR0aW5ncy5tZXNzYWdlLCAnU3VwZXJpb3IgdmVyc2lvbiBvZiBwb3N0ICMlJyksXG5cdFx0ZGVsZXRlOiBudWxsaXNoKHNldHRpbmdzLmRlbGV0ZSwgZmFsc2UpLFxuXHRcdHJlcGxhY2VtZW50OiBzZXR0aW5ncy5yZXBsYWNlbWVudFxuXHR9O1xufVxuXG5mdW5jdGlvbiBudWxsaXNoICh2YWx1ZSwgcmVwbGFjZW1lbnQpIHtcblx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gcmVwbGFjZW1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldF9wYXJlbnQgKHBvc3RfaWQsIG5ld19wYXJlbnQpIHtcblx0cmV0dXJuIHRoaXMucG9zdF91cGRhdGUoe1xuXHRcdGlkOiBwb3N0X2lkLFxuXHRcdHBhcmVudF9pZDogbmV3X3BhcmVudFxuXHR9KTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyX3RhZ3MgKHRhZ19vYmplY3QpIHtcblx0Y29uc3QgdGFnc190b19yZW1vdmUgPSBbXG5cdFx0J2JldHRlcl92ZXJzaW9uX2F0X3NvdXJjZScsXG5cdFx0J3NtYWxsZXJfdmVyc2lvbl9hdF9zb3VyY2UnLFxuXHRcdCdjb21wcmVzc2lvbl9hcnRpZmFjdHMnLFxuXHRcdCdjcm9wcGVkJyxcblx0XHQndXBzY2FsZSdcblx0XTtcblxuXHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0YWdfb2JqZWN0KVxuXHRcdC5yZWR1Y2UoKGFjYywgZSkgPT4gYWNjLmNvbmNhdChlKSlcblx0XHQuZmlsdGVyKGUgPT4gdGFnc190b19yZW1vdmUuaW5jbHVkZXMoZSkgPT09IGZhbHNlKTtcbn1cblxuZXhwb3J0IHsgcG9zdF9idmFzIH07XG4iLCJjb25zdCB7IHJhd19wb3N0X2NvcHlfbm90ZXMgfSA9IHJlcXVpcmUoJy4vcmF3X3Bvc3RfY29weV9ub3Rlcy5qcycpO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X2NvcHlfbm90ZXMgKHBvc3RfaWQsIHRvX2lkKSB7XG5cdHJldHVybiByYXdfcG9zdF9jb3B5X25vdGVzLmNhbGwodGhpcywge1xuXHRcdGlkOiBwb3N0X2lkLFxuXHRcdG90aGVyX3Bvc3RfaWQ6IHRvX2lkXG5cdH0pO1xufVxuXG5leHBvcnQgeyBwb3N0X2NvcHlfbm90ZXMgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHsgdmFsaWRhdGVfY291bnRpbmdfbnVtYmVyIH0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfcG9zdF9jb3B5X25vdGVzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BVVCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3NldHRpbmdzLmlkfS9jb3B5X25vdGVzYCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiAnVVJMJyxcblx0XHRkYXRhOiB7XG5cdFx0XHRpZDogc2V0dGluZ3MuaWQsXG5cdFx0XHRvdGhlcl9wb3N0X2lkOiBzZXR0aW5ncy5vdGhlcl9wb3N0X2lkXG5cdFx0fVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdGlmIChlcnJvci5yZXNwb25zZS5kYXRhLnJlYXNvbiA9PT0gJ1Bvc3QgaGFzIG5vIG5vdGVzJykge1xuXHRcdHJldHVybiBudWxsOyAvLyBFeHBlY3RlZCBiZWhhdmlvciBpcyB0byBoYXZlIG5vIGVycm9ycyB0aHJvd24gaWYgcG9zdCBoYXMgbm8gbm90ZXNcblx0fSBlbHNlIHtcblx0XHQvLyBUb2RvXG5cdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdHRocm93IGVycm9yO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MuaWQsICdpZCcpO1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3Mub3RoZXJfcG9zdF9pZCwgJ290aGVyX3Bvc3RfaWQnKTtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3RfY29weV9ub3RlcyB9O1xuIiwiY29uc3QgeyByYXdfcG9zdF9jcmVhdGUgfSA9IHJlcXVpcmUoJy4vcmF3X3Bvc3RfY3JlYXRlLmpzJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cdHJldHVybiByYXdfcG9zdF9jcmVhdGUuY2FsbCh0aGlzLCB0cmFuc2Zvcm1fc2V0dGluZ3Moc2V0dGluZ3MpKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5ncy51cGxvYWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3VwcGx5IGFuIHVwbG9hZCBmaWxlIHRvIHVwbG9hZCBhIHBvc3QnKTtcblx0fVxuXG5cdGlmICh0eXBlb2Ygc2V0dGluZ3MucmF0aW5nICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigncmF0aW5nIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0fSBlbHNlIGlmIChbJ2UnLCAncScsICdzJ10uaW5jbHVkZXMoc2V0dGluZ3MucmF0aW5nLmNoYXJBdCgwKSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdmaXJzdCBjaGFyYWN0ZXIgb2YgcmF0aW5nIG11c3QgYmUgb25lIG9mIFtcXCdlXFwnLCBcXCdxXFwnLCBcXCdzXFwnXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnRhZ3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzLnRhZ3MgPT09IGZhbHNlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCd0YWdzIG11c3QgYmUgb2YgdHlwZSBhcnJheScpO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MudGFncy5ldmVyeShlID0+IHR5cGVvZiBlID09PSAnc3RyaW5nJykgPT09IGZhbHNlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2V2ZXJ5IGVsZW1lbnQgb2YgdGFncyBtdXN0IG9mIG9mIHR5cGUgc3RyaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHNldHRpbmdzLnNvdXJjZXMgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzLnNvdXJjZXMgPT09IGZhbHNlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdzb3VyY2VzIG11c3QgYmUgb2YgdHlwZSBhcnJheScpO1xuXHRcdH0gZWxzZSBpZiAoc2V0dGluZ3MudGFncy5ldmVyeShlID0+IHR5cGVvZiBlID09PSAnc3RyaW5nJykgPT09IGZhbHNlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2V2ZXJ5IGVsZW1lbnQgb2Ygc291cmNlcyBtdXN0IG9mIG9mIHR5cGUgc3RyaW5nJyk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHtcblx0XHQndXBsb2FkW3RhZ19zdHJpbmddJzogKHNldHRpbmdzLnRhZ3MgfHwgW10pLmpvaW4oJyAnKSxcblx0XHQndXBsb2FkW3JhdGluZ10nOiBzZXR0aW5ncy5yYXRpbmcuY2hhckF0KDApLFxuXHRcdCd1cGxvYWRbc291cmNlXSc6IChzZXR0aW5ncy5zb3VyY2VzIHx8IFtdKS5qb2luKCdcXG4nKSxcblx0XHQndXBsb2FkW2Rlc2NyaXB0aW9uXSc6IChzZXR0aW5ncy5kZXNjcmlwdGlvbiB8fCAnJyksXG5cdFx0J3VwbG9hZFtwYXJlbnRfaWRdJzogKHNldHRpbmdzLnBhcmVudF9pZCB8fCBudWxsKVxuXHR9O1xuXG5cdGlmIChzZXR0aW5ncy51cGxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XG5cdFx0cmV0dXJuX29iamVjdFsndXBsb2FkW2ZpbGVdJ10gPSBzZXR0aW5ncy51cGxvYWQ7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuX29iamVjdFsndXBsb2FkW2RpcmVjdF91cmxdJ10gPSBzZXR0aW5ncy51cGxvYWQ7XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuX29iamVjdDtcbn1cblxuZXhwb3J0IHsgcG9zdF9jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHsgdmFsaWRhdGVfY291bnRpbmdfbnVtYmVyIH0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG4vLyB1cGxvYWRbdGFnX3N0cmluZ10gQSBzcGFjZSBkZWxpbWl0ZWQgbGlzdCBvZiB0YWdzLlxuLy8gdXBsb2FkW2ZpbGVdIFRoZSBmaWxlIGRhdGEgZW5jb2RlZCBhcyBhIG11bHRpcGFydCBmb3JtLlxuLy8gdXBsb2FkW3JhdGluZ10gVGhlIHJhdGluZyBmb3IgdGhlIHBvc3QuIENhbiBiZTogcywgcSBvciBlIGZvciBzYWZlLCBxdWVzdGlvbmFibGUsIGFuZCBleHBsaWNpdCByZXNwZWN0aXZlbHkuXG4vLyB1cGxvYWRbZGlyZWN0X3VybF0gSWYgdGhpcyBpcyBhIFVSTCwgZTYyMSB3aWxsIGRvd25sb2FkIHRoZSBmaWxlLlxuLy8gdXBsb2FkW3NvdXJjZV0gVGhpcyB3aWxsIGJlIHVzZWQgYXMgdGhlIHBvc3QncyAnU291cmNlJyB0ZXh0LiBTZXBhcmF0ZSBtdWx0aXBsZSBVUkxzIHdpdGggJTBBICh1cmwtZW5jb2RlZCBuZXdsaW5lKSB0byBkZWZpbmUgbXVsdGlwbGUgc291cmNlcy4gTGltaXQgb2YgdGVuIFVSTHNcbi8vIHVwbG9hZFtkZXNjcmlwdGlvbl0gVGhlIGRlc2NyaXB0aW9uIGZvciB0aGUgcG9zdC5cbi8vIHVwbG9hZFtwYXJlbnRfaWRdIFRoZSBJRCBvZiB0aGUgcGFyZW50IHBvc3QuXG4vLyB1cGxvYWRbcmVmZXJlcl91cmxdICAgICAgICAgP1xuLy8gdXBsb2FkW21kNV9jb25maXJtYXRpb25dICAgIHVzZWxlc3Ncbi8vIHVwbG9hZFthc19wZW5kaW5nXSBJZiB0cnVlIHBvc3Qgd2lsbCBiZSBwb3N0ZWQgYXMgcGVuZGluZ1xuXG4vLyB0YWdfc3RyaW5nLCByYXRpbmcsIHNvdXJjZSAoZmlsZSB8fCBkaXJlY3RfdWxyKSBhcmUgcmVxdWlyZWRcbi8vIGFsbCBvdGhlcnMgc2hvdWxkIGJlIG51bGxcblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3RfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdHBhdGg6ICcvdXBsb2FkcycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncyksXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgbmV3X3NldHRpbmdzID0ge1xuXHRcdCd1cGxvYWRbdGFnX3N0cmluZ10nOiBzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10sXG5cdFx0J3VwbG9hZFtyYXRpbmddJzogc2V0dGluZ3NbJ3VwbG9hZFtyYXRpbmddJ10sXG5cdFx0J3VwbG9hZFtzb3VyY2VdJzogc2V0dGluZ3NbJ3VwbG9hZFtzb3VyY2VdJ11cblx0fTtcblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddICE9PSB1bmRlZmluZWQpIHtcblx0XHRuZXdfc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddO1xuXHR9IGVsc2Uge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10gPSBzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ107XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSAhPT0gbnVsbCkge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddID0gc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSAhPT0gbnVsbCkge1xuXHRcdG5ld19zZXR0aW5nc1sndXBsb2FkW3BhcmVudF9pZF0nXSA9IHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddO1xuXHR9XG5cblx0cmV0dXJuIG5ld19zZXR0aW5ncztcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3RhZ19zdHJpbmddIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW3RhZ19zdHJpbmddJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbdGFnX3N0cmluZ10gbXVzdCBiZSBvZiB0eXBlIHN0cmluZycpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdCb3RoIHVwbG9hZFtmaWxlXSBhbmQgdXBsb2FkW2RpcmVjdF91cmxdIGNhbiBub3QgYmUgZGVmaW5lZCcpO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWyd1cGxvYWRbZmlsZV0nXSA9PT0gdW5kZWZpbmVkICYmIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgdXBsb2FkW2ZpbGVdIG9yIHVwbG9hZFtkaXJlY3RfdXJsXSBtdXN0IGJlIGRlZmluZWQnKTtcblx0fVxuXG5cdC8vIHRvZG8gdGVzdCB0aGlzXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2ZpbGVdJ10pIHtcblx0XHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtmaWxlXSddLmNvbnN0cnVjdG9yICE9PSBBcnJheUJ1ZmZlcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZmlsZV0gbXVzdCBiZSBvZiB0eXBlIEFycmF5QnVmZmVyJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgZm9yIGRhdGEgaW4gdGhlIGFycmF5IGJ1ZmZlcj9cblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW2RpcmVjdF91cmxdJ10pIHtcblx0XHRpZiAodHlwZW9mIHNldHRpbmdzWyd1cGxvYWRbZGlyZWN0X3VybF0nXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2RpcmVjdF91cmxdIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcnKTtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBpdCBpcyBhbiBhY3R1YWwgdXJsP1xuXHR9XG5cblx0aWYgKFsncycsICdxJywgJ2UnXS5pbmNsdWRlcyhzZXR0aW5nc1sndXBsb2FkW3JhdGluZ10nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbcmF0aW5nXSBtdXN0IGJlIG9uZSBvZiBbXFwnc1xcJywgXFwncVxcJywgXFwnZVxcJ10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sndXBsb2FkW3NvdXJjZV0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbc291cmNlXSBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3NbJ3VwbG9hZFtzb3VyY2VdJ10gIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbc291cmNlXSBtdXN0IGJlIHVuZGVmaW5lZCBvciBvZiB0eXBlIHN0cmluZyBvciBudWxsJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtkZXNjcmlwdGlvbl0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd1cGxvYWRbZGVzY3JpcHRpb25dIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZXR0aW5nc1sndXBsb2FkW2Rlc2NyaXB0aW9uXSddICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW2Rlc2NyaXB0aW9uXSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigndXBsb2FkW3BhcmVudF9pZF0gbXVzdCBwcmVzZW50Jyk7XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3NbJ3VwbG9hZFtwYXJlbnRfaWRdJ10gPT09IG51bGwpIHtcblx0XHQvLyBJdCBpcyBmaW5lIGlmIHBhcmVudF9pZCBpcyBudWxsXG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWyd1cGxvYWRbcGFyZW50X2lkXSddLCAndXBsb2FkW3BhcmVudF9pZF0nKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3RfY3JlYXRlIH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfSBmcm9tICcuL3Jhd19wb3N0X3NlYXJjaC5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfc2VhcmNoICh0YWdfc3RyaW5nLCBwYWdlID0gMCkge1xuXHRyZXR1cm4gcmF3X3Bvc3Rfc2VhcmNoLmNhbGwodGhpcywge1xuXHRcdGxpbWl0OiAzMjAsXG5cdFx0dGFnczogdGFnX3N0cmluZyxcblx0XHRwYWdlOiBwYWdlLnRvU3RyaW5nKClcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmV4cG9ydCB7IHBvc3Rfc2VhcmNoIH07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfSBmcm9tICcuL3Jhd19wb3N0X3NlYXJjaC5qcyc7XG5cbmNvbnN0IHBvc3RzX3Blcl9wYWdlID0gMzIwO1xuXG4vLyBZb3UgY2FuIG5vdCBoYXZlIGEgZGlmZmVyZW50IG9yZGVyIHdoZW4gc2VhcmNoaW5nIHRocm91Z2ggcG9zdHMgbGlrZSB0aGlzXG5hc3luYyBmdW5jdGlvbiogcG9zdF9zZWFyY2hfaXRlcmF0b3IgKHNlYXJjaF9zdHJpbmcpIHtcblx0Ly8gXCJQcm92aWRpbmcgYXJiaXRyYXJpbHkgbGFyZ2UgdmFsdWVzIHRvIG9idGFpbiB0aGUgbW9zdCByZWNlbnQgcG9zdHNcblx0Ly8gaXMgbm90IHBvcnRhYmxlIGFuZCBtYXkgYnJlYWsgaW4gdGhlIGZ1dHVyZVwiLiAod2lraSlcblx0Ly8gSSBkbyB3aGF0IEkgd2FudFxuXHRsZXQgbWF4X2lkID0gMWU5O1xuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96d2Fnb3RoL2U2MjFuZy9pc3N1ZXMvMjAyXG5cdFx0Y29uc3QgeyBwb3N0cyB9ID0gYXdhaXQgcmF3X3Bvc3Rfc2VhcmNoLmNhbGwodGhpcywge1xuXHRcdFx0dGFnczogc2VhcmNoX3N0cmluZyxcblx0XHRcdGxpbWl0OiBwb3N0c19wZXJfcGFnZSxcblx0XHRcdHBhZ2U6IGBiJHttYXhfaWR9YFxuXHRcdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG5cblx0XHR5aWVsZCogcG9zdHM7XG5cdFx0bWF4X2lkID0gcG9zdHMucmVkdWNlKChhY2MsIGUpID0+IGFjYy5pZCA8IGUuaWQgPyBhY2MgOiBlKS5pZDtcblxuXHRcdGlmIChwb3N0cy5sZW5ndGggPCBwb3N0c19wZXJfcGFnZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcG9zdF9zZWFyY2hfaXRlcmF0b3IgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfc3RyaW5nLFxuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nXG59IGZyb20gJy4vLi4vLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzJztcblxuLy8gVGhlcmUgaXMgYW4gZWRnZSBjYXNlIHdoZXJlIHRoZSBkYXRhIGNhbiBiZSBtZDU9PG1kNT5cblxuYXN5bmMgZnVuY3Rpb24gcmF3X3Bvc3Rfc2VhcmNoIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0cGF0aDogJy9wb3N0cycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKVxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGlmIChzZXR0aW5ncy50YWdzICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzLnRhZ3MsICd0YWdzJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MubGltaXQgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MubGltaXQsICdsaW1pdCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnBhZ2UgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9wYWdlX3N0cmluZyhzZXR0aW5ncy5wYWdlLCAncGFnZScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHt9O1xuXG5cdGlmIChzZXR0aW5ncy5saW1pdCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3QubGltaXQgPSBzZXR0aW5ncy5saW1pdDtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy50YWdzICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC50YWdzID0gc2V0dGluZ3MudGFncztcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5wYWdlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5wYWdlID0gc2V0dGluZ3MucGFnZTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyByYXdfcG9zdF9zZWFyY2ggfTtcbiIsImltcG9ydCB7IHJhd19wb3N0X3NlYXJjaCB9IGZyb20gJy4vLi4vaW5kZXgvcmF3X3Bvc3Rfc2VhcmNoLmpzJztcbmltcG9ydCB7IHJhd19wb3N0X3Nob3cgfSBmcm9tICcuL3Jhd19wb3N0X3Nob3cuanMnO1xuaW1wb3J0IHsgdmFsaWRhdGVfbWQ1IH0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3Nob3dfaWQgKHBvc3RfaWQpIHtcblx0cmV0dXJuIHJhd19wb3N0X3Nob3cuY2FsbCh0aGlzLCB7XG5cdFx0aWQ6IHBvc3RfaWRcblx0fSkudGhlbihlID0+IGUucG9zdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfc2hvd19tZDUgKG1kNSkge1xuXHR2YWxpZGF0ZV9tZDUobWQ1KTtcblx0cmV0dXJuIHJhd19wb3N0X3NlYXJjaC5jYWxsKHRoaXMsIHtcblx0XHR0YWdzOiBgbWQ1OiR7bWQ1fWAsXG5cdFx0bGltaXQ6IDEsXG5cdFx0cGFnZTogbnVsbFxuXHR9KS50aGVuKGUgPT4ge1xuXHRcdGlmIChlLnBvc3RzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBlLnBvc3RzWzBdO1xuXHRcdH1cblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfc2hvdyAoaWRfbWQ1KSB7XG5cdGlmICh0eXBlb2YgaWRfbWQ1ID09PSAnc3RyaW5nJyAmJiBpZF9tZDUubGVuZ3RoID09PSAzMikge1xuXHRcdHJldHVybiBwb3N0X3Nob3dfbWQ1LmNhbGwodGhpcywgaWRfbWQ1KTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gcG9zdF9zaG93X2lkLmNhbGwodGhpcywgTnVtYmVyKGlkX21kNSkpO1xuXHR9XG59XG5cbmV4cG9ydCB7XG5cdHBvc3Rfc2hvd19pZCxcblx0cG9zdF9zaG93X21kNSxcblx0cG9zdF9zaG93XG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X3Nob3cgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5ncy5pZCwgJ3Bvc3RfaWQnKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRwYXRoOiBgL3Bvc3RzLyR7c2V0dGluZ3MuaWR9YCxcblx0XHRyZXNwb25zZTogJ0pTT04nLFxuXG5cdFx0Zm9ybWF0OiB1bmRlZmluZWQsXG5cdFx0ZGF0YTogbnVsbFxuXHR9KS5jYXRjaChoYW5kbGVfZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IgKGVycm9yKSB7XG5cdC8vIFRvZG9cblx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHR0aHJvdyBlcnJvcjtcbn1cblxuZXhwb3J0IHsgcmF3X3Bvc3Rfc2hvdyB9O1xuIiwiaW1wb3J0IHsgcmF3X3Bvc3RfdXBkYXRlIH0gZnJvbSAnLi9yYXdfcG9zdF91cGRhdGUuanMnO1xuXG5hc3luYyBmdW5jdGlvbiBwb3N0X3VwZGF0ZSAoc2V0dGluZ3MpIHtcblx0cmV0dXJuIHJhd19wb3N0X3VwZGF0ZS5jYWxsKHRoaXMsIHtcblx0XHRpZDogc2V0dGluZ3MuaWQsXG5cdFx0J3Bvc3RbdGFnX3N0cmluZ19kaWZmXSc6IGdldF9kaWZmZXJlbmNlcyhzZXR0aW5ncywgJ3RhZ3NfdG9fYWRkJywgJ3RhZ3NfdG9fcmVtb3ZlJywgJyAnKSxcblx0XHQncG9zdFt0YWdfc3RyaW5nXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3MudGFncywgJyAnKSxcblx0XHQncG9zdFtvbGRfdGFnX3N0cmluZ10nOiBvcHRpb25hbF9qb2luKHNldHRpbmdzLm9sZF90YWdzLCAnICcpLFxuXHRcdCdwb3N0W3NvdXJjZV9kaWZmXSc6IGdldF9kaWZmZXJlbmNlcyhzZXR0aW5ncywgJ3NvdXJjZXNfdG9fYWRkJywgJ3NvdXJjZXNfdG9fcmVtb3ZlJywgJ1xcbicpLFxuXHRcdCdwb3N0W3NvdXJjZV0nOiBvcHRpb25hbF9qb2luKHNldHRpbmdzLnNvdXJjZXMsICdcXG4nKSxcblx0XHQncG9zdFtvbGRfc291cmNlXSc6IG9wdGlvbmFsX2pvaW4oc2V0dGluZ3Mub2xkX3NvdXJjZXMsICdcXG4nKSxcblx0XHQncG9zdFtkZXNjcmlwdGlvbl0nOiBzZXR0aW5ncy5kZXNjcmlwdGlvbiB8fCBudWxsLFxuXHRcdCdwb3N0W29sZF9kZXNjcmlwdGlvbl0nOiBzZXR0aW5ncy5vbGRfZGVzY3JpcHRpb24gfHwgbnVsbCxcblx0XHQncG9zdFtwYXJlbnRfaWRdJzogc2V0dGluZ3MucGFyZW50X2lkIHx8IG51bGwsXG5cdFx0J3Bvc3Rbb2xkX3BhcmVudF9pZF0nOiBzZXR0aW5ncy5vbGRfcGFyZW50X2lkIHx8IG51bGwsXG5cdFx0J3Bvc3RbcmF0aW5nXSc6IGdldF9yYXRpbmcoc2V0dGluZ3MucmF0aW5nKSxcblx0XHQncG9zdFtvbGRfcmF0aW5nXSc6IGdldF9yYXRpbmcoc2V0dGluZ3Mub2xkX3JhdGluZyksXG5cdFx0J3Bvc3RbZWRpdF9yZWFzb25dJzogc2V0dGluZ3MucmVhc29uIHx8IG51bGxcblx0fSk7XG59XG5cbi8vIElkZWEgZm9yIGEgZGlmZmVyZW50IHR5cGUgb2YgdXBkYXRlIGZ1bmN0aW9uLiBNYXliZSBpdHMgYmV0dGVyIGluIHNvbWUgY2FzZXNcbi8vIGFzeW5jIGZ1bmN0aW9uIHRyYW5zZm9ybV9wb3N0IChwb3N0X2lkLCB0cmFuc2Zvcm1fZnVuY3Rpb24pIHtcbi8vICAgY29uc3QgcG9zdCA9IGF3YWl0IGdldF9wb3N0KHBvc3RfaWQpO1xuLy8gICBjb25zdCBuZXdfcG9zdCA9IGF3YWl0IHRyYW5zZm9ybV9mdW5jdGlvbihwb3N0X2lkKVxuLy8gICByZXR1cm4gcG9zdF91cGRhdGUocG9zdCwgbmV3X3Bvc3QpO1xuLy8gfVxuXG5mdW5jdGlvbiBnZXRfcmF0aW5nIChyYXRpbmcpIHtcblx0aWYgKHJhdGluZyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHJhdGluZy5jaGFyQXQoMCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuZnVuY3Rpb24gb3B0aW9uYWxfam9pbiAobGlzdCwgam9pbmVyKSB7XG5cdGlmIChsaXN0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gbGlzdC5qb2luKGpvaW5lcik7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0X2RpZmZlcmVuY2VzIChzZXR0aW5ncywgYWRkX3N0cmluZywgcmVtb3ZlX3N0cmluZywgam9pbmVyKSB7XG5cdGlmIChzZXR0aW5nc1thZGRfc3RyaW5nXSAhPT0gdW5kZWZpbmVkIHx8IHNldHRpbmdzW3JlbW92ZV9zdHJpbmddICE9PSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBhZGRzID0gKHNldHRpbmdzW2FkZF9zdHJpbmddIHx8IFtdKVxuXHRcdFx0LmpvaW4oam9pbmVyKTtcblx0XHRjb25zdCByZW1vdmVzID0gKHNldHRpbmdzW3JlbW92ZV9zdHJpbmddIHx8IFtdKVxuXHRcdFx0Lm1hcChlID0+IGAtJHtlLnRvU3RyaW5nKCl9YClcblx0XHRcdC5qb2luKGpvaW5lcik7XG5cblx0XHRyZXR1cm4gYCR7YWRkc30ke2pvaW5lcn0ke3JlbW92ZXN9YDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbnVsbDsgLy8gSWYgbm8gY2hhbmdlcyByZXR1cm4gbnVsbFxuXHR9XG59XG5cbmV4cG9ydCB7XG5cdHBvc3RfdXBkYXRlXG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X3VwZGF0ZSAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXG5cdHJldHVybiBkb3dubG9hZC5jYWxsKHRoaXMsIHtcblx0XHRtZXRob2Q6ICdQQVRDSCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3NldHRpbmdzLmlkfWAsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ0ZPUk0nLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncyksXG5cdFx0YXV0aGVudGljYXRlOiB0cnVlXG5cdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9zZXR0aW5ncyAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzLmlkLCAnaWQnKTtcblxuXHRbXG5cdFx0J3Bvc3RbdGFnX3N0cmluZ19kaWZmXScsXG5cdFx0J3Bvc3RbdGFnX3N0cmluZ10nLFxuXHRcdCdwb3N0W29sZF90YWdfc3RyaW5nXScsXG5cdFx0J3Bvc3Rbc291cmNlX2RpZmZdJyxcblx0XHQncG9zdFtzb3VyY2VdJyxcblx0XHQncG9zdFtvbGRfc291cmNlXScsXG5cdFx0J3Bvc3RbZGVzY3JpcHRpb25dJyxcblx0XHQncG9zdFtvbGRfZGVzY3JpcHRpb25dJyxcblx0XHQvLyBwYXJlbnRfaWRcblx0XHQncG9zdFtyYXRpbmddJyxcblx0XHQncG9zdFtvbGRfcmF0aW5nXScsXG5cdFx0J3Bvc3RbZWRpdF9yZWFzb25dJ1xuXHRcdC8vIGhhc19lbWJlZGRlZF9ub3RlcyB3aWxsIGJlIHJlbW92ZWQgYXQgc29tZSBwb2ludC5cblx0XS5mb3JFYWNoKGUgPT4ge1xuXHRcdGlmIChzZXR0aW5nc1tlXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7ZX0gbXVzdCBiZSBwcmVzZW50YCk7XG5cdFx0fSBlbHNlIGlmIChzZXR0aW5nc1tlXSA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gYWxsIG9mIHRoZXNlIGNhbiBiZSBudWxsXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc2V0dGluZ3NbZV0gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7ZX0gbXVzdCBiZSBvZiB0eXBlIHN0cmluZ2ApO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W3BhcmVudF9pZF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdwb3N0W3BhcmVudF9pZF0gbXVzdCBiZSBwcmVzZW50Jyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3BhcmVudF9pZF0nXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdwb3N0W29sZF9wYXJlbnRfaWRdIG11c3QgYmUgcHJlc2VudCcpO1xuXHR9XG5cblx0W1xuXHRcdCd0YWdfc3RyaW5nJyxcblx0XHQnc291cmNlJyxcblx0XHQnZGVzY3JpcHRpb24nLFxuXHRcdCdwYXJlbnRfaWQnLFxuXHRcdCdyYXRpbmcnXG5cdF0uZm9yRWFjaChlID0+IHtcblx0XHRpZiAoc2V0dGluZ3NbYHBvc3Rbb2xkXyR7ZX1dYF0gIT09IG51bGwgJiYgc2V0dGluZ3NbYHBvc3RbJHtlfV1gXSA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBvbGRfJHtlfSBtdXN0IG5vdCBiZSBwcmVzZW50IGlmICR7ZX0gaXMgbm90IHByZXNlbnRgKTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChzZXR0aW5nc1sncG9zdFt0YWdfc3RyaW5nXSddICE9PSBudWxsICYmIHNldHRpbmdzWydwb3N0W3RhZ19zdHJpbmdfZGlmZl0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignYXQgbW9zdCBvbmUgb2YgdGFnX3N0cmluZyBhbmQgdGFnX3N0cmluZ19kaWZmIGNhbiBiZSBub24tbnVsbCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W3NvdXJjZV0nXSAhPT0gbnVsbCAmJiBzZXR0aW5nc1sncG9zdFtzb3VyY2VfZGlmZl0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignYXQgbW9zdCBvbmUgb2Ygc291cmNlIGFuZCBzb3VyY2VfZGlmZiBjYW4gYmUgbm9uLW51bGwnKTtcblx0fVxuXG5cdC8vIFBhcmVudF9pZFxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3RbcGFyZW50X2lkXSddID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3BhcmVudF9pZCBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sncG9zdFtwYXJlbnRfaWRdJ10gPT09IG51bGwpIHtcblx0XHQvLyBpdCBjYW4gYmUgbnVsbCB3aXRob3V0IGlzc3VlXG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0W3BhcmVudF9pZF0nXSwgJ3BhcmVudF9pZCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydwb3N0W29sZF9wYXJlbnRfaWRdJ10gPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignb2xkX3BhcmVudF9pZCBtdXN0IGJlIHByZXNlbnQnKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sncG9zdFtvbGRfcGFyZW50X2lkXSddID09PSBudWxsKSB7XG5cdFx0Ly8gaXQgY2FuIGJlIG51bGwgd2l0aG91dCBpc3N1ZVxuXHR9IGVsc2Uge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1sncG9zdFtvbGRfcGFyZW50X2lkXSddLCAnb2xkX3BhcmVudF9pZCcpO1xuXHR9XG5cblx0Ly8gUmF0aW5nXG5cdGlmIChzZXR0aW5nc1sncG9zdFtyYXRpbmddJ10gIT09IG51bGwgJiYgWydlJywgJ3EnLCAncyddLmluY2x1ZGVzKHNldHRpbmdzWydwb3N0W3JhdGluZ10nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyYXRpbmcgbXVzdCBiZSBvbmUgb2YgW1xcJ2VcXCcsIFxcJ3FcXCcsIFxcJ3NcXCddJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3JhdGluZ10nXSAhPT0gbnVsbCAmJiBbJ2UnLCAncScsICdzJ10uaW5jbHVkZXMoc2V0dGluZ3NbJ3Bvc3Rbb2xkX3JhdGluZ10nXSkgPT09IGZhbHNlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdvbGRfcmF0aW5nIG11c3QgYmUgb25lIG9mIFtcXCdlXFwnLCBcXCdxXFwnLCBcXCdzXFwnXScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0cmV0dXJuIFtcblx0XHQncG9zdFt0YWdfc3RyaW5nX2RpZmZdJyxcblx0XHQncG9zdFt0YWdfc3RyaW5nXScsXG5cdFx0J3Bvc3Rbb2xkX3RhZ19zdHJpbmddJyxcblx0XHQncG9zdFtzb3VyY2VfZGlmZl0nLFxuXHRcdCdwb3N0W3NvdXJjZV0nLFxuXHRcdCdwb3N0W29sZF9zb3VyY2VdJyxcblx0XHQncG9zdFtkZXNjcmlwdGlvbl0nLFxuXHRcdCdwb3N0W29sZF9kZXNjcmlwdGlvbl0nLFxuXHRcdCdwb3N0W3BhcmVudF9pZF0nLFxuXHRcdCdwb3N0W29sZF9wYXJlbnRfaWRdJyxcblx0XHQncG9zdFtyYXRpbmddJyxcblx0XHQncG9zdFtvbGRfcmF0aW5nXScsXG5cdFx0J3Bvc3RbZWRpdF9yZWFzb25dJ1xuXHRdLnJlZHVjZSgoYWNjLCBlKSA9PiB7XG5cdFx0aWYgKHNldHRpbmdzW2VdICE9PSBudWxsKSB7XG5cdFx0XHRhY2NbZV0gPSBzZXR0aW5nc1tlXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjO1xuXHR9LCB7fSk7XG59XG5cbmV4cG9ydCB7IHJhd19wb3N0X3VwZGF0ZSB9O1xuIiwiaW1wb3J0IHsgcmF3X3Bvc3Rfdm90ZSB9IGZyb20gJy4vcmF3X3Bvc3Rfdm90ZS5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfdm90ZV91cCAocG9zdF9pZCkge1xuXHRyZXR1cm4gcmF3X3Bvc3Rfdm90ZS5jYWxsKHRoaXMsIHtcblx0XHRpZDogcG9zdF9pZCxcblx0XHRzY29yZTogMSxcblx0XHRub191bnZvdGU6IHRydWVcblx0fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3Rfdm90ZV9kb3duIChwb3N0X2lkKSB7XG5cdHJhd19wb3N0X3ZvdGUuY2FsbCh0aGlzLCB7XG5cdFx0aWQ6IHBvc3RfaWQsXG5cdFx0c2NvcmU6IC0xLFxuXHRcdG5vX3Vudm90ZTogdHJ1ZVxuXHR9KTtcbn1cblxuZXhwb3J0IHtcblx0cG9zdF92b3RlX3VwLFxuXHRwb3N0X3ZvdGVfZG93blxufTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyLFxuXHR2YWxpZGF0ZV92b3RlX29wdGlvbixcblx0dmFsaWRhdGVfYm9vbGVhblxufSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X3ZvdGUgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX3NldHRpbmdzKHNldHRpbmdzKTtcblxuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0cGF0aDogYC9wb3N0cy8ke3NldHRpbmdzLmlkfS92b3Rlc2AsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdF92b3RlX3JlbW92ZSAoaWQpIHtcblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0cGF0aDogYC9wb3N0cy8ke2lkfS92b3Rlc2AsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogdW5kZWZpbmVkLFxuXHRcdGRhdGE6IHVuZGVmaW5lZCxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MuaWQsICdwb3N0X2lkJyk7XG5cdHZhbGlkYXRlX3ZvdGVfb3B0aW9uKHNldHRpbmdzLnNjb3JlKTtcblxuXHRpZiAoc2V0dGluZ3Mubm9fdW52b3RlICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfYm9vbGVhbihzZXR0aW5ncy5ub191bnZvdGUsICdub191bnZvdGUnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBtYWtlX2RhdGEgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7XG5cdFx0c2NvcmU6IHNldHRpbmdzLnNjb3JlXG5cdH07XG5cblx0aWYgKHNldHRpbmdzLm5vX3Vudm90ZSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3Qubm9fdW52b3RlID0gc2V0dGluZ3Mubm9fdW52b3RlO1xuXHR9XG5cblx0cmV0dXJuIHJldHVybl9vYmplY3Q7XG59XG5cbmV4cG9ydCB7XG5cdHJhd19wb3N0X3ZvdGUsXG5cdHBvc3Rfdm90ZV9yZW1vdmVcbn07XG4iLCJpbXBvcnQgeyByYXdfcG9zdF9mbGFnX2NyZWF0ZSB9IGZyb20gJy4vcmF3X3Bvc3RfZmxhZ19jcmVhdGUuanMnO1xuXG5jb25zdCBwb3N0X2ZsYWdfcmVhc29ucyA9IHtcblx0ZGVsZXRpb246ICdkZWxldGlvbicsXG5cdGluZmVyaW9yOiAnaW5mZXJpb3InLFxuXHRjdXN0b206ICd1c2VyJyxcblx0ZG5wOiAnZG5wX2FydGlzdCcsXG5cdHBheV9jb250ZW50OiAncGF5X2NvbnRlbnQnLFxuXHR0cmFjZTogJ3RyYWNlJyxcblx0cHJldmlvdXNseV9kZWxldGVkOiAncHJldmlvdXNseV9kZWxldGVkJyxcblx0cmVhbDogJ3JlYWxfcG9ybicsXG5cdGNvcnJ1cHQ6ICdjb3JydXB0J1xufTtcblxuYXN5bmMgZnVuY3Rpb24gcG9zdF9mbGFnX2NyZWF0ZSAocmVhc29uLCBwb3N0X2lkLCBleHRyYSkge1xuXHRpZiAocG9zdF9mbGFnX3JlYXNvbnNbcmVhc29uXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBSZWFzb24gbXVzdCBiZSBvbmUgb2YgWyR7T2JqZWN0LmtleXMocG9zdF9mbGFnX3JlYXNvbnMpLmpvaW4oJywgJyl9XWApO1xuXHR9XG5cblx0Y29uc3QgZGF0YSA9IHtcblx0XHQncG9zdF9mbGFnW3Bvc3RfaWRdJzogcG9zdF9pZCxcblx0XHQncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSc6IHBvc3RfZmxhZ19yZWFzb25zW3JlYXNvbl0sXG5cdFx0J3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0nOiBudWxsLFxuXHRcdCdwb3N0X2ZsYWdbcGFyZW50X2lkXSc6IG51bGxcblx0fTtcblxuXHRpZiAocmVhc29uID09PSBwb3N0X2ZsYWdfcmVhc29ucy5jdXN0b20pIHtcblx0XHRkYXRhWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gPSBleHRyYTtcblx0fSBlbHNlIGlmIChyZWFzb24gPT09IHBvc3RfZmxhZ19yZWFzb25zLmluZmVyaW9yKSB7XG5cdFx0ZGF0YVsncG9zdF9mbGFnW3BhcmVudF9pZF0nXSA9IGV4dHJhO1xuXHR9XG5cblx0cmV0dXJuIHJhd19wb3N0X2ZsYWdfY3JlYXRlLmNhbGwodGhpcywgZGF0YSk7XG59XG5cbmV4cG9ydCB7XG5cdHBvc3RfZmxhZ19jcmVhdGUsXG5cdHBvc3RfZmxhZ19yZWFzb25zXG59O1xuIiwiaW1wb3J0IGRvd25sb2FkIGZyb20gJy4vLi4vLi4vZG93bmxvYWQvZG93bmxvYWQuX19UQVJHRVRfXy5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIgfSBmcm9tICcuLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5qcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJhd19wb3N0X2ZsYWdfY3JlYXRlIChzZXR0aW5ncykge1xuXHR2YWxpZGF0ZV9zZXR0aW5ncyhzZXR0aW5ncyk7XG5cblx0cmV0dXJuIGRvd25sb2FkLmNhbGwodGhpcywge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdHBhdGg6ICcvcG9zdF9mbGFncycsXG5cdFx0cmVzcG9uc2U6ICdKU09OJyxcblxuXHRcdGZvcm1hdDogJ1VSTCcsXG5cdFx0ZGF0YTogbWFrZV9kYXRhKHNldHRpbmdzKSxcblx0XHRhdXRoZW50aWNhdGU6IHRydWVcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1sncG9zdF9mbGFnW3Bvc3RfaWRdJ10sICdwb3N0X2ZsYWdbcG9zdF9pZF0nKTtcblx0Y29uc3QgdmFsaWRfcmVhc29uID0gW1xuXHRcdCdkZWxldGlvbicsXG5cdFx0J2luZmVyaW9yJyxcblx0XHQndXNlcicsXG5cdFx0J2RucF9hcnRpc3QnLFxuXHRcdCdwYXlfY29udGVudCcsXG5cdFx0J3RyYWNlJyxcblx0XHQncHJldmlvdXNseV9kZWxldGVkJyxcblx0XHQncmVhbF9wb3JuJyxcblx0XHQnY29ycnVwdCdcblx0XTtcblxuXHRpZiAodmFsaWRfcmVhc29uLmluY2x1ZGVzKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10pID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgcG9zdF9mbGFnW3JlYXNvbl9uYW1lXSBtdXN0IGJlIG9uZSBvZiBbJHt2YWxpZF9yZWFzb24uam9pbignLCAnKX1dYCk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXSA9PT0gJ3VzZXInKSB7XG5cdFx0aWYgKHR5cGVvZiBzZXR0aW5nc1sncG9zdF9mbGFnW3VzZXJfcmVhc29uXSddICE9PSAnc3RyaW5nJylcdHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignaWYgcG9zdF9mbGFnW3JlYXNvbl9uYW1lXSBpcyBcXCd1c2VyXFwnIHRoZW4gcG9zdF9mbGFnW3VzZXJfcmVhc29uXSBtdXN0IGJlIGEgc3RyaW5nJyk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3Bvc3RfZmxhZ1t1c2VyX3JlYXNvbl0gbXVzdCBiZSBudWxsIHVubGVzcyBwb3N0X2ZsYWdbcmVhc29uX25hbWVdIGlzIFxcJ3VzZXJcXCcnKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddID09PSAnaW5mZXJpb3InKSB7XG5cdFx0dmFsaWRhdGVfY291bnRpbmdfbnVtYmVyKHNldHRpbmdzWydwb3N0X2ZsYWdbcGFyZW50X2lkXSddLCAncG9zdF9mbGFnW3BhcmVudF9pZF0nKTtcblx0fSBlbHNlIGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3BhcmVudF9pZF0nXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncG9zdF9mbGFnW3BhcmVudF9pZF0gbXVzdCBiZSBudWxsIHVubGVzcyBwb3N0X2ZsYWdbcGFyZW50X2lkXSBpcyBcXCdpbmZlcmlvclxcJycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHtcblx0XHQncG9zdF9mbGFnW3Bvc3RfaWRdJzogc2V0dGluZ3NbJ3Bvc3RfZmxhZ1twb3N0X2lkXSddLFxuXHRcdCdwb3N0X2ZsYWdbcmVhc29uX25hbWVdJzogc2V0dGluZ3NbJ3Bvc3RfZmxhZ1tyZWFzb25fbmFtZV0nXVxuXHR9O1xuXG5cdGlmIChzZXR0aW5nc1sncG9zdF9mbGFnW3JlYXNvbl9uYW1lXSddID09PSAndXNlcicpIHtcblx0XHRyZXR1cm5fb2JqZWN0Wydwb3N0X2ZsYWdbdXNlcl9yZWFzb25dJ10gPSBzZXR0aW5nc1sncG9zdF9mbGFnW3VzZXJfcmVhc29uXSddO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzWydwb3N0X2ZsYWdbcmVhc29uX25hbWVdJ10gPT09ICdpbmZlcmlvcicpIHtcblx0XHRyZXR1cm5fb2JqZWN0Wydwb3N0X2ZsYWdbcGFyZW50X2lkXSddID0gc2V0dGluZ3NbJ3Bvc3RfZmxhZ1twYXJlbnRfaWRdJ107XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuX29iamVjdDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnIpIHtcblx0Y29uc29sZS5sb2coZXJyKTtcblx0dGhyb3cgZXJyO1xufTtcblxuZXhwb3J0IHsgcmF3X3Bvc3RfZmxhZ19jcmVhdGUgfTtcbiIsImltcG9ydCBkb3dubG9hZCBmcm9tICcuLy4uLy4uL2Rvd25sb2FkL2Rvd25sb2FkLl9fVEFSR0VUX18uanMnO1xuaW1wb3J0IHtcblx0dmFsaWRhdGVfc3RyaW5nLFxuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nLFxuXHR2YWxpZGF0ZV9ib29sZWFuLFxuXHR2YWxpZGF0ZV9mcm9tX2xpc3Rcbn0gZnJvbSAnLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMnO1xuXG5hc3luYyBmdW5jdGlvbiByYXdfdGFnX3NlYXJjaCAoc2V0dGluZ3MpIHtcblx0dmFsaWRhdGVfc2V0dGluZ3Moc2V0dGluZ3MpO1xuXHRyZXR1cm4gZG93bmxvYWQuY2FsbCh0aGlzLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRwYXRoOiAnL3RhZ3MnLFxuXHRcdHJlc3BvbnNlOiAnSlNPTicsXG5cblx0XHRmb3JtYXQ6ICdVUkwnLFxuXHRcdGRhdGE6IG1ha2VfZGF0YShzZXR0aW5ncylcblx0fSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3NldHRpbmdzIChzZXR0aW5ncykge1xuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtpZF0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2NvdW50aW5nX251bWJlcihzZXR0aW5nc1snc2VhcmNoW2lkXSddLCAnc2VhcmNoW2lkXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzWydzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSddLCAnc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX3N0cmluZyhzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXSwgJ3NlYXJjaFtuYW1lX21hdGNoZXNdJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtuYW1lXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfc3RyaW5nKHNldHRpbmdzWydzZWFyY2hbbmFtZV0nXSwgJ3NlYXJjaFtuYW1lXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbY2F0ZWdvcnldJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3NbJ3NlYXJjaFtjYXRlZ29yeV0nXSwgJ3NlYXJjaFtjYXRlZ29yeV0nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hpZGVfZW1wdHldJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzWydzZWFyY2hbaGlkZV9lbXB0eV0nXSwgJ3NlYXJjaFtoaWRlX2VtcHR5XScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGFzX3dpa2ldJ10gIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9ib29sZWFuKHNldHRpbmdzWydzZWFyY2hbaGFzX3dpa2ldJ10sICdzZWFyY2hbaGFzX3dpa2ldJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtoYXNfYXJ0aXN0XSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfYm9vbGVhbihzZXR0aW5nc1snc2VhcmNoW2hhc19hcnRpc3RdJ10sICdzZWFyY2hbaGFzX2FydGlzdF0nKTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2lzX2xvY2tlZF0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2Jvb2xlYW4oc2V0dGluZ3NbJ3NlYXJjaFtpc19sb2NrZWRdJ10sICdzZWFyY2hbaXNfbG9ja2VkXScpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzWydzZWFyY2hbaGlkZV93aWtpXSddICE9PSBudWxsKSB7XG5cdFx0dmFsaWRhdGVfYm9vbGVhbihzZXR0aW5nc1snc2VhcmNoW2hpZGVfd2lraV0nXSwgJ3NlYXJjaFtoaWRlX3dpa2ldJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3NbJ3NlYXJjaFtvcmRlcl0nXSAhPT0gbnVsbCkge1xuXHRcdHZhbGlkYXRlX2Zyb21fbGlzdChzZXR0aW5nc1snc2VhcmNoW29yZGVyXSddLCBbJ25hbWUnLCAnZGF0ZScsICdjb3VudCcsICdzaW1pbGFyaXR5J10sICdzZWFyY2hbb3JkZXJdJyk7XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MubGltaXQgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIoc2V0dGluZ3MubGltaXQsICdsaW1pdCcpO1xuXHR9XG5cblx0aWYgKHNldHRpbmdzLnBhZ2UgIT09IG51bGwpIHtcblx0XHR2YWxpZGF0ZV9wYWdlX3N0cmluZyhzZXR0aW5ncy5wYWdlLCAncGFnZScpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VfZGF0YSAoc2V0dGluZ3MpIHtcblx0Y29uc3QgcmV0dXJuX29iamVjdCA9IHt9O1xuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2lkXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2lkXSddID0gc2V0dGluZ3NbJ3NlYXJjaFtpZF0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtmdXp6eV9uYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5nc1snc2VhcmNoW2Z1enp5X25hbWVfbWF0Y2hlc10nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtuYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5nc1snc2VhcmNoW25hbWVfbWF0Y2hlc10nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW25hbWVdJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbbmFtZV0nXSA9IHNldHRpbmdzWydzZWFyY2hbbmFtZV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2NhdGVnb3J5XSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2NhdGVnb3J5XSddID0gc2V0dGluZ3NbJ3NlYXJjaFtjYXRlZ29yeV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hpZGVfZW1wdHldJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbaGlkZV9lbXB0eV0nXSA9IHNldHRpbmdzWydzZWFyY2hbaGlkZV9lbXB0eV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hhc193aWtpXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2hhc193aWtpXSddID0gc2V0dGluZ3NbJ3NlYXJjaFtoYXNfd2lraV0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2hhc19hcnRpc3RdJ10gIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbaGFzX2FydGlzdF0nXSA9IHNldHRpbmdzWydzZWFyY2hbaGFzX2FydGlzdF0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW2lzX2xvY2tlZF0nXSAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtpc19sb2NrZWRdJ10gPSBzZXR0aW5nc1snc2VhcmNoW2lzX2xvY2tlZF0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5nc1snc2VhcmNoW29yZGVyXSddICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW29yZGVyXSddID0gc2V0dGluZ3NbJ3NlYXJjaFtvcmRlcl0nXTtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5saW1pdCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3QubGltaXQgPSBzZXR0aW5ncy5saW1pdDtcblx0fVxuXG5cdGlmIChzZXR0aW5ncy5wYWdlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdC5wYWdlID0gc2V0dGluZ3MucGFnZTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyByYXdfdGFnX3NlYXJjaCB9O1xuIiwiaW1wb3J0IHsgcmF3X3RhZ19zZWFyY2ggfSBmcm9tICcuL3Jhd190YWdfc2VhcmNoLmpzJztcblxuY29uc3QgdGFnX2NhdGVnb3J5ID0ge1xuXHRnZW5lcmFsOiAwLFxuXHRhcnRpc3Q6IDEsXG5cdGNvcHlyaWdodDogMyxcblx0Y2hhcmFjdGVyOiA0LFxuXHRzcGVjaWVzOiA1LFxuXHRpbnZhbGlkOiA2LFxuXHRtZXRhOiA3LFxuXHRsb3JlOiA4XG59O1xuXG5hc3luYyBmdW5jdGlvbiB0YWdfc2VhcmNoIChzZXR0aW5ncywgcGFnZSA9IDApIHtcblx0aWYgKHNldHRpbmdzLnBhZ2UgPT09IG51bGwgfHwgc2V0dGluZ3MucGFnZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0c2V0dGluZ3MucGFnZSA9IHBhZ2UudG9TdHJpbmcoKTtcblx0fSAvLyBlbHNlIHBhZ2UgaXMgYWxyZWFkeSBzZXRcblxuXHRyZXR1cm4gcmF3X3RhZ19zZWFyY2guY2FsbCh0aGlzLCBtYWtlX3NldHRpbmdzKHNldHRpbmdzKSkuY2F0Y2goaGFuZGxlX2Vycm9yKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX2Vycm9yIChlcnJvcikge1xuXHQvLyBUb2RvXG5cdGNvbnNvbGUubG9nKGVycm9yKTtcblx0dGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIG1ha2Vfc2V0dGluZ3MgKHNldHRpbmdzKSB7XG5cdGNvbnN0IHJldHVybl9vYmplY3QgPSB7XG5cdFx0J3NlYXJjaFtpZF0nOiBudWxsLFxuXHRcdCdzZWFyY2hbZnV6enlfbmFtZV9tYXRjaGVzXSc6IG51bGwsXG5cdFx0J3NlYXJjaFtuYW1lX21hdGNoZXNdJzogbnVsbCxcblx0XHQnc2VhcmNoW25hbWVdJzogbnVsbCxcblx0XHQnc2VhcmNoW2NhdGVnb3J5XSc6IG51bGwsXG5cdFx0J3NlYXJjaFtoaWRlX2VtcHR5XSc6IG51bGwsXG5cdFx0J3NlYXJjaFtoYXNfd2lraV0nOiBudWxsLFxuXHRcdCdzZWFyY2hbaGFzX2FydGlzdF0nOiBudWxsLFxuXHRcdCdzZWFyY2hbaXNfbG9ja2VkXSc6IG51bGwsXG5cdFx0J3NlYXJjaFtoaWRlX3dpa2ldJzogbnVsbCxcblx0XHQnc2VhcmNoW29yZGVyXSc6IG51bGwsXG5cdFx0bGltaXQ6IG51bGwsXG5cdFx0cGFnZTogc2V0dGluZ3MucGFnZVxuXHR9O1xuXG5cdGlmIChzZXR0aW5ncy5pZCAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzLmlkICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuX29iamVjdFsnc2VhcmNoW2lkXSddID0gc2V0dGluZ3MuaWQ7XG5cdH0gZWxzZSBpZiAoc2V0dGluZ3MuZnV6enlfbWF0Y2ggIT09IHVuZGVmaW5lZCAmJiBzZXR0aW5ncy5mdXp6eV9tYXRjaCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtmdXp6eV9uYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5ncy5mdXp6eV9tYXRjaDtcblx0fSBlbHNlIGlmIChzZXR0aW5ncy53aWxkX21hdGNoICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3Mud2lsZF9tYXRjaCAhPT0gbnVsbCkge1xuXHRcdHJldHVybl9vYmplY3RbJ3NlYXJjaFtuYW1lX21hdGNoZXNdJ10gPSBzZXR0aW5ncy53aWxkX21hdGNoO1xuXHR9IGVsc2UgaWYgKHNldHRpbmdzLmV4YWN0X21hdGNoICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3MuZXhhY3RfbWF0Y2ggIT09IG51bGwpIHtcblx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbbmFtZV0nXSA9IHNldHRpbmdzLmV4YWN0X21hdGNoO1xuXHR9XG5cblx0Zm9yIChjb25zdCB0ZXJtIG9mIFsnaGlkZV9lbXB0eScsICdoYXNfd2lraScsICdoYXNfYXJ0aXN0JywgJ2lzX2xvY2tlZCcsICdoaWRlX3dpa2knLCAnb3JkZXInXSkge1xuXHRcdGlmIChzZXR0aW5nc1t0ZXJtXSAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzW3Rlcm1dICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm5fb2JqZWN0W2BzZWFyY2hbJHt0ZXJtfV1gXSA9IHNldHRpbmdzW3Rlcm1dO1xuXHRcdH1cblx0fVxuXG5cdGlmIChzZXR0aW5ncy5jYXRlZ29yeSAhPT0gbnVsbCAmJiBzZXR0aW5ncy5jYXRlZ29yeSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKHRhZ19jYXRlZ29yeVtzZXR0aW5ncy5jYXRlZ29yeV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYXRlZ29yeSBtdXN0IGJlIG9uZSBvZiBbJHtPYmplY3Qua2V5cyh0YWdfY2F0ZWdvcnkpLmpvaW4oJywgJyl9XWApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm5fb2JqZWN0WydzZWFyY2hbY2F0ZWdvcnldJ10gPSBzZXR0aW5ncy5jYXRlZ29yeTtcblx0XHR9XG5cdH1cblxuXHRpZiAoc2V0dGluZ3MubGltaXQgIT09IG51bGwgJiYgc2V0dGluZ3MubGltaXQgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybl9vYmplY3QubGltaXQgPSBzZXR0aW5ncy5saW1pdDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm5fb2JqZWN0LmxpbWl0ID0gMTAwMDtcblx0fVxuXG5cdHJldHVybiByZXR1cm5fb2JqZWN0O1xufVxuXG5leHBvcnQgeyB0YWdfc2VhcmNoIH07XG4iLCJpbXBvcnQgeyB0YWdfc2VhcmNoIH0gZnJvbSAnLi90YWdfc2VhcmNoLmpzJztcblxuY29uc3QgdGFnc19wZXJfcGFnZSA9IDEwMDA7XG5cbi8vIFlvdSBjYW4gbm90IGhhdmUgYSBkaWZmZXJlbnQgb3JkZXIgd2hlbiBzZWFyY2hpbmcgdGhyb3VnaCBwb3N0cyBsaWtlIHRoaXNcbmFzeW5jIGZ1bmN0aW9uKiB0YWdfc2VhcmNoX2l0ZXJhdG9yIChzZWFyY2hfb3B0aW9ucykge1xuXHQvLyBcIlByb3ZpZGluZyBhcmJpdHJhcmlseSBsYXJnZSB2YWx1ZXMgdG8gb2J0YWluIHRoZSBtb3N0IHJlY2VudCBwb3N0c1xuXHQvLyBpcyBub3QgcG9ydGFibGUgYW5kIG1heSBicmVhayBpbiB0aGUgZnV0dXJlXCIuICh3aWtpKVxuXHQvLyBJIGRvIHdoYXQgSSB3YW50XG5cdHNlYXJjaF9vcHRpb25zLnBhZ2UgPSBudWxsO1xuXHRzZWFyY2hfb3B0aW9ucy5saW1pdCA9IG51bGw7XG5cblx0bGV0IG1heF9pZCA9IDFlOTtcblx0d2hpbGUgKHRydWUpIHtcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vendhZ290aC9lNjIxbmcvaXNzdWVzLzIwMlxuXHRcdGNvbnN0IHRhZ3MgPSBhd2FpdCB0YWdfc2VhcmNoLmNhbGwodGhpcywge1xuXHRcdFx0Li4uc2VhcmNoX29wdGlvbnMsXG5cdFx0XHRwYWdlOiBgYiR7bWF4X2lkfWAsXG5cdFx0XHRsaW1pdDogMTAwMFxuXHRcdH0pLmNhdGNoKGhhbmRsZV9lcnJvcik7XG5cblx0XHR5aWVsZCogdGFncztcblx0XHRtYXhfaWQgPSB0YWdzLnJlZHVjZSgoYWNjLCBlKSA9PiBhY2MuaWQgPCBlLmlkID8gYWNjIDogZSkuaWQ7XG5cblx0XHRpZiAodGFncy5sZW5ndGggPCB0YWdzX3Blcl9wYWdlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9lcnJvciAoZXJyb3IpIHtcblx0Ly8gVG9kb1xuXHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdHRocm93IGVycm9yO1xufVxuXG5leHBvcnQgeyB0YWdfc2VhcmNoX2l0ZXJhdG9yIH07XG4iLCJmdW5jdGlvbiB2YWxpZGF0ZV9tZDUgKG1kNSkge1xuXHRpZiAodHlwZW9mIG1kNSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21kNSBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJyk7XG5cdH1cblxuXHRpZiAobWQ1Lmxlbmd0aCAhPT0gMzIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21kNSBtdXN0IGJlIG9mIGxlbmd0aCAzMicpO1xuXHR9XG5cblx0Y29uc3QgY29udGFpbnNfbm9uX2hleCA9IC9bXjAtOWEtZkEtRl0vZztcblx0aWYgKGNvbnRhaW5zX25vbl9oZXgudGVzdChtZDUpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtZDUgY29udGFpbnMgbm9uLWhleGFkZWNpbWFsIGNoYXJhY3RlcicpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX2NvdW50aW5nX251bWJlciAobnVtYmVyLCBuYW1lKSB7XG5cdGlmICh0eXBlb2YgbnVtYmVyICE9PSAnbnVtYmVyJykge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBtdXN0IGJlIGEgbnVtYmVyYCk7XG5cdH1cblxuXHRpZiAoTnVtYmVyLmlzSW50ZWdlcihudW1iZXIpID09PSBmYWxzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfW11c3QgYmUgYW4gaW50ZWdlcmApO1xuXHR9XG5cblx0aWYgKG51bWJlciA8IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyb2ApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX3N0cmluZyAoc3RyaW5nLCBuYW1lKSB7XG5cdGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBpcyBub3QgYSBzdHJpbmdgKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV92b3RlX29wdGlvbiAodm90ZSkge1xuXHRpZiAodm90ZSAhPT0gLTEgJiYgdm90ZSAhPT0gMCAmJiB2b3RlICE9PSAxKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd2b3RlIGlzIG5vdCBvZiB0aGUgdmFsdWVzIFstMSwgMV0nKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9wYWdlX3N0cmluZyAoc3RyaW5nLCBuYW1lKSB7XG5cdHZhbGlkYXRlX3N0cmluZyhzdHJpbmcsIG5hbWUpO1xuXG5cdGlmICgoL1thYl0/XFxkKy8pLnRlc3Qoc3RyaW5nKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7bmFtZX0gZG9lcyBub3QgbWF0Y2ggdGhlIGZvcm1hdCAvW2FiXT9cXFxcZCsvYCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfYm9vbGVhbiAoYm9vbGVhbiwgbmFtZSkge1xuXHRpZiAoYm9vbGVhbiAhPT0gZmFsc2UgJiYgYm9vbGVhbiAhPT0gdHJ1ZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJHtuYW1lfSBpcyBub3Qgb2YgdGhlIHR5cGUgYm9vbGVhbmApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlX2Zyb21fbGlzdCAodmFsdWUsIGxpc3QsIG5hbWUpIHtcblx0aWYgKGxpc3Quc29tZShlID0+IGUgPT09IHZhbHVlKSA9PT0gZmFsc2UpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFZhbHVlICR7dmFsdWV9IG5vdCBpbiBsaXN0IFske2xpc3Quam9pbignLCAnKX1dIGZvciAke25hbWV9YCk7XG5cdH1cbn1cblxuZXhwb3J0IHtcblx0dmFsaWRhdGVfbWQ1LFxuXHR2YWxpZGF0ZV9jb3VudGluZ19udW1iZXIsXG5cdHZhbGlkYXRlX3N0cmluZyxcblx0dmFsaWRhdGVfdm90ZV9vcHRpb24sXG5cdHZhbGlkYXRlX3BhZ2Vfc3RyaW5nLFxuXHR2YWxpZGF0ZV9ib29sZWFuLFxuXHR2YWxpZGF0ZV9mcm9tX2xpc3Rcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJhd19wb3N0X3Nob3cgfSBmcm9tICcuL3Bvc3Qvc2hvdy9yYXdfcG9zdF9zaG93LmpzJztcbmltcG9ydCB7XG5cdHBvc3Rfc2hvd19pZCxcblx0cG9zdF9zaG93X21kNSxcblx0cG9zdF9zaG93XG59IGZyb20gJy4vcG9zdC9zaG93L3Bvc3Rfc2hvdy5qcyc7XG5cbmltcG9ydCB7IHJhd19wb3N0X3NlYXJjaCB9IGZyb20gJy4vcG9zdC9pbmRleC9yYXdfcG9zdF9zZWFyY2guanMnO1xuaW1wb3J0IHsgcG9zdF9zZWFyY2ggfSBmcm9tICcuL3Bvc3QvaW5kZXgvcG9zdF9zZWFyY2guanMnO1xuaW1wb3J0IHsgcG9zdF9zZWFyY2hfaXRlcmF0b3IgfSBmcm9tICcuL3Bvc3QvaW5kZXgvcG9zdF9zZWFyY2hfaXRlcmF0b3IuanMnO1xuXG5pbXBvcnQge1xuXHRyYXdfcG9zdF92b3RlLFxuXHRwb3N0X3ZvdGVfcmVtb3ZlXG59IGZyb20gJy4vcG9zdC92b3RlL3Jhd19wb3N0X3ZvdGUuanMnO1xuaW1wb3J0IHtcblx0cG9zdF92b3RlX3VwLFxuXHRwb3N0X3ZvdGVfZG93blxufSBmcm9tICcuL3Bvc3Qvdm90ZS9wb3N0X3ZvdGUuanMnO1xuXG5pbXBvcnQgeyByYXdfcG9zdF9jcmVhdGUgfSBmcm9tICcuL3Bvc3QvY3JlYXRlL3Jhd19wb3N0X2NyZWF0ZS5qcyc7XG5pbXBvcnQgeyBwb3N0X2NyZWF0ZSB9IGZyb20gJy4vcG9zdC9jcmVhdGUvcG9zdF9jcmVhdGUuanMnO1xuXG5pbXBvcnQgeyByYXdfcG9zdF91cGRhdGUgfSBmcm9tICcuL3Bvc3QvdXBkYXRlL3Jhd19wb3N0X3VwZGF0ZS5qcyc7XG5pbXBvcnQgeyBwb3N0X3VwZGF0ZSB9IGZyb20gJy4vcG9zdC91cGRhdGUvcG9zdF91cGRhdGUuanMnO1xuXG5pbXBvcnQgeyByYXdfcG9zdF9jb3B5X25vdGVzIH0gZnJvbSAnLi9wb3N0L2NvcHlfbm90ZXMvcmF3X3Bvc3RfY29weV9ub3Rlcy5qcyc7XG5pbXBvcnQgeyBwb3N0X2NvcHlfbm90ZXMgfSBmcm9tICcuL3Bvc3QvY29weV9ub3Rlcy9wb3N0X2NvcHlfbm90ZXMuanMnO1xuXG5pbXBvcnQgeyByYXdfcG9zdF9mbGFnX2NyZWF0ZSB9IGZyb20gJy4vcG9zdF9mbGFnL2NyZWF0ZS9yYXdfcG9zdF9mbGFnX2NyZWF0ZS5qcyc7XG5pbXBvcnQge1xuXHRwb3N0X2ZsYWdfY3JlYXRlLFxuXHRwb3N0X2ZsYWdfcmVhc29uc1xufSBmcm9tICcuL3Bvc3RfZmxhZy9jcmVhdGUvcG9zdF9mbGFnX2NyZWF0ZS5qcyc7XG5cbmltcG9ydCB7IHJhd19jb21tZW50X2NyZWF0ZSB9IGZyb20gJy4vY29tbWVudC9jcmVhdGUvcmF3X2NvbW1lbnRfY3JlYXRlLmpzJztcbmltcG9ydCB7IGNvbW1lbnRfY3JlYXRlIH0gZnJvbSAnLi9jb21tZW50L2NyZWF0ZS9jb21tZW50X2NyZWF0ZS5qcyc7XG5cbmltcG9ydCB7IHBvc3RfYnZhcyB9IGZyb20gJy4vcG9zdC9idmFzL3Bvc3RfYnZhcy5qcyc7XG5cbmltcG9ydCB7IHJhd19ibGlwX2NyZWF0ZSB9IGZyb20gJy4vYmxpcC9jcmVhdGUvcmF3X2JsaXBfY3JlYXRlLmpzJztcbmltcG9ydCB7IGJsaXBfY3JlYXRlIH0gZnJvbSAnLi9ibGlwL2NyZWF0ZS9ibGlwX2NyZWF0ZS5qcyc7XG5cbmltcG9ydCB7IHJhd190YWdfc2VhcmNoIH0gZnJvbSAnLi90YWdzL2luZGV4L3Jhd190YWdfc2VhcmNoLmpzJztcbmltcG9ydCB7IHRhZ19zZWFyY2ggfSBmcm9tICcuL3RhZ3MvaW5kZXgvdGFnX3NlYXJjaC5qcyc7XG5pbXBvcnQgeyB0YWdfc2VhcmNoX2l0ZXJhdG9yIH0gZnJvbSAnLi90YWdzL2luZGV4L3RhZ19zZWFyY2hfaXRlcmF0b3IuanMnO1xuXG5jbGFzcyBFNjIxQVBJIHtcblx0Ly8gQW55IG9mIHRoZXNlIGNhbiBiZSBhbnl0aGluZywgYnV0IGVycm9ycyB3aWxsIGJlIHRocm93blxuXHQvLyB3aGVuIGFueSByZXF1ZXN0cyBhcmUgdHJ5aW5nIHRvIGJlIG1hZGUuXG5cdGNvbnN0cnVjdG9yICh1c2VyYWdlbnQsIHVzZXJuYW1lLCBhcGlfa2V5KSB7XG5cdFx0dGhpcy51c2VyYWdlbnQgPSB1c2VyYWdlbnQ7XG5cdFx0dGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuXHRcdHRoaXMuYXBpX2tleSA9IGFwaV9rZXk7XG5cdH1cbn1cblxuRTYyMUFQSS5wcm90b3R5cGUudmVyc2lvbiA9ICcxLjAwMTAwJztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3Rfc2hvdyA9IHJhd19wb3N0X3Nob3c7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3Nob3dfaWQgPSBwb3N0X3Nob3dfaWQ7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3Nob3dfbWQ1ID0gcG9zdF9zaG93X21kNTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfc2hvdyA9IHBvc3Rfc2hvdztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3Rfc2VhcmNoID0gcmF3X3Bvc3Rfc2VhcmNoO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9zZWFyY2ggPSBwb3N0X3NlYXJjaDtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfc2VhcmNoX2l0ZXJhdG9yID0gcG9zdF9zZWFyY2hfaXRlcmF0b3I7XG5cbkU2MjFBUEkucHJvdG90eXBlLnJhd19wb3N0X3ZvdGUgPSByYXdfcG9zdF92b3RlO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF92b3RlX3VwID0gcG9zdF92b3RlX3VwO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF92b3RlX2Rvd24gPSBwb3N0X3ZvdGVfZG93bjtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3Rfdm90ZV9yZW1vdmUgPSBwb3N0X3ZvdGVfcmVtb3ZlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9jcmVhdGUgPSByYXdfcG9zdF9jcmVhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X2NyZWF0ZSA9IHBvc3RfY3JlYXRlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF91cGRhdGUgPSByYXdfcG9zdF91cGRhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5wb3N0X3VwZGF0ZSA9IHBvc3RfdXBkYXRlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfcG9zdF9jb3B5X25vdGVzID0gcmF3X3Bvc3RfY29weV9ub3RlcztcbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfY29weV9ub3RlcyA9IHBvc3RfY29weV9ub3RlcztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X3Bvc3RfZmxhZ19jcmVhdGUgPSByYXdfcG9zdF9mbGFnX2NyZWF0ZTtcbkU2MjFBUEkucHJvdG90eXBlLnBvc3RfZmxhZ19jcmVhdGUgPSBwb3N0X2ZsYWdfY3JlYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9mbGFnX3JlYXNvbnMgPSBwb3N0X2ZsYWdfcmVhc29ucztcblxuRTYyMUFQSS5wcm90b3R5cGUucmF3X2NvbW1lbnRfY3JlYXRlID0gcmF3X2NvbW1lbnRfY3JlYXRlO1xuRTYyMUFQSS5wcm90b3R5cGUuY29tbWVudF9jcmVhdGUgPSBjb21tZW50X2NyZWF0ZTtcblxuRTYyMUFQSS5wcm90b3R5cGUucG9zdF9idmFzID0gcG9zdF9idmFzO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfYmxpcF9jcmVhdGUgPSByYXdfYmxpcF9jcmVhdGU7XG5FNjIxQVBJLnByb3RvdHlwZS5ibGlwX2NyZWF0ZSA9IGJsaXBfY3JlYXRlO1xuXG5FNjIxQVBJLnByb3RvdHlwZS5yYXdfdGFnX3NlYXJjaCA9IHJhd190YWdfc2VhcmNoO1xuRTYyMUFQSS5wcm90b3R5cGUudGFnX3NlYXJjaCA9IHRhZ19zZWFyY2g7XG5FNjIxQVBJLnByb3RvdHlwZS50YWdfc2VhcmNoX2l0ZXJhdG9yID0gdGFnX3NlYXJjaF9pdGVyYXRvcjtcblxuZXhwb3J0IGRlZmF1bHQgRTYyMUFQSTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==