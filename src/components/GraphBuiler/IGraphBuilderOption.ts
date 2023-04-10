export interface IGraphBuilder {
  value: string;
  label: string;
  shortDescription: string;
  callback?: () => void | Promise<void>;
  tooltip?: string;
  icon?: JSX.Element;
}
