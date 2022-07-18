import {ArrowLeftOutlined, CloseOutlined, ReloadOutlined} from '@ant-design/icons-vue';
import {DocumentHead, Link} from '@elux/vue-web';
import {Tooltip} from 'ant-design-vue';
import {computed, defineComponent} from 'vue';
import styles from './index.module.less';

export interface Props {
  class?: string;
  title?: string;
  subject?: string;
  showBrand?: boolean;
  showControls?: boolean;
  maskClosable?: boolean;
  mask?: boolean;
  size?: 'max' | 'auto';
  backOverflowRedirect?: string;
}

const Component = defineComponent<Props>({
  name: styles.root,
  // eslint-disable-next-line vue/require-prop-types
  props: ['class', 'title', 'subject', 'showBrand', 'showControls', 'maskClosable', 'mask', 'size', 'backOverflowRedirect'] as any,
  setup(props, context) {
    const controls = computed(() => {
      return props.showControls ? (
        <div class="control">
          <Tooltip title="后退">
            <Link to={1} action="back" target="page" overflowRedirect={props.backOverflowRedirect}>
              <ArrowLeftOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="刷新">
            <Link to={0} action="back" target="page" refresh>
              <ReloadOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="关闭">
            <Link to={1} action="back" target="window" overflowRedirect={props.backOverflowRedirect}>
              <CloseOutlined />
            </Link>
          </Tooltip>
        </div>
      ) : null;
    });

    return () => {
      const {class: className = '', title, subject, showBrand, maskClosable = true, mask, backOverflowRedirect, size = 'auto'} = props;
      return (
        <>
          <div class={`${styles.root} ${showBrand ? 'show-brand' : ''} size-${size} ${className}`}>
            {title && <DocumentHead title={title} />}
            {controls.value}
            {showBrand && (
              <div class="brand">
                Elux-管理系统<span class="ver"> V1.0</span>
              </div>
            )}
            <div class="content">
              {subject && <h2 class="subject">{subject}</h2>}
              {context.slots.default!()}
            </div>
          </div>
          <Link
            disabled={!maskClosable}
            class={`${styles.mask} ${!mask ? 'no-mask' : ''}`}
            to={1}
            action="back"
            target="window"
            overflowRedirect={backOverflowRedirect}
          ></Link>
        </>
      );
    };
  },
});

export default Component;
