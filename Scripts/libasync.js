var _ROOT_LOADER = "";
var __tmp_scripts = document.getElementsByTagName("script");
for (var s = __tmp_scripts.length - 1; s >= 0; s--) {
    var i = __tmp_scripts[s].src.indexOf("libasync");
    if (i > -1) {
        _ROOT_LOADER = __tmp_scripts[s].src.substring(0, i);

        i = _ROOT_LOADER.indexOf("://");
        _ROOT_LOADER = _ROOT_LOADER.substring(i + 1);

        break;
    }
}

var zeSkins = zeSkins || []; // array of skin objects
var zeGalleryArray = zeGalleryArray || []; // array of active galleries

var _cp_go_hooks = new Object();

var _wp_filesadded = _wp_filesadded || "";
var _wp_widget_js_array = _wp_widget_js_array || [];
var _cp_preloaded_files = new Object();

function isnull(obj) { return typeof obj == "undefined" || obj == null || obj == ""; }


var _cpmp = _cpmp || [];
for (var i = 0; i < _cpmp.length; i++) //
{
    getElement(_cpmp[i]["_object"]).innerHTML = '<img src="' + _ROOT_LOADER + 'loading.gif" style="border:0;width:50px;height:10px;"/>';

    var go = new GalleryObject(_cpmp[i]);
    zeGalleryArray[_cpmp[i]["_object"]] = go;

    if (_cpmp[i]["_iframeParentObject"])
        go.iframeParentObject = _cpmp[i]["_iframeParentObject"];


    if (_cpmp[i]["_args"]) {
        trace("loading args directly into go object");
        go.onArgs(_cpmp[i]["_args"]);
    }
    else {
        var url = _ROOT_LOADER + "widgetasync.aspx?id=" + _cpmp[i]["_object"];
        if (_cpmp[i]["_fid"] != null)
            url += "&fid=" + _cpmp[i]["_fid"];
        else
            url += "&refid=" + _cpmp[i]["_refid"] + "&userid=" + _cpmp[i]["_userid"];

        loadJSFile(url);
    }
}
_cpmp = [];

function cp_load_widget(fid, id, host) {

    if (location.href.indexOf("cpdebug=stopall") > -1) {
        alert("stopall");
        return;
    }

    try {
        getElement(id).innerHTML = '<img src="' + _ROOT_LOADER + 'loading.gif" style="border:0;width:50px;height:10px;"/>';
    } catch (ex) {
        var googla = new Image(1, 1);
        googla.src = "//goo.gl/pyAFT";
        return;
    }

    var zeo = [];
    zeo["_object"] = id;
    zeo["_fid"] = fid;

    var go = new GalleryObject(zeo);
    zeGalleryArray[zeo["_object"]] = go;

    var url = _ROOT_LOADER + "widgetasync.aspx?id=" + zeo["_object"] + "&fid=" + zeo["_fid"];
    loadJSFile(url);
}

function loadJSFile(filename) {
    if (filename.toLowerCase().indexOf("//") == -1)
        filename = _cincopa_url + filename;

    if (true) //_wp_filesadded.indexOf("[" + filename + "]") == -1)
    {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);

        document.getElementsByTagName("head")[0].appendChild(fileref);

        _wp_filesadded += "[" + filename + "]";
    }
}

function loadCSSFile(filename) {
    if (filename.toLowerCase().indexOf("//") == -1)
        filename = _cincopa_url + filename;

    if (_wp_filesadded.indexOf("[" + filename + "]") == -1) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);

        document.getElementsByTagName("head")[0].appendChild(fileref);
        _wp_filesadded += "[" + filename + "]";
    }
}

function merge_json(o1, o2, o3) {
    var o = {};

    for (var z in o1)
        o[z] = o1[z];
    for (var z in o2)
        o[z] = o2[z];
    for (var z in o3)
        o[z] = o3[z];

    return o;
}

var _cp_params_arr = {

    base: {
        w: { p: "w", type: "num", name: "Width", desc: "Width of the gallery" },
        h: { p: "h", type: "num", name: "Height", desc: "Height of the gallery" },

        cooliris: { p: "cooliris", name: "Cooliris", type: "list:no,yes", desc: "Add a [View with Cooliris] link. Cooliris is the fastest and most stunning way to browse photos and videos.", permit: 1 },
        allow_download: { p: "allow_download", name: "Allow Download", type: "list:no,original,resized", desc: "Allow user to download and save all files.<br>* Resized zip contains photos resized to 600x450, videos in flv format and music in original sampling.", permit: 1 },
        //			password: {},
        //			grab_this : {},
        //			right-click save as protection
        //			override_css
        domain_lock: { p: "domain_lock", type: "text", name: "Domain Lock", desc: "Allow this gallery to appear only in the domains on this list. This will prevent others from grabbing your gallery to their site. <br>Type a list of domains separated by comma or leave empty to allow all domains.<br>No need for <i>http://</i><br>For example: <i>mydomain.com,blogspot.com</i>", permit: 1 },

        remove_branding: { p: "remove_branding", type: "bool", name: "Remove Cincopa Branding", desc: "Remove the Cincopa icon and the 'Powered By Cincopa' text.", permit: 1 }
    },

    belt: {
        thumb_size: { p: "thumb_size", type: "list:small,medium,large,xlarge", name: "Thumbnail Raw Size", desc: "The size of the thumb file that will be used to scale to the size of this gallery. The smaller the size, the faster it will load, if too small the thumb may appear pixelated.<br>small = up to 100x75<br>medium = up to 200x150<br>large = up to 600x450<br>xlarge = up to 1024x768", permit: 1 },
        content_size: { p: "content_size", type: "list:large,xlarge", name: "Content Size", desc: "Content Size :<br>large = up to 600x450<br>xlarge = up to 1024x768", permit: 1 },
        tooltip: { p: "tooltip", type: "list:none,title and description,title,description", name: "Tooltip", desc: "A tooltip is the small boxed text message that pops up when a mouse cursor hovers over an item. <br><br>Use this parameter to set the content of the tooltip.", permit: 1 },
        lightbox_text: { p: "lightbox_text", type: "list:none,title and description,title,description", name: "Lightbox Text", desc: "Use this parameter to set which text to display in the lightbox (when user click on the image).", permit: 1 }
    },

    imagelist: {
        css_main: { p: "css_main", type: "css", name: "Main CSS", desc: "bla.", permit: 0 },
        pagination: { p: "pagination", type: "num", name: "Images per page", desc: "Number of images per page. 0(zero) means no pagination.", permit: 1 },
        addcaptionthumb: { p: "addcaptionthumb", type: "bool", name: "Display caption for thumb", desc: "Add image caption below thumb.", permit: 1 },
        loaddefaultcss: { p: "loaddefaultcss", type: "bool", name: "Load Default CSS", desc: "Whether to load the default CSS. When unchecked it allows to override the look of the player using CSS.", permit: 1 }
    },

    cooliris: {
        thumb_size: { p: "thumb_size", type: "list:small,medium", name: "Thumbnail Size", desc: "Thumbnail Size", permit: 1 }
    },

    player311: {
        dw: { p: "dw", type: "num", name: "Display Width", desc: "Width of the display area. The menu width is equal to the player width - display width." },

        content_size: { p: "content_size", type: "list:large,xlarge", name: "Content Size", desc: "Content Size" },

        autostart: { p: "autostart", type: "bool", name: "Auto Start", desc: "Automatically start the player on load.", permit: 1 },
        rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Pause time between two items.", permit: 1 }
    },

    player4160: {
        //			dw: { p:"dw", type:"num", name:"Display Width", desc:"Width of the display area. The playlist width is equal to the player width - display width."},
        //			dh: { p:"dh", type:"num", name:"Display Height", desc:"Height of the display area. The playlist height is equal to the player height - display height."},
        plw: { p: "plw", type: "num", name: "Playlist Height", desc: "Height of the playlist" },

        backcolor: { p: "backcolor", type: "color", name: "Back Color", desc: "Background color of the controlbar and playlist.", permit: 1 },
        frontcolor: { p: "frontcolor", type: "color", name: "Front Color", desc: "Color of all icons and texts in the controlbar and playlist.", permit: 1 },
        lightcolor: { p: "lightcolor", type: "color", name: "Light Color", desc: "Color of an icon or text when you rollover it with the mouse.", permit: 1 },
        screencolor: { p: "screencolor", type: "color", name: "Screen Color", desc: "Background color of the display.", permit: 1 },

        albumcoverart: { p: "albumcoverart", type: "list:auto,custom,hide", name: "Album Cover Art", desc: "What album art to show.<br>Auto: Find the image automatically from an online database.<br>Custom: Upload images to the gallery yourself and reorder them before each audio track.", permit: 1 },
        //		overridealbumart: { p: "overridealbumart", type: "bool", name: "Override Album Art", desc: "Set your own CD art. <br>* To set your CD art just add the photo to your gallery when you select the music tracks.", permit: 1 },
        repeat: { p: "repeat", type: "list:none,list,always,single", name: "Repeat", desc: "Set to list to play the entire playlist once, to always to continously play the song/video/playlist and to single to continue repeating the selected file in a playlist.", permit: 1 },
        autostart: { p: "autostart", type: "bool", name: "Auto Start", desc: "Automatically start the player on load.", permit: 1 }
    },

    player44: {
        backcolor: { p: "backcolor", type: "color", name: "Back Color", desc: "Background color of the controlbar and playlist.", permit: 1 },
        frontcolor: { p: "frontcolor", type: "color", name: "Front Color", desc: "Color of all icons and texts in the controlbar and playlist.", permit: 1 },
        lightcolor: { p: "lightcolor", type: "color", name: "Light Color", desc: "Color of an icon or text when you rollover it with the mouse.", permit: 1 },
        screencolor: { p: "screencolor", type: "color", name: "Screen Color", desc: "Background color of the display.", permit: 1 },

        controlbar: { p: "controlbar", type: "list:bottom,none,over", name: "Control Bar", desc: "Position of the controlbar. Can be set to bottom, over and none." },
        icons: { p: "icons", type: "bool", name: "Icons", desc: "Set this to false to hide the play button and buffering icon in the middle of the video." },
        playlist: { p: "playlist", type: "list:none,bottom,over,right", name: "Playlist", desc: "Position of the playlist. Can be set to bottom, over, right or none." },
        playlistsize: { p: "playlistsize", type: "num", name: "Playlist Size", desc: "When Playlist=bottom this refers to the height, when right this refers to the width of the playlist. " },
        autostart: { p: "autostart", type: "bool", name: "Auto Start", desc: "Automatically start the player on load." },
        displayclick: { p: "displayclick", type: "list:play,link,fullscreen,none,mute,next", name: "Display Click", desc: "What to do when one clicks the display. Can be play, link, fullscreen, none, mute, next. When set to none, the handcursor is also not shown.", permit: 1 },
        startitem: { p: "startitem", type: "num", name: "Start Item", desc: "Item that should start to play. Use this to set a specific start-item." },
        //linktarget: { p: "linktarget", type: "list:_blank,_self", name: "Link Target", desc: "browserframe where link from the display are opened in. Can be '_self' (same frame) or '_blank' (new browserwindow)." },
        logo: { p: "logo", type: "text", name: "Watermark Logo", desc: "Location of an external jpg, png or gif image to show in a corner of the display.", permit: 1 },
        mute: { p: "mute", type: "bool", name: "Mute", desc: "Mute all sounds on startup.", permit: 1 },
        repeat: { p: "repeat", type: "list:none,list,always,single", name: "Repeat", desc: "Set to list to play the entire playlist once, to always to continously play the song/video/playlist and to single to continue repeating the selected file in a playlist." },
        //shuffle: { p:"shuffle", type:"bool", name:"Shuffle", desc:"Shuffle playback of playlist items."},
        stretching: { p: "stretching", type: "list:uniform,none,exactfit,fill", name: "Stretching", desc: "Defines how to resize images in the display. Can be none (no stretching), exactfit (disproportionate), uniform (stretch with black borders) or fill (uniform, but completely fill the display)." },
        volume: { p: "volume", type: "num", name: "Volume", desc: "Startup volume of the player. Can be 0 to 100. Is saved in a cookie.", permit: 1 },
        bufferlength: { p: "bufferlength", type: "num", name: "Buffer Length ", desc: "Number of seconds of the file that has to be loaded before starting. Set this to a low value to enable instant-start and to a high value to get less mid-stream buffering.<br><br>Default is 1", permit: 1 },
        grab_this: { p: "grab_this", type: "bool", name: "Allow Grab", desc: "Enable this feature to allow your viewer to grab this gallery and embed it in their site, blog or profile.", permit: 1 }
    },

    audioplayer: {
        allowdownload: { p: "allowdownload", type: "bool", name: "Allow Download", desc: "Add a Download button and allow to download the original music file.<br><br>* Make sure your music is legal - we don't like piracy.", permit: 1 },
        albumcoverart: { p: "albumcoverart", type: "list:auto,custom,hide", name: "Album Cover Art", desc: "What album art to show.<br>Auto: Find the image automatically from an online database.<br>Custom: Upload images to the gallery yourself and reorder them before each audio track.", permit: 1 },
        loaddefaultcss: { p: "loaddefaultcss", type: "bool", name: "Load Default CSS", desc: "Whether to load the default CSS. When unchecked it allows to override the look of the player using CSS.", permit: 1 },

        pw: { p: "pw", type: "num", name: "Player Width", desc: "Width of the player itself", permit: 1 },
        ph: { p: "ph", type: "num", name: "Player Height", desc: "Height of the player itself", permit: 1 },

        bg: { p: "bg", type: "color", name: "Background color", desc: "Background color of the player.", permit: 1 },
        leftbg: { p: "leftbg", type: "color", name: "Left background color", desc: "Left background color of the player.", permit: 1 },
        rightbg: { p: "rightbg", type: "color", name: "Right background color", desc: "Right background color of the player.", permit: 1 },
        rightbghover: { p: "rightbghover", type: "color", name: "Right hover background color", desc: "Right hover background color of the player.", permit: 1 },
        lefticon: { p: "lefticon", type: "color", name: "Left icon color", desc: "Left icon color.", permit: 1 },
        righticon: { p: "righticon", type: "color", name: "Right icon color", desc: "Right icon color.", permit: 1 },
        righticonhover: { p: "righticonhover", type: "color", name: "Right icon hover color", desc: "Right icon hover color.", permit: 1 },
        text: { p: "text", type: "color", name: "Text color", desc: "Text color.", permit: 1 },
        slider: { p: "slider", type: "color", name: "Slider color", desc: "Slider color.", permit: 1 },
        track: { p: "track", type: "color", name: "Track color", desc: "Track color.", permit: 1 },
        border: { p: "border", type: "color", name: "Border color", desc: "Border color.", permit: 1 },
        loader: { p: "loader", type: "color", name: "Loader color", desc: "Loader color.", permit: 1 }
    }
};

var _wp_widget_arr = {

    styleimagelist: {
        pm: "j1", w: "100%", h: "100%", grp: "Simple slideshow", t: "Image list with LightBox", ex: "10464405", media_types: "i",
        js_inc: ["belt/belt.js"],
        css_inc: ["belt/jq.css", "belt/jquery.lightbox-0.5.css"],
        serial_js_inc: [
				{ func: "jQuery", inc: "belt/jquery-1.2.6.pack.js" },
				{ func: "jQuery.fn.lightBox05", inc: "belt/jquery.lightbox-0.5.js" }],
        func: "cp_js_widget_code_imagelist", thumb_size: "small", content_size: "large", img_thumb: "/design13/images/templates/classic/imagelist.jpg", tooltip: "title and description", lightbox_text: "title and description",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.belt)
    },

    styleimagelistv2: {
        visible: false, pm: "j1", w: "100%", h: "100%", grp: "Simple slideshow", t: "Image list Version 2", ex: "10464405", media_types: "i",
        js_inc: ["imagelist/lytebox.js", "imagelist/imagelist.js"],
        css_inc: ["imagelist/lytebox.css"],
        func: "cp_js_widget_code_imagelistv2", thumb_size: "small", content_size: "large", img_thumb: "/design13/images/templates/classic/imagelist.jpg", tooltip: "title and description", lightbox_text: "title and description",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.belt, _cp_params_arr.imagelist),
        pagination: 0,
        addcaptionthumb: false,
        loaddefaultcss: true
    },


    styleimagelistv3: {
        visible: false, pm: "j1", w: "100%", h: "100%", grp: "Simple slideshow", t: "Image list v3 with video and music", ex: "10464405", media_types: "i,a,b,v",
        js_inc: ["imagelistv3/imagelistv3.js", "imagelistv3/flowplayer-3.1.4.min.js"],
        css_inc: ["imagelistv3/prettyPhoto.css"],
        serial_js_inc: [
					{ func: "jQuery", inc: "imagelistv3/jquery-1.3.2.min.js" },
					{ func: "jQuery.fn.prettyPhoto", inc: "imagelistv3/jquery.prettyPhoto.js" }
        ],
        func: "cp_js_widget_code_imagelistv3", nojson: true,
        thumb_w: 100, thumb_h: 75, lightbox_w: 600, lightbox_h: 450, lightbox_theme: "light_rounded", thumb_aspect: "maintain", tooltip: "title and description", lightbox_text: "title and description",
        img_thumb: "/design13/images/templates/classic/imagelist.jpg",
        params: {
            w: { p: "w", type: "num", name: "Width", desc: "Width of the gallery" },
            h: { p: "h", type: "num", name: "Height", desc: "Height of the gallery" },
            thumb_w: { p: "thumb_w", type: "num", name: "Thumb Width", desc: "Width of the thumb" },
            thumb_h: { p: "thumb_h", type: "num", name: "Thumb Height", desc: "Height of the thumb" },
            thumb_aspect: { p: "thumb_aspect", name: "Thumb Aspect Ratio", type: "list:maintain,full_size,override_css", desc: "", permit: 0 },
            lightbox_w: { p: "lightbox_w", type: "num", name: "Lightbox Width", desc: "Width of the lightbox" },
            lightbox_h: { p: "lightbox_h", type: "num", name: "Lightbox Height", desc: "Height of the lightbox" },
            add_title: { p: "add_title", type: "bool", name: "Add Title", desc: "", permit: 0 },
            css_main: { p: "css_main", type: "css", name: "Main CSS", desc: "bla.", permit: 0 },
            lightbox_theme: { p: "lightbox_theme", name: "Lightbox theme", type: "list:light_rounded,dark_rounded,light_square,dark_square,facebook", desc: "", permit: 0 },
            cooliris: { p: "cooliris", name: "Cooliris", type: "list:no,yes", desc: "Add a [View with Cooliris] link. Cooliris is the fastest and most stunning way to browse photos and videos.", permit: 1 },
            allow_download: { p: "allow_download", name: "Allow Download", type: "list:no,original,resized", desc: "Allow user to download and save all files.<br>* Resized zip contains photos resized to 600x450, videos in flv format and music in original sampling.", permit: 1 },
            tooltip: { p: "tooltip", type: "list:none,title and description,title,description", name: "Tooltip", desc: "A tooltip is the small boxed text message that pops up when a mouse cursor hovers over an item. <br><br>Use this parameter to set the content of the tooltip.", permit: 1 },
            domain_lock: { p: "domain_lock", type: "text", name: "Domain Lock", desc: "Allow this gallery to appear only in the domains on this list. This will prevent others from grabbing your gallery to their site. <br>Type a list of domains separated by comma or leave empty to allow all domains.", permit: 1 },
            remove_branding: { p: "remove_branding", type: "bool", name: "Remove Cincopa Branding", desc: "Remove the Cincopa icon and the 'Powered By Cincopa' text.", permit: 1 }
        }
    },


    stylesmoothgallery: {
        pm: "j1", w: 600, h: 450, grp: "Simple slideshow", t: "Smooth Gallery - Large (600x450)", ex: "10473009", media_types: "i",
        js_inc: ["smoothgallery/scripts/all.js"],
        css_inc: ["smoothgallery/css/jd.gallery.css"],
        iframe: true, showarrows: true, showcarousel: true, showinfopane: true, autorotate: true, carouseltext: "Pictures", loadingtext: "Loading", rotatetime: "9",
        thumbspacing: "10", thumbopacity: "2", wipeinfopane: true, infopaneopacity: "7", carouselcloseopacity: "4", carouselopenopacity: "9", transitiontime: 500,
        func: "wp_js_widget_code_smoothgalleryv2", thumb_size: "small", content_size: "large", img_thumb: "/design13/images/templates/classic/smoothgallery.jpg",
        params: merge_json(_cp_params_arr.base, {
            loadingtext: { p: "loadingtext", type: "text", name: "Loading Text", desc: "This text will appear while gallery is loading." },
            carouseltext: { p: "carouseltext", type: "text", name: "Carousel Text", desc: "The text of the open carousel button." },

            iframe: { p: "iframe", type: "bool", name: "iframe", desc: "Enable this option if the gallery is not working properly inside a page and the gallery will be placed in a HTML iframe." },
            thumb_size: { p: "thumb_size", type: "list:small,medium,large,xlarge", name: "Thumbnail Raw Size", desc: "The size of the thumb file that will be used to scale to the size of this gallery. The smaller the size, the faster it will load, if too small the thumb may appear pixelated.<br>small = up to 100x75<br>medium = up to 200x150<br>large = up to 600x450<br>xlarge = up to 1024x768", permit: 1 },
            content_size: { p: "content_size", type: "list:large,xlarge", name: "Content Size", desc: "Content Size :<br>large = up to 600x450<br>xlarge = up to 1024x768", permit: 1 },

            showarrows: { p: "showarrows", type: "bool", name: "Show Arrows", desc: "Show or hide the left and right arrows.", permit: 1 },
            showcarousel: { p: "showcarousel", type: "bool", name: "Show Carousel", desc: "Show or hide the carousel.", permit: 1 },
            showinfopane: { p: "showinfopane", type: "bool", name: "Show Info Pane", desc: "Show or hide the bottom info pane.", permit: 1 },
            wipeinfopane: { p: "wipeinfopane", type: "bool", name: "Wipe Info Pane", desc: "Info pane should wipe-in or fade-in.", permit: 1 },
            infopaneopacity: { p: "infopaneopacity", type: "num", name: "Info Pane opacity", desc: "How transparent is the info pane, number between 0-10 (default is 7).", permit: 1 },

            carouselcloseopacity: { p: "carouselcloseopacity", type: "num", name: "Carousel Close Opacity", desc: "How transparent is the carousel when closed, number between 0-10 (default is 4).", permit: 1 },
            carouselopenopacity: { p: "carouselopenopacity", type: "num", name: "Carousel Open Opacity", desc: "How transparent is the carousel when open, number between 0-10 (default is 9).", permit: 1 },

            thumbspacing: { p: "thumbspacing", type: "num", name: "Thumb Spacing", desc: "Space between the thumbs.", permit: 1 },
            thumbopacity: { p: "thumbopacity", type: "num", name: "Thumb opacity", desc: "How transparent are the thumbs, number between 0-10 (default is 2).", permit: 1 },

            transitiontime: { p: "transitiontime", type: "num", name: "Transition Time", desc: "How fast is the transition between items in 1/1000 of a second (default is 500)", permit: 1 },

            autorotate: { p: "autorotate", type: "bool", name: "Auto Rotate", desc: "Automatically rotate between items.", permit: 1 },
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },

    stylesmoothgalleryv3: {
        visible: false, pm: "j1", w: 600, h: 450, grp: "Simple slideshow", t: "Smooth Gallery v3 - Large (600x450)", ex: "10473009", media_types: "i",
        js_inc: ["smoothgallery/scripts/all.js"],
        css_inc: ["css.aspx?css=main&fid={fid}"],
        iframe: true, showarrows: true, showcarousel: true, showinfopane: true, autorotate: true, carouseltext: "Pictures", loadingtext: "Loading...", rotatetime: "9",
        thumbspacing: "10", thumbopacity: "2", wipeinfopane: true, infopaneopacity: "7", carouselcloseopacity: "4", carouselopenopacity: "9", transitiontime: 500,
        func: "wp_js_widget_code_smoothgalleryv3", thumb_size: "small", content_size: "large", img_thumb: "img/smoothgallery.gif",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.belt, {
            loadingtext: { p: "loadingtext", type: "text", name: "Loading Text", desc: "This text will appear while gallery is loading." },
            carouseltext: { p: "carouseltext", type: "text", name: "Carousel Text", desc: "The text of the open carousel button." },
            iframe: { p: "iframe", type: "bool", name: "iframe", desc: "Enable this option if the gallery is not working properly inside a page and the gallery will be placed in a HTML iframe." },

            css_main: { p: "css_main", type: "css", name: "Main CSS", desc: "Edit CSS of this gallery.", permit: 1 },

            showarrows: { p: "showarrows", type: "bool", name: "Show Arrows", desc: "Show or hide the left and right arrows.", permit: 1 },
            showcarousel: { p: "showcarousel", type: "bool", name: "Show Carousel", desc: "Show or hide the carousel.", permit: 1 },
            showinfopane: { p: "showinfopane", type: "bool", name: "Show Info Pane", desc: "Show or hide the bottom info pane.", permit: 1 },
            wipeinfopane: { p: "wipeinfopane", type: "bool", name: "Wipe Info Pane", desc: "Info pane should wipe-in or fade-in.", permit: 1 },
            infopaneopacity: { p: "infopaneopacity", type: "num", name: "Info Pane opacity", desc: "How transparent is the info pane, number between 0-10 (default is 7).", permit: 1 },

            carouselcloseopacity: { p: "carouselcloseopacity", type: "num", name: "Carousel Close Opacity", desc: "How transparent is the carousel when closed, number between 0-10 (default is 4).", permit: 1 },
            carouselopenopacity: { p: "carouselopenopacity", type: "num", name: "Carousel Open Opacity", desc: "How transparent is the carousel when open, number between 0-10 (default is 9).", permit: 1 },

            thumbspacing: { p: "thumbspacing", type: "num", name: "Thumb Spacing", desc: "Space between the thumbs.", permit: 1 },
            thumbopacity: { p: "thumbopacity", type: "num", name: "Thumb opacity", desc: "How transparent are the thumbs, number between 0-10 (default is 2).", permit: 1 },

            transitiontime: { p: "transitiontime", type: "num", name: "Transition Time", desc: "How fast is the transition between items in 1/1000 of a second (default is 500)", permit: 1 },

            autorotate: { p: "autorotate", type: "bool", name: "Auto Rotate", desc: "Automatically rotate between items.", permit: 1 },
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },


    styleplayer44: {
        visible: false, pm: "j1", w: 600, h: 450, grp: "Player44", t: "Video Player (600x450)", ex: "10474999", nojson: true, media_types: "v,i,a",
        js_inc: ["player44/player44.js"], flash_fallback: true,
        func: "cp_js_widget_code_player44", playlist: "none", autostart: true, stretching: "fill", icons: true,
        params: merge_json(_cp_params_arr.base, _cp_params_arr.player44)
    },

    stylebelt2: {
        pm: "j1", w: 200, h: 150, grp: "Simple slideshow", t: "Plain rotation with LightBox - Small (200x180)", ex: "10464405", media_types: "i",
        js_inc: ["belt/belt.js"],
        css_inc: ["belt/jq.css", "belt/jquery.lightbox-0.5.css"],
        serial_js_inc: [
			{ func: "jQuery", inc: "belt/jquery-1.2.6.pack.js" },
			{ func: "jQuery.fn.cycle", inc: "belt/jquery.cycle.all.js" },
			{ func: "jQuery.fn.lightBox05", inc: "belt/jquery.lightbox-0.5.js" }],
        func: "wp_js_widget_code_belt_plain_photo", thumb_size: "medium", content_size: "large", img_thumb: "/design13/images/templates/classic/belt2.jpg", tooltip: "title and description", lightbox_text: "title and description",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.belt, {
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },

    stylebelt4: {
        pm: "j1", w: 200, h: 150, grp: "Simple slideshow", t: "Shuffle rotation with LightBox - Small (200x180)", ex: "10464405", media_types: "i",
        js_inc: ["belt/belt.js"],
        css_inc: ["belt/jq.css", "belt/jquery.lightbox-0.5.css"],
        serial_js_inc: [
			{ func: "jQuery", inc: "belt/jquery-1.2.6.pack.js" },
			{ func: "jQuery.fn.cycle", inc: "belt/jquery.cycle.all.js" },
			{ func: "jQuery.fn.lightBox05", inc: "belt/jquery.lightbox-0.5.js" }],
        func: "wp_js_widget_code_belt_shuffle_photo", thumb_size: "medium", content_size: "large", img_thumb: "/design13/images/templates/classic/belt4.jpg", tooltip: "title and description", lightbox_text: "title and description",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.belt, {
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },

    styleslideshowpro: {
        visible: false, pm: "j1", w: 400, h: 300, grp: "Slideshows", t: "Slideshow with background music (400x300)", ex: "10464405", nojson: true, media_types: "i,b",
        js_inc: ["slideshowpro/slideshowpro.js"], flash_fallback: true,
        func: "cp_js_widget_code_slideshowpro",
        params: merge_json(_cp_params_arr.base, {
            transitionStyle: { p: "transitionStyle", type: "list:None,Blur,Cross Fade,Complete Fade,Dissolve,Drop,Lens,Photo Flash,Push,Wipe,Wipe and Fade,Wipe to Background,Wipe and Fade to Background", name: "Visual Transition ", desc: "Sets the visual transition between the previous slide and the current slide.", permit: 1 },
            transitionDirection: { p: "transitionDirection", type: "list:Top to Bottom,Left to Right,Right to Left,Bottom to Top", name: "Transition Direction", desc: "This parameter is only used by the 'Dissolve', 'Push', 'Wipe', 'Wipe and Fade', 'Wipe to Background', and 'Wipe and Fade to Background' transitions.", permit: 1 }
        })
    },

    stylebelt3: {
        pm: "j1", w: 200, h: 150, grp: "Simple slideshow", t: "Cover rotation with LightBox - Small (200x180)", ex: "10464405", media_types: "i",
        js_inc: ["belt/belt.js"],
        css_inc: ["belt/jq.css", "belt/jquery.lightbox-0.5.css"],
        serial_js_inc: [
			{ func: "jQuery", inc: "belt/jquery-1.2.6.pack.js" },
			{ func: "jQuery.fn.cycle", inc: "belt/jquery.cycle.all.js" },
			{ func: "jQuery.fn.lightBox05", inc: "belt/jquery.lightbox-0.5.js" }],
        func: "wp_js_widget_code_belt_cover_photo", thumb_size: "medium", content_size: "large", img_thumb: "/design13/images/templates/classic/belt3.jpg", tooltip: "title and description", lightbox_text: "title and description",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.belt, {
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },

    stylep1: {
        pm: "j1", w: 200, h: 150, grp: "Simple slideshow", t: "Plain rotation only thumbs - Small (200x180)", ex: "10464405", content_size: "large,v:3gp_lowres,a:original", type: "plain", media_types: "i",
        thumb_link: "thumbnail_url",
        func: wp_js_widget_code_rotating_photo, thumb_size: "medium", content_size: "large", img_thumb: "/design13/images/templates/classic/p1.jpg",
        params: merge_json(_cp_params_arr.base, {
            iframe: { p: "iframe", type: "bool", name: "iframe", desc: "Enable this option if the gallery is not working properly inside a page and the gallery will be placed in a HTML iframe." },
            thumb_size: { p: "thumb_size", type: "list:small,medium,large,xlarge", name: "Image Size", desc: "Image Size<br>small = up to 100x75<br>medium = up to 200x150<br>large = up to 600x450<br>xlarge = up to 1024x768", permit: 1 },
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },

    stylep3: {
        pm: "j1", w: 600, h: 450, grp: "Simple slideshow", t: "Plain rotation - Large (600x450)", ex: "10464405", popup_large: "false", thumb_link: "content_url", media_types: "i",
        js_inc: ["belt/belt.js"],
        css_inc: ["belt/jq.css", "belt/jquery.lightbox-0.5.css"],
        serial_js_inc: [
			{ func: "jQuery", inc: "belt/jquery-1.2.6.pack.js" },
			{ func: "jQuery.fn.cycle", inc: "belt/jquery.cycle.all.js" },
			{ func: "jQuery.fn.lightBox05", inc: "belt/jquery.lightbox-0.5.js" }],
        func: "wp_js_widget_code_belt_plain_photo", rotatetime: 5, thumb_size: "medium", content_size: "large", img_thumb: "/design13/images/templates/classic/p3.jpg", tooltip: "title and description", lightbox_text: "title and description",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.belt, {
            iframe: { p: "iframe", type: "bool", name: "iframe", desc: "Enable this option if the gallery is not working properly inside a page and the gallery will be placed in a HTML iframe." },
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },
    /*
	stylesmoothgallery: { pm: "j1", w: 620, h: 470, grp: "Simple slideshow", t: "Smooth Gallery - Large (600x450)", ex: "10473009",
	js_inc: ["smoothgallery/scripts/all.js"],
	css_inc: ["smoothgallery/css/jd.gallery.css"], iframe: "true",
	func: "wp_js_widget_code_smoothgallery", thumb_size: "small", content_size: "large", img_thumb: "img/smoothgallery.gif",
	params: merge_json(_cp_params_arr.base, _cp_params_arr.belt)
	},
	*/

    stylecooliris: {
        visible: false, pm: "j1", w: 200, h: 150, grp: "Simple slideshow", t: "Cooliris on click, Plain rotation - Small (200x180)", ex: "10464405", content_size: "xlarge,v:flv_lowres,a:original", type: "cooliris", media_types: "i,v",
        thumb_link: "thumbnail_url",
        func: wp_js_widget_code_rotating_photo, thumb_size: "medium", img_thumb: "/design13/images/templates/classic/cooliris.jpg",
        params: merge_json(_cp_params_arr.base, _cp_params_arr.cooliris, {
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 }
        })
    },

    stylecoolirisv2: {
        pm: "j1", w: 600, h: 450, grp: "Simple slideshow", t: "Cooliris 3D Wall Video and Images Gallery", ex: "10464405", content_size: "xlarge,v:flv_lowres", type: "cooliris", media_types: "i,v", flash_fallback: true, nojson: true,
        js_inc: ["cooliris/cooliris.js"],
        func: "cp_js_widget_code_coolirisv2", thumb_size: "medium", img_thumb: "/design13/images/templates/classic/coolirisv2.jpg", wmode: "opaque", showitemembed: "false", showlinkout: "false", showclose: "true",
        params: merge_json(_cp_params_arr.base, {
            theme: { p: "theme", type: "list:black,dark,light,white", name: "Theme", desc: "Sets the theme to use for the wall. This sets up different default background colors and button appearances.", permit: 0 },
            wmode: { p: "wmode", type: "list:window,opaque,transparent", name: "Flash wmode", desc: "Defines the interaction of the gallery with other elements within the web page.", permit: 1 },
            intro: { p: "intro", type: "list:scrollLeft,appear,zoomIn", name: "Intro", desc: "Choose a different intro animation.", permit: 1 },
            backgroundcolor: { p: "backgroundcolor", type: "color", name: "Background color", desc: "Background color of the player.", permit: 1 },
            //			showembed: { p: "showembed", type: "bool", name: "Show Embed Button", desc: "Shows or hides the Embed Code button.", permit: 1 },
            showsearch: { p: "showsearch", type: "bool", name: "Show Search Button", desc: "Shows or hides the Search button.", permit: 1 },
            showtutorial: { p: "showtutorial", type: "bool", name: "Show Tutorial Message", desc: "Shows a tutorial message, if set to true, when the user does not click on the wall.", permit: 1 },
            shownavarrows: { p: "shownavarrows", type: "bool", name: "Show Navigation Arrows", desc: "Shows or hides the left/right navigation arrows.", permit: 1 },

            showitemembed: { p: "showitemembed", type: "bool", name: "Show Sharing Buttons", desc: "Show the facebook and twitter sharing buttons on individual items.", permit: 1 },
            showlinkout: { p: "showlinkout", type: "bool", name: "Show Link Outside Button", desc: "Show the button that links out to the original content on individual items.", permit: 1 },
            showclose: { p: "showclose", type: "bool", name: "Show Close Button", desc: "Show the close button on individual items.", permit: 1 },

            showchrome: { p: "showchrome", type: "bool", name: "Show Toolbar Background", desc: "Shows or hides the bottom toolbar background.", permit: 1 },
            numrows: { p: "numrows", type: "num", name: "Number of Rows", desc: "Sets how many rows (1-7) of images to show in the user interface. As you show more rows, the wall is more CPU intensive and may run slower for older computers.", permit: 1 },
            showdescription: { p: "showdescription", type: "bool", name: "Show Description Overlay", desc: "Shows or hides the item description overlay.", permit: 1 },
            showreflections: { p: "showreflections", type: "bool", name: "Show Images Reflection", desc: "Shows or hides the reflections under the images.", permit: 1 }
        })
    },

    stylesimpleviewer: {
        pm: "j1", w: 800, h: 400, grp: "Flash Photo Gallery", t: "SimpleViewer - (800x400)", ex: "10464405", nojson: true, media_types: "i",
        js_inc: ["airtightinteractive/airtigh.js"], flash_fallback: true,
        func: "cp_js_widget_code_airtigh_simpleviewer", img_thumb: "/design13/images/templates/classic/simpleviewer.jpg", wmode: "opaque",
        maximagewidth: 480, maximageheight: 480, textcolor: "0xFFFFFF", framecolor: "0xFFFFFF", framewidth: 20, stagepadding: 40, navpadding: 40, thumbnailcolumns: 3, thumbnailrows: 3, navposition: "left", valign: "center", halign: "center", title: "Gallery", enablerightclickopen: true,
        params: merge_json(_cp_params_arr.base, {
            wmode: { p: "wmode", type: "list:window,opaque,transparent", name: "Flash wmode", desc: "Defines the interaction of the gallery with other elements within the web page.", permit: 1 },
            maximagewidth: { p: "maximagewidth", type: "num", name: "Max Image Width", desc: "Width of the widest image in the gallery. Used to determine the best layout for your gallery (pixels)." },
            maximageheight: { p: "maximageheight", type: "num", name: "Max Image Height", desc: "Height of tallest image in the gallery. Used to determine the best layout for your gallery (pixels)." },
            textcolor: { p: "textcolor", type: "color", name: "Text Color", desc: "Color of title and caption text (hexidecimal color value).", permit: 1 },
            framecolor: { p: "framecolor", type: "color", name: "Frame Color", desc: "Color of image frame, navigation buttons and thumbnail frame (hexidecimal color value).", permit: 1 },
            framewidth: { p: "framewidth", type: "num", name: "Frame Width", desc: "Width of image frame (pixels).", permit: 1 },
            stagepadding: { p: "stagepadding", type: "num", name: "Stage Padding", desc: "Width of padding around gallery edge (pixels). To have the image flush to the edge of the widget, set this to 0.", permit: 1 },
            navpadding: { p: "navpadding", type: "num", name: "Nav Padding", desc: "Distance between image and thumbnails (pixels). ", permit: 1 },
            thumbnailcolumns: { p: "thumbnailcolumns", type: "num", name: "Thumbnail Columns", desc: "Number of thumbnail columns. To disable thumbnails completely set this value to 0", permit: 1 },
            thumbnailrows: { p: "thumbnailrows", type: "num", name: "Thumbnail Rows", desc: "Number of thumbnail rows. To disable thumbnails completely set this value to 0.", permit: 1 },
            navposition: { p: "navposition", type: "list:top,bottom,left,right", name: "Nav Position", desc: "Position of thumbnails relative to image. Can be 'top', 'bottom','left' or 'right'.", permit: 1 },
            valign: { p: "valign", type: "list:center,top,bottom", name: "V Align", desc: "Vertical placment of the image and thumbnails within the widget. Can be 'center', 'top' or 'bottom'.<br>For large format galleries this is best set to 'center'. For small format galleries setting this to 'top' or 'bottom' can help get the image flush to the edge of the widget.", permit: 1 },
            halign: { p: "halign", type: "list:center,left,right", name: "H Align", desc: "Horizontal placement of the image and thumbnails within the widget. Can be 'center', 'left' or 'right'.<br>For large format galleries this is best set to 'center'. For small format galleries setting this to 'left' or 'right' can help get the image flush to the edge of the widget.", permit: 1 },
            title: { p: "title", type: "text", name: "Title", desc: "Text to display as gallery Title", permit: 1 },
            enablerightclickopen: { p: "enablerightclickopen", type: "bool", name: "Enable Right Click Open", desc: "Whether to display a 'Open In new Window...' dialog when right-clicking on an image. Can be 'true' or 'false'", permit: 1 }
        })
    },

    styletiltviewer: {
        pm: "j1", w: 800, h: 400, grp: "Flash Photo Gallery", t: "TiltViewer - (800x400)", ex: "10464405", nojson: true, media_types: "i",
        js_inc: ["airtightinteractive/airtigh.js"], flash_fallback: true,
        func: "cp_js_widget_code_airtigh_tiltviewer", img_thumb: "/design13/images/templates/classic/titleviewer.jpg", wmode: "opaque",
        cols: 8, rows: 4, fullscreen: true, framecolor: "0xFFFFFF", backcolor: "0xFFCB47", bkgndinnercolor: "0x555555", bkgndoutercolor: "0x000000", showflipbutton: true, showlinkbutton: true,
        params: merge_json(_cp_params_arr.base, {
            wmode: { p: "wmode", type: "list:window,opaque,transparent", name: "Flash wmode", desc: "Defines the interaction of the gallery with other elements within the web page.", permit: 1 },
            cols: { p: "cols", type: "num", name: "Columns", desc: "Number of columns of images to display.", permit: 1 },
            rows: { p: "rows", type: "num", name: "Rows", desc: "Number of rows of images to display. ", permit: 1 },
            fullscreen: { p: "fullscreen", type: "bool", name: "Allow Fullscreen", desc: "Whether to allow the 'Go Fullscreen' right-click menu option. ", permit: 1 },

            showflipbutton: { p: "showflipbutton", type: "bool", name: "Show Flip Button", desc: "Whether to display the 'flip' button at the bottom-right of a zoomed in image. Affects all images.", permit: 1 },
            showlinkbutton: { p: "showlinkbutton", type: "bool", name: "Show Link Button", desc: "Whether to display the 'Read More...' button on the image flipside. <br><br>Set the link to the page later at the set text page by adding the following text at the end of each item's caption : [...]http://www.yoururl.com/subpage", permit: 1 },

            framecolor: { p: "framecolor", type: "color", name: "Frame Color", desc: "Hexadecimal color value of the image frame.", permit: 1 },
            backcolor: { p: "backcolor", type: "color", name: "Back Color", desc: "Hexadecimal color value of the flipside background. ", permit: 1 },
            bkgndinnercolor: { p: "bkgndinnercolor", type: "color", name: "Background Inner Color", desc: "Hexadecimal color value of the stage background gradient center.", permit: 1 },
            bkgndoutercolor: { p: "bkgndoutercolor", type: "color", name: "Background Outer Color", desc: "Hexadecimal color value of the stage background gradient edge.", permit: 1 }
        })
    },

    styleautoviewer: {
        pm: "j1", w: 800, h: 400, grp: "Flash Photo Gallery", t: "AutoViewer - (800x400)", ex: "10464405", nojson: true, media_types: "i",
        js_inc: ["airtightinteractive/airtigh.js"], flash_fallback: true,
        func: "cp_js_widget_code_airtigh_autoviewer", img_thumb: "/design13/images/templates/classic/autoviewer.jpg", wmode: "opaque",
        params: merge_json(_cp_params_arr.base, {
            wmode: { p: "wmode", type: "list:window,opaque,transparent", name: "Flash wmode", desc: "Defines the interaction of the gallery with other elements within the web page.", permit: 1 }
        })
    },

    stylepostcardviewer: {
        pm: "j1", w: 800, h: 400, grp: "Flash Photo Gallery", t: "Postcard Viewer - (800x400)", ex: "10464405", nojson: true, media_types: "i",
        js_inc: ["airtightinteractive/airtigh.js"], flash_fallback: true,
        func: "cp_js_widget_code_airtigh_postcardviewer", img_thumb: "/design13/images/templates/classic/postcardviewer.jpg", wmode: "opaque",
        params: merge_json(_cp_params_arr.base, {
            wmode: { p: "wmode", type: "list:window,opaque,transparent", name: "Flash wmode", desc: "Defines the interaction of the gallery with other elements within the web page.", permit: 1 }
        })
    },

    styleplayer44_7: {
        pm: "j1", w: 320, h: 570, grp: "Video Players", t: "Video Player with Bottom Playlist (320x570)", ex: "10474999", nojson: true, media_types: "v,i,a",
        js_inc: ["player44/player44.js"], flash_fallback: "flowplayer1", img_thumb: "/design13/images/templates/classic/player44_7.jpg",
        func: "cp_js_widget_code_player44", playlist: "bottom", autostart: false, stretching: "fill", icons: true, playlistsize: 284,
        params: merge_json(_cp_params_arr.base, _cp_params_arr.player44)
    },

    styleplayer44_8: {
        pm: "j1", w: 512, h: 430, grp: "Video Players", t: "Video Player Single Video (512x430)", ex: "10474999", nojson: true, media_types: "v,i,a",
        js_inc: ["player44/player44.js"], flash_fallback: "flowplayer1", img_thumb: "/design13/images/templates/classic/player44_8.jpg",
        func: "cp_js_widget_code_player44", playlist: "none", autostart: false, stretching: "fill", icons: true,
        params: merge_json(_cp_params_arr.base, _cp_params_arr.player44)
    },

    styleplayer44_8w: {
        pm: "j1", w: 512, h: 334, grp: "Video Players", t: "Widescreen Single Video (512x334)", ex: "10474999", nojson: true, media_types: "v,i,a",
        js_inc: ["player44/player44.js"], flash_fallback: "flowplayer1", img_thumb: "/design13/images/templates/classic/player44_8w.jpg",
        func: "cp_js_widget_code_player44", playlist: "none", autostart: false, stretching: "exactfit", icons: true,
        params: merge_json(_cp_params_arr.base, _cp_params_arr.player44)
    },

    styleplayer44_9: {
        pm: "j1", w: 1012, h: 430, grp: "Video Players", t: "Video Player with Right Playlist (1012x430)", ex: "10474999", nojson: true, media_types: "v,i,a",
        js_inc: ["player44/player44.js"], flash_fallback: "flowplayer1", img_thumb: "/design13/images/templates/classic/player44_9.jpg",
        func: "cp_js_widget_code_player44", playlist: "right", autostart: false, stretching: "fill", icons: true, playlistsize: 500,
        params: merge_json(_cp_params_arr.base, _cp_params_arr.player44)
    },

    styleplayer44_2: {
        pm: "j1", w: 660, h: 334, grp: "Video Players", t: "Widescreen with Vertical Video List (660x334)", ex: "10474999", nojson: true, media_types: "v,i,a",
        js_inc: ["player44/player44.js"], flash_fallback: "flowplayer1", img_thumb: "/design13/images/templates/classic/player44_2.jpg",
        func: "cp_js_widget_code_player44", playlist: "right", autostart: false, stretching: "exactfit", icons: true, playlistsize: 145, disabletext: true,
        params: merge_json(_cp_params_arr.base, _cp_params_arr.player44)
    },


    styleflowplayer1: {
        pm: "j1", w: "512", h: "334", grp: "Video Players", t: "Flowplayer Widescreen Video", ex: "10629837", media_types: "v,i,a",
        js_inc: ["videoplaylist/flowplayer2skin.js"],
        serial_js_inc: [
				{ func: "$f", inc: "videoplaylist/flowplayer-3.1.4.min.js" }],
        css_inc: ["videoplaylist/flowplayer.css"],
        func: "cp_js_widget_code_flowplayer2_start", thumb_size: "large", content_size: "large,v:flv_lowres,a:original",
        img_thumb: "/design13/images/templates/classic/flowplayer.jpg",
        css_class: "cnnlike", pw: "0", ph: "0", plw: "0", plh: "0", firstitemlarge: true, controlbar_autohide: false, controlbar_fullscreen: true, scaling: "scale",
        params: merge_json(_cp_params_arr.base, {
            autostart: { p: "autostart", type: "bool", name: "Auto Start", desc: "Automatically start the player on load." },
            controlbar: { p: "controlbar", type: "list:bottom,none,over", name: "Control Bar", desc: "Position of the controlbar. Can be set to bottom, over and none." },
            controlbar_fullscreen: { p: "controlbar_fullscreen", type: "bool", name: "Control Bar FullScreen", desc: "Show full screen button in the control bar." },
            controlbar_autohide: { p: "controlbar_autohide", type: "bool", name: "Control Bar AutoHide", desc: "Auto Hide the control bar." },
            quality: { p: "quality", type: "list:standard,original FLV,standard HD", name: "Quality", desc: "Quality of the video.<br><br>User original FLV only if you've uploaded an FLV file.", permit: 1 },
            scaling: { p: "scaling", type: "list:scale,fit,half,orig", name: "Scaling", desc: "Setting which defines how video is scaled on the video screen. Available options are:<br>scale: Scale the video to fill all available space (Ignores original dimensions).<br>fit: Fit to window by preserving the original aspect ratio.<br>half: Half-size (preserves aspect ratio)<br>orig: Use the dimensions encoded in the file.", permit: 1 },
            volume: { p: "volume", type: "num", name: "Volume", desc: "Startup volume of the player. Can be 0 to 100. Is saved in a cookie.", permit: 1 }
            //rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 },
        })
    },


    styleflowplayer2: {
        pm: "j1", w: "600", h: "200", grp: "Video Players", t: "Flowplayer Widescreen Playlist", ex: "10629837", media_types: "v,i,a",
        js_inc: ["videoplaylist/flowplayer2skin.js"],
        serial_js_inc: [
				{ func: "$f", inc: "videoplaylist/flowplayer-3.1.4.min.js" }],
        css_inc: ["videoplaylist/flowplayer.css"],
        func: "cp_js_widget_code_flowplayer2_start", thumb_size: "large", content_size: "large,v:flv_lowres,a:original",
        img_thumb: "/design13/images/templates/classic/flowplayermenu.jpg",
        css_class: "cnnlike", pw: "300", ph: "200", plw: "300", plh: "200", firstitemlarge: true, controlbar_autohide: false, controlbar_fullscreen: true, scaling: "scale",
        params: merge_json(_cp_params_arr.base, {
            pw: { p: "pw", type: "num", name: "Player Width", desc: "Width of the player itself" },
            ph: { p: "ph", type: "num", name: "Player Height", desc: "Height of the player itself" },
            plw: { p: "plw", type: "num", name: "Playlist Width", desc: "Width of the playlist box" },
            plh: { p: "plh", type: "num", name: "Playlist Height", desc: "Height of the playlist box" },
            css_class: { p: "css_class", type: "list:cnnlike,none", name: "CSS Class", desc: "Change the player's look and feel using one of the preset styles. Set this value to none to create your own style using CSS." },
            autostart: { p: "autostart", type: "bool", name: "Auto Start", desc: "Automatically start the player on load." },
            controlbar: { p: "controlbar", type: "list:bottom,none,over", name: "Control Bar", desc: "Position of the controlbar. Can be set to bottom, over and none." },
            controlbar_fullscreen: { p: "controlbar_fullscreen", type: "bool", name: "Control Bar FullScreen", desc: "Show full screen button in the control bar." },
            controlbar_autohide: { p: "controlbar_autohide", type: "bool", name: "Control Bar AutoHide", desc: "Auto Hide the control bar." },
            quality: { p: "quality", type: "list:standard,original FLV,standard HD", name: "Quality", desc: "Quality of the video.<br><br>User original FLV only if you've uploaded an FLV file.", permit: 1 },
            scaling: { p: "scaling", type: "list:scale,fit,half,orig", name: "Scaling", desc: "Setting which defines how video is scaled on the video screen. Available options are:<br>scale: Scale the video to fill all available space (Ignores original dimensions).<br>fit: Fit to window by preserving the original aspect ratio.<br>half: Half-size (preserves aspect ratio)<br>orig: Use the dimensions encoded in the file.", permit: 1 },
            volume: { p: "volume", type: "num", name: "Volume", desc: "Startup volume of the player. Can be 0 to 100. Is saved in a cookie.", permit: 1 }
            //rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 },
        })
    },


    style1: { pm: "p3", w: 350, h: 140, dw: 180, grp: "Simple Video player", t: "Video player 16:9 with menu  - Small (350x140)", ex: "10474999", flash_fallback: "flowplayer2", media_types: "v,i,a", content_size: "xlarge", stretch: true, img_thumb: "/design13/images/templates/classic/jwmenuwide_s.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style2: { pm: "p3", w: 450, h: 200, dw: 260, grp: "Simple Video player", t: "Video player 16:9 with menu  - Medium (450x200)", ex: "10474999", flash_fallback: "flowplayer2", media_types: "v,i,a", content_size: "xlarge", stretch: true, img_thumb: "/design13/images/templates/classic/jwmenuwide_m.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style3: { pm: "p3", w: 600, h: 300, dw: 440, grp: "Simple Video player", t: "Video player 16:9 with menu  - Large (600x300)", ex: "10474999", flash_fallback: "flowplayer2", media_types: "v,i,a", content_size: "xlarge", stretch: true, img_thumb: "/design13/images/templates/classic/jwmenuwide_l.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },

    style4: { pm: "p3", w: 350, h: 210, dw: 350, grp: "Simple Video player", t: "Video player 16:9 without menu  - Small (350x210)", ex: "10474999", flash_fallback: "flowplayer1", media_types: "v,i,a", content_size: "xlarge", stretch: true, img_thumb: "/design13/images/templates/classic/jwwide_s.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style5: { pm: "p3", w: 450, h: 260, dw: 450, grp: "Simple Video player", t: "Video player 16:9 without menu  - Medium (450x260)", ex: "10474999", flash_fallback: "flowplayer1", media_types: "v,i,a", content_size: "xlarge", stretch: true, img_thumb: "/design13/images/templates/classic/jwwide_m.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style6: { pm: "p3", w: 600, h: 350, dw: 600, grp: "Simple Video player", t: "Video player 16:9 without menu  - Large (600x350)", ex: "10474999", flash_fallback: "flowplayer1", media_types: "v,i,a", content_size: "xlarge", stretch: true, img_thumb: "/design13/images/templates/classic/jwwide_l.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },

    style2s: { pm: "p3", w: 430, h: 200, dw: 240, grp: "Simple Video player", t: "Video player 4:3 with menu  - Medium (430x200)", ex: "10474999", flash_fallback: "flowplayer2", media_types: "v,i,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/jwmenu_m.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style3s: { pm: "p3", w: 540, h: 300, dw: 374, grp: "Simple Video player", t: "Video player 4:3 with menu  - Large (540x300)", ex: "10474999", flash_fallback: "flowplayer2", media_types: "v,i,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/jwmenu_l.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style5s: { pm: "p3", w: 320, h: 260, dw: 320, grp: "Simple Video player", t: "Video player 4:3 without menu  - Medium (320x260)", ex: "10474999", flash_fallback: "flowplayer1", media_types: "v,i,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/jw_m.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style6s: { pm: "p3", w: 440, h: 350, dw: 440, grp: "Simple Video player", t: "Video player 4:3 without menu  - Large (440x350)", ex: "10474999", flash_fallback: "flowplayer1", media_types: "v,i,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/jw_l.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },

    stylemaani: {
        pm: "j1", w: 400, h: 300, grp: "Slideshows", t: "Slideshow with background music (400x300)", ex: "10496739", nojson: true, media_types: "i,b",
        js_inc: ["maani/maani.js"], flash_fallback: true,
        func: "cp_js_widget_code_maani", transition: "zoom", bgmusic: "true", img_thumb: "/design13/images/templates/classic/maani.jpg",
        params: merge_json(_cp_params_arr.base, {
            bgmusic: { p: "bgmusic", type: "bool", name: "Background Music", desc: "Enable background music. <br>* To select a music track just add it to your gallery when you select the photos.", permit: 0 },
            showtitle: { p: "showtitle", type: "bool", name: "Show Title", desc: "Show the image title", permit: 1 },
            titlecolor: { p: "titlecolor", type: "color", name: "Title Color", desc: "Title text color", permit: 1 },
            rotatetime: { p: "rotatetime", type: "num", name: "Rotate Time", desc: "Rotate time in seconds", permit: 1 },
            transition: { p: "transition", type: "list:none,dissolve,fade_to_black,fade_to_white,drop,spin,zoom,push_right,push_left,push_up,push_down,cover_right,cover_left,cover_up,cover_down,reveal_right,reveal_left,reveal_up,reveal_down,squeeze_right,squeeze_left,squeeze_up,squeeze_down,pivot_left_top_up, pivot_left_top_down, pivot_right_top_up, pivot_right_top_down, pivot_left_bottom_up,pivot_left_bottom_down,pivot_right_bottom_up,pivot_right_bottom_down", name: "Visual Transition ", desc: "Sets the visual transition between the previous slide and the current slide.", permit: 1 },
            bg: { p: "bg", type: "color", name: "Background color", desc: "Background color of the player.", permit: 1 }
        })
    },

    stylepla24: { pm: "p4", w: 492, h: 400, dw: 0, dh: 0, plw: 0, grp: "Slideshows", t: "Tutorial player - Large (492x400)", ex: "10474999", media_types: "v,i,a", playlist: "over", playerskin: "stijl.swf", repeat: "always", thumb_size: "medium", img_thumb: "/design13/images/templates/classic/pl24.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player4160) },

    style7: { pm: "p3", w: 350, h: 282, dw: 350, grp: "Slideshows", t: "Slideshow - Small (350x282)", ex: "10464405", media_types: "i,v,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/slideshow.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style8: { pm: "p3", w: 450, h: 357, dw: 450, grp: "Slideshows", t: "Slideshow - Medium (450x357)", ex: "10464405", media_types: "i,v,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/slideshow.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style9: { pm: "p3", w: 600, h: 470, dw: 600, grp: "Slideshows", t: "Slideshow - Large (600x470)", ex: "10464405", media_types: "i,v,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/slideshow.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style10: { pm: "p3", w: 350, h: 140, dw: 160, grp: "Slideshows", t: "Slideshow with menu - Small (350x140)", ex: "10464405", media_types: "i,v,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/slideshowmenu.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style11: { pm: "p3", w: 450, h: 200, dw: 240, grp: "Slideshows", t: "Slideshow with menu - Medium (450x200)", ex: "10464405", media_types: "i,v,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/slideshowmenu.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },
    style12: { pm: "p3", w: 600, h: 320, dw: 400, grp: "Slideshows", t: "Slideshow with menu - Large (600x320)", ex: "10464405", media_types: "i,v,a", content_size: "xlarge", img_thumb: "/design13/images/templates/classic/slideshowmenu.jpg", params: merge_json(_cp_params_arr.base, _cp_params_arr.player311) },

    styleaudioplayer: {
        pm: "j1", w: 600, h: 500, grp: "Podcast and Music", t: "Podcast - Big (600x500)", ex: "10465673", nojson: true, media_types: "a", flash_fallback: "flowplayer1",
        js_inc: ["audioplayer/audioplayer.js"], img_thumb: "/design13/images/templates/classic/audioplayer.jpg",
        func: "cp_js_widget_code_audioplayer", pw: 290, ph: 25, allowdownload: true, albumcoverart: "auto", loaddefaultcss: true,
        params: merge_json(_cp_params_arr.base, _cp_params_arr.audioplayer)
    },

    style20: { pm: "p4", w: 300, h: 20, dw: 0, dh: 0, plw: 0, grp: "Podcast and Music", t: "Music player without menu - Tiny (300x20)", ex: "10465673", media_types: "a", flash_fallback: "flowplayer1", playlist: "bottom", repeat: "always", img_thumb: "/design13/images/templates/classic/jwaudio.jpg", albumcoverart: "auto", params: merge_json(_cp_params_arr.base, _cp_params_arr.player4160) },
    style21: { pm: "p4", w: 300, h: 82, dw: 0, dh: 0, plw: 62, grp: "Podcast and Music", t: "Music player with menu - Small (300x82)", ex: "10465673", media_types: "a", flash_fallback: "flowplayer1", playlist: "bottom", repeat: "always", img_thumb: "/design13/images/templates/classic/jwaudio1.jpg", albumcoverart: "auto", params: merge_json(_cp_params_arr.base, _cp_params_arr.player4160) },
    style22: { pm: "p4", w: 300, h: 141, dw: 0, dh: 0, plw: 121, grp: "Podcast and Music", t: "Music player with menu - Small (300x142)", ex: "10465673", media_types: "a", flash_fallback: "flowplayer1", playlist: "bottom", repeat: "always", img_thumb: "/design13/images/templates/classic/jwaudio2.jpg", albumcoverart: "auto", params: merge_json(_cp_params_arr.base, _cp_params_arr.player4160) },
    style23: { pm: "p4", w: 400, h: 300, dw: 0, dh: 0, plw: 280, grp: "Podcast and Music", t: "Music player with menu - Medium (400x300)", ex: "10465673", media_types: "a", flash_fallback: "flowplayer1", playlist: "bottom", repeat: "always", img_thumb: "/design13/images/templates/classic/jwaudio3.jpg", albumcoverart: "auto", params: merge_json(_cp_params_arr.base, _cp_params_arr.player4160) },
    style24: { pm: "p4", w: 400, h: 400, dw: 0, dh: 0, plw: 380, grp: "Podcast and Music", t: "Music player with menu - Large (400x400)", ex: "10465673", media_types: "a", flash_fallback: "flowplayer1", playlist: "bottom", repeat: "always", img_thumb: "/design13/images/templates/classic/jwaudio4.jpg", albumcoverart: "auto", params: merge_json(_cp_params_arr.base, _cp_params_arr.player4160) },
    style20a: { pm: "p4", w: 300, h: 20, dw: 0, dh: 0, plw: 0, grp: "Podcast and Music", t: "Music player auto start - Tiny (300x20)", ex: "10465673", media_types: "a", flash_fallback: "flowplayer1", playlist: "bottom", autostart: true, img_thumb: "/design13/images/templates/classic/jwaudio_as.jpg", albumcoverart: "auto", repeat: "always", params: merge_json(_cp_params_arr.base, _cp_params_arr.player4160) },

    stylepodcastfeed: {
        visible: true, pm: "j1", w: "230", h: "200", grp: "Podcast and Music", t: "Podcast Feed for iTunes and more - (Premium)", ex: "10629837", media_types: "v,i,a",
        js_inc: ["itunes/feed.js"],
        func: "cp_js_widget_itunesfeed_start", thumb_size: "large", content_size: "large,v:flv_lowres,a:original", albumcoverart: "auto", language: "en-us",
        img_thumb: "/design13/images/templates/classic/itunes.jpg",
        params: {
            w: { p: "w", type: "num", name: "Width", desc: "Width of the gallery" },
            h: { p: "h", type: "num", name: "Height", desc: "Height of the gallery" },
            title: { p: "title", type: "text", name: "Title", desc: "Podcast Title", permit: 1 },
            subtitle: { p: "subtitle", type: "text", name: "Subtitle", desc: "Podcast Subtitle", permit: 1 },
            author: { p: "author", type: "text", name: "Author", desc: "Podcast Author", permit: 1 },
            language: { p: "language", type: "text", name: "Language", desc: "Podcast Language", permit: 1 },
            summary: { p: "summary", type: "text", name: "Summary", desc: "Podcast Summary", permit: 1 },
            link: { p: "link", type: "text", name: "Link", desc: "Podcast Link", permit: 1 },
            copyright: { p: "copyright", type: "text", name: "Copyright", desc: "Podcast Copyright", permit: 1 },
            ownername: { p: "ownername", type: "text", name: "Owner Name", desc: "Podcast Owner Name", permit: 1 },
            owneremail: { p: "owneremail", type: "text", name: "Owner Email", desc: "Podcast Owner Email", permit: 1 },
            albumcoverart: { p: "albumcoverart", type: "list:auto,custom,hide", name: "Album Cover Art", desc: "What album art to show.<br>Auto: Find the image automatically from an online database.<br>Custom: Upload images to the gallery yourself and reorder them before each audio track.", permit: 1 }
        }
    },

    stylepushbox: {
        visible: false, pm: "j1", w: 900, h: 300, grp: "Menus", t: "Pushbox (900x300)", ex: "10531270", nojson: true, media_types: "i",
        js_inc: ["pushbox/swfobject.js", "pushbox/pushbox.js"], flash_fallback: true,
        func: "cp_js_widget_code_pushbox", bg: "0xf1f3f5",
        params: _cp_params_arr.base
    }

};

function getElement(aID) {
    return (document.getElementById) ? document.getElementById(aID) : document.all[aID];
}

function wp_get_items(id, obj) {



    if (obj != null)
        _wp_widget_js_array[id].items = obj;

    if (typeof _wp_widget_js_array[id].func == "string") {
        try {
            _wp_widget_js_array[id].func = eval(_wp_widget_js_array[id].func);
        }
        catch (ex) {
        }

        if (typeof _wp_widget_js_array[id].func == "string") {
            setTimeout("wp_get_items('" + id + "')", 100);
            return;
        }
    }

    // check 
    if (typeof _wp_widget_js_array[id].serial_js_inc != "undefined") {
        for (var i = 0; i < _wp_widget_js_array[id].serial_js_inc.length; i++) {

            var fnc = null;
            try {
                fnc = eval(_wp_widget_js_array[id].serial_js_inc[i].func);
            }
            catch (ex) {
                fnc = null;
            }

            if (fnc == null) {
                var file = _wp_widget_js_array[id].serial_js_inc[i].inc;

                loadJSFile(file);

                setTimeout("wp_get_items('" + id + "')", 100);

                return;
            }
        }
    }
    //	if (location.href.indexOf("patagoniapubliclibrary") > -1 && navigator.userAgent.indexOf("IE") > -1)
    //		alert("debug");
    _wp_widget_js_array[id].func(id);
}

function isiPhone() {
    return navigator.userAgent.indexOf('iPod;') > -1 || navigator.userAgent.indexOf('iPhone;') > -1 || navigator.userAgent.indexOf('iPad;') > -1;
}

function isAndroid() {
    return navigator.userAgent.indexOf('Linux; U; Android') > -1;
}

var _cp_flash = "";
function gotFlash(major, minor, build) {
    if (major == null) major = 0;
    if (minor == null) minor = 0;
    if (build == null) build = 0;

    function getFlashVersion(desc) {
        _cp_flash = desc;
        var matches = desc.match(/[\d]+/g);
        matches.length = 3;  // To standardize IE vs FF
        return matches; //.join('.');
    }

    var hasFlash = false;
    var flashVersion;

    if (navigator.plugins && navigator.plugins.length) {
        var plugin = navigator.plugins['Shockwave Flash'];
        if (plugin) {
            hasFlash = true;
            if (plugin.description) {
                flashVersion = getFlashVersion(plugin.description);
            }
        }

        if (navigator.plugins['Shockwave Flash 2.0']) {
            hasFlash = true;
            flashVersion = '2.0.0.11';
        }

    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];
        hasFlash = mimeType && mimeType.enabledPlugin;
        if (hasFlash) {
            flashVersion = getFlashVersion(mimeType.enabledPlugin.description);
        }

    } else {
        try {
            // Try 7 first, since we know we can use GetVariable with it
            var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
            hasFlash = true;
            flashVersion = getFlashVersion(ax.GetVariable('$version'));
        } catch (e) {
            // Try 6 next, some versions are known to crash with GetVariable calls
            try {
                var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                hasFlash = true;
                flashVersion = '6.0.21';  // First public version of Flash 6
            } catch (e) {
                try {
                    // Try the default activeX
                    var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    hasFlash = true;
                    flashVersion = getFlashVersion(ax.GetVariable('$version'));
                } catch (e) {
                    // No flash
                }
            }
        }
    }

    if (major == null || !hasFlash)
        return hasFlash;

    if (major < flashVersion[0] ||
				(major == flashVersion[0] && minor < flashVersion[1]) ||
				(major == flashVersion[0] && minor == flashVersion[1] && build <= flashVersion[2]))
        return true;

    return false;
}

function wp_js_widget_code_rotating_photo(id) {
    var items = _wp_widget_js_array[id].items;
    var theobj = getElement(_wp_widget_js_array[id].obj);
    if (theobj == null)
        return;

    var htm = "<img border=0 style='margin:0px;padding:0px;border:0px solid white;' src='" + items.items[_wp_widget_js_array[id].curr_items][_wp_widget_js_array[id].thumb_link] + "' />";

    if (isiPhone() || isAndroid()) {

        if (items.items.length == 1 && ",video/3gpp,audio/mp3,audio/mp4,".indexOf("," + items.items[0].content_type + ",") > -1) {
            var cont_url = items.items[0].content_url;
            if (items.items[0].content_type == "video/3gpp")
                cont_url = cont_url.replace(".3gp?", ".mp4?").replace("&amp;p=y", "") + "&amp;t=y";

            if (isAndroid())
                htm = "<a href='" + cont_url + "&range=yes'><img src='" + items.items[0].thumbnail_url + "' width='" + _wp_widget_js_array[id].w + "' height='" + _wp_widget_js_array[id].h + "' /></a>";
            else
                htm = "<embed src='" + items.items[0].thumbnail_url + "' href='" + cont_url + "&range=yes' width='" + _wp_widget_js_array[id].w + "' height='" + _wp_widget_js_array[id].h + "' type='video/x-m4v' target='myself' scale='1'></embed>";


        }
        else {
            htm = "<a href='http://www.cincopa.com/media-platform/runtime/view.aspx?fid=" + _wp_widget_js_array[id].fid + "'>";
            htm += "<img border=0 style='margin:0px;padding:0px;border:0px solid white;' src='" + items.items[_wp_widget_js_array[id].curr_items][_wp_widget_js_array[id].thumb_link] + "' />";
            htm += "</a>";
        }
    }
    else if (_wp_widget_js_array[id].type == "cooliris") {
        //		loadJSFile("http://lite.piclens.com/current/piclens.js");
        //		var url = "javascript:PicLensLite.start({feedUrl:\"" + _cincopa_url + "coolirisrss.aspx?fid=" + _wp_widget_js_array[id].fid + "\"});";

        var url = "http:" + _ROOT_LOADER + "viewcooliris.aspx?fid=" + _wp_widget_js_array[id].fid;

        htm = "<a href='" + url + "'>";
        htm += "<img border=0 style='margin:0px;padding:0px;border:0px solid white;' src='" + items.items[_wp_widget_js_array[id].curr_items][_wp_widget_js_array[id].thumb_link] + "' />";
        htm += "</a>";
    }

    _wp_widget_js_array[id].curr_items++;
    if (_wp_widget_js_array[id].curr_items == items.items.length)
        _wp_widget_js_array[id].curr_items = 0;

    // preload next img
    htm += "<img style='display:none;width:1px;height:1px;' src='" + items.items[_wp_widget_js_array[id].curr_items][_wp_widget_js_array[id].thumb_link] + "' />";

    theobj.innerHTML = htm;

    var timeout = 5000;
    if (!isnull(_wp_widget_js_array[id].rotatetime))
        timeout = eval(_wp_widget_js_array[id].rotatetime) * 1000;

    if (items.items.length > 1)
        setTimeout("wp_js_widget_code_rotating_photo('" + id + "')", timeout);
}

function wp_widget_show(cjd, tcjd) {
    //	var params = eval("_wp_widget_arr.style" + cjd.skin);  // this will not work because it sets by ref and not by val

    var baseparams = _wp_widget_arr["style" + (typeof cjd.skin != "undefined" ? cjd.skin : tcjd.skin)];
    if (typeof baseparams == "undefined") {
        getElement(cjd.id).innerHTML = "<div style='width:500px;height:300px;color:red;font-size:20px;text-align:center;background-color:#dddddd;'><br><br><br><br><br>Skin not exists</div>";
        return;
    }

    var params = {};

    // base params - copy all the defaults
    for (var n in baseparams)
        params[n] = baseparams[n];

    // copy template data
    if (typeof tcjd != "undefined") {
        for (var n in tcjd)
            params[n] = tcjd[n];
    }

    // override with params from db and inline
    for (var n in cjd) {
        var par_permit = 0;
        try {
            par_permit = eval(params.params[n].permit);
        }
        catch (ex)
        { }

        if (typeof par_permit == "undefined")
            par_permit = 0;

        if (par_permit <= cjd["permit"])
            params[n] = cjd[n];
    }

    var fid = params.fid;

    if (!gotFlash(9) && typeof params.flash_fallback != "undefined" && params.flash_fallback != true) {

        if (",player44_7,player44_9,player44_2,".indexOf("," + cjd.skin + ",") > -1)//
        {
            if (cjd.playlist == "bottom")//
            {
                cjd.pw = cjd.w;
                cjd.ph = cjd.h - cjd.playlistsize;
                cjd.plw = cjd.w;
                cjd.plh = cjd.playlistsize;
            }
            else if (cjd.playlist == "right")//
            {
                cjd.ph = cjd.h;
                cjd.pw = cjd.w - cjd.playlistsize;
                cjd.plh = cjd.h;
                cjd.plw = cjd.playlistsize;
            }
        }
        else if (",audioplayer,20,21,22,23,24,20a,".indexOf("," + cjd.skin + ",") > -1)//
        {
            if (cjd.plw == undefined)
                cjd.plw = cjd.h - 20;

            cjd.h = parseInt(cjd.h) + 30; // on ipad we should give more height to the player
            cjd.pw = cjd.w;
            cjd.ph = cjd.h - cjd.plw;
            cjd.plh = cjd.plw;
            cjd.plw = cjd.w;
        }
        else if (",1,2,3,4,5,6,2s,3s,5s,6s,".indexOf("," + cjd.skin + ",") > -1)//
        {
            cjd.ph = cjd.h;
            cjd.plw = cjd.w - cjd.dw;
            cjd.pw = cjd.dw;
            cjd.plh = cjd.h;
        }

        cjd.skin = params.flash_fallback;
        cjd.pm = "j1";
        cjd.content_size = "large,v:flv_lowres,a:original";

        wp_widget_show(cjd);
        return;
    }

    if (!gotFlash(9) && (params.pm == "p3" || params.pm == "p4" || params.flash_fallback == true)) {
        cjd.skin = "p1";
        //		cjd.w = _wp_widget_arr.stylep1.w;
        //		cjd.h = _wp_widget_arr.stylep1.h;
        cjd.content_size = "large,v:3gp_lowres,a:original";

        wp_widget_show(cjd);
        return;
    }

    var cpwidget = "";

    if (params.cooliris == "yes") {
        //		loadJSFile("http://lite.piclens.com/current/piclens.js");
        //		var url = "javascript:PicLensLite.start({feedUrl:\"" + _cincopa_url + "coolirisrss.aspx?fid=" + params.fid + "\"});";

        var url = "http:" + _ROOT_LOADER + "viewcooliris.aspx?fid=" + params.fid;

        cpwidget += "[<a class='cincopa-cooliris-link' href='" + url + "'>View with Cooliris</a>] ";
        //		params.h = eval(params.h) + 20;
    }

    if (params.allow_download == "original" || params.allow_download == "resized") {
        var url = _cincopa_url + "download.aspx?fid=" + params.fid;
        cpwidget += "[<a class='cincopa-download-all-link' href='" + url + "'>Download All</a>] ";
    }

    if (cpwidget != "")
        cpwidget += "<br>";

    if (params.pm == "p3") {
        var xmllink = _cincopa_url + "rss200.aspx?fid=" + fid;

        if (params.thumb_size != null)
            xmllink += "&thumb=" + params.thumb_size;

        if (params.content_size != null)
            xmllink += "&content=" + params.content_size;

        xmllink = encodeURIComponent(xmllink);

        var playervars = "";
        playervars += "&file=" + xmllink;

        if (params.autostart == true || params.autostart == "true")
            playervars += "&autostart=true";
        else
            playervars += "&autostart=false";

        playervars += "&width=" + params.w;
        playervars += "&height=" + params.h;
        playervars += "&thumbsinplaylist=true";
        playervars += "&autoscroll=false";
        playervars += "&displaywidth=" + params.dw;
        playervars += "&repeat=list";

        if (params.shuffle == true || params.shuffle == "true")
            playervars += "&shuffle=true";
        else
            playervars += "&shuffle=false";

        if (params.rotatetime == null || params.rotatetime == "")
            playervars += "&rotatetime=5";
        else
            playervars += "&rotatetime=" + params.rotatetime;

        if (params.stretch == true || params.stretch == "true")
            playervars += "&overstretch=true";
        else
            playervars += "&overstretch=false";

        //caption

        if (params.player == null)
            player = _cincopa_url + "player3/mediaplayer.swf";
        else
            player = _cincopa_url + "player3/" + params.player + ".swf";

        var w_width = params.w.toLowerCase();
        var w_height = params.h.toLowerCase();

        if (w_width.indexOf("px") == -1 && w_width.indexOf("%") == -1)
            w_width += "px";
        if (w_height.indexOf("px") == -1 && w_height.indexOf("%") == -1)
            w_height += "px";

        cpwidget += '<embed src="' + player + '" style="width:' + w_width + ';height:' + w_height + ';" wmode="transparent" bgcolor="#C0C0C0" allowfullscreen="true" allowscriptaccess="always" flashvars="' + playervars + '" ></ embed>';
    }
    else if (params.pm == "p4") {
        //		var xmllink = _cincopa_url + "player4/rssjw.aspx?fid="+fid;
        var xmllink = _cincopa_url + "xspf.aspx?fid=" + fid;

        if (params.thumb_size != null)
            xmllink += "&thumb=" + params.thumb_size;

        if (params.content_size != null)
            xmllink += "&content=" + params.content_size;

        if (params.overridealbumart == true || params.overridealbumart == "true" || params.albumcoverart == "custom")
            xmllink += "&overridealbumart=true";
        else if (params.albumcoverart == "hide")
            xmllink += "&hidealbumart=true";

        xmllink = encodeURIComponent(xmllink);

        var playervars = "";
        //		playervars += "&backcolor=000000";
        //		playervars += "&frontcolor=ffffff";
        //		playervars += "&playlistsize=" + params.plw;
        //		playervars += "&height=" + params.dh;
        //		playervars += "&width=" + params.dw;

        try {
            var prms = [{ prm: "plw", name: "playlistsize", def: "" },
						{ prm: "dh", name: "height", def: "" },
						{ prm: "dw", name: "width", def: "" },
						{ prm: "backcolor", name: "backcolor", def: "000000" },
						{ prm: "frontcolor", name: "frontcolor", def: "ffffff" },
						{ prm: "lightcolor", name: "lightcolor", def: "" },
						{ prm: "screencolor", name: "screencolor", def: "" }
            ];

            for (var i = 0; i < prms.length; i++) {
                var val = params[prms[i].prm];
                if (val != "" && typeof val != "undefined")
                    playervars += "&" + prms[i].name + "=" + val;
                else if (params[prms[i].def] != "")
                    playervars += "&" + prms[i].name + "=" + prms[i].def;
            }
        } catch (ex) { }
        //playervars += "&controlbar=over";

        if (typeof params.playlist != "undefined")
            playervars += "&playlist=" + params.playlist;

        if (params.autostart == true || params.autostart == "true")
            playervars += "&autostart=true";

        if (params.shuffle == true || params.shuffle == "true")
            playervars += "&shuffle=true";
        else
            playervars += "&shuffle=false";

        if (typeof params.playerskin != "undefined")
            playervars += "&skin=" + _cincopa_url + "player4/" + params.playerskin;

        if (typeof params.repeat != "undefined")
            playervars += "&repeat=" + params.repeat;

        playervars += "&bufferlength=2";
        //playervars += "&skin=styles/stijl.swf";
        //playervars += "&stretching=fill";
        //playervars += "&skin=styles/cometSkin.swf";
        //playervars += "&skin=styles/pixelizeSkin.swf";
        //playervars += "&skin=styles/controlpanelSkin.swf";
        //playervars += "&skin=styles/kleurSkin.swf";
        //playervars += "&skin=styles/playcassoSkin.swf";

        if (params.player == null)
            player = _cincopa_url + "player4/player4.swf";
        else
            player = _cincopa_url + "player4/" + params.player + ".swf";

        cpwidget += '<embed src="' + player + '" width="' + params.w + '" height="' + params.h + '" wmode="transparent" allowfullscreen="true" bgcolor="#C0C0C0" type="application/x-shockwave-flash" flashvars="file=' + xmllink + playervars + '" ></ embed>';
    }
    else if (params.pm == "j1") {
        var uniqueid = (((1 + Math.random()) * 0x10000000) | 0).toString(16).substring(1);
        //		alert(uniqueid + " " + params.skin);
        _wp_widget_js_array[uniqueid] = params;
        _wp_widget_js_array[uniqueid].obj = "inner" + uniqueid;
        _wp_widget_js_array[uniqueid].fid = fid;
        _wp_widget_js_array[uniqueid].curr_items = 0;

        cpwidget += "<div style='width:" + _wp_widget_js_array[uniqueid].w + "px;height:" + _wp_widget_js_array[uniqueid].h + "px;' id='inner" + uniqueid + "'></div>";

        if (_wp_widget_js_array[uniqueid].css_inc != null) {
            for (var i = 0; i < _wp_widget_js_array[uniqueid].css_inc.length; i++) {
                var file = _wp_widget_js_array[uniqueid].css_inc[i];

                file = file.replace("{fid}", fid);

                loadCSSFile(file);
            }
        }

        if (_wp_widget_js_array[uniqueid].js_inc != null) {
            for (var i = 0; i < _wp_widget_js_array[uniqueid].js_inc.length; i++) {
                var file = _wp_widget_js_array[uniqueid].js_inc[i];

                loadJSFile(file);
            }
        }

        if (_wp_widget_js_array[uniqueid].nojson == undefined) {
            var jsonlink = _cincopa_url + "json.aspx?callback=wp_get_items&wid=" + uniqueid + "&fid=" + fid;

            if (params.thumb_size != null)
                jsonlink += "&thumb=" + params.thumb_size;

            if (params.content_size != null)
                jsonlink += "&content=" + params.content_size;

            if (params.firstitemlarge != null)
                jsonlink += "&firstitemlarge=true";

            if (params.overridealbumart == true || params.overridealbumart == "true" || params.albumcoverart == "custom")
                jsonlink += "&overridealbumart=true";
            else if (params.albumcoverart == "hide")
                jsonlink += "&hidealbumart=true";

            //			jsonlink += "&debug=" + _wp_widget_js_array[uniqueid].fid;

            loadJSFile(jsonlink);
        }
        else {
            setTimeout("wp_get_items('" + uniqueid + "')", 0);
        }
    }

    var panel = '<div style="width:0px;height:0px;clear:both;">&nbsp;</div>';

    var hide_panel = (params.panel == "none" || eval(params.remove_branding));

    if (!hide_panel) {
        var mediatype = params.media_types.split(",")[0];
        panel = '<div id="panel' + params.id + '" style="clear:both;"><a href="http://www.cincopa.com/?utm_campaign=viral_' + mediatype + '&afc=mplp1"><img style="padding:0px;margin:0px;border:0px;width:236px;height:30px;" border=0 alt="Powered By Cincopa" src="' + _cincopa_url + 'bycincopa.png" /></a>';
    }
    else if (params.plan_name == "acause")
        panel = '<div id="panel' + params.id + '" style="clear:both;"><a href="http://www.cincopa.com/?utm_campaign=viral_cause_' + mediatype + '&afc=mplp1"><img style="padding:0px;margin:0px;border:0px;" border=0 alt="Powered By Cincopa" src="' + _cincopa_url + 'cincopa_for_a_cause.gif" /></a>';

    if (!hide_panel || params.plan_name == "acause") {
        if (params.w < 400)
            panel += '<br>';

        //		panel += '<iframe allowtransparency="true" frameborder="0" scrolling="no" style="overflow:hidden;border:0px none;width:110px;height:20px;margin:0 0 5px 5px;" src="http://platform.twitter.com/widgets/tweet_button.html?url=' + encodeURIComponent("http://cincopa.com/~" + params.fid) + '&amp;via=cincopa&amp;text=' + encodeURIComponent(document.title) + ' ' + encodeURIComponent(location.href) + '&amp;count=horizontal"></iframe>';
        //		panel += '<iframe allowtransparency="true" frameborder="0" scrolling="no" style="overflow:hidden;border:0px none;width:82px;height:20px;margin-bottom:5px;" src="http://www.facebook.com/plugins/like.php?href=' + encodeURIComponent(location.href) + '&layout=button_count&show_faces=false&width=100&action=like&font=arial&layout=button_count"></iframe>';
        panel += '<iframe allowtransparency="true" frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style="overflow:hidden;border:0px none;width:82px;height:20px;margin-bottom:5px;" tabindex="0" vspace="0" width="100%" id="I0_1373540835729" name="I0_1373540835729" src="https://apis.google.com/_/+1/fastbutton?bsv&amp;size=medium&amp;hl=en-US&amp;origin=http%3A%2F%2Fwww.cincopa.com&amp;url=https%3A%2F%2Fplus.google.com%2F111463929396015329416&amp;jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.AIUFmBHzalE.O%2Fm%3D__features__%2Fam%3DEQ%2Frt%3Dj%2Fd%3D1%2Frs%3DAItRSTOxCDvjrdIRcIY7AkM8PK3zENPQ0g#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Conload&amp;id=I0_1373540835729&amp;parent=http%3A%2F%2Fwww.cincopa.com&amp;pfname=&amp;rpctoken=41804243" allowtransparency="true" data-gapiattached="true" title="+1"></iframe>';
        panel += '<iframe allowtransparency="true" frameborder="0" scrolling="no" style="overflow:hidden;border:0px none;width:82px;height:20px;margin-bottom:5px;" src="http://www.facebook.com/plugins/like.php?href=' + encodeURIComponent('http://www.facebook.com/cincopa') + '&layout=button_count&show_faces=false&width=100&action=like&font=arial&layout=button_count"></iframe>';
        panel += '</div>';
    }

    var obj = getElement(params.id);
    var bobj = null;

    // we are using this try/catch because it could throw Permission denied (in case this is a frame/iframe inside other site
    try {
        bobj = window.parent.document.getElementById("branding" + params.id);
    }
    catch (ex)
    { }

    try {
        doga(params);
    }
    catch (ex) { }

    try {
        var googl = new Image(1, 1);
        googl.src = "//goo.gl/" + ("https:" == document.location.protocol ? "EUZrXg" : "jIur") + "#" + Math.round(Math.random() * 2147483647);
    }
    catch (ex) { }

    if (bobj == null)
        cpwidget += panel;
    else
        bobj.innerHTML = panel;

    if (obj == null)
        document.write(cpwidget);
    else {
        obj.innerHTML = cpwidget;
        var cincopaLoadCompletedAttribute = obj.getAttribute('cincopaLoadCompleted');
        if (cincopaLoadCompletedAttribute != undefined) {
            eval(cincopaLoadCompletedAttribute);
        }
    }
}

function doga(params) //
{
    var utmcpmp = document.cookie.match(/__utmcpa=[^;]*/gi);
    var t = (Math.floor(new Date().getTime() / 1000)); // in seconds
    var c0;
    var commit = false;
    if (utmcpmp == null) //
    {
        utmcpmp = (10000000 + Math.floor(Math.random() * 99999999)) + "." + (1000000000 + Math.floor(Math.random() * 2147483647));
        utmcpmp += "." + t + "." + t + "." + t + ".1";
        c0 = utmcpmp.split(".");
        commit = true;
    }
    else //
    {
        utmcpmp = utmcpmp[0].substr(9);
        c0 = utmcpmp.split(".");
        if ((parseInt(c0[4]) + 30 * 60) < t) // 30 min timeout
        {
            c0[3] = parseInt(c0[4]);
            c0[4] = t;
            c0[5] = parseInt(c0[5]) + 1;

            utmcpmp = c0.join(".");
            commit = true;
        }
    }

    if (commit) //
    {
        var f = new Date((new Date()).getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = "__utmcpa=" + utmcpmp + "; expires=" + f.toGMTString() + " ; path=/ ; ";
    }

    var c4 = "-"; //user var
    var gifurl = "//www.google-analytics.com/__utm.gif";
    gifurl += "?utmwv=4.8.9";
    gifurl += "&utmn=" + Math.round(Math.random() * 2147483647);
    gifurl += "&utmhn=" + document.location.hostname;
    gifurl += "&utmcs=-";
    gifurl += "&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-";
    gifurl += "&utmhid=" + Math.round(Math.random() * 2147483647);
    gifurl += "&utmr=" + encodeURIComponent(document.location.href);
    gifurl += "&utmp=%2Fmedia-platform%2F" + params.cmapath;
    gifurl += "&utmac=UA-21537476-1";
    gifurl += "&utmcc=__utma%3D" + utmcpmp + "%3B%2B";
    gifurl += "__utmz%3D" + c0[0] + "." + c0[4] + ".1.1.utmcsr%3D" + document.location.hostname + "%7Cutmccn%3D(referral)%7Cutmcmd%3Dreferral%7Cutmcct%3D" + encodeURIComponent(document.location.pathname) + "%3B";
    gifurl += "&utmu=q";

    var gat = new Image(1, 1);
    gat.src = gifurl;
}

if (typeof _cincopa_install_skin != "undefined") {
    for (var n in _cincopa_install_skin)
        _wp_widget_arr[n] = _cincopa_install_skin[n];
}



/*
**********************************  loader.js  **************************
*/




var _AJAX = _HOST = _ROOT_LOADER.replace("/runtime/", "/runtimeze/");

//fix for IE7
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === val) return i;
        }
        return -1;
    }
}

function trace(msg) {
    if (!window.console) return;
    try {
        if (typeof msg == 'object') {
            console.dir(msg);
        } else {
            console.log(msg);
        }
    } catch (e) {

    }
}

function getElement(aID) {
    return (document.getElementById) ? document.getElementById(aID) : document.all[aID];
}

// get instructions from the page of what galleries to load	
if (typeof _zel != "undefined") {

    for (var i = 0; i < _zel.length; i++) {
        var go = new GalleryObject(_zel[i]);

        zeGalleryArray[_zel[i]["_object"]] = go;

        if (_zel[i]["_iframeParentObject"])
            go.iframeParentObject = _zel[i]["_iframeParentObject"];

        if (_zel[i]["_args"]) {
            trace("loading args directly into go object");
            go.onArgs(_zel[i]["_args"]);
        }
        else
            go.initialize();
    }

    // this will make sure that if someone called the loader.js more than once if will not do any job the second time
    _zel = [];
}

function GalleryObject(params) {
    var self = this;
    this.loaderParams = params;
    this.skinPath = null;
    this.skin = null;
    this.args = null;
    this.galleryEditPanel = null;
    this.iframeParentObject = null;
    this.url_params = {};

    try {
        var tmpsplit = location.search.substring(1).split("&");
        for (var x = 0; x < tmpsplit.length; x++) {
            var tmp = tmpsplit[x].split("=");
            this.url_params[tmp[0]] = tmp[1];
        }
    } catch (ex) { }

    function _trace(msg) {
        return trace('GO [ ' + self.loaderParams._object + ' ] : ' + msg);
    }

    this.arg_misc_group = {
        misc: { name: "Misc", desc: "Add-on settings for the gallery, availalble only for pro users." }
    };

    this.arg_misc = {
        //			remove_branding: { group: "misc", type: "bool", name: "Remove Branding", desc: "Remove the icon and the 'Powered By' text." },
        //			cooliris: { group: "misc", name: "Cooliris", type: "list:no,yes", desc: "Add a [View with Cooliris] link. Cooliris is the fastest and most stunning way to browse photos and videos." },
        allow_download: { group: "misc", name: "Allow Download", type: "list", values: { "no": "No", "original": "Original files", "resized": "Resized version" }, desc: "Allow user to download and save all files.<br>* Resized zip contains photos resized to 600x450, videos in mp4 format and music in original sampling." },
        domain_lock: { group: "misc", type: "text", name: "Domain Lock", desc: "Allow this gallery to appear only in the domains on this list. This will prevent others from grabbing your gallery to their site. <br>Type a list of domains separated by comma or leave empty to allow all domains.<br>No need for <i>http://</i><br>For example: <i>mydomain.com,blogspot.com</i>" },
        iframe: { group: "misc", type: "bool", name: "iframe", desc: "Enable this option if the gallery is not working properly inside a page and the gallery will be placed in a HTML iframe." },
        ga_event: { group: "misc", type: "list", name: "Track Events With GA", values: { off: "Off (default)", on: "On" }, desc: "When On the gallery will post events directly to your Google Analytics account where you can get detailed infromation about user engagement." },
        allow_search: { group: "misc", type: "list", name: "Search box", values: { no: "No (default)", yes: "Yes" }, desc: "Add a search box above the gallery to allow user to search the gallery." }
    };

    this.arg_misc_defaults = {
        cooliris: "no",
        allow_download: "no",
        domain_lock: "",
        ga_event: "off",
        allow_search: "no"
    }

    this.arg_template_group = {
        template: { name: "Template", desc: "" }
    };

    this.arg_template_map = {
        tmpl_unique_name: { group: "template", type: "text", name: "Unique Name", desc: "" },
        tmpl_description: { group: "template", type: "text", name: "Description", desc: "" },
        tmpl_author: { group: "template", type: "text", name: "Author", desc: "" },
        tmpl_visible: { group: "template", type: "list", values: { public: "Public", private: "Private" }, name: "Visible", desc: "" },
        tmpl_license: { group: "template", type: "num", name: "License", desc: "" },
        tmpl_type: { group: "template", type: "text", name: "Type", desc: "" },
        tmpl_support_photo: { group: "template", type: "bool", name: "Support Photo", desc: "" },
        tmpl_support_video: { group: "template", type: "bool", name: "Support Video", desc: "" },
        tmpl_support_audio: { group: "template", type: "bool", name: "Support Audio", desc: "" },
        tmpl_poster_url: { group: "template", type: "text", name: "Poster URL", desc: "" },
        tmpl_demo_fid: { group: "template", type: "text", name: "Demo Fid", desc: "" },
        tmpl_demo_html: { group: "template", type: "html", name: "Demo HTML", desc: "" }
    };

    this.initialize = function () {
        this.skin = null;
        trace("GalleryObject - " + this.loaderParams["_object"] + " - " + this.loaderParams["_gid"]);
        this.loadjscssfile(_AJAX + "args.aspx?id=" + this.loaderParams["_object"] + "&fid=" + this.loaderParams["_gid"] + "&rnd=" + Math.random(), "js");
    }
    /*
	this.onCSS=function(name,css){
	this.args["css_"+name]=css;
	}*/

    this.getCSSCode = function (name) {
        var style = this.args["css_" + name];
        if (style && style.length) {
            style = style.replace(/~skin_path~/g, this.skinPath);
            style = style.replace(/~gallery_div~/g, this.loaderParams["_object"]);
            style = style.replace(/~assets_path~/g, _HOST + "/assets/");

            var i = style.indexOf("~arg_");
            while (i > -1) {
                var t = style.indexOf("~", i + 1);
                if (t == -1)
                    break;

                var markup = style.substring(i, t);
                var argname = markup.substr(5, markup.length - 1);
                var argvalue = "";
                try {
                    argvalue = this.args[argname];
                } catch (ex) { }

                style = style.substring(0, i) + argvalue + style.substring(t + 1);


                i = style.indexOf("~arg_");
            }

            style = "<style>" + style + "</style>";
            if (navigator.appVersion.match(/MSIE (8|7)/))
                style = "<br style='display:none;' />" + style; // this is crazy but what can we do !
        }
        else
            style = "";

        return style;
    }

    this.onArgs = function (args) //
    {
        if (args != null)
            this.args = args;

        var isiframe = this.args.iframe;
        if ((isiframe === undefined || isiframe === "") && this.args.template_args != null)
            isiframe = this.args.template_args.iframe;

        if (isiframe === undefined)
            isiframe = false;
        else
            isiframe = isiframe.toString().toLowerCase() == "true";

        if (isiframe && this.iframeParentObject == null)
            this.loadIFrameSkin();
        else
            this.loadSkin();
    }

    this.loadArgs = function () {
        if (location.href.indexOf("zemaketemplate=") > -1) {
            this.skin.arg_groups = this.merge_json(this.skin.arg_groups, this.arg_template_group);
            this.skin.arg_map = this.merge_json(this.skin.arg_map, this.arg_template_map);
        }

        var args_map = this.skin.arg_map;
        var args_defaults = this.skin.arg_defaults

        var temp_args = {};

        // base args - copy all the defaults
        for (var n in args_defaults)
            temp_args[n] = args_defaults[n];

        // copy the template args
        for (var n in this.args.template_args)
            temp_args[n] = this.args.template_args[n];

        // base misc args - copy all the defaults in case template_args changed them
        for (var n in this.arg_misc_defaults)
            temp_args[n] = this.arg_misc_defaults[n];

        // copy user params   
        for (var n in this.args) {
            /*if (n == "template_args")
			continue;*/

            var par_permit = 0;
            try {
                if (args_map[n]) {
                    par_permit = eval(args_map[n].permit);
                }
            }
            catch (ex)
            { }

            if (typeof par_permit == "undefined")
                par_permit = 0;

            if (par_permit <= this.args["permit"])
                temp_args[n] = this.args[n];
        }

        var normalize = function (obj) {
            // normalize all param
            for (var n in obj) {
                if (args_map[n] && args_map[n].type == 'bool')
                    obj[n] = obj[n] === 'true' || obj[n] === true;
                else if (obj[n] && obj[n].type == 'num')
                    obj[n] = parseInt(obj[n]);
            }

        }

        normalize(temp_args);
        normalize(temp_args.template_args);
        this.args = temp_args;
    }

    this.loadIFrameSkin = function () {
        var w = 600, h = 450;
        if (this.args.widget_w)
            w = this.args.widget_w;
        if (this.args.widget_h)
            h = this.args.widget_h;

        var ifrm = '<iframe id="zeiframe_' + this.loaderParams["_object"] + '" scrolling=no frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 width=' + w + 'px height=' + h + 'px></iframe>';
        this.setGalleryHTML(ifrm);

        trace("Creating iframe zeiframe_" + this.loaderParams["_object"]);
        var zeiframe = document.getElementById("zeiframe_" + this.loaderParams["_object"]);
        var doc = zeiframe.contentDocument;
        if (doc == undefined || doc == null) // IE
        {
            doc = zeiframe.contentWindow.document;
        }

        var htm = "";
        var writeto = function (what) {
            htm += what;
            htm += "\n";
        }

        writeto('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html>\n<head>');

        writeto('<script type="text/javascript" src="' + _ROOT_LOADER + 'libasync.js"> </script>');

        writeto(unescape("%3Cscript type='text/javascript'%3E"));

        writeto("var _gallery_args = {");
        for (var n in this.args) {
            if (n != "template_args")
                writeto(n + ":'" + this.args[n].toString().replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/'/g, "\\'") + "',");
        }

        writeto("template_args : {");
        for (var n in this.args.template_args) {
            if (n != "gmdss")
                writeto(n + ":'" + this.args.template_args[n].toString().replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/'/g, "\\'") + "',");
        }
        writeto("gmdss:'y' }};");

        writeto(unescape("%3C/script%3E"));
        writeto("</head><body  marginheight=0 marginwidth=0 style='margin-top: 0px;'>");
        writeto("<div id='inneriframe'></div>");
        writeto(unescape("%3Cscript defer type='text/javascript'%3E"));

        writeto("var zeo = [];");
        writeto("zeo['_object'] = 'inneriframe';");

        if (this.loaderParams["_feedjson"] != null)
            writeto("zeo['_feedjson'] = " + JSON.stringify(this.loaderParams["_feedjson"]) + ";");

        writeto("zeo['_gid'] = '" + this.args.fid + "';");
        writeto("zeo['_args'] = _gallery_args;");
        writeto("zeo['_iframeParentObject'] = '" + this.args.id + "';");

        writeto("var go = new GalleryObject(zeo);");
        writeto("zeGalleryArray['inneriframe'] = go");;
        writeto("go.iframeParentObject = '" + this.args.id + "';");

        if (this.args["preloader_js"]) {
            writeto("go.args = _gallery_args;");
            writeto("go.loadjscssfile(" + this.args["preloader_js"] + ", 'js', 'head', function() {(zeGalleryArray['inneriframe']).onArgs(); });");
            writeto("go.loadjscssfile(" + this.args["preloader_css"] + ", 'css', 'head', function() {}); ");
        }
        else
            writeto("go.onArgs(zeo['_args']);");

        //		writeto("var _zel = _zel || [];");
        //		writeto("_zel.push(zeo);");

        writeto(unescape("%3C/script%3E"));

        writeto('</body>\n</html>');

        trace(htm);

        doc.open();
        doc.write(htm);
        doc.close(); // this crash IE
    }

    this.loadSkin = function () {
        if (this.args.exception) {
            if (this.args.exception == "galleryempty") {
                var msg = "Gallery Is Empty";
                if (this.args.logged_user == "owner")
                    msg += "<br><br>Click 'Edit' at the top left of this box<br>and then click 'Add Media File' at the menu on the right.";

                var htm = '<div style=width:600px;height:200px;color:red;font-size:14px;text-align:center;background-color:#f5f5f5;><br><br><br>' + msg + '</div>';

                this.args.widget_w = 600;
                this.args.widget_h = 200;

                this.setGalleryHTML(htm);

                if (this.onSkinInit) {
                    this.onSkinInit();
                }

                return;
            }
        }

        if (typeof this.url_params.zeskinpath !== "undefined")
            this.skinPath = this.url_params.zeskinpath;
        else if (this.args.skin_code[0] == "/")
            this.skinPath = "//s3.amazonaws.com/fpskin" + this.args.skin_code + "/";
            //			this.skinPath = "//d3furk77y00zk4.cloudfront.net" + this.args.skin_code + "/";
        else
            this.skinPath = _HOST + this.args.skin_code + "/";

        if (this.loaderParams["_dev_path"])
            this.skinPath = this.loaderParams["_dev_path"];

        if (typeof zeSkins[this.getSkinName(this.args.skin_code)] == "undefined") {
            var skinfile = this.skinPath + "skin.js";
            if (location.href.indexOf("zetestskin=") > -1)
                skinfile = this.skinPath + "skin_test.js";

            this.loadjscssfile(skinfile, "js", "head", function () {
                self.initSkin();
            });
        }
        else {
            this.initSkin();
        }
    }

    this.getSkinName = function (skin_code) //
    {
        if (this.args.skin_code[0] == "/")
            return this.args.skin_code.split("/")[1];

        return skin_code;
    }

    this.initSkin = function () {
        _trace("initializing skin");
        this.skin = new zeSkins[this.getSkinName(this.args.skin_code)];
        this.skin.init(this);

        if (this.onSkinInit)
            this.onSkinInit();

        if (this.iframeParentObject != null && parent.zeGalleryArray[this.iframeParentObject].onSkinInit)
            parent.zeGalleryArray[this.iframeParentObject].onSkinInit();
    }

    this.getMediaJSON = function (par) {
        if (this.loaderParams["_feedjson"]) {
            zeOnMediaJSON(this.loaderParams["_object"], this.loaderParams["_feedjson"]);
        }
        else {
            var jsonlink = _AJAX + "json.aspx";
            if (this.loaderParams["_feedurl"])
                jsonlink = this.loaderParams["_feedurl"];

            jsonlink += "?callback=zeOnMediaJSON";
            jsonlink += "&wid=" + this.loaderParams["_object"];
            jsonlink += "&fid=" + this.args.fid;
            jsonlink += "&thumb=" + par.thumb;
            jsonlink += "&content=" + par.content;
            jsonlink += "&rnd=" + Math.random();

            if (par.details)
                jsonlink += "&details=" + par.details;

            if (this.loaderParams["_feedparams"])
                jsonlink += this.loaderParams["_feedparams"];

            this.loadjscssfile(jsonlink, "js");
        }
    }

    this.zeOnMediaJSON = function (json) {
        trace(this.skin.go.loaderParams._object);

        if (json.errorcode) {
            this.setGalleryHTML("<b>" + json.errormessage + "</b>");
            _trace("json error - " + json.errormessage);
            return;
        }

        this.skin.onMediaJSON(json);
    }

    this.getMediaRSSURL = function (par) {
        var link = _AJAX + "rss200.aspx?fid=" + this.args.fid;
        link += "&thumb=" + par.thumb;
        link += "&content=" + par.content;

        return link;
    }

    this.buildSearchDiv = function () //
    {
        var that = this;

        var searchCont = document.createElement("div");
        searchCont.className = "ze_search_cont";
        searchCont.id = "ze_search_cont" + this.loaderParams["_object"];

        var searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "ze_searchBox";
        searchInput.style.display = "none";

        var searchBtn = document.createElement("a");
        searchBtn.href = "javascript:void(0);"
        searchBtn.innerHTML = "Search";
        searchBtn.onclick = function () {
            this.style.display = "none";
            searchInput.style.display = "inline-block";
            searchInput.focus();
        }

        var searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "ze_searchBox";
        searchInput.value = (that.MediaJSON && typeof that.MediaJSON.searchVal != 'undefined') ? that.MediaJSON.searchVal : '';
        searchInput.style.display = "none";

        var searchClear = document.createElement("span");
        searchClear.className = "ze_search_clear";
        searchClear.style.cursor = "pointer";
        searchClear.innerHTML = 'X';
        searchClear.style.display = 'none';
        searchClear.onclick = function () {
            this.style.display = 'none';
            searchInput.value = '';
            searchInput.style.display = 'none';
            searchBtn.style.display = 'inline-block';
            go.doSearch('clear');

        }

        searchCont.appendChild(searchBtn);
        searchCont.appendChild(searchInput);
        searchCont.appendChild(searchClear);
        searchInput.onkeyup = function (e) {

            if (e.keyCode == 27) {
                searchClear.style.display = 'none';
                searchInput.value = '';
                searchInput.style.display = 'none';
                searchBtn.style.display = 'inline-block';
                go.doSearch('clear');
                return false;
            }


            searchClear.style.display = "inline-block";
            var value = this.value;
            if (value.replace(/^\s+|\s+$/g, '') == '') {
                this.setAttribute('data-stop', 'true');
            }
            go.doSearch('search', value);
        }

        return searchCont;
    }

    this.doSearch = function (searchCase, value) //
    {
        var that = this;

        if (this.args.iframe == 'true') {
            that = document.getElementById('zeiframe_' + this.args.id).contentWindow.go
        }
        that.orig_json = that.orig_json || that.MediaJSON;
        if (searchCase == 'clear') {
            delete that.orig_json.searchVal;
            that.skin.onMediaJSON(that.orig_json)

            if (that.skin.isready > 2) // tmp solution
                that.skin.start();

        } else {
            function filterarray(t, fun) {

                var len = t.length >>> 0;

                var res = [];
                var thisp = arguments[1];
                for (var i = 0; i < len; i++) {
                    if (i in t) {
                        var val = t[i]; // in case fun mutates this
                        if (fun.call(thisp, val, i, t))
                            res.push(val);
                    }
                }

                return res;
            }

            sortedArray = filterarray(that.orig_json.items, function (element) {
                testValue = value.toLowerCase();
                return element.title.toLowerCase().indexOf(testValue) > -1
						|| element.description.toLowerCase().indexOf(testValue) > -1
						|| ((typeof element.tags != "undefined") ? (element.tags.toLowerCase().indexOf(testValue) > -1) : false);
            });

            if (value.replace(/^\s+|\s+$/g, '') == '') {
                that.orig_json['searchVal'] = '';
                that.skin.onMediaJSON(that.orig_json);
            } else {
                that.skin.onMediaJSON({
                    description: that.orig_json.description,
                    title: that.orig_json.title,
                    items: sortedArray,
                    searchVal: value
                });
            }

            if (that.skin.isready > 2) // tmp solution
                that.skin.start();

        }
    }

    this.buildUpperPanel = function () {

        var upper_panel = "";

        if (_cp_go_hooks["before-building-upper-panel"])
            upper_panel += _cp_go_hooks["before-building-upper-panel"](this);

        if (this.args.allow_search == "yes")
            upper_panel += " <div id='cp-search-div-" + this.loaderParams["_object"] + "'></div> ";

        if (this.args.allow_download == "original" || this.args.allow_download == "resized") {
            var url = _AJAX.replace("/runtimeze/", "/runtime/") + "download.aspx?fid=" + this.args.fid;
            upper_panel += " <a class='cp-download-all-link' href='" + url + "'>Download</a> ";
        }

        return upper_panel;
    }

    this.buildLowerPanel = function () {

        var lower_panel = "";

        if (this.args.plan_name == "free") {
            lower_panel = '<div style="clear:both;"><a href="http://www.cincopa.com/?utm_campaign=viral_pro_skins&afc=mplp1" style="vertical-align: middle;display: inline-block;"><img style="padding:0px;margin:0px;border:0px;width:236px;height:30px;" border=0 alt="Powered By Cincopa" src="' + _ROOT_LOADER + 'bycincopa.png" /></a>';
            lower_panel += '<div style="display: inline-block; vertical-align: middle; margin: 0 .2em 0 1em; position: relative; margin-bottom: 5px;"><div class="g-plusone" data-size="medium" data-href="https://plus.google.com/111463929396015329416"></div></div>';
            lower_panel += '<iframe allowtransparency="true" frameborder="0" scrolling="no" style="vertical-align: middle;overflow:hidden;border:0px none;width:92px;height:20px;margin-bottom:5px;" src="http://www.facebook.com/plugins/like.php?href=' + encodeURIComponent('http://www.facebook.com/cincopa') + '&layout=button_count&show_faces=false&width=100&action=like&font=arial&layout=button_count"></iframe>';
            lower_panel += '</div>';
        }

        return lower_panel;
    }

    this.setGalleryHTML = function (htm) {

        var obj = getElement(this.loaderParams["_object"]);

        var inner = "<div style='width:" + this.args.widget_w + "px;height:" + this.args.widget_h + "px;' id='inner_" + this.loaderParams["_object"] + "' class='cp_reset_style'>";
        inner += htm;
        inner += "</div><div style='clear:both;'></div>";

        if (this.iframeParentObject) {

            //var go = parent.zeGalleryArray[this.iframeParentObject];

            var ifrm = parent.document.getElementById("zeiframe_" + this.iframeParentObject);
            if (ifrm !== null) {
                ifrm.style.width = this.args.widget_w ? this.args.widget_w + "px" : "";
                ifrm.style.height = this.args.widget_h ? this.args.widget_h + "px" : "";
            }

            obj.innerHTML = inner;
        }
        else if (this.galleryFrameLoaded) {

            obj = getElement("inner_" + this.loaderParams["_object"]);
            obj.innerHTML = inner;

        }
        else {

            this.galleryFrameLoaded = true;

            var upper_panel = this.buildUpperPanel();
            var lower_panel = this.buildLowerPanel();

            if (upper_panel != "")
                upper_panel = "<div class='cp-upper-panel'>" + upper_panel + "</div>";

            obj.innerHTML = upper_panel + inner + lower_panel;

            try {
                this.doga(this.args.cmapath);
            }
            catch (ex) { }

            try {
                var googl = new Image(1, 1);
                googl.src = "//goo.gl/" + ("https:" == document.location.protocol ? "EUZrXg" : "jIur") + "#" + Math.round(Math.random() * 2147483647);
            }
            catch (ex) { }

            if (lower_panel != "") {
                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/plusone.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
            }

            if (getElement("cp-search-div-" + this.loaderParams["_object"])) {
                getElement("cp-search-div-" + this.loaderParams["_object"]).appendChild(this.buildSearchDiv());
            }
        }
    }

    this.loadSkinCSS = function (cssname) {
        this.loadjscssfile(this.skinPath + cssname, "css");
    }

    this.loadSkinJS = function (jsname) {
        this.loadjscssfile(this.skinPath + jsname, "js", "head");
    }

    /**
	* loads skin's scripts
	*/
    this.loadSkinJSSequence = function (jsnames, callback) {
        var self = this;
        var ns = [];
        //building paths
        for (var i = 0; i < jsnames.length; i++) {
            var name = jsnames[i];
            ns.push(this.skinPath + name);
        }
        return this.loadScript(ns, callback);
    }

    this.loadjscssfile = function (filename, filetype, where, onloadfunc) //
    {
        var fileref;

        if (_cp_preloaded_files[filename] == true) //
        {
            if (onloadfunc != null) {
                _trace('preloaded ' + filename + '...');
                setTimeout(function () { onloadfunc() }, 0);
            }
            else {
                _trace('preloaded (without callback) ' + filename + '...');
            }
            return;
        }
        else
            _trace('loading ' + filename + '...');

        if (filetype == "js") { //if filename is a external JavaScript file
            fileref = document.createElement("script");
            fileref.setAttribute("type", "text/javascript");
            var fp = filename;
            //			if(navigator.appVersion.match(/MSIE (7|8)/))
            //				fp+=(fp.match(/\?/)?'&':'?')+Math.random();

            fileref.setAttribute("src", fp);

            if (typeof onloadfunc != "undefined") {
                if (fileref.attachEvent) // for IE
                {
                    fileref.onreadystatechange = function () {
                        if (fileref.readyState == 'loaded' || fileref.readyState == 'complete')
                            onloadfunc();
                    };

                    fileref.attachEvent("onerror", function () { trace("js load error: " + filename); });
                }
                else if (fileref.addEventListener) // for all other
                {
                    fileref.addEventListener("load", onloadfunc, false);
                    fileref.addEventListener("error", function () { trace("js load error: " + filename); }, false);
                }
            }
        }
        else if (filetype == "css") { //if filename is an external CSS file
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref != "undefined") {
            if (where == "head") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
            else {
                document.getElementsByTagName("body")[0].appendChild(fileref);
            }
        }

    }

    /**
	* accepts variable number of arguments - script names<br/>
	* script names can be packed in an array also<br/>
	* optionally any argument can be a callback to be fired after scripts are loaded
	*/

    this.loadScript = function () {

        var self = this;
        var scripts = [];
        var callback = null;

        for (var i = 0; i < arguments.length; i++) {
            var v = arguments[i];
            switch (typeof v) {
                case 'string':
                    scripts.push(v);
                    break;
                case 'function':
                    callback = v;
                    break;
            }
            if (v instanceof Array) {
                for (var n = 0; n < v.length; n++) {
                    scripts.push(v[n]);
                }
            }
        }

        if (scripts.length == 0) {
            if (callback) callback();
            return;
        }

        var script = scripts.shift();

        this.loadjscssfile(script, 'js', 'body', function () {
            _trace("LOADED: " + script);
            self.loadScript(scripts, callback);
        });

        return true;
    }

    this.namedSize = function (w, h) {
        var thumb = "small";
        if (w <= 100 && h <= 75)
            thumb = "small";
        else if (w <= 200 && h <= 150)
            thumb = "medium";
        else if (w <= 600 && h <= 450)
            thumb = "large";
        else
            thumb = "xlarge";

        return thumb;
    }

    this.trackEvent = function (label) //
    {
        if (this.args.ga_event != "on" && location.host != "www.cincopa.com")
            return;

        try // we need try to avoid security errors when user is using the iframe embed code
        {
            if (typeof parent.window._gaq != 'undefined') {
                parent.window._gaq.push(['_trackEvent',
						'Cincopa Galleries',
						this.MediaJSON.title + "(" + this.args.fid + ")",
						label]);
            } else if (typeof parent.window.ga != 'undefined') {
                parent.window.ga('send', 'event', 'Cincopa Galleries', this.MediaJSON.title + "(" + this.args.fid + ")", label);
            }
        } catch (ex) { }
    }

    this.isIOS = function () {
        return navigator.userAgent.indexOf('iPod;') > -1 || navigator.userAgent.indexOf('iPhone;') > -1 || navigator.userAgent.indexOf('iPad;') > -1;
    }

    this.isAndroid = function () {
        return navigator.userAgent.indexOf('Linux; U; Android') > -1;
    }

    this.isFlash = function (major, minor, build) {
        if (major == null) major = 0;
        if (minor == null) minor = 0;
        if (build == null) build = 0;

        function getFlashVersion(desc) {
            var matches = desc.match(/[\d]+/g);
            matches.length = 3;  // To standardize IE vs FF
            return matches; //.join('.');
        }

        var hasFlash = false;
        var flashVersion;

        if (navigator.plugins && navigator.plugins.length) {
            var plugin = navigator.plugins['Shockwave Flash'];
            if (plugin) {
                hasFlash = true;
                if (plugin.description) {
                    flashVersion = getFlashVersion(plugin.description);
                }
            }

            if (navigator.plugins['Shockwave Flash 2.0']) {
                hasFlash = true;
                flashVersion = '2.0.0.11';
            }

        } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
            var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];
            hasFlash = mimeType && mimeType.enabledPlugin;
            if (hasFlash) {
                flashVersion = getFlashVersion(mimeType.enabledPlugin.description);
            }

        } else {
            try {
                // Try 7 first, since we know we can use GetVariable with it
                var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
                hasFlash = true;
                flashVersion = getFlashVersion(ax.GetVariable('$version'));
            } catch (e) {
                // Try 6 next, some versions are known to crash with GetVariable calls
                try {
                    var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                    hasFlash = true;
                    flashVersion = '6.0.21';  // First public version of Flash 6
                } catch (e) {
                    try {
                        // Try the default activeX
                        var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                        hasFlash = true;
                        flashVersion = getFlashVersion(ax.GetVariable('$version'));
                    } catch (e) {
                        // No flash
                    }
                }
            }
        }

        if (major == null || !hasFlash)
            return hasFlash;

        if (major < flashVersion[0] ||
				    (major == flashVersion[0] && minor < flashVersion[1]) ||
				    (major == flashVersion[0] && minor == flashVersion[1] && build <= flashVersion[2]))
            return true;

        return false;
    }

    this.doga = function (cmapath) {
        var utmcpmp = document.cookie.match(/__utmcpa=[^;]*/gi);
        var t = (Math.floor(new Date().getTime() / 1000)); // in seconds
        var c0;
        var commit = false;
        if (utmcpmp == null) //
        {
            utmcpmp = (10000000 + Math.floor(Math.random() * 99999999)) + "." + (1000000000 + Math.floor(Math.random() * 2147483647));
            utmcpmp += "." + t + "." + t + "." + t + ".1";
            c0 = utmcpmp.split(".");
            commit = true;
        }
        else //
        {
            utmcpmp = utmcpmp[0].substr(9);
            c0 = utmcpmp.split(".");
            if ((parseInt(c0[4]) + 30 * 60) < t) // 30 min timeout
            {
                c0[3] = parseInt(c0[4]);
                c0[4] = t;
                c0[5] = parseInt(c0[5]) + 1;

                utmcpmp = c0.join(".");
                commit = true;
            }
        }

        if (commit) //
        {
            var f = new Date((new Date()).getTime() + (30 * 24 * 60 * 60 * 1000));
            document.cookie = "__utmcpa=" + utmcpmp + "; expires=" + f.toGMTString() + " ; path=/ ; ";
        }

        var c4 = "-"; //user var
        var gifurl = "//www.google-analytics.com/__utm.gif";
        gifurl += "?utmwv=4.8.9";
        gifurl += "&utmn=" + Math.round(Math.random() * 2147483647);
        gifurl += "&utmhn=" + document.location.hostname;
        gifurl += "&utmcs=-";
        gifurl += "&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-";
        gifurl += "&utmhid=" + Math.round(Math.random() * 2147483647);
        gifurl += "&utmr=" + encodeURIComponent(document.location.href);
        gifurl += "&utmp=%2Fzepa%2F" + cmapath;
        gifurl += "&utmac=UA-27824317-1";
        gifurl += "&utmcc=__utma%3D" + utmcpmp + "%3B%2B";
        gifurl += "__utmz%3D" + c0[0] + "." + c0[4] + ".1.1.utmcsr%3D" + document.location.hostname + "%7Cutmccn%3D(referral)%7Cutmcmd%3Dreferral%7Cutmcct%3D" + encodeURIComponent(document.location.pathname) + "%3B";
        gifurl += "&utmu=q";

        var gat = new Image(1, 1);
        gat.src = gifurl;
    }



    /*----------------------------------------------------------------------------------------------

	Editor

	----------------------------------------------------------------------------------------------*/

    this.toggleEditPanel = function () {
        var args = go.getArgs();
        var editorArea = document.getElementById(args.id);
        (editorArea.className.indexOf('cp-gallery-editing') != -1) ? this.closeEditPanel() : this.openEditPanel()
    }

    this.openEditPanel = function () {
        var go = this;

        //		if (this.args.iframe == "true")
        //			go = document.getElementById("zeiframe_" + this.loaderParams["_object"]).contentWindow.zeGalleryArray["inneriframe"]

        try {
            var googl = new Image(1, 1);
            googl.src = "//goo.gl/EldIx#" + Math.round(Math.random() * 2147483647);
        }
        catch (ex) { }

        if (this.galleryEditPanel == null) {
            if (window.GalleryEditPanel) {
                this.galleryEditPanel = new GalleryEditPanel(go);
            } else {
                this.loadjscssfile(_HOST + 'editor/gallery-edit.css', 'css');
                this.loadScript(
					_HOST + 'editor/editor.js',
					_HOST + 'editor/zewrap.js',
					function () {
					    self.galleryEditPanel = new GalleryEditPanel(go);
					}
				);
            }
        }
    }

    this.closeEditPanel = function () {
        var args = go.getArgs();
        var editorArea = document.getElementById(args.id);
        editorArea.className = '';

        var editorPanel = document.getElementById('cp-gallery-edit');
        editorPanel.parentNode.removeChild(editorPanel);

        delete (this.galleryEditPanel);
    }

    this.isEditorAllowed = function () // hidden , disabled, enabled
    {
        return {
            'select_template': 'enabled',
            'reorder_items': 'enabled',
            'edit_args': 'enabled',
            'add_items': 'enabled'
        };
    }

    this.getExtraMenu = function () {
        if (location.href.indexOf("zeenabledashboard=") == -1)
            return null;
        /*		
		try {
		var args = go.getArgs();
		if (args["permit"] < 4)
		return null;
		} catch (ex) { return null; }*/

        return [
			{ text: 'Dashboard', action: 'popup_javascript', popup: { width: 600, height: 400 }, url: _HOST + 'editor/dashboard.js' }
        ];

        return [
			{ text: "Embed Instructions", action: "popup_iframe", popup: { width: 400, height: 300 }, url: "http://app.1pluginjquery.com/manage/galleries.aspx" },
			{ text: "Upgrade your account", action: "popup_html", popup: { width: 400, height: 300 }, content: "<h1>you are using the free version</h1><p><a id='asd' href='http://1pluginjquery.com/pricing' target='_blank'>upgrade today</a> and get a free 30-day trial - no creditcard is needed</p>" },
			{ text: "Manage Your Galleries", action: "blank_window", url: "http://app.1pluginjquery.com/manage/galleries.aspx" },
			{ text: 'Dashboard', action: 'popup_javascript', popup: { width: 600, height: 400 }, url: _HOST + 'editor/dashboard.js' }
        ];
    }

    this.getActiveGO = function () {
        var zeiframe = document.getElementById("zeiframe_" + this.loaderParams["_object"]);
        if (zeiframe)
            return zeiframe.contentWindow.zeGalleryArray.inneriframe;

        return this;
    }

    this.getMap = function () {
        var skin = self.getSkin();
        if (skin == null)
            return null;

        return skin.arg_map;
    }

    this.getArgs = function () {
        return this.getActiveGO().args;
    }

    this.getArgGroups = function () {
        var skin = self.getSkin()
        if (skin == null)
            return null;

        return skin.arg_groups;
    }

    this.getItems = function (params, callback) {
        var ps = {
            wid: this.loaderParams._object,
            fid: this.args.fid
        };
        for (var k in params) {
            ps[k] = params[k];
        }
        pquery(
			 _AJAX + "json.aspx", ps,
			function (wid, json) {
			    callback(json.items);
			}
		);
    };

    this.getSkin = function () {
        var zeiframe = document.getElementById("zeiframe_" + this.loaderParams["_object"]);
        if (zeiframe) {
            return zeiframe.contentWindow.zeGalleryArray.inneriframe.skin;
        }
        return this.skin;
    };

    this.getTemplates = function (callback) {
        if (typeof _ze_templates == 'undefined') {
            query('template.aspx', function (r) {
                _ze_templates = r.templates;
                callback(_ze_templates);
            });
            return;
        }
        callback(_ze_templates);
    };

    function query(op, params, callback) {
        if (typeof params == 'function') {
            callback = params;
            params = {};
        }
        params.fid = self.args.fid;
        params.logged_user_cred = self.args.logged_user_cred;
        //+'?fid='+go.loaderParams._gid+'&logged_user_cred='+args.logged_user_cred
        new Ajax(_AJAX + op, params, function (r) {
            function json(data) {
                try {
                    return eval('(' + data + ');');
                } catch (e) {
                    return { error: "Invalid JSON format\n" + data, success: false };
                }
            }
            callback(json(r));
        });
    }

    function pquery(op, params, callback) {

        if (pquery.count === undefined) {
            pquery.count = 0;
        } else {
            pquery.count++;
        }

        var callback_name = "__pquery_temp_callback_" + pquery.count;

        //creating temp callback:
        window[callback_name] = function () {
            callback.apply(this, arguments);
            try {
                delete window[callback_name];
            } catch (e) {
                window[callback_name] = undefined;
            }
        }
        //adding callback to params
        params.callback = callback_name;

        go.loadScript(op + '?' + params_encode(params));

        function params_encode(params) {

            var out = [];
            for (var k in params) {
                var v = params[k];
                out.push(k + '=' + encodeURIComponent(v));
            }
            return out.join('&');
        }

    }

    this.onEditPanelChange = function (what, onload_callback) {
        var changed = [];

        if (typeof _ze_template_load_count == 'undefined') {
            _ze_template_load_count = 0;
        }

        //assigning callback
        if (onload_callback) {
            this.onSkinInit = onload_callback;
        }

        //reloading skin completely if template changed
        if (what.template) {
            var obj = getElement(this.loaderParams["_object"]);
            obj.innerHTML = "<img src='" + _HOST + "loading.gif' />";
            this.loadScript(_AJAX + "args.aspx?id=" + this.loaderParams._object + "&fid=" + this.args.fid + "&zetemplate=" + what.template + "&count=" + _ze_template_load_count);
            _ze_template_load_count++;
            return; //RETURN !
        }

        if (what.items) {
            skin_notify(['items']);
            return;
        }

        if (what.reload) {
            this.initialize();
            return;
        }

        var args = [];
        var active_go = this.getActiveGO();  //<- in case of iframe this would be the iframe go
        for (var k in what) {
            args.push(k);
            active_go.args[k] = what[k];
        }

        if (what.iframe !== undefined) {
            if (active_go.args.iframe) {
                this.loadIFrameSkin();
            }
            else {
                // copy all args from iframe_go to the parent
                for (var k in active_go.args)
                    this.args[k] = active_go.args[k];

                this.loadSkin();
            }

            return;
        }

        //we need to reload skin so go would update its dimensions
        if ((what.widget_w !== undefined || what.widget_h !== undefined) && self.args.iframe) {
            // copy all args from iframe_go to the parent
            for (var k in active_go.args)
                this.args[k] = active_go.args[k];

            self.loadIFrameSkin();
            return;
        }

        //default - notifying skin about args changing
        skin_notify(args);

        function skin_notify(args) {
            var skin = self.getSkin();
            if (skin) {
                skin.onEditPanelChange(args);
            } else {
                self.initialize();
            }
        }
    }

    this.merge_json = function (o1, o2, o3) {
        var o = {};

        for (var z in o1)
            o[z] = o1[z];
        for (var z in o2)
            o[z] = o2[z];
        for (var z in o3)
            o[z] = o3[z];

        return o;
    }

}

function zeOnMediaJSON(wid, json) {
    var go = zeGalleryArray[wid];
    go.MediaJSON = json;
    go.zeOnMediaJSON(json);
}

function Ajax(url, params, callback) {

    var domain = url.match(/http:\/\/([\w\d-\.]+)/);
    if (domain) domain = domain[0];

    if (navigator.appVersion.match(/MSIE/)) {
        post_ie();
    } else {
        post();
    }

    function post_ie() {
        var xdr = new XDomainRequest();
        xdr.open("post", url);

        xdr.onload = function () {
            callback(xdr.responseText);
        };

        xdr.send(params_encode(params));
    }

    function post() {

        var http = new XMLHttpRequest();

        var method = 'POST';
        if (params.http_method) {
            method = params.http_method;
            delete params.http_method;
        }

        params = params_encode(params);

        if (method == 'GET') {
            url += '?' + params;
        }

        http.open(method, url, true);

        http.setRequestHeader("Connection", "close");

        if (method == 'POST') {
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader("Content-length", params.length);
            http.send(params);
        } else {
            http.send(null);
        }

        http.onreadystatechange = function () {
            trace(http.readyState + ' ' + http.status);
            if (http.readyState == 4) {
                switch (http.status) {
                    case 200:
                        callback(http.responseText);
                        break;
                    default:
                        trace('http request failed: ' + http.status);
                }
            }
        }
    }

    function params_encode(params) {

        var out = [];
        for (var k in params) {
            var v = params[k];
            out.push(k + '=' + encodeURIComponent(v));
        }
        return out.join('&');
    }
}