interface IProps {
  value: string;
}

export default function Button1(props: IProps) {
  return <button>{props.value}</button>;
}
