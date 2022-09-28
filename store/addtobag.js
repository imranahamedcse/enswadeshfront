export const state = () => ({
  addproducts: localStorage.getItem("addproducts") ? JSON.parse(localStorage.getItem("addproducts")) : [] // for static rendering where target: static
  //addproducts: process.server ? [] : !!JSON.parse(localStorage.getItem("addproducts")) // for sever rendering where target: server
});

export const getters = {
  addproducts: (state) => state.addproducts,
};

export const actions = {
  addProduct({ commit, state }, { item, qtn, size, weight}) {
   if (item.product_type === 'size_base') {
      let pro = state.addproducts;
      for (var i = 0; i < pro.length; i++) {
        if (pro[i].id == item.id && pro[i].size == item.size) {
          commit("UPDATE_COUNT", { count: qtn, index: i });
          saveProduct(state.addproducts);
          return;
        }
      }
      let p = {
        id: item.id,
        shop_id: item.shop ? item.shop.id : item.shop_id,
        product_type: item.product_type,
        price: item.price,
        discount: item.discount,
        stocks: item.stocks,
        name: item.name,
        size: size,
        weight: weight,
        thumbnail: item.thumbnail,
        qtn: item.qtn,
        count: qtn,
      };

      commit("ADD_PRODUCT", p);
      saveProduct(state.addproducts);
    }

    if (item.product_type === 'weight_base') {
      let pro = state.addproducts;
      for (var i = 0; i < pro.length; i++) {
        if (pro[i].id == item.id && pro[i].weight == item.weight) {
          commit("UPDATE_COUNT", { count: qtn, index: i });
          saveProduct(state.addproducts);
          return;
        }
      }
      let p = {
        id: item.id,
        shop_id: item.shop ? item.shop.id : item.shop_id,
        product_type: item.product_type,
        price: item.price,
        discount: item.discount,
        stocks: item.stocks,
        name: item.name,
        size: size,
        weight: weight,
        thumbnail: item.thumbnail,
        qtn: item.qtn,
        count: qtn,
      };

      commit("ADD_PRODUCT", p);
      saveProduct(state.addproducts);
    }

    if (item.product_type === 'simple') {
      let pro = state.addproducts;
      for (var i = 0; i < pro.length; i++) {
        if (pro[i].id == item.id) {
          commit("UPDATE_COUNT", { count: qtn, index: i });
          saveProduct(state.addproducts);
          return;
        }
      }
      let p = {
        id: item.id,
        shop_id: item.shop ? item.shop.id : item.shop_id,
        product_type: item.product_type,
        price: item.price,
        discount: item.discount,
        stocks: item.stocks,
        name: item.name,
        size: size,
        weight: weight,
        thumbnail: item.thumbnail,
        qtn: item.qtn,
        count: qtn,
      };

      commit("ADD_PRODUCT", p);
      saveProduct(state.addproducts);
    }
  },

  removeProduct({ commit, state }, item) {
    let pro = state.addproducts;
    for (var i = 0; i < pro.length; i++) {
      if (pro[i].id == item.id) {
        if (pro[i].count <= 1) {
          commit("REMOVE_ITEM", i);
          saveProduct(state.addproducts);
          return;
        }
        commit("UPDATE_COUNT", { count: pro[i].count - 1, index: i });
        saveProduct(state.addproducts);
        return;
      }
    }
  },

  allProductRemove({ commit, state }, id) {
    let pro = state.addproducts;
    for (var i = 0; i < pro.length; i++) {
      if (pro[i].id == id) {
        commit("REMOVE_ITEM", i);
        saveProduct(state.addproducts);
        return;
      }
    }
  },

  productRemove({ commit, state }, id) {
    let pro = state.addproducts;
    for (var i = 0; i < pro.length; i++) {
      if (pro[i].id == id) {
        commit("REMOVE_ITEM", i);
        saveProduct(state.addproducts);
        return;
      }
    }
  },

  allProductRemoveCart({ commit, state }) {
    let pro = state.addproducts;
    commit("REMOVE_ITEMAll", pro);
    saveProduct(state.addproducts);
    return;
  },
};

export const mutations = {
  ADD_PRODUCT(state, item) {
    state.addproducts.push(item);
  },

  UPDATE_COUNT(state, { count, index }) {
    state.addproducts[index].count = count;
  },

  REMOVE_ITEM(state, index) {
    state.addproducts.splice(index, 1);
  },
  REMOVE_ITEMAll(state, index) {
    state.addproducts.splice(index);
  },
};

function saveProduct(addproducts) {
  localStorage.setItem("addproducts", JSON.stringify(addproducts)); // for static rendering where target: static
  //process.server ? '' : !!localStorage.setItem("addproducts", JSON.stringify(addproducts)); // for sever rendering where target: server
}
