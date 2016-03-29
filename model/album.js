define("model/album",function(require, exports, module) {
	var cache={};
	var inited=false;
	var common=require("bin/common");
	var user=require("model/user");
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
	function creat(aid,name,dsc,fn,end){
			var self=user.loginMessage();
			if(!aid&&!end){
				aid=common.uuid();
			};
			cache[aid]={
				name:name,
				dsc:dsc,
				user:self.id,
				time:new Date().getTime(),
				list:[]
			};
			set(module,function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.creatAlbum(aid,name,dsc,fn,true);	
				}
			});
		};
		/*删除相册*/
		function remove(aid,fn,end){
			delete cache[aid];
			set(module,function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.removeAlbum(aid,fn,true);	
				}
			});
		};
		/*添加图片*/
		function addPic(aid,src,name,fn){
			cache[aid].list.push({
				id:common.uuid(),
				src:src,
				name:name
			});
			set(fn);
		};
		/*删除图片*/
		function removePic(pid,aid,fn){
			cache[aid].list=_.reject(cache[aid].list,{id:pid});
			set(fn);
		};
		model.creat=function(aid,name,dsc,fn,end){
			creat(aid,name,dsc,fn,end);
		};
		model.remove=function(aid,fn,end){
			remove(aid,fn,end);
		};
		model.addPic=function(aid,src,name,fn){
			addPic(aid,src,name,fn);
		}
		model.removePic=function(pid,aid,fn){
			removePic(pid,aid,fn);
		}
});