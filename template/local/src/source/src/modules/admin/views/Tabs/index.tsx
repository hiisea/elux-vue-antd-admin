import {PlusOutlined, ReloadOutlined} from '@ant-design/icons-vue';
import {Link, connectStore} from '@elux/vue-web';
import {Tabs} from 'ant-design-vue';
import {defineComponent} from 'vue';
import {APPState, GetActions} from '@/Global';
import {TabData} from '../../entity';
import Editor from './Editor';
import styles from './index.module.less';

const {TabPane} = Tabs;

const {admin: adminActions} = GetActions('admin');

export interface StoreProps {
  tabData: TabData;
  tabSelected: string;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {tabData, curTab} = appState.admin!;
  return {
    tabData,
    tabSelected: curTab.id,
  };
}

const tabSlots = {
  addIcon: () => (
    <div class="btn-add">
      <PlusOutlined />
      <span>收藏</span>
    </div>
  ),
  rightExtra: () => (
    <Link to={0} action="back" target="page" refresh class="btn-refresh" title="刷新">
      <ReloadOutlined />
    </Link>
  ),
};

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);

    const onTabClick = (key: string | number) => {
      storeProps.dispatch(adminActions.clickTab(key as string));
    };

    const onTabEdit = (key: any, action: 'add' | 'remove') => {
      if (action === 'add') {
        storeProps.dispatch(adminActions.clickTab(''));
      } else {
        storeProps.dispatch(adminActions.deleteTab(key));
      }
    };

    return () => {
      const {tabData, tabSelected} = storeProps;
      return (
        <>
          <Tabs
            class={styles.root}
            activeKey={tabSelected}
            type="editable-card"
            size="small"
            onTabClick={onTabClick}
            onEdit={onTabEdit}
            v-slots={tabSlots}
          >
            {tabData.list.map((item) => (
              <TabPane tab={item.title} key={item.id}></TabPane>
            ))}
          </Tabs>
          <Editor />
        </>
      );
    };
  },
});

export default Component;
