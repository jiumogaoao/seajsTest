define("model/message",function(require, exports, module) {
	var cache={};
	var inited=false;
	var common=require("bin/common");
	var user=require("model/user");
	var get=function(){
		if(!inited){
			if(common.cache(module.id)){
				cache=common.cache(module.id);
			}
				inited=true;
				};
	}
	var set=function(callback){
		/*把数据推送到数据源*/
		common.cache(module.id,cache);
		if(callback){
			callback(true);
		};
	}
	get();
	var model={};
	module.exports=model;
	/*获取聊天记录*/
		function getList(to,state,fn){
			var self=user.loginMessage();
			var result=[];
			_.each(cache,function(point){
				if((point.from==self.id&&point.to==to&&point.state==state) || (point.to==self.id&&point.from==to&&point.state==state)){
					if(point.from==self.id){
						point.self=true;
					}else{
						point.self=false;
					}
					result.push(point);
				}
			});
			result=_.sortBy(result,"time");
			result=_.groupBy(result,function(point){
				return moment(point.time,"x").format("YYYY-MM-DD");
			});
			if(result){
				fn(result);
			}else{
				fn(false);
			}
		};
		/*聊天*/
		function add(to,state,type,main,fn){
			var self=user.loginMessage();
			var newId=common.uuid();
				cache[newId]={
					id:newId,
					time:new Date().getTime(),
					from:self.id,
					to:to,
					state:state,
					type:type,
					main:main,
					readed:false
				};
				set(fn);
		};
		model.getList=function(to,state,fn){
			getList(to,state,fn);
		};
		model.add=function(to,state,type,main,fn){
				add(to,state,type,main,fn);
		};
});