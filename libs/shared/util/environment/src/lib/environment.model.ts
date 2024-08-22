export type Environment = {
  baseAPI: string;
  onBootstrapAppInit?: () => Promise<void>;
};
