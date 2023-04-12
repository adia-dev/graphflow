export interface IGraphBuilder {
  index: number;
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
