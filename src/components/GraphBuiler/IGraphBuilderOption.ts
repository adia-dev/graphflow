export interface IGraphBuilder {
  value: string;
  label: string;
  shortDescription: string;
  description: string;
  example: string;
  exampleValue: string;
  callback?: () => void | Promise<void>;
  tooltip?: string;
  icon?: JSX.Element;
  notimplemented?: boolean;
}
