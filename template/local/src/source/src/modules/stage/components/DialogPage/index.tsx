import {ArrowLeftOutlined, CaretLeftOutlined, CaretRightOutlined, CloseOutlined, ReloadOutlined} from '@ant-design/icons-vue';
import {DocumentHead, Link} from '@elux/vue-web';
import {Tooltip} from 'ant-design-vue';
import {computed, defineComponent, ref} from 'vue';
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
  minSize?: (number | string)[];
  backOverflowRedirect?: string;
}

const Component = defineComponent<Props>({
  name: styles.root,
  // eslint-disable-next-line vue/require-prop-types
  props: ['class', 'title', 'subject', 'showBrand', 'showControls', 'maskClosable', 'mask', 'size', 'minSize', 'backOverflowRedirect'] as any,
  setup(props, context) {
    const size = ref(props.size || 'auto');

    const toggleSize = () => {
      size.value = size.value === 'auto' ? 'max' : 'auto';
    };

    const controls = computed(() => {
      const showControls = props.showControls !== undefined ? props.showControls : !props.showBrand;
      return showControls ? (
        <div class="control">
          <Tooltip title="后退">
            <Link to={1} action="back" target="page" overflowRedirect={props.backOverflowRedirect}>
              <ArrowLeftOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="刷新">
            <Link to={0} action="back" refresh>
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

    const resize = computed(() => {
      const minSize = props.minSize || [];
      const showResize = minSize[0];
      return showResize ? (
        <div class="resize">
          <div class="btn" onClick={toggleSize}>
            <CaretLeftOutlined />
            <CaretRightOutlined />
          </div>
        </div>
      ) : null;
    });

    const style = computed(() => {
      const minSize = props.minSize || [];
      const style = {};
      if (minSize[0] && size.value === 'auto') {
        style['width'] = typeof minSize[0] === 'number' ? minSize[0] + 'px' : minSize[0];
      }
      if (minSize[1] && size.value === 'auto') {
        style['height'] = typeof minSize[1] === 'number' ? minSize[1] + 'px' : minSize[1];
      }
      return style;
    });

    return () => {
      const {class: className = '', title, subject, showBrand, maskClosable = true, mask, backOverflowRedirect} = props;
      return (
        <>
          <div class={`${styles.root} ${showBrand ? 'show-brand' : ''} size-${size.value} ${className}`} style={style.value}>
            {title && <DocumentHead title={title} />}
            {resize.value}
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
