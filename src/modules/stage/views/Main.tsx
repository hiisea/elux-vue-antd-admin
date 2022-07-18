import 'ant-design-vue/dist/antd.less';
import '../assets/css/var.less';
import '../assets/css/global.module.less';
import {DocumentHead, LoadingState, Switch, exportView} from '@elux/vue-web';
import {ConfigProvider} from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {defineComponent} from 'vue';
import {useStore} from '@/Global';
import ErrorPage from '../components/ErrorPage';
import LoadingPanel from '../components/LoadingPanel';
import {CurView, SubModule} from '../entity';
import Agreement from './Agreement';
import ForgotPassword from './ForgotPassword';
import LoginForm from './LoginForm';
import RegistryForm from './RegistryForm';

//const Admin = LoadComponent('admin', 'main');

export interface StoreProps {
  subModule?: SubModule;
  curView?: CurView;
  globalLoading?: LoadingState;
  error?: string;
}

const Component = defineComponent({
  setup() {
    const store = useStore();

    return () => {
      const {curView, globalLoading, error} = store.state.stage!;
      return (
        <ConfigProvider locale={zhCN}>
          <DocumentHead title="EluxDemo" />
          <Switch elseView={<ErrorPage />}>
            {!!error && <ErrorPage message={error} />}
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
