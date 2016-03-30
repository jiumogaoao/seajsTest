define("model/group",function(require, exports, module) {
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
			callback();
		};
	}
	get();
	/*创建组*/
		function add(gid,name,fn,end){
			if(!gid&&!end){
				gid=common.uuid();
			}
			var self=user.loginMessage();
			cache[gid]={
				id:gid,
				name:name,
				dsc:"",
				icon:"",
				type:0,
				file:[],
				album:[],
				publics:"",
				action:[],
				sign:[],
				vote:[],
				link:"",
				app:[],
				member:[{id:self.id,nickName:"",type:"owner"}]
			};
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.creatGroup(gid,name,fn,true);	
				}
			});
		};
		function join(gid,uid,fn,end){
			var self=user.loginMessage();
			cache[gid].member.push({id:uid,nickName:"",type:"owner"});
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.joinGroup(gid,uid,fn,true);	
				}
			});
		};
		function out(gid,uid,fn,end){
			var self=user.loginMessage();
			cache[gid].member=_.reject(cache[gid].member,{id:uid});
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.outGroup(gid,uid,fn,true);	
				}
			});
		};
		function addAdmin(gid,uid,fn,end){
			_.findWhere(cache[gid].member,{id:uid}).type="admin";
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.addAdminGroup(gid,uid,fn,true);	
				}
			});
		};
		function cancelAdmin(gid,uid,fn,end){
			_.findWhere(cache[gid].member,{id:uid}).type="member";
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					user.cancelAdminGroup(gid,uid,fn,true);	
				}
			});
		};
		function searchNotGroup(fn){
			var self=user.loginMessage();
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var returnList=_.reject(cache, function(point){
			 return _.contains(point.member,{id:self.id}); 
			});
			if(fn){fn(returnList);}
		}
		module.exports.add=function(gid,name,fn,end){
			add(gid,name,fn,end);
		};
		module.exports.join=function(gid,uid,fn,end){
			join(gid,uid,fn,end);
		};
		module.exports.out=function(gid,uid,fn,end){
			out(gid,uid,fn,end);
		};
		module.exports.addAdmin=function(gid,uid,fn,end){
			addAdmin(gid,uid,fn,end);
		};
		module.exports.cancelAdmin=function(gid,uid,fn,end){
			cancelAdmin(gid,uid,fn,end);
		};
		module.exports.searchNotGroup=function(fn){
			searchNotGroup(fn);
		}
});
