import DateTime from '@elux-admin-antd/stage/components/DateTime';
import DialogPage from '@elux-admin-antd/stage/components/DialogPage';
import {splitIdName} from '@elux-admin-antd/stage/utils/tools';
import {Link} from '@elux/vue-web';
import {Descriptions, Skeleton} from 'ant-design-vue';
import {DStatus, ItemDetail} from '../entity';

const DescriptionsItem = Descriptions.Item;

interface Props {
  itemDetail?: ItemDetail;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = ({itemDetail}: Props) => {
  let id = '',
    name = '';
  return (
    <DialogPage title="文章详情" subject="文章详情" mask minSize={[800]}>
      <div class="g-dialog-content">
        {itemDetail ? (
          <Descriptions bordered column={2}>
            <DescriptionsItem label="标题" span={2}>
              {itemDetail.title}
            </DescriptionsItem>
            <DescriptionsItem label="作者">
              {({id, name} = splitIdName(itemDetail.author)) && (
                <Link to={`/admin/member/item/detail/${id}`} action="push" target="page">
                  {name}
                </Link>
              )}
            </DescriptionsItem>
            <DescriptionsItem label="责任编辑">
              <div class="g-actions">
                {itemDetail.editors.map(
                  (editor) =>
                    ({id, name} = splitIdName(editor)) && (
                      <Link key={id} to={`/admin/member/item/detail/${id}`} action="push" target="page">
                        {name}
                      </Link>
                    )
                )}
              </div>
            </DescriptionsItem>
            <DescriptionsItem label="状态">{DStatus.valueToLabel[itemDetail.status]}</DescriptionsItem>
            <DescriptionsItem label="发布时间">
              <DateTime date={itemDetail.createdTime} />
            </DescriptionsItem>
            <DescriptionsItem label="摘要" span={2}>
              {itemDetail.summary}
            </DescriptionsItem>
            <DescriptionsItem label="内容" span={2}>
              {itemDetail.content}
            </DescriptionsItem>
          </Descriptions>
        ) : (
          <Skeleton active />
        )}
      </div>
    </DialogPage>
  );
};

export default Component;
