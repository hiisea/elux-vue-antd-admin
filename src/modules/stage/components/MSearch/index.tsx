import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import {Button, Form} from 'ant-design-vue';
import {cloneVNode, computed, defineComponent, ref, shallowReactive} from 'vue';
import {SearchFromItems} from '../../utils/tools';
import styles from './index.module.less';

interface Props<TFormData = Record<string, any>> {
  class?: string;
  items: SearchFromItems<TFormData>;
  values: TFormData;
  onSearch: (values: Partial<TFormData>) => void;
  fixedFields?: Partial<TFormData>; //固定搜索值
  senior?: number; //未展开时显示多少项
  cols?: number; //每行显示多少项
  expand?: boolean;
}

const Component = defineComponent<Props>({
  name: styles.root,
  props: ['class', 'items', 'values', 'onSearch', 'fixedFields', 'senior', 'cols', 'expand'] as any,
  emits: ['search'],
  setup(props, {emit}) {
    const cols = computed(() => {
      const {cols = 4, items} = props;
      const cArr: number[] = [];
      let cur = 0;
      items.forEach((item) => {
        // eslint-disable-next-line no-control-regex
        const label = Math.ceil(item.label!.replace(/[^\x00-\xff]/g, 'aa').length / 2);
        const col = item.col || 1;
        if (cur + col > cols) {
          cur = 0;
        }
        item.cite = cur;
        if (label > (cArr[cur] || 0)) {
          cArr[cur] = label;
        }
        cur += col;
      });
      return cArr;
    });
    const colWidth = computed(() => {
      const {cols = 4} = props;
      return parseFloat((100 / cols).toFixed(2));
    });
    const expand = ref(!!props.expand);

    const config = computed(() => {
      const {senior = 4} = props;
      const shrink = expand.value ? props.items.length : senior;
      return shallowReactive({senior, shrink});
    });
    const formStateRef = computed(() => {
      const data = props.items.reduce((obj, item) => {
        obj[item.name] = props.values[item.name];
        return obj;
      }, {});
      return shallowReactive(data);
    });
    const onClear = () => {
      emit('search', props.fixedFields || {});
    };
    const onFinish = (vals: Record<string, any>) => {
      Object.assign(vals, props.fixedFields);
      emit('search', vals);
    };
    const toggle = () => {
      expand.value = !expand.value;
    };

    return () => {
      const {class: className = '', items, fixedFields} = props;
      const {shrink, senior} = config.value;
      const formState = formStateRef.value;
      return (
        <div class={styles.root + ' ' + className}>
          <Form layout="inline" onFinish={onFinish} model={formState}>
            {items.map((item, index) => {
              return (
                <Form.Item
                  name={item.name}
                  rules={item.rules}
                  style={{display: index >= shrink ? 'none' : 'flex', width: `${colWidth.value * (item.col || 1)}%`}}
                  key={item.name}
                  label={
                    <span class="label" style={{width: `${cols.value[item.cite!]}em`}}>
                      {item.label}
                    </span>
                  }
                >
                  {cloneVNode(item.formItem, {
                    disabled: !!(fixedFields && fixedFields[item.name]),
                    value: formState[item.name],
                    'onUpdate:value': ($event: any) => (formState[item.name] = $event),
                  })}
                </Form.Item>
              );
            })}
            <div class="form-btns">
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button onClick={onClear}>重置</Button>
              {items.length > senior && (
                <a class="expand" onClick={toggle}>
                  {expand.value ? '收起' : '展开'} {expand.value ? <UpOutlined /> : <DownOutlined />}
                </a>
              )}
            </div>
          </Form>
        </div>
      );
    };
  },
}) as any;

export default Component as <T>(props: Props<T>) => JSX.Element;
