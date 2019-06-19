# Quick Tagger

### [Install](https://github.com/Sasquire/quick_tagger/raw/master/quick_tagger.user.js)
You must have some user script manager. [Greasy Fork](https://greasyfork.org/en) has a good list. (I use tampermonkey)

***todo***
### [Examples](link)
### [e621 thread](link)

#### What is this?
This tool is meant to be used for tagging projects on e621.net. It will provide the user a custom interface where they can easily and quickly apply tags to images using hotkeys or buttons.

#### How do I use it?

You can naviagate to [this page](https://e621.net/extensions/quick_tagger) and then if the userscript is installed you will get a page that is not the 404 page from e621. After that, settings are in the top, tag rules are on the right, posts are on the left, and the current post will be in the center.

You will need to import some settings or build your own. After that you can use the hotkeys set to start tagging images.

#### How can I contribute?

In trying to make this project more manageable I have split the source code into multiple files that need to be combined to produce the final userscript. The code to combine the files is `build.js` which uses nodejs.

If you would like to start working on some code, there are a list of things that need to get done in `todo.txt` (these are also baked into the final userscrip)

#### Have an issue?

Contact [me on e621.net](https://e621.net/user/show/170289) or leave an issue on this github page. To properly diagnose the problem I would need a log from what was happening before the program crashed. To do this open up the [developer console](https://webmasters.stackexchange.com/a/77337) and include the recent messages.

#### Tested on

Tampermonkey version 4.8.5847 on
Firefox Quantum 67.0 (64-bit) Arch Linux

Tampermonkey version 4.9.5941 on
Chromium 74.0.3729.169 (Official Build) Arch Linux (64-bit)