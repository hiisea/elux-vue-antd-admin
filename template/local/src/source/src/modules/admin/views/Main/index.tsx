//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import ErrorPage from '@elux-admin-antd/stage/components/ErrorPage';
import {CurUser} from '@elux-admin-antd/stage/entity';
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {Layout} from 'ant-design-vue';
import {computed, defineComponent} from 'vue';
import {APPState, LoadComponent} from '@/Global';
import {SubModule} from '../../entity';
import Flag from '../Flag';
import Header from '../Header';
import Menu from '../Menu';
import Tabs from '../Tabs';
import styles from './index.module.less';

//LoadComponent是懒执行的，不用担心
const SubModuleViews: {[moduleName: string]: () => JSX.Element} = Object.keys(SubModule).reduce((cache, moduleName) => {
  cache[moduleName] = LoadComponent(moduleName as any, 'main');
  return cache;
}, {});

export interface StoreProps {
  curUser: CurUser;
  dialogMode: boolean;
  subModule?: SubModule;
  siderCollapsed?: boolean;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curUser} = appState.stage!;
  const {subModule, dialogMode, siderCollapsed} = appState.admin!;
  return {curUser, subModule, dialogMode, siderCollapsed};
}

const Component = defineComponent({
  name: styles.root,
  setup() {
    const storeProps = connectStore(mapStateToProps);
    const content = computed(() => {
      const {subModule} = storeProps;
      return (
        <Switch elseView={<ErrorPage />}>
          {subModule &&
            Object.keys(SubModule).map((moduleName) => {
              if (subModule === moduleName) {
                const SubView = SubModuleViews[subModule];
                return <SubView key={moduleName} />;
              } else {
                return null;
              }
            })}
        </Switch>
      );
    });
    return () => {
      const {curUser, dialogMode, siderCollapsed} = storeProps;
      if (!curUser.hasLogin) {
        return null;
      }
      if (dialogMode) {
        return content.value;
      }
      return (
        <div class={styles.root}>
          <Layout>
            <Layout.Sider class="g-scrollBar" trigger={null} collapsible collapsed={siderCollapsed}>
              <Flag />
              <Menu />
            </Layout.Sider>
            <Layout>
              <Layout.Header>
                <Header />
                <Tabs />
              </Layout.Header>
              <Layout.Content>{content.value}</Layout.Content>
            </Layout>
          </Layout>
        </div>
      );
    };
  },
});

export default exportView(Component);
