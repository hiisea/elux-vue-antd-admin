import {AlignLeftOutlined, CheckOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined} from '@ant-design/icons-vue';
import {Alert, Button, Dropdown, Menu, Modal, Table, message} from 'ant-design-vue';
import {ColumnProps, TableProps} from 'ant-design-vue/lib/table';
import {VNode, computed, defineComponent, ref, shallowReactive, shallowRef, watch} from 'vue';
import {useRouter} from '@/Global';
import DateTime from '../../components/DateTime';
import {BaseListSearch, BaseListSummary, BaseLocationState} from '../../utils/base';
import styles from './index.module.less';

export type Key = string | number;
export interface BatchAction {
  key: string;
  label: string;
  icon?: VNode;
  confirm?: boolean | ((props: {selected: number}) => JSX.Element);
}

export type MBatchActions = {actions: BatchAction[]; handler: (target: BatchAction, ids: Key[]) => void};

export type MColumns<T> = ColumnProps<T> & {timestamp?: boolean; disable?: boolean};

export type MSelection<T> = {
  onChange?: (keys: Key[], rows: Partial<T>[], maps: {[key: Key]: Partial<T>}) => void;
  limit?: number | [number, number];
  autoSubmit?: boolean;
};

interface Props<T = Record<string, any>> extends TableProps<T> {
  class?: string;
  columns: MColumns<T>[];
  commonActions?: VNode;
  batchActions?: MBatchActions;
  listSummary?: BaseListSummary;
  listSearch?: BaseListSearch;
  selectedRowKeys?: Key[];
  selectedRows?: Partial<T>[];
  selection?: MSelection<T>;
}

const Component = defineComponent<Props>({
  name: styles.root,
  setup(props) {
    const router = useRouter();
    const limit = shallowReactive({limitMax: -1, limitMin: -1, selectedLimit: [-1, -1]});
    watch(
      () => {
        const {limit = 0} = props.selection || {};
        const selectLimit = typeof limit === 'number' ? [limit] : limit;
        const limitMax = selectLimit[1] !== undefined ? selectLimit[1] : selectLimit[0];
        const limitMin = selectLimit[1] !== undefined ? selectLimit[0] : 0;
        return {limitMax, limitMin, selectLimit};
      },
      (val) => {
        Object.assign(limit, val);
      },
      {immediate: true}
    );
    const reviewMode = ref(false);
    watch(
      () => {
        return (props.selectedRowKeys || props.selectedRows || []).length > 0;
      },
      (val) => {
        reviewMode.value = val;
      },
      {immediate: true}
    );
    watch(
      () => props.dataSource,
      () => {
        reviewMode.value = false;
      }
    );
    const selected = shallowRef<{
      keys: Key[];
      rows: Partial<Record<string, any>>[];
      maps: Partial<Record<string, any>>;
    }>({keys: [], rows: [], maps: {}});
    watch(
      () => {
        const {selectedRowKeys, selectedRows, rowKey} = props;
        const keys = selectedRowKeys || (selectedRows || []).map((item) => item[rowKey as string] as Key);
        const rows = selectedRows || (selectedRowKeys || []).map((key) => ({[rowKey as string]: key} as Partial<Record<string, any>>));
        const maps = rows.reduce((data, cur) => {
          data[cur[rowKey as string] as Key] = cur;
          return data;
        }, {} as {[key: Key]: Partial<Record<string, any>>});
        return {keys, rows, maps};
      },
      (val) => {
        selected.value = val;
      },
      {immediate: true}
    );
    const updateSelected = (val: {keys: Key[]; rows: Partial<Record<string, any>>[]; maps: Partial<Record<string, any>>}) => {
      selected.value = val;
    };
    const clearSelected = () => updateSelected({keys: [], rows: [], maps: {}});
    const onSelectedSubmit = () => {
      router.back(1, 'window');
      const {onSelectedSubmit} = (router.location.state || {}) as BaseLocationState;
      onSelectedSubmit && onSelectedSubmit(selected.value.rows);
    };

    const rowSelection = computed(() => {
      const {limitMax} = limit;
      const {autoSubmit} = props.selection || {};
      if (limitMax > -1) {
        return {
          preserveSelectedRowKeys: true,
          columnWidth: 60,
          type: limitMax === 1 ? 'radio' : 'checkbox',
          selectedRowKeys: selected.value.keys,
          onChange: (selectedRowKeys: Key[], selectedRows: Partial<Record<string, any>>[]) => {
            const rows: Partial<Record<string, any>>[] = [];
            const maps: {[key: string]: Record<string, any>; [key: number]: Record<string, any>} = {};
            if (limitMax > 0) {
              if (selectedRowKeys.length > limitMax) {
                message.error('剩余可选 0 项！');
                return;
              }
            }
            const keys = selectedRowKeys.map((key, index) => {
              const item = selectedRows[index] || selected.value.maps[key];
              rows.push(item);
              maps[key] = item;
              return key;
            });
            updateSelected({keys, rows, maps});
            if (limitMax > 0 && selectedRowKeys.length === limitMax && autoSubmit) {
              setTimeout(onSelectedSubmit, 0);
              return;
            }
          },
        } as TableProps['rowSelection'];
      } else {
        return undefined;
      }
    });

    const batchMenuClickHandler = ({key}: {key: string | number}) => {
      const {keys} = selected.value;
      const {actions, handler} = props.batchActions!;
      const target = actions.find((item) => item.key === key);
      if (target && target.confirm) {
        Modal.confirm({
          icon: <InfoCircleOutlined />,
          content:
            target.confirm === true ? (
              <div class={styles.batchConfirm}>
                您确认要【<span class="em">{target.label}</span>】所选择的 <a>{keys.length}</a> 项吗？
                {typeof target.confirm === 'string' ? <div>{target.confirm}</div> : null}
              </div>
            ) : (
              <target.confirm selected={keys.length} />
            ),
          onOk: () => {
            reviewMode.value = false;
            handler(target, keys);
          },
        });
      } else {
        handler(target!, keys);
      }
    };

    const batchMenu = computed(() => {
      const {batchActions} = props;
      if (batchActions) {
        if (batchActions.actions.length === 1) {
          const item = batchActions.actions[0];
          return (
            <Button icon={<AlignLeftOutlined />} onClick={() => batchMenuClickHandler({key: item.key})}>
              {item.label}
            </Button>
          );
        }
        return (
          <Dropdown
            overlay={
              <Menu onClick={batchMenuClickHandler}>
                {batchActions.actions.map(({key, label, icon}) => (
                  <Menu.Item key={key}>
                    {icon}
                    {label}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              批量操作 <DownOutlined />
            </Button>
          </Dropdown>
        );
      }
      return null;
    });

    const pagination = computed(() => {
      const {pageCurrent, pageSize, totalItems} = props.listSummary || {pageCurrent: 1, pageSize: 10, totalItems: 0, totalPages: 0};
      return {
        showTotal: (total: number) => `共${total}条`,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        current: pageCurrent,
        pageSize,
        total: totalItems,
      };
    });

    const columnList = computed(() => {
      const {sorterField, sorterOrder} = props.listSearch || {};
      return props.columns
        .filter((col) => !col.disable)
        .map((col) => {
          col = {...col};
          if (col.sorter && typeof col.sorter === 'boolean' && !col.sortOrder) {
            col.sortOrder = (sorterField === col.dataIndex && sorterOrder) || null;
          }
          if (col.timestamp && !col.customRender) {
            col.customRender = (opts: {text: string}) => <DateTime date={opts.text} />;
          }
          return col as ColumnProps;
        });
    });

    const setReviewMode = () => (reviewMode.value = true);
    const closeReviewMode = () => (reviewMode.value = false);
    const toggleReviewMode = () => (reviewMode.value = !reviewMode.value);

    const headArea = computed(() => {
      const {commonActions} = props;
      const {limitMax, limitMin, selectedLimit} = limit;
      if (!commonActions && !batchMenu.value && limit.limitMax < 0) {
        return;
      }
      return (
        <div class="hd">
          {limitMax > -1 && !batchMenu.value && (
            <Button onClick={onSelectedSubmit} disabled={!!limitMin && selected.value.keys.length < limitMin} type="primary" icon={<CheckOutlined />}>
              提交<span class="tip">{`(可选${selectedLimit.map((n) => (n === 0 ? '多' : n)).join('-')}项)`}</span>
            </Button>
          )}
          {selected.value.keys.length === 0 ? commonActions : batchMenu}
          {reviewMode.value && (
            <Button onClick={closeReviewMode} type="dashed" icon={<LeftOutlined />}>
              返回列表
            </Button>
          )}
          {selected.value.keys.length > 0 && (
            <Alert
              message={
                <div>
                  <span>已选 </span>
                  <a onClick={setReviewMode} class="em">
                    {selected.value.keys.length}
                  </a>
                  <span> 项，</span>
                  {limitMax > 0 && (
                    <>
                      <span>剩余可选 </span>
                      <span class="em">{limitMax - selected.value.keys.length}</span> 项，
                    </>
                  )}
                  <a onClick={toggleReviewMode}>{reviewMode.value ? '返回' : '查看'}</a>
                  <span> 或 </span>
                  <a onClick={clearSelected}>清空选择</a>
                </div>
              }
              type="info"
              showIcon
            />
          )}
        </div>
      );
    });

    return () => {
      const {class: className = '', dataSource, rowKey, loading, size, bordered, locale, scroll} = props;
      return (
        <div class={styles.root + ' ' + className}>
          {headArea}
          <Table
            columns={columnList.value}
            pagination={reviewMode.value ? false : pagination.value}
            rowSelection={rowSelection.value}
            dataSource={reviewMode.value ? selected.value.rows : dataSource}
            rowKey={rowKey}
            loading={loading}
            size={size}
            bordered={bordered}
            locale={locale}
            scroll={scroll}
          />
        </div>
      );
    };
  },
}) as any;

export default Component as <T>(props: Props<T>) => JSX.Element;
