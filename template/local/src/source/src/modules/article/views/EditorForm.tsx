// import {useUpdateItem} from '@elux-admin-antd/stage/utils/resource';
import {ListSearch as MemberListSearch, Role, Status} from '@elux-admin-antd/member/entity';
import MSelect from '@elux-admin-antd/stage/components/MSelect';
import {getFormDecorators} from '@elux-admin-antd/stage/utils/tools';
import {Dispatch} from '@elux/vue-web';
import {Button, Form, FormInstance, Input} from 'ant-design-vue';
import {defineComponent, ref, shallowReactive} from 'vue';
import {GetActions, useRouter} from '@/Global';
import {ItemDetail, UpdateItem} from '../entity';

const FormItem = Form.Item;

export const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

const fromDecorators = getFormDecorators<UpdateItem>({
  title: {label: '标题', rules: [{required: true, message: '请输入标题'}]},
  summary: {label: '摘要', rules: [{required: true, message: '请输入摘要'}]},
  content: {label: '内容', rules: [{required: true, message: '请输入内容'}]},
  editors: {label: '责任编辑', rules: [{required: true, message: '请选择责任编辑'}]},
});

interface Props {
  dispatch: Dispatch;
  itemDetail: ItemDetail;
}

const {article: articleActions} = GetActions('article');

const Component = defineComponent<Props>({
  props: ['dispatch', 'itemDetail'] as any,
  setup(props) {
    const router = useRouter();
    const formRef = ref<FormInstance>();
    const formState = shallowReactive<UpdateItem>({
      ...props.itemDetail,
    });

    const onFinish = (values: UpdateItem) => {
      const id = props.itemDetail.id;
      if (id) {
        props.dispatch(articleActions.updateItem(id, values));
      } else {
        props.dispatch(articleActions.createItem(values));
      }
    };

    const onReset = () => {
      formRef.value?.resetFields();
    };

    const goBack = () => router.back(1, 'window');

    // const {loading, onFinish} = useUpdateItem(itemDetail.id, dispatch, memberActions);

    return () => {
      return (
        <Form layout="horizontal" {...formItemLayout} ref={formRef} model={formState} onFinish={onFinish}>
          <FormItem {...fromDecorators.editors}>
            <MSelect<MemberListSearch>
              v-model:value={formState.editors}
              placeholder="请选择责任编辑"
              selectorPathname="/admin/member/list/selector"
              fixedSearch={{role: Role.责任编辑, status: Status.启用}}
              limit={[1, 2]}
              returnArray
              showSearch
            ></MSelect>
          </FormItem>
          <FormItem {...fromDecorators.title}>
            <Input v-model:value={formState.title} allowClear placeholder="请输入" />
          </FormItem>
          <FormItem {...fromDecorators.summary}>
            <Input.TextArea v-model:value={formState.summary} rows={4} allowClear placeholder="请输入" />
          </FormItem>
          <FormItem {...fromDecorators.content}>
            <Input.TextArea v-model:value={formState.content} rows={20} allowClear placeholder="请输入" />
          </FormItem>
          <div class="g-form-actions">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button type="dashed" onClick={onReset}>
              重置
            </Button>
            <Button onClick={goBack}>取消</Button>
          </div>
        </Form>
      );
    };
  },
});

export default Component;
