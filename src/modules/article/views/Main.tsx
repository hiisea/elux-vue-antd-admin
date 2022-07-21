import ErrorPage from '@elux-admin-antd/stage/components/ErrorPage';
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import {CurRender, CurView, ItemDetail} from '../entity';
import Detail from './Detail';
import Edit from './Edit';
import Index from './Index';
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
      return (
        <Switch elseView={<ErrorPage />}>
          {curView === 'list' && curRender === 'maintain' && <Maintain />}
          {curView === 'list' && curRender === 'index' && <Index />}
          {curView === 'item' && curRender === 'detail' && <Detail itemDetail={itemDetail} />}
          {curView === 'item' && curRender === 'edit' && <Edit itemDetail={itemDetail} dispatch={dispatch} />}
        </Switch>
      );
    };
  },
});

export default exportView(Component);
