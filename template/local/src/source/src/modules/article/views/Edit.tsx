import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {loadingPlaceholder} from '@elux-admin-antd/stage/utils/tools';
import {Dispatch} from '@elux/vue-web';
import {Skeleton} from 'ant-design-vue';
import {ItemDetail} from '../entity';
import EditorForm from './EditorForm';

interface Props {
  dispatch: Dispatch;
  itemDetail?: ItemDetail;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = ({itemDetail, dispatch}: Props) => {
  const title = loadingPlaceholder(itemDetail && (itemDetail.id ? '修改文章' : '新增文章'));
  return (
    <DialogPage title={title} subject={title} size="max" mask>
      <div class="g-dialog-content">{itemDetail ? <EditorForm itemDetail={itemDetail} dispatch={dispatch} /> : <Skeleton active />}</div>
    </DialogPage>
  );
};

export default Component;
