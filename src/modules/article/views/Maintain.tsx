import {PlusOutlined} from '@ant-design/icons-vue';
import {MBatchActions} from '@elux-admin-antd/stage/components/MTable';
import {useAlter, useShowDetail} from '@elux-admin-antd/stage/utils/resource';
import {DocumentHead, connectStore} from '@elux/vue-web';
import {Button, Popconfirm} from 'ant-design-vue';
import {ColumnProps} from 'ant-design-vue/lib/table';
import {defineComponent} from 'vue';
import {APPState, GetActions} from '@/Global';
import {ListItem, ListSearch, Status} from '../entity';
//import ListTable from './ListTable';
import SearchForm from './SearchForm';

interface StoreProps {
  prefixPathname: string;
  listSearch: ListSearch;
  curRender?: string;
}

const mapStateToProps: (state: APPState) => StoreProps = (state) => {
  const {prefixPathname, curRender, listSearch} = state.article!;
  return {prefixPathname, curRender, listSearch};
};

const {article: articleActions} = GetActions('article');

const Component = defineComponent({
  setup() {
    const storeProps = connectStore(mapStateToProps);
    const {selectedRows, deleteItems, alterItems, updateItem} = useAlter<ListItem>(storeProps, articleActions);
    const {onShowDetail, onShowEditor} = useShowDetail(storeProps);
    const commActions = (
      <Button type="primary" icon={<PlusOutlined />} onClick={() => onShowEditor('', updateItem)}>
        新建
      </Button>
    );

    return () => {
      const {prefixPathname, curRender, listSearch} = storeProps;
      return (
        <div class="g-page-content">
          <DocumentHead title="文章列表" />
          <div>
            <SearchForm listSearch={listSearch} listPathname={`${prefixPathname}/list/${curRender}`} />
          </div>
        </div>
      );
    };
  },
});

export default Component;
