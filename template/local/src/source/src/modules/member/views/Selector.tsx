import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {MColumns} from '@elux-admin-antd/stage/components/MTable';
import {connectStore} from '@elux/vue-web';
import {defineComponent} from 'vue';
import {APPState, useRouter} from '@/Global';
import {ListItem, ListSearch, LocationState} from '../entity';
import ListTable from './ListTable';
import SearchForm from './SearchForm';

interface StoreProps {
  prefixPathname: string;
  listSearch: ListSearch;
  curRender?: string;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {prefixPathname, curRender, listSearch} = state.member!;
  return {prefixPathname, curRender, listSearch};
};

const mergeColumns: {[field: string]: MColumns<ListItem>} = {
  articles: {disable: true},
};

const Component = defineComponent({
  setup() {
    const router = useRouter();
    const {selectLimit, showSearch, fixedSearch, selectedRows} = (router.location.state || {}) as LocationState;
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {listSearch, prefixPathname, curRender} = storeProps;
      return (
        <DialogPage subject="用户列表" mask>
          <div class="g-dialog-content" style={{width: '1100px', height: '750px'}}>
            {showSearch && <SearchForm listSearch={listSearch} fixedFields={fixedSearch} listPathname={`${prefixPathname}/list/${curRender}`} />}
            <ListTable
              selectedRows={selectedRows}
              mergeColumns={mergeColumns}
              selection={{limit: selectLimit}}
              listPathname={`${prefixPathname}/list/${curRender}`}
            />
          </div>
        </DialogPage>
      );
    };
  },
});

export default Component;
