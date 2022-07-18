import dayjs from 'dayjs';
import {FunctionalComponent} from 'vue';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

interface Props {
  date: string | number;
}
const Component: FunctionalComponent<Props> = ({date}) => {
  return <>{date ? dayjs(date).format(dateFormat) : ''}</>;
};

export default Component;
