/**
 * tags 相关
 */
import { NO_CACHE_PATH } from '@/const/platform'

export const state = () => ({
  visitedViews: {},
  cachedViews: [],
  currentTag: {},
})

export const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    const visitedViews = { ...state.visitedViews }
    visitedViews[view.path] = view
    state.visitedViews = visitedViews
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name) || NO_CACHE_PATH.includes(view.name)) {
      return
    }
    if (view.name) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEW: (state, view) => {
    const visitedViews = { ...state.visitedViews }
    delete visitedViews[view.path]
    state.visitedViews = visitedViews
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    const { path } = view
    const currentView = state.visitedViews[path]
    state.visitedViews[path] = {
      ...currentView,
      ...view,
    }
  },
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    const visitedViews = { ...state.visitedViews }
    Object.keys(visitedViews).forEach((v) => {
      if (v !== view.path) {
        delete visitedViews[v]
      }
    })
    state.visitedViews = visitedViews
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.title)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  DEL_ALL_VISITED_VIEWS: (state) => {
    // TODO: 可能会做不能被删除的页面
    // const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = []
  },
  DEL_ALL_CACHED_VIEWS: (state) => {
    state.cachedViews = []
  },
  UPDATE_CURRENT_TAG: (state, view) => {
    state.currentTag = view
  },
}

export const actions = {
  updateCurrentTag({ commit }, view) {
    commit('UPDATE_CURRENT_TAG', view)
  },
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
  delView({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: { ...state.visitedViews },
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view)
      resolve({ ...state.visitedViews })
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  delOthersViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: { ...state.visitedViews },
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve({ ...state.visitedViews })
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  delAllViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: { ...state.visitedViews },
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve({ ...state.visitedViews })
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
}
