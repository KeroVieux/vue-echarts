/**
 * Created by PetitKero on 27/9/2016.
 */
/**
 * The map for this entire project .
 * @module routes
 */

export default [
  {
    path: '/broadcast',
    component(resolve) {
      require(['./components/elements/broadcast.vue'], resolve)
    },
    name: 'Foo',
  },
  {
    path: '/',
    component(resolve) {
      require(['./components/index.vue'], resolve)
    },
    name: 'Index',
  },
  {
    path: '/:year/:month/:day/',
    component(resolve) {
      require(['./components/index.vue'], resolve)
    },
    name: 'Report',
  },
  {
    path: '*',
    component(resolve) {
      require(['./components/common/page_error.vue'], resolve)
    },
    name: 'PageError',
  },
]
