export default function ({ store, redirect }) {
  // If the user is not authenticated
  console.log('the shop status ' + store.state.shop)
  // if (store.state.shop_status == 0) {
  //   return redirect('/shop/under-verification/' + store.state.id)
  // } else {
  //   return redirect('/myshops/' + store.state.id)
  // }
}
