import {getFormDecorators} from '@elux-admin-antd/stage/utils/tools';
import {connectStore} from '@elux/vue-web';
import {Button, Form, FormInstance, Input, Modal} from 'ant-design-vue';
import {defineComponent, reactive, ref, watch} from 'vue';
import {APPState, GetActions} from '@/Global';
import {Tab} from '../../entity';

interface HFormData {
  title: string;
}

const formDecorators = getFormDecorators<HFormData>({
  title: {rules: [{required: true, message: '请输入书签名'}]},
});

const {admin: adminActions} = GetActions('admin');

export interface StoreProps {
  tabEdit?: Tab;
}
function mapStateToProps(appState: APPState): StoreProps {
  const {tabEdit} = appState.admin!;
  return {
    tabEdit,
  };
}

const Component = defineComponent({
  setup() {
    const formRef = ref<FormInstance>();
    const storeProps = connectStore(mapStateToProps);
    const formState = reactive<HFormData>({
      title: '',
    });
    watch(
      () => storeProps.tabEdit,
      (tabEdit) => {
        if (tabEdit) {
          formState.title = tabEdit.title;
          formRef.value && formRef.value.validate();
        }
      }
    );
    const onSubmit = (values: HFormData) => {
      const {title} = values;
      storeProps.dispatch(adminActions.updateTab({...storeProps.tabEdit!, title}));
    };

    const onCancel = () => {
      storeProps.dispatch(adminActions.closeTabEditor());
    };

    return () => {
      const {tabEdit} = storeProps;
      return (
        <Modal title="收藏书签" visible={!!tabEdit} onCancel={onCancel} width={300} footer={null}>
          <Form ref={formRef} onFinish={onSubmit} model={formState} layout="horizontal">
            <Form.Item {...formDecorators.title}>
              <Input v-model:value={formState.title} allowClear placeholder="请输入书签名" />
            </Form.Item>
            <Form.Item>
              <div class="g-control">
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
                <Button onClick={onCancel}>取消</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      );
    };
  },
});

export default Component;
