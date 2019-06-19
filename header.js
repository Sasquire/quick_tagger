// ==UserScript==
// @name         e621 quick tagger
// @description  Custom page for quickly tagging sets of tags

// @namespace   http://tampermonkey.net/
// @version     1.00002

// @author      Sasquire

// @match       http://e621.net/extensions/quick_tag
// @match       https://e621.net/extensions/quick_tag

// @grant       GM_addStyle
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

// Init is run at bottom of script

// todo
// multi button hotkeys, for example
//   mm for m/m, mf for m/f, so on
//   sf for solo_focus, df for duo focus
// save edit history
//   useful for going back and seeing what you've changed
//   would it be better to use localstorage or GM.setValue
// apply tags on post load
//   if a post already has say male when it is loaded
//   highlight the male box, so users do not highlight it a second time
//   could be bad because then they turn the rule off.
//   but maybe make that not remove the rule.
// get flash to work correctly
//   I didn't find it worth my time to get it working well
// allow blacklist
//   I figure if you want to use this, you don't care about blacklist
//   but someone will want this feature, because i hope this
//   tool doesnt fall into obscurity
// update post navigation
//   automatically scroll the thing when new posts are loaded
// actually have pretty css
//   I don't into colors, so make a nice greyscale one
//   Just change all my bad decisions into good ones
