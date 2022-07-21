import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {connectStore} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import ListTable from './ListTable';

interface StoreProps {
  prefixPathname: string;
  curRender?: string;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {prefixPathname, curRender} = state.article!;
  return {prefixPathname, curRender};
};

const selection = {limit: -1};

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {prefixPathname, curRender} = storeProps;
      return (
        <DialogPage subject="文章列表" mask>
          <div class="g-dialog-content" style={{width: '900px', height: '560px'}}>
            <ListTable listPathname={`${prefixPathname}/list/${curRender}`} selection={selection} />
          </div>
        </DialogPage>
      );
    };
  },
});

export default Component;
