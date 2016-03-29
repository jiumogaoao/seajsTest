define("model/user",function(require, exports, module) {
	var cache={};
	var inited=false;
	var common=require("bin/common");
	var zone=require("model/zone");
	var group=require("model/group");
	var album=require("model/album");
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
		/*登录信息*/
		var loginMessage=null;
		/*登录*/
		function login(name,key,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			var result=_.findWhere(cache,{name:name,key:key});
			if(result){
				loginMessage=result;
				fn(true);
			}else{
				common.pop.on("账号或密码错误");
				fn(false);
			}
		};
		/*注册*/
		function regest(name,key,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			if(_.findWhere(cache,{name:name})){
				common.pop.on("注册手机已有");
				fn(false);
			}else{/*写入*/
				var newId=common.uuid();
				cache[newId]={
					id:newId,
					name:name,
					key:key,
					step:["star"],
					stepDay:0,
					icon:"",
					dsc:"",
					sex:0,
					age:0,
					province:"",
					city:"",
					birthday:0,
					job:"",
					company:"",
					school:"",
					hometown:"",
					email:"",
					mine:{
						interested:"",
						music:"",
						idol:"",
						readed:"",
						heared:""
					},
					album:[],
					group:{
						creat:[],
						admin:[],
						member:[]
					},
					money:0,
					vip:null,
					vipDay:0,
					diy:{
						pop:null,
						redpacket:null,
						style:null,
						font:null,
						ticket:null,
						call:null,
						background:null,
						face:null,
						music:null,
						suit:null,
						pandant:null
					},
					collection:[],
					file:[],
					praise:[],
					attention:[],
					readed:[],
					share:[],
					reply:[],
					friend:{
						checked:[],
						request:[],
						response:[],
						reject:[]
					}
				};
				set(fn);
			}
		};
		/*添加好友*/
		function addFriend(from,to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			if(!_.contains(cache[to].friend.reject, from)){
				cache[from].friend.request.push(to);
				cache[to].friend.response.push(from);
				set(fn);
			}else{
				if(fn){fn(false);}
			}
		};
		/*拒绝添加好友*/
		function rejectFriend(from,to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[to].friend.reject.push(from);
			cache[from].friend.request=_.without(cache[from].friend.request,to);
			cache[to].friend.response=_.without(cache[from].friend.response,from);
			set(fn);
		};
		/*确认添加好友*/
		function checkFriend(from,to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[from].friend.checked.push(to);
			cache[to].friend.checked.push(from);
			cache[from].friend.request=_.without(cache[from].friend.request,to);
			cache[to].friend.response=_.without(cache[from].friend.response,from);
			set(fn);
		};
		/*删除好友*/
		function removeFriend(from,to,fn){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[to].friend.reject.push(from);
			cache[from].friend.checked=_.without(cache[from].friend.checked,to);
			cache[to].friend.checked=_.without(cache[from].friend.checked,from);
			set(fn);
		};
		/*赞*/
		function praise(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].praise.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.praise(zid,id,fn,true);	
				}
			});
		};
		/*取消赞*/
		function cancelPraise(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].praise=_.without(cache[id].praise,zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.cancelPraise(zid,id,fn,true);
				}
			});
		};
		/*关注*/
		function attention(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].attention.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.attention(zid,id,fn,true);
				}
			});
		};
		/*取消关注*/
		function cancelAttention(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].attention=_.without(cache[id].attention,zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.cancelAttention(zid,id,fn,true);
				}
			});
		};
		/*看了*/
		function readed(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].readed.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.readed(zid,id,fn,true);
				}
			});
		};
		/*分享*/
		function share(zid,id,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].share.push(zid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.share(zid,id,fn,true);
				}
			});
		};
		/*回复*/
		function reply(zid,id,to,text,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[id].reply.push({form:id,to:to,text:text,readed:false,time:new Date().getTime(),zid:zid});
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					zone.reply(zid,id,to,text,fn,true);
				}
			});
		};
		/*创建组*/
		function creatGroup(gid,name,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			if(!gid&&!end){
				gid=app.uuid();
			}
			cache[loginMessage.id].group.creat.push(gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.add(gid,name,fn,true);
				}
			});
		};
		function joinGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[uid].group.member.push(gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.join(gid,uid,fn,true);
				}
			});
		};
		function outGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[uid].group.member=_.without(cache[uid].group.member,gid);
			cache[uid].group.creat=_.without(cache[uid].group.creat,gid);
			cache[uid].group.admin=_.without(cache[uid].group.admin,gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.out(gid,uid,fn,true);
				}
			});
		};
		function addAdminGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[uid].group.member=_.without(cache[loginMessage.id].group.member,gid);
			cache[uid].group.admin.push(gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.addAdmin(gid,uid,fn,true);
				}
			});
		};
		function cancelAdminGroup(gid,uid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[uid].group.admin=_.without(cache[loginMessage.id].group.member,gid);
			cache[uid].group.member.push(gid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					group.cancelAdmin(gid,uid,fn,true);
				}
			});
		};
		function creatAlbum(aid,name,dsc,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[loginMessage.id].album.push(aid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					album.creat(aid,name,dsc,fn,true);
				}
			});
		};
		function removeAlbum(aid,fn,end){
			if(!inited){
				common.pop.on("数据未同步成功，请稍后再试");
				return false;
			};
			cache[loginMessage.id].album=_.without(cache[loginMessage.id].album,aid);
			set(function(){
				if(end){
					if(fn){fn(true);}
				}else{
					album.remove(aid,fn,true);
				}
			});
		};
		function searchNotFriend(fn){
			
		}
		model.loginMessage=function(){
			return loginMessage;
		}
		model.login=function(name,key,fn){
			login(name,key,fn);
		};
		model.regest=function(name,key,fn){
			regest(name,key,fn);
		};
		model.addFriend=function(from,to,fn){
			addFriend(from,to,fn);
		};
		model.rejectFriend=function(from,to,fn){
			rejectFriend(from,to,fn)
		};
		model.checkFriend=function(from,to,fn){
			checkFriend(from,to,fn);
		};
		model.removeFriend=function(from,to,fn){
			removeFriend(from,to,fn);
		};
		model.praise=function(zid,id,fn,end){
			praise(zid,id,fn,end);
		};
		model.cancelPraise=function(zid,id,fn,end){
			cancelPraise(zid,id,fn,end);
		};
		model.attention=function(zid,id,fn,end){
			attention(zid,id,fn,end);
		};
		model.cancelAttention=function(zid,id,fn,end){
			cancelAttention(zid,id,fn,end);
		};
		model.readed=function(zid,id,fn,end){
			readed(zid,id,fn,end);
		};
		model.share=function(zid,id,fn,end){
			share(zid,id,fn,end);
		};
		model.reply=function(zid,id,to,text,fn,end){
			reply(zid,id,to,text,fn,end);
		};
		model.creatGroup=function(gid,name,fn,end){
			creatGroup(gid,name,fn,end);
		};
		model.joinGroup=function(gid,uid,fn,end){
			joinGroup(gid,uid,fn,end);
		};
		model.outGroup=function(gid,uid,fn,end){
			outGroup(gid,uid,fn,end);
		};
		model.addAdminGroup=function(gid,uid,fn,end){
			addAdminGroup(gid,uid,fn,end);
		};
		model.cancelAdminGroup=function(gid,uid,fn,end){
			cancelAdminGroup(gid,uid,fn,end);
		};
		model.removeAlbum=function(aid,fn,end){
			removeAlbum(aid,fn,end);
		};
		model.searchNotFriend=function(fn){
			searchNotFriend(fn);
		};
});