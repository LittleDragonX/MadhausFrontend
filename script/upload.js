var uiMediaScanner = null, imageFilter = null, fNImageClip = null, isIOS = false;
function require() {
	// 引入多选模块
	uiMediaScanner = api.require("UIMediaScanner");
	// 引入过滤压缩模块
	imageFilter = api.require('imageFilter');
	//裁剪模块
	fNImageClip = api.require('FNImageClip');
	// 判断是否是IOS系统
	isIOS = api.systemType == "ios" ? true : false;
};

// 生成guid,主要用于生成随机文件名
function NewGuid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

// 获取当前的时间，拼接成2015-11-09这样的格式，主要用于对图片进行时间分类
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate
	return currentdate;
};

// 获取文件拓展名
function getExt(fileName) {
	return fileName.substring(fileName.lastIndexOf('.') + 1);
};

// 图片压缩
// imgsrc：源图片的路径
// quality：图片压缩质量，一般建议0.5
// scale：图片压缩比例，也是建议0.5
// size: 压缩后的图片的大小 {w:'',h:''}
// save: 压缩后的图片保存位置
// ext：源图片拓展名
// callback：转换成功之后回调函数
function imgCompress(imgsrc, quality, scale, size, ext, callback) {
	// 压缩文件的保存目录
	var savePath = api.cacheDir + "/" + getNowFormatDate() + "/";
	// 压缩文件生成的随机文件名称
	var savename = NewGuid() + "." + ext;
	imageFilter.compress({
		img : imgsrc,
		quality : quality,
		scale : quality,
		size : size,
		save : {
			album : false,
			imgPath : savePath,
			imgName : savename
		}
	}, function(ret, err) {
		if (ret) {
			callback(savePath + savename);
		} else {
			alert(JSON.stringify(err));
		}
	});
};
//图片裁剪
function imageClip(imgUrl) {
	fNImageClip.open({
		rect : {
			x : 0,
			y : 0,
			w : api.winWidth,
			h : api.winHeight
		},
		srcPath : imgUrl,
		style : {
			mask : '#888',
			clip : {
				w : api.winWidth,
				h : api.winWidth,
				x : 0,
				y : (api.winHeight-api.winWidth-100)/2,
				borderColor : '#0f0',
				borderWidth : 1,
				appearance : 'rectangle'
			}
		},
		fixedOn : api.frameName
	}, function(ret, err) {
		if (ret.status) {
			alert(JSON.stringify(ret));
		} else {
			alert(JSON.stringify(err));	
		}
	});
};
function openActionSheet(callback) {
	api.actionSheet({
		title : '选择图片来源',
		buttons : ['相机拍照', '相册浏览']
	}, function(ret, err) {
		var index = ret.buttonIndex;
		switch(index) {
			case 1:
				getPicByCamera(callback);
				break;
			case 2:
				getPicByPhoto(callback);
				break;
		}
	});
};
//优雅拍照 封装函数
function getPicByCamera(callback) {
	api.getPicture({
		sourceType : "camera",
		encodingType : "jpg",
		destinationType : "url",
		mediaValue : "pic",
		quality : 50,
		saveToPhotoAlbum : true
	}, function(ret, err) {
		if (ret && ret.data) {
			// 拍照返回的本地路径
			var returnUrl = ret.data;
			callback(returnUrl);
		} else {
			api.toast({
				msg : '没有选择，或者选择出错'
			});
		}
	});
};

//相册浏览照片 函数
function getPicByPhoto(callback) {
	uiMediaScanner.open({
		type : 'picture',
		column : 4,
		classify : true,
		max : 1,
		sort : {
			key : 'time',
			order : 'desc'
		},
		texts : {
			stateText : '已选*项',
			cancelText : '取消',
			finishText : '完成'
		},
		styles : {
			bg : '#fff',
			mark : {
				icon : '',
				position : 'bottom_left',
				size : 20
			},
			nav : {
				bg : '#fff',
				stateColor : '#000',
				stateSize : 18,
				cancelBg : 'rgba(0,0,0,0)',
				cancelColor : '#000',
				cancelSize : 18,
				finishBg : 'rgba(0,0,0,0)',
				finishColor : '#000',
				finishSize : 18
			}
		}
	}, function(ret) {
		if (ret.eventType == 'confirm') {
			for (var i = 0; i < ret.list.length; i++) {
				var selectImg = ret.list[i];
				// 获取图片的路径
				var selectimgPath = selectImg.path;
				if (isIOS) {
					// 转换为真实路径
					uiMediaScanner.transPath({
						path : selectimgPath
					}, function(transObj) {
						var imgPath = transObj.path;
						callback(imgPath);
//						imgCompress(imgPath, 0.5, 0.5, null, getExt(imgPath), function(imgUrl) {
//							callback(imgUrl);
//						})
					})
				} else {
					callback(selectimgPath);
//					imgCompress(selectimgPath, 0.5, 0.5, null, getExt(selectimgPath), function(imgUrl) {
//						callback(imgUrl);
//					})
				}
			}
		}
	});
};