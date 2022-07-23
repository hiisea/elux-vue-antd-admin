import {AlipayCircleOutlined, AliwangwangFilled, DingtalkCircleFilled, LockOutlined, MobileFilled, UserOutlined} from '@ant-design/icons-vue';
import {Link, connectStore} from '@elux/vue-web';
import {Button, Checkbox, Form, FormInstance, Input} from 'ant-design-vue';
import {defineComponent, reactive, ref} from 'vue';
import {APPState, GetActions} from '@/Global';
import DialogPage from '../../components/DialogPage';
import {LoginParams} from '../../entity';
import {getFormDecorators} from '../../utils/tools';
import styles from './index.module.less';

type HFormData = Required<LoginParams>;

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
      username: 'admin',
      password: '123456',
      keep: false,
    });

    const fromDecorators = getFormDecorators<HFormData>({
      username: {rules: [{required: true, message: '请输入用户名!', whitespace: true}]},
      password: {
        rules: [{required: true, message: '请输入密码!', whitespace: true}],
      },
      keep: {valuePropName: 'checked'},
    });
    const onSubmit = (values: HFormData) => {
      const result = storeProps.dispatch(stageActions.login(values)) as Promise<void>;
      result.catch(({message}) => {
        //console.log(message);
      });
    };
    const onCancel = () => {
      storeProps.dispatch(stageActions.cancelLogin());
    };

    return () => {
      const {fromUrl} = storeProps;
      return (
        <DialogPage title="用户登录" subject="用户登录" maskClosable={false} showBrand>
          <div class={`${styles.root} g-dialog-content`}>
            <Form ref={formRef} onFinish={onSubmit} model={formState}>
              <Form.Item {...fromDecorators.username}>
                <Input v-model:value={formState.username} size="large" allowClear prefix={<UserOutlined />} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item {...fromDecorators.password}>
                <Input.Password v-model:value={formState.password} size="large" prefix={<LockOutlined />} placeholder="请输入密码" />
              </Form.Item>
              <Form.Item style={{marginBottom: 10}}>
                <Form.Item {...fromDecorators.keep} noStyle>
                  <Checkbox v-model:checked={formState.keep}>记住登录</Checkbox>
                </Form.Item>
                <Link class="btn-forgot" to={`/stage/forgetPassword?from=${fromUrl}`} action="push" target="page">
                  忘记密码？
                </Link>
              </Form.Item>
              <Form.Item>
                <div class="g-control">
                  <Button size="large" type="primary" htmlType="submit">
                    登录
                  </Button>
                  <Button size="large" onClick={onCancel}>
                    取消
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div class="footer">
              <Link to={`/stage/registry?from=${fromUrl}`} action="push" target="page">
                <AliwangwangFilled /> <span>注册新用户</span>
              </Link>
              <div class="other-login">
                其它登录方式：
                <a title="手机登录">
                  <MobileFilled />
                </a>
                <a title="钉钉登录">
                  <DingtalkCircleFilled />
                </a>
                <a title="支付宝登录">
                  <AlipayCircleOutlined />
                </a>
              </div>
            </div>
          </div>
        </DialogPage>
      );
    };
  },
});

export default Component;
