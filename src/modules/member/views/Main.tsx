import ErrorPage from '@elux-admin-antd/stage/components/ErrorPage';
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import {CurRender, CurView, ItemDetail} from '../entity';
import Detail from './Detail';
import Edit from './Edit';
import Maintain from './Maintain';
import Selector from './Selector';

export interface StoreProps {
  curView?: CurView;
  curRender?: CurRender;
  itemDetail?: ItemDetail;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curView, curRender, itemDetail} = appState.member!;
  return {curView, curRender, itemDetail};
}

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {curView, curRender, itemDetail, dispatch} = storeProps;
      return (
        <Switch elseView={<ErrorPage />}>
          {curView === 'list' && curRender === 'maintain' && <Maintain />}
          {curView === 'list' && curRender === 'selector' && <Selector />}
          {curView === 'item' && curRender === 'detail' && <Detail itemDetail={itemDetail} />}
          {curView === 'item' && curRender === 'edit' && <Edit itemDetail={itemDetail} dispatch={dispatch} />}
        </Switch>
      );
    };
  },
});

export default exportView(Component);
