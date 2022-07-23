import {LockOutlined, MobileOutlined, NumberOutlined} from '@ant-design/icons-vue';
import {Link, connectStore} from '@elux/vue-web';
import {Button, Form, FormInstance, Input} from 'ant-design-vue';
import {defineComponent, onBeforeUnmount, reactive, ref} from 'vue';
import {GetActions} from '@/Global';
import DialogPage from '../../components/DialogPage';
import {ResetPasswordParams} from '../../entity';
import {getFormDecorators} from '../../utils/tools';
import styles from './index.module.less';

interface HFormData extends Required<ResetPasswordParams> {
  confirm: string;
}

const {stage: stageActions} = GetActions('stage');

const Component = defineComponent({
  name: styles.root,
  setup() {
    const storeProps = connectStore();
    const formRef = ref<FormInstance>();
    const formState = reactive<HFormData>({
      phone: '',
      password: '',
      confirm: '',
      captcha: '',
    });
    const countDown = ref(0);
    onBeforeUnmount(() => (countDown.value = 0));
    const checkCountDown = () => {
      if (countDown.value > 0) {
        countDown.value--;
        setTimeout(checkCountDown, 1000);
      }
    };

    const sendCaptcha = async () => {
      const phone = formState.phone;
      if (!phone) {
        formRef.value?.validateFields('phone');
      } else {
        await storeProps.dispatch(stageActions.sendCaptcha({phone}));
        countDown.value = 60;
        setTimeout(checkCountDown, 1000);
      }
    };
    const onSubmit = (values: HFormData) => {
      storeProps.dispatch(stageActions.resetPassword(values));
    };
    const confirmValidator = (rules: any, value: string) => {
      if (!value || formState.password === value) {
        return Promise.resolve();
      }
      return Promise.reject('2次密码输入不一致!');
    };
    const fromDecorators = getFormDecorators<HFormData>({
      phone: {rules: [{required: true, message: '请输入注册手机号!', whitespace: true}]},
      password: {rules: [{required: true, message: '请输入新密码!', whitespace: true}]},
      captcha: {rules: [{required: true, message: '请输入短信验证码!', whitespace: true}]},
      confirm: {rules: [{required: true, message: '请再次输入密码!', whitespace: true}, {validator: confirmValidator}]},
    });
    return () => {
      return (
        <DialogPage title="忘记密码" subject="忘记密码" maskClosable={false} showBrand>
          <div class={`${styles.root} g-dialog-content`}>
            <Form ref={formRef} onFinish={onSubmit} model={formState}>
              <Form.Item {...fromDecorators.phone}>
                <Input v-model:value={formState.phone} size="large" allowClear prefix={<MobileOutlined />} placeholder="注册手机" />
              </Form.Item>
              <Form.Item {...fromDecorators.password}>
                <Input.Password
                  v-model:value={formState.password}
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="新密码"
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
              <Form.Item>
                <Form.Item {...fromDecorators.captcha} noStyle>
                  <Input v-model:value={formState.captcha} size="large" prefix={<NumberOutlined />} placeholder="短信验证码" style="width:250px" />
                </Form.Item>
                <Button size="large" class="btn-send-captcha" disabled={!!countDown.value} onClick={sendCaptcha}>
                  {countDown.value ? `${countDown.value}秒后重试` : '发送验证码'}
                </Button>
              </Form.Item>
              <Form.Item>
                <div class="g-control">
                  <Button size="large" type="primary" htmlType="submit">
                    修改
                  </Button>
                  <Link to={1} action="back" target="page">
                    <Button size="large">取消</Button>
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </DialogPage>
      );
    };
  },
});

export default Component;
