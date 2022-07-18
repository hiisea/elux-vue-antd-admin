import 'ant-design-vue/dist/antd.less';
import '../assets/css/var.less';
import '../assets/css/global.module.less';
import {DocumentHead, LoadingState, Switch, connectStore, exportView} from '@elux/vue-web';
import {ConfigProvider} from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {defineComponent} from 'vue';
import {APPState, LoadComponent} from '@/Global';
import ErrorPage from '../components/ErrorPage';
import LoadingPanel from '../components/LoadingPanel';
import {CurView, SubModule} from '../entity';
import Agreement from './Agreement';
import ForgotPassword from './ForgotPassword';
import LoginForm from './LoginForm';
import RegistryForm from './RegistryForm';

const Admin = LoadComponent('admin', 'main');

export interface StoreProps {
  subModule?: SubModule;
  curView?: CurView;
  globalLoading?: LoadingState;
  error?: string;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {subModule, curView, globalLoading, error} = appState.stage!;
  return {
    subModule,
    curView,
    globalLoading,
    error,
  };
}

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {curView, globalLoading, error, subModule} = storeProps;
      return (
        <ConfigProvider locale={zhCN}>
          <DocumentHead title="EluxDemo" />
          <Switch elseView={<ErrorPage />}>
            {!!error && <ErrorPage message={error} />}
            {subModule === 'admin' && <Admin />}
            {curView === 'login' && <LoginForm />}
            {curView === 'registry' && <RegistryForm />}
            {curView === 'agreement' && <Agreement />}
            {curView === 'forgetPassword' && <ForgotPassword />}
          </Switch>
          <LoadingPanel loadingState={globalLoading} />
        </ConfigProvider>
      );
    };
  },
});

export default exportView(Component);
