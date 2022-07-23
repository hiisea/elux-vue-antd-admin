import MTable, {MBatchActions, MColumns, MSelection} from '@elux-admin-antd/stage/components/MTable';
import {DialogPageClassname} from '@elux-admin-antd/stage/utils/const';
import {useSingleWindow, useTableChange, useTableSize} from '@elux-admin-antd/stage/utils/resource';
import {Link, LoadingState, connectStore} from '@elux/vue-web';
import {Tooltip} from 'ant-design-vue';
import {ColumnProps} from 'ant-design-vue/lib/table';
import {VNode, computed, defineComponent} from 'vue';
import {APPState} from '@/Global';
import {DGender, DRole, DStatus, ListItem, ListSearch, ListSummary, defaultListSearch} from '../entity';

interface StoreProps {
  listSearch: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
  listLoading?: LoadingState;
}

interface Props {
  listPathname: string;
  mergeColumns?: {[field: string]: MColumns<ListItem>};
  actionColumns?: ColumnProps<ListItem>;
  commonActions?: VNode;
  batchActions?: MBatchActions;
  selectedRows?: Partial<ListItem>[];
  selection?: MSelection<ListItem>;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {listSearch, list, listSummary, listLoading} = state.member!;
  return {listSearch, list, listSummary, listLoading};
};

const Component = defineComponent<Props>({
  props: ['listPathname', 'mergeColumns', 'actionColumns', 'commonActions', 'batchActions', 'selectedRows', 'selection'] as any,
  setup(props) {
    const storeProps = connectStore(mapStateToProps);
    const onTableChange = useTableChange(storeProps, props.listPathname, defaultListSearch);
    const singleWindow = useSingleWindow();
    const tableSize = useTableSize();
    const columns = computed<MColumns<ListItem>[]>(() => {
      const {actionColumns, mergeColumns} = props;
      const cols: MColumns<ListItem>[] = [
        {
          title: '用户名',
          dataIndex: 'name',
          width: '10%',
          sorter: true,
          customRender: ({value, record}: {value: string; record: {id: string}}) => (
            <Link to={`/admin/member/item/detail/${record.id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
              {value}
            </Link>
          ),
        },
        {
          title: '呢称',
          dataIndex: 'nickname',
          width: '10%',
        },
        {
          title: '角色',
          dataIndex: 'role',
          width: '10%',
          customRender: ({value}: {value: string}) => DRole.valueToLabel[value],
        },
        {
          title: '性别',
          dataIndex: 'gender',
          align: 'center',
          width: '100px',
          customRender: ({value}: {value: string}) => DGender.valueToLabel[value],
        },
        {
          title: '文章数',
          dataIndex: 'articles',
          align: 'center',
          sorter: true,
          width: '120px',
          customRender: ({value, record}: {value: string; record: {id: string}}) => (
            <Link to={`/admin/article/list/index?author=${record.id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
              {value}
            </Link>
          ),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          ellipsis: {showTitle: false},
          customRender: ({value}: {value: string}) => (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          ),
        },
        {
          title: '注册时间',
          dataIndex: 'createdTime',
          width: '200px',
          sorter: true,
          timestamp: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: '100px',
          customRender: ({value}: {value: string}) => <span class={`g-${value}`}>{DStatus.valueToLabel[value]}</span>,
        },
      ];
      if (actionColumns) {
        cols.push(actionColumns);
      }
      if (mergeColumns) {
        cols.forEach((col) => {
          const field = col.dataIndex as string;
          if (field && mergeColumns[field]) {
            Object.assign(col, mergeColumns[field]);
          }
        });
      }
      return cols;
    });

    return () => {
      const {commonActions, batchActions, selectedRows, selection} = props;
      const {listSearch, list, listSummary, listLoading} = storeProps;
      return (
        <MTable<ListItem>
          size={tableSize}
          commonActions={commonActions}
          batchActions={batchActions}
          onChange={onTableChange}
          selectedRows={selectedRows}
          columns={columns.value}
          listSearch={listSearch}
          dataSource={list}
          listSummary={listSummary}
          selection={selection}
          loading={listLoading === 'Start' || listLoading === 'Depth'}
        />
      );
    };
  },
});

export default Component;
