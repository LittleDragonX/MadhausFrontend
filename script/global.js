//=======1.==========$api.getStorage=======开始==================
function uzStorage() {
	var isAndroid = (/android/gi).test(navigator.appVersion);
	var ls = window.localStorage;
	if (isAndroid) {
		ls = os.localStorage();
	}
	return ls;
};
function setStorage(key, value) {
	if (arguments.length === 2) {
		var v = value;
		if ( typeof v == 'object') {
			v = JSON.stringify(v);
			v = 'obj-' + v;
		} else {
			v = 'str-' + v;
		}
		var ls = uzStorage();
		if (ls) {
			ls.setItem(key, v);
		}
	}
};
function getStorage(key) {
	var ls = uzStorage();
	if (ls) {
		var v = ls.getItem(key);
		if (!v) {
			return;
		}
		if (v.indexOf('obj-') === 0) {
			v = v.slice(4);
			return JSON.parse(v);
		} else if (v.indexOf('str-') === 0) {
			return v.slice(4);
		}
	}
};
function rmStorage(key) {
	var ls = uzStorage();
	if (ls && key) {
		ls.removeItem(key);
	}
};
function clearStorage() {
	var ls = uzStorage();
	if (ls) {
		ls.clear();
	}
};
//=======2.==========设置顶部状态栏======开始===================

function fixIos7Bar(el) {
	var strDM = api.systemType;
	if (strDM == 'ios') {
		var strSV = api.systemVersion;
		var numSV = parseInt(strSV, 10);
		var fullScreen = api.fullScreen;
		var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
		if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
			el.style.paddingTop = '20px';
		}
	}
};
function fixStatusBar(el) {
	var sysType = api.systemType;
	if (sysType == 'ios') {
		fixIos7Bar(el);
	} else if (sysType == 'android') {
		var ver = api.systemVersion;
		ver = parseFloat(ver);
		if (ver >= 4.4) {
			el.style.paddingTop = '25px';
		}
	}
};
function setFixStatusBar() {
	var ret = 0;
	var sysType = api.systemType;
	if (sysType == 'ios') {
		var strSV = api.systemVersion;
		var numSV = parseInt(strSV, 10);
		var fullScreen = api.fullScreen;
		var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
		if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
			ret = 20;
		}
	} else if (sysType == 'android') {
		var ver = api.systemVersion;
		ver = parseFloat(ver);
		if (ver >= 4.4) {
			ret = 25;
		}
	}
	setStorage("statusBar", ret);
};
//=======3.==========API.ajax=====开始===================
// function myAjax(callback, url, method, data, dataType) {
// 	var o = {};
// 	o.url = url;
// 	o.method = method ? method : "get";
// 	o.dataType = dataType ? dataType : "json";
// 	if (o.method == "post") {
// 		o.data = data;
// 	}
// 	api.ajax(o, function(ret, err) {
// 		callback(ret, err);
// 	});
// };
//=======6.==========自定义简单常用函数=====开始===================
//判断是否为空
function isNullOrEmpty(str) {
	return (str == null || str == undefined || str.replace(/(^\s*)|(\s*$)/g, "") == "") ? true : false;
};
function toast(msg, duration, location) {
	api.toast({
		msg : msg,
		duration : duration ? duration : 2000,
		location : location ? location : 'top'
	});
};
//=======5.==========头部=====开始===================

function initTopBar(bgColor, type) {
	document.addEventListener("DOMContentLoaded", function() {
		var height = getStorage("statusBar") ? getStorage("statusBar") : 0;
		var color = bgColor ? bgColor : 'black';
		if (getStorage("statusBar") == 25 && type == 1) {
			color = 'black';
		}
		document.body.insertAdjacentHTML('afterBegin', '<div id="topBar" style="height:' + height + 'px;background:' + color + ';" class="topBar"></div>');
	});
}
