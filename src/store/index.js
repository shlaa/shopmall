import {createStore} from 'vuex'
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const state = {
  cartList: []
}

const store = createStore({
  state,
  mutations,
  getters,
  actions
})

export default store
