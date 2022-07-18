import ErrorPage from '@elux-admin-antd/stage/components/ErrorPage';
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import {CurView} from '../entity';
import Workplace from './Workplace';

export interface StoreProps {
  curView?: CurView;
}

function mapStateToProps(appState: APPState): StoreProps {
  return {curView: appState.dashboard!.curView};
}

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);
    return () => {
      const {curView} = storeProps;
      return <Switch elseView={<ErrorPage />}>{curView === 'workplace' && <Workplace />}</Switch>;
    };
  },
});

export default exportView(Component);
