import MTable, {MBatchActions, MColumns, MSelection} from '@elux-admin-antd/stage/components/MTable';
import {DialogPageClassname} from '@elux-admin-antd/stage/utils/const';
import {useSingleWindow, useTableChange, useTableSize} from '@elux-admin-antd/stage/utils/resource';
import {splitIdName} from '@elux-admin-antd/stage/utils/tools';
import {Link, LoadingState, connectStore} from '@elux/vue-web';
import {Tooltip} from 'ant-design-vue';
import {ColumnProps} from 'ant-design-vue/lib/table';
import {VNode, computed, defineComponent} from 'vue';
import {APPState} from '@/Global';
import {DStatus, ListItem, ListSearch, ListSummary, Status, defaultListSearch} from '../entity';

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
  const {listSearch, list, listSummary, listLoading} = state.article!;
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
          title: '标题',
          dataIndex: 'title',
          ellipsis: {showTitle: false},
          customRender: ({value, record}: {value: string; record: {id: string}}) => (
            <Tooltip placement="topLeft" title={value}>
              <Link to={`/admin/article/item/detail/${record.id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
                {value}
              </Link>
            </Tooltip>
          ),
        },
        {
          title: '作者',
          dataIndex: 'author',
          width: '10%',
          sorter: true,
          customRender: ({value}: {value: string}) => {
            const {id, name} = splitIdName(value);
            return (
              <Link to={`/admin/member/item/detail/${id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
                {name}
              </Link>
            );
          },
        },
        {
          title: '责任编辑',
          dataIndex: 'editors',
          width: '20%',
          className: 'g-actions',
          customRender: ({value}: {value: string[]}) =>
            value.map((editor) => {
              const {id, name} = splitIdName(editor);
              return (
                <Link key={id} to={`/admin/member/item/detail/${id}`} action="push" target={singleWindow} cname={DialogPageClassname}>
                  {name}
                </Link>
              );
            }),
        },
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          width: '200px',
          sorter: true,
          timestamp: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: '100px',
          customRender: ({value}: {value: string}) => (
            <span class={`g-${value === Status.审核拒绝 ? 'disable' : value === Status.审核通过 ? 'enable' : ''}`}>
              {DStatus.valueToLabel[value]}
            </span>
          ),
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
