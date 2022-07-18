import {DashboardOutlined, ProfileOutlined, TeamOutlined} from '@ant-design/icons-vue';
import {CurUser} from '@elux-admin-antd/stage/entity';
import {connectStore} from '@elux/vue-web';
import {Menu} from 'ant-design-vue';
import {computed, defineComponent, ref, watch} from 'vue';
import {APPState, GetActions} from '@/Global';
import {MenuItem} from '../../entity';
import styles from './index.module.less';

export type Key = string | number;

const ICONS: {[key: string]: any} = {
  dashboard: <DashboardOutlined />,
  user: <TeamOutlined />,
  post: <ProfileOutlined />,
};

function generateMenu(menuData: MenuItem[]) {
  return menuData.map(({label, key, icon, children}) => {
    const Icon = icon ? ICONS[icon] || ICONS['dashboard'] : null;
    if (children && children.length) {
      return (
        <Menu.SubMenu icon={Icon} key={key} title={label}>
          {generateMenu(children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item icon={Icon} key={key}>
        {label}
      </Menu.Item>
    );
  });
}

export interface StoreProps {
  curUser: CurUser;
  siderCollapsed?: boolean;
  menuData: MenuItem[];
  menuSelected: {selected: string[]; open: string[]};
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curUser} = appState.stage!;
  const {siderCollapsed, menuData, menuSelected} = appState.admin!;
  return {curUser, siderCollapsed, menuData: menuData.items, menuSelected};
}

const {admin: adminActions} = GetActions('admin');

const Component = defineComponent({
  name: styles.root,
  setup() {
    const storeProps = connectStore(mapStateToProps);
    const menuItems = computed(() => generateMenu(storeProps.menuData));
    const openKeys = ref<Key[]>([]);
    watch(
      () => storeProps.menuSelected.open,
      (val) => (openKeys.value = val),
      {immediate: true}
    );

    const onClick = ({key}: any) => storeProps.dispatch(adminActions.clickMenu(key));
    const onOpenChange = (keys: Key[]) => (openKeys.value = keys);

    return () => {
      const {menuSelected} = storeProps;
      return (
        <div class={styles.root}>
          <Menu
            onClick={onClick}
            onOpenChange={onOpenChange}
            selectedKeys={menuSelected.selected}
            openKeys={openKeys.value}
            mode="inline"
            theme="dark"
          >
            {menuItems.value}
          </Menu>
        </div>
      );
    };
  },
});

export default Component;
