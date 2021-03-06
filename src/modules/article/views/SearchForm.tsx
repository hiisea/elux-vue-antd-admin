import {ListSearch as MemberListSearch, Role, Status} from '@elux-admin-antd/member/entity';
import MSearch from '@elux-admin-antd/stage/components/MSearch';
import MSelect from '@elux-admin-antd/stage/components/MSelect';
import {useSearch} from '@elux-admin-antd/stage/utils/resource';
import {SearchFromItems} from '@elux-admin-antd/stage/utils/tools';
import {Input, Select} from 'ant-design-vue';
import {defineComponent} from 'vue';
import {DStatus, ListSearch, ListSearchFormData, defaultListSearch} from '../entity';

interface Props {
  listPathname: string;
  listSearch: ListSearch;
}

const formItems: SearchFromItems<ListSearchFormData> = [
  {name: 'title', label: '标题', formItem: <Input allowClear placeholder="请输入关键字" />},
  {
    name: 'author',
    label: '作者',
    formItem: <MSelect<MemberListSearch> placeholder="请选择作者" selectorPathname="/admin/member/list/selector" limit={1} showSearch></MSelect>,
  },
  {
    name: 'editor',
    label: '责任编辑',
    formItem: (
      <MSelect<MemberListSearch>
        placeholder="请选择责任编辑"
        selectorPathname="/admin/member/list/selector"
        fixedSearch={{role: Role.责任编辑, status: Status.启用}}
        limit={1}
        showSearch
      ></MSelect>
    ),
  },
  {
    name: 'status',
    label: '状态',
    formItem: <Select allowClear placeholder="请选择审核状态" options={DStatus.options} />,
  },
];

const Component = defineComponent<Props>({
  props: ['listPathname', 'listSearch'] as any,
  setup(props) {
    const {onSearch} = useSearch<ListSearchFormData>(props, defaultListSearch);

    return () => {
      const {listSearch} = props;
      return <MSearch<ListSearchFormData> values={listSearch} items={formItems} onSearch={onSearch} />;
    };
  },
});

export default Component;
