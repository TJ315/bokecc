import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = { //要设置的全局访问的state对象	
	//人员信息 房间信息
	room: {
		role: null,
		userid: null,
		roomid: null,
		liveStatus: 2, //0:直播未开始；1：直播进行中；2：正在开启直播中	
		liveStartTime: 0,
	},


};
const getters = { //实时监听state值的变化(最新状态)
	//获取到所有的  状态管理数据，在 /store 页面使用
	all(state) {
		let statedata = state;
		let arr = [];
		let clone = function (statedata, parkey) {
			for (let [key, value] of Object.entries(statedata)) {

				if ((typeof value == 'object') && (value != null)) {
					clone(value, key)
				} else {
					if (parkey) {
						var keys = parkey + '.' + key;
					} else {
						var keys = key;
					}
					arr.push({
						key: keys,
						value: JSON.stringify(value)
					})
				}
			}
		}
		clone(statedata)
		return arr
	},


};
const mutations = {//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
	//修改直播状态
	liveStatus(state, n) {
		state.room.liveStatus = n
	},
	//修改直播时间
	startTime(state, n) {
		state.room.liveStartTime = n
	},


};
const actions = {//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性

	/*
	*
   	*修改直播状态   定时修改直播时长
	* @param {obj}  store 对象
	* @param {number} 直播状态  0:直播未开始；1：直播进行中；2：正在开启直播中
	* @param {'status':0,'time':6000} 直播状态  直播进行时长
	* 
	*/
	setLiveStatus(context, data) {
		let state, time;
		if (typeof data == "number") {
			state = data;
			time = 0;
		} else {
			state = data.status;
			time = data.time;
		}

		context.commit('liveStatus', state)

		if (state == 1) {
			let data = parseInt(time) / 1000;
			context.commit('startTime', timeFormat(data))
			const intval = setInterval(function () {
				if (context.state.room.liveStatus !== 1) {
					clearInterval(intval)
				}
				data++;
				context.commit('startTime', timeFormat(data))

			}, 1000)
		}

	},

};
const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});
export default store;