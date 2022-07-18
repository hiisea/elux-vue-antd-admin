import {AliwangwangFilled, LockOutlined, UserOutlined} from '@ant-design/icons-vue';
import {Link, connectStore} from '@elux/vue-web';
import {Button, Checkbox, Form, FormInstance, Input} from 'ant-design-vue';
import {defineComponent, reactive, ref} from 'vue';
import {APPState, GetActions} from '@/Global';
import DialogPage from '../../components/DialogPage';
import {RegisterParams} from '../../entity';
import {LoginUrl} from '../../utils/const';
import {getFormDecorators} from '../../utils/tools';
import styles from './index.module.less';

interface HFormData extends Required<RegisterParams> {
  confirm: string;
  agreement: boolean;
}

const agreementChecked = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject('您必须同意注册协议!');
  }
  return Promise.resolve();
};

const {stage: stageActions} = GetActions('stage');

interface StoreProps {
  fromUrl?: string;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {fromUrl} = appState.stage!;
  return {
    fromUrl,
  };
}

const Component = defineComponent({
  name: styles.root,
  setup() {
    const storeProps = connectStore(mapStateToProps);
    const formRef = ref<FormInstance>();
    const formState = reactive<HFormData>({
      username: '',
      password: '',
      confirm: '',
      agreement: false,
    });
    const confirmValidator = (rules: any, value: string) => {
      if (!value || formState.password === value) {
        return Promise.resolve();
      }
      return Promise.reject('2次密码输入不一致!');
    };
    const fromDecorators = getFormDecorators<HFormData>({
      username: {rules: [{required: true, message: '请输入用户名!', whitespace: true}]},
      password: {rules: [{required: true, message: '请输入密码!', whitespace: true}]},
      agreement: {rules: [{validator: agreementChecked}]},
      confirm: {rules: [{required: true, message: '请再次输入密码!', whitespace: true}, {validator: confirmValidator}]},
    });
    const onSubmit = (values: HFormData) => {
      storeProps.dispatch(stageActions.registry(values));
    };

    return () => {
      const {fromUrl} = storeProps;
      return (
        <DialogPage title="用户注册" subject="用户注册" maskClosable={false} showBrand>
          <div class={`${styles.root} g-dialog-content`}>
            <Form ref={formRef} onFinish={onSubmit} model={formState}>
              <Form.Item {...fromDecorators.username}>
                <Input v-model:value={formState.username} size="large" allowClear prefix={<UserOutlined />} placeholder="用户名" />
              </Form.Item>
              <Form.Item {...fromDecorators.password}>
                <Input.Password
                  v-model:value={formState.password}
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="密码"
                  autocomplete="new-password"
                />
              </Form.Item>
              <Form.Item {...fromDecorators.confirm}>
                <Input.Password
                  v-model:value={formState.confirm}
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="确认密码"
                  autocomplete="new-password"
                />
              </Form.Item>
              <div class="agreement-form-item">
                <Form.Item {...fromDecorators.agreement}>
                  <Checkbox v-model:checked={formState.agreement}>我已阅读并同意</Checkbox>
                </Form.Item>
                <Link to="/stage/agreement" action="push" target="window">
                  注册协议
                </Link>
              </div>
              <Form.Item>
                <div class="g-control">
                  <Button size="large" type="primary" htmlType="submit">
                    注册
                  </Button>
                  <Link to={1} action="back" target="page">
                    <Button size="large">取消</Button>
                  </Link>
                </div>
              </Form.Item>
            </Form>
            <div class="footer">
              <AliwangwangFilled /> <span>已注册用户？</span>
              <Link to={LoginUrl(fromUrl)} action="relaunch" target="window">
                登录
              </Link>
            </div>
          </div>
        </DialogPage>
      );
    };
  },
});

export default Component;
