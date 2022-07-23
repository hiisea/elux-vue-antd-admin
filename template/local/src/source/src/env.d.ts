declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.less';
declare module '*.scss';
declare module '*.vue' {
  import type {EluxComponent} from '@elux/vue-web';
  import type {DefineComponent} from 'vue';
  const component: DefineComponent<any> & EluxComponent;
  export default component;
}
