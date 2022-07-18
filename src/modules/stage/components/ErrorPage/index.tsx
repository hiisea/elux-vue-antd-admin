import {Link} from '@elux/vue-web';
import {Button, Result} from 'ant-design-vue';
import {FunctionalComponent} from 'vue';

export interface Props {
  message?: string;
}

const Component: FunctionalComponent<Props> = function (props) {
  const {message = '(404) 没有找到相关内容!'} = props;
  return (
    <Result
      status="404"
      title="出错啦！"
      subTitle={message}
      extra={
        <Link to={1} action="back" target="page">
          <Button type="primary">返回</Button>
        </Link>
      }
    />
  );
};

export default Component;
