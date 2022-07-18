import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

interface Props {
  date: string | number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Component = ({date}: Props) => {
  return <>{date ? dayjs(date).format(dateFormat) : ''}</>;
};

export default Component;
