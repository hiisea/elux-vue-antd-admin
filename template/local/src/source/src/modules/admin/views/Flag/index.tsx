import Logo from '@elux-admin-antd/stage/assets/imgs/logo-icon.svg';
import {AdminHomeUrl} from '@elux-admin-antd/stage/utils/const';
import {Link} from '@elux/vue-web';
import styles from './index.module.less';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = () => {
  return (
    <div class={styles.root}>
      <Link to={AdminHomeUrl} action="relaunch" target="window" class="wrap">
        <img class="logo" width="40" src={Logo} />
        <div class="title">Elux管理系统</div>
        <span class="ver">V2.0.0</span>
      </Link>
    </div>
  );
};

export default Component;
