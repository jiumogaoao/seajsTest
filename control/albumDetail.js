define("control/albumDetail",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=["id"];
	var view=require("bin/view");
	var control=require("bin/control");
	var album=require("model/album");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#albumDetailMain', {  });
			/*每当图片加载完成，刷新滚动控件*/
			$('img').on("load",function(){
				myScroll.refresh();
			});
		}
		function headDone(){/*头部加载完成*/
			/*绑定事件*/
			$(".head_module .left").unbind("tap").bind("tap",function(){
				control.back();
			});
		}
		function footDone(){/*脚部加载完成*/

		}
		/*加载头部，传入参数*/
		view.head.hide(headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		var showList={};
		function getAlbumList(returnData){
			showList=returnData;
		}
		album.getAlbumList(null,getAlbumList);
		view.main.sugest("albumDetail_page",showList,data.state,"side",viewDone);
	}
});