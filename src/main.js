import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  console.log("---->", window.__POWERED_BY_FOTIC_MICROFRONT__);
  router = createRouter({
    //base: window.__POWERED_BY_FOTIC_MICROFRONT__ ? '/vue3-app' : '/',
    history: createWebHashHistory(window.__POWERED_BY_FOTIC_MICROFRONT__ ? '/vue3-app' : '/'),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const toPath = to.path;
    const fromPath = from.path;
    console.log("====", toPath + '--------' + fromPath + '----' + window.__POWERED_BY_FOTIC_MICROFRONT__);
    if (window.__POWERED_BY_FOTIC_MICROFRONT__) {
      //history.pushState(null, null, '/' + 'vue3-app');
    }
    next();

  })

  instance = createApp(App);
  instance.use(router);
  instance.use(store);
  instance.mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_FOTIC_MICROFRONT__) {
  render();
} else {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_FOTIC_MICROFRONT__;
}

export async function bootstrap() {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function mount(props) {
  storeTest(props);
  render(props);
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
}
