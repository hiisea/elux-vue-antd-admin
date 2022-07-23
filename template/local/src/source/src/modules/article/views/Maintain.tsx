import {PlusOutlined} from '@ant-design/icons-vue';
import {MBatchActions} from '@elux-admin-antd/stage/components/MTable';
import {useAlter, useShowDetail} from '@elux-admin-antd/stage/utils/resource';
import {DocumentHead, connectStore} from '@elux/vue-web';
import {Button, Dropdown, Menu, Popconfirm} from 'ant-design-vue';
import {ColumnProps} from 'ant-design-vue/lib/table';
import {defineComponent} from 'vue';
import {APPState, GetActions} from '@/Global';
import {ListItem, ListSearch, Status} from '../entity';
import ListTable from './ListTable';
import SearchForm from './SearchForm';

interface StoreProps {
  prefixPathname: string;
  listSearch: ListSearch;
  curRender?: string;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {prefixPathname, curRender, listSearch} = state.article!;
  return {prefixPathname, curRender, listSearch};
};

const {article: articleActions} = GetActions('article');

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);
    const {selectedRows, deleteItems, alterItems, updateItem} = useAlter<ListItem>(storeProps, articleActions);
    const {onShowDetail, onShowEditor} = useShowDetail(storeProps);
    const commActions = (
      <Button type="primary" icon={<PlusOutlined />} onClick={() => onShowEditor('', updateItem)}>
        新建
      </Button>
    );
    const batchActions: MBatchActions = {
      actions: [
        {key: 'delete', label: '批量删除', confirm: true},
        {key: 'resolved', label: '批量通过', confirm: true},
        {key: 'rejected', label: '批量拒绝', confirm: true},
      ],
      handler: (item: {key: string}, ids: (string | number)[]) => {
        if (item.key === 'delete') {
          deleteItems(ids as string[]);
        } else if (item.key === 'resolved') {
          alterItems(ids as string[], {status: Status.审核通过});
        } else if (item.key === 'rejected') {
          alterItems(ids as string[], {status: Status.审核拒绝});
        }
      },
    };
    const actionColumns: ColumnProps<ListItem> = {
      title: '操作',
      dataIndex: 'id',
      width: '200px',
      align: 'center',
      customRender: ({value, record}) => {
        return (
          <div class="g-table-actions">
            <a onClick={() => onShowDetail(value)}>详细</a>
            <Dropdown
              overlay={
                <Menu
                  onClick={({key}: any) => {
                    alterItems([value], {status: key});
                  }}
                >
                  <Menu.Item key={Status.审核通过}>审核通过</Menu.Item>
                  <Menu.Item key={Status.审核拒绝}>审核拒绝</Menu.Item>
                </Menu>
              }
            >
              <a>审核</a>
            </Dropdown>
            <a onClick={() => onShowEditor(value, updateItem)}>修改</a>
            <Popconfirm placement="topRight" title="您确定要删除该条数据吗？" onConfirm={() => deleteItems(value)}>
              <a>删除</a>
            </Popconfirm>
          </div>
        );
      },
    };

    return () => {
      const {prefixPathname, curRender, listSearch} = storeProps;
      return (
        <div class="g-page-content">
          <DocumentHead title="文章管理" />
          <div>
            <SearchForm listSearch={listSearch} listPathname={`${prefixPathname}/list/${curRender}`} />
            <ListTable
              commonActions={commActions}
              batchActions={batchActions}
              actionColumns={actionColumns}
              selectedRows={selectedRows.value}
              listPathname={`${prefixPathname}/list/${curRender}`}
            />
          </div>
        </div>
      );
    };
  },
});

export default Component;
