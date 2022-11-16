export interface IMockDataUtil {
  insert: () => Promise<void>;
  clean: () => Promise<void>;
}
