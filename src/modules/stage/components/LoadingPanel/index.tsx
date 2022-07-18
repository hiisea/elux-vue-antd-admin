import {LoadingState} from '@elux/vue-web';
import {Spin} from 'ant-design-vue';
import styles from './index.module.less';

interface Props {
  class?: string;
  loadingState?: LoadingState;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = function (props: Props) {
  const {loadingState, class: className = ''} = props;
  return (
    <div class={`${styles.root} ${loadingState?.toLowerCase()} ${className}`}>
      <div class="loading-icon">
        <Spin size="large" />
      </div>
    </div>
  );
};

Component.displayName = styles.root;

export default Component;
