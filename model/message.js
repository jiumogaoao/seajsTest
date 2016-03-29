define("model/message",function(require, exports, module) {
	var cache={};
	var inited=false;
	var common=require("bin/common");
	var get=function(){
		if(!inited){
				cache=common.cache(exports.id);
				inited=true;
				};
	}
	var set=function(callback){
		/*把数据推送到数据源*/
		common.cache(exports.id,cache);
		if(callback){
			callback();
		};
	}
	get();
	var model={};
	module.exports=model;
	/*获取聊天记录*/
		function getList(id,to,fn){
			var result=_.where(cache,{from:id,to:to});
			result.concat(_.where(cache,{from:to,to:id}));
			
			if(result&&result.length){
				fn(result);
			}else{
				fn(false);
			}
		};
		/*聊天*/
		function add(from,to,type,main,fn){
			var newId=common.uuid();
				cache[newId]={
					id:newId,
					time:new Date().getTime(),
					from:from,
					to:to,
					type:type,
					main:main,
					readed:false
				};
				set(fn);
		};
		model.getList=function(id,to,fn){
			getList(id,to,fn);
		};
		model.add=function(from,to,type,main,fn){
				add(from,to,type,main,fn);
		};
});