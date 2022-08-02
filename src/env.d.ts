declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.less';
declare module '*.scss';
declare module '*.vue' {
  const Component: (props: any) => JSX.Element;
  export default Component;
}
