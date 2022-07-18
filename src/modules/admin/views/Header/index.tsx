//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import {BellOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, UserOutlined} from '@ant-design/icons-vue';
import {CurUser} from '@elux-admin-antd/stage/entity';
import {AdminHomeUrl} from '@elux-admin-antd/stage/utils/const';
import {connectStore} from '@elux/vue-web';
import {Avatar, Badge, Dropdown, Menu} from 'ant-design-vue';
import {computed, defineComponent} from 'vue';
import {APPState, GetActions, StaticPrefix, useRouter} from '@/Global';
import {Notices} from '../../entity';
import styles from './index.module.less';

const {stage: stageActions, admin: adminActions} = GetActions('stage', 'admin');

export interface StoreProps {
  curUser: CurUser;
  siderCollapsed?: boolean;
  notices?: Notices;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curUser} = appState.stage!;
  const {notices, siderCollapsed} = appState.admin!;
  return {curUser, notices, siderCollapsed};
}

const Component = defineComponent({
  name: styles.root,
  setup() {
    const router = useRouter();
    const storeProps = connectStore(mapStateToProps);
    const toggleSider = () => {
      storeProps.dispatch(adminActions.putSiderCollapsed(!storeProps.siderCollapsed));
    };
    const onUserMenuClick = ({key}: {key: string | number}) => {
      if (key === 'logout') {
        storeProps.dispatch(stageActions.logout());
      } else if (key === 'home') {
        router.relaunch({url: AdminHomeUrl}, 'window');
      }
    };
    const userMenu = computed(() => {
      return (
        <Menu onClick={onUserMenuClick}>
          <Menu.Item key="home" icon={<UserOutlined />}>
            个人中心
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            退出登录
          </Menu.Item>
        </Menu>
      );
    });

    return () => {
      const {siderCollapsed, notices, curUser} = storeProps;
      return (
        <div class={styles.root}>
          <div class="side">
            {siderCollapsed ? (
              <MenuUnfoldOutlined class="toggle-sider" onClick={toggleSider} />
            ) : (
              <MenuFoldOutlined class="toggle-sider" onClick={toggleSider} />
            )}
            <a href="https://eluxjs.com" target="_blank" rel="noreferrer">
              <QuestionCircleOutlined /> 帮助指南
            </a>
          </div>
          <div class="main">
            <Badge count={notices?.num || 0} class="notice" offset={[-15, 13]}>
              <BellOutlined />
            </Badge>
            <Dropdown overlay={userMenu.value}>
              <span class="account">
                <Avatar size="small" src={StaticPrefix + curUser.avatar} />
                <span>{curUser.username}</span>
              </span>
            </Dropdown>
          </div>
        </div>
      );
    };
  },
});

export default Component;
