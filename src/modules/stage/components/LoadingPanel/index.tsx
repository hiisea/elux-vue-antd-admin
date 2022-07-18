import {LoadingState} from '@elux/vue-web';
import {Spin} from 'ant-design-vue';
import {FunctionalComponent} from 'vue';
import styles from './index.module.less';

interface Props {
  class?: string;
  loadingState?: LoadingState;
}

const Component: FunctionalComponent<Props> = function (props) {
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
