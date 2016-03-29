define("control/newFriend",function(require, exports, module) {
	var page={};
	module.exports=page;
	page.par=[];
	var view=require("bin/view");
	var control=require("bin/control");
	page.fn=function(data){
		function viewDone(){/*主区加载完成*/
			/*添加滚动*/
			var myScroll = new IScroll('#newFriendMain', {  });
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
		view.head.show("head_template",{"left":{type:"back",text:"返回"},"center":{type:"title",text:"新朋友"},"right":{type:"icon",icon:[{name:"list"}]}},headDone);
		/*隐藏脚部*/
		view.foot.hide(footDone);
		/*加载主区，传入参数*/
		view.main.sugest("newFriend_page",{
			list:[
			{"icon":"img/head.jpg","name":"某人","dsc":"你就加了吧","state":"已经加为好友"},
			{"icon":"img/head.jpg","name":"某人","dsc":"你就加了吧","state":"已经加为好友"}
			]
		},data.state,"side",viewDone);
	}
});