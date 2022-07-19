import ErrorPage from '@elux-admin-antd/stage/components/ErrorPage';
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import {CurRender, CurView, ItemDetail} from '../entity';
import Maintain from './Maintain';

export interface StoreProps {
  curView?: CurView;
  curRender?: CurRender;
  itemDetail?: ItemDetail;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curView, curRender, itemDetail} = appState.article!;
  return {curView, curRender, itemDetail};
}

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {curView, curRender, itemDetail, dispatch} = storeProps;
      return <Switch elseView={<ErrorPage />}>{curView === 'list' && curRender === 'maintain' && <Maintain />}</Switch>;
    };
  },
});

export default exportView(Component);
