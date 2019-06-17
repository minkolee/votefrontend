import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: null,
    lastVote: null,
    expire: null,
    vote:null
  },
  //更新token，username和上次投票的mutations
  mutations: {
    setToken: function (state, token) {
      state.token = token;
    },
    setUsername: function (state, username) {
      state.username = username;
    },
    setLastVote: function (state, lastVote) {
      state.lastVote = lastVote;
    },
    setExpire: function (state, expire) {
      state.expire = expire;
    },
    setVote: function (state, vote) {
      state.vote = vote;
    }
  },
  //异步更新，用于登录请求
  actions: {
    tryAutoLogin: function (context) {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      const lastVote = localStorage.getItem('lastVote')
      const expire = localStorage.getItem('expire')
      const vote = localStorage.getItem('vote')
      const now = (new Date()).getTime()
      if(now<=expire){
        context.commit('setToken', token)
        context.commit('setUsername', username)
        context.commit('setLastVote', lastVote)
        context.commit('setExpire', expire)
        context.commit('setVote',vote)
      } else {
        context.commit('setExpire', -1);
      }
      /* eslint-disable */
      console.log('-----tryAutologin从本地读入的信息是：-----')
      console.log(token)
      console.log(username)
      console.log(lastVote)
      console.log('过期时间：'+expire)
      console.log('当前时间：'+now)
    },

    login:function({commit}, authData){
      return new Promise((resolve,reject)=>{
        axios.post('http://localhost:8080/api/token', {
          username: authData.username,
          password: authData.password
        }).then(res => {
          commit('setToken', res.headers.authorization)
          commit('setUsername', authData.username)
          commit('setLastVote', res.data.lastVotedAt)
          commit('setExpire', res.data.expire)
          localStorage.setItem('token', res.headers.authorization)
          localStorage.setItem('username', authData.username)
          localStorage.setItem('expire', res.data.expire)
          localStorage.setItem('lastVote', res.data.lastVotedAt);
          resolve()
        }).catch(err => {
          err.toString()
          reject()
        })
      })
    }
  }
})
