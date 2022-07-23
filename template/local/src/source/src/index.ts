/**
 * 该文件是应用的入口文件
 */
import {createApp} from '@elux/vue-web';
import {appConfig} from './Project';

createApp(appConfig)
  //.use() //可以用vue.use
  .render()
  .then(() => {
    const initLoading = document.getElementById('root-loading');
    if (initLoading) {
      initLoading.parentNode!.removeChild(initLoading);
    }
  });
