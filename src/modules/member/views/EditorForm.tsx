// import {useUpdateItem} from '@elux-admin-antd/stage/utils/resource';
import {getFormDecorators} from '@elux-admin-antd/stage/utils/tools';
import {Dispatch} from '@elux/vue-web';
import {Button, Form, FormInstance, Input, Select} from 'ant-design-vue';
import {defineComponent, ref, shallowReactive} from 'vue';
import {GetActions, useRouter} from '@/Global';
import {DGender, DRole, DStatus, ItemDetail, UpdateItem} from '../entity';

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
  name: {rules: [{required: true, message: '请输入用户名'}]},
  nickname: {rules: [{required: true, message: '请输入呢称'}]},
  role: {rules: [{required: true, message: '请选择角色'}]},
  gender: {rules: [{required: true, message: '请选择性别'}]},
  email: {rules: [{required: true, type: 'email', message: '请输入Email'}]},
  status: {rules: [{required: true, message: '请选择用户状态'}]},
});

interface Props {
  dispatch: Dispatch;
  itemDetail: ItemDetail;
}

const {member: memberActions} = GetActions('member');

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
        props.dispatch(memberActions.updateItem(id, values));
      } else {
        props.dispatch(memberActions.createItem(values));
      }
    };

    const onReset = () => {
      formRef.value?.resetFields();
    };

    const goBack = () => router.back(1, 'window');

    // const {loading, onFinish} = useUpdateItem(itemDetail.id, dispatch, memberActions);

    return () => {
      const {itemDetail} = props;
      return (
        <Form layout="horizontal" {...formItemLayout} ref={formRef} model={formState} onFinish={onFinish}>
          <FormItem label="用户名" {...fromDecorators.name}>
            <Input v-model:value={formState.name} disabled={!!itemDetail.id} allowClear placeholder="请输入" />
          </FormItem>
          <FormItem label="呢称" {...fromDecorators.nickname}>
            <Input v-model:value={formState.nickname} allowClear placeholder="请输入" />
          </FormItem>
          <FormItem label="角色" {...fromDecorators.role}>
            <Select v-model:value={formState.role} allowClear placeholder="请选择" options={DRole.options} />
          </FormItem>
          <FormItem label="性别" {...fromDecorators.gender}>
            <Select v-model:value={formState.gender} allowClear placeholder="请选择" options={DGender.options} />
          </FormItem>
          <FormItem label="Email" {...fromDecorators.email}>
            <Input v-model:value={formState.email} allowClear placeholder="请输入" />
          </FormItem>
          <FormItem label="状态" {...fromDecorators.status}>
            <Select v-model:value={formState.status} allowClear placeholder="请选择" options={DStatus.options} />
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
