import {
  type Comparer,
  type EntityAdapter,
  type EntityId,
  type EntityState,
  type IdSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export type EntityAdapterOptions<MockType, Id extends EntityId> = {
  selectId?: IdSelector<MockType, Id>;
  sortComparer?: false | Comparer<MockType>;
};

export function SingletonEntityMock<T, MockType extends { id: EntityId }>({
  generator,
  adapterOptions,
}: {
  generator: () => MockType[];
  adapterOptions?: EntityAdapterOptions<MockType, MockType['id']>;
}) {
  return class SingletonMock {
    static instance: T & {
      adapter: EntityAdapter<MockType, MockType['id']>;
      state: EntityState<MockType, MockType['id']>;
    };
    adapter = createEntityAdapter(adapterOptions);
    state = this.adapter.getInitialState();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected constructor() {}
    static getInstance() {
      if (!this.instance) {
        this.instance = new this() as unknown as T & {
          adapter: EntityAdapter<MockType, MockType['id']>;
          state: EntityState<MockType, MockType['id']>;
        };

        const data = generator();
        this.instance.state = this.instance.adapter.setAll(
          this.instance.state,
          data
        );
      }

      return this.instance;
    }

    getAll = () => this.adapter.getSelectors().selectAll(this.state);
    getById = (id: MockType['id']) =>
      this.adapter.getSelectors().selectById(this.state, id);
    filter = (
      predicate: (value: MockType, index: number, array: MockType[]) => boolean
    ) => this.getAll().filter(predicate);

    setAll = (data: MockType[]) => {
      this.state = this.adapter.setAll(this.state, data);
    };
    upsetOne = (data: MockType) => {
      this.state = this.adapter.upsertOne(this.state, data);
    };
    upsertMany = (data: MockType[]) => {
      this.state = this.adapter.upsertMany(this.state, data);
    };
    removeOne = (id: MockType['id']) => {
      this.state = this.adapter.removeOne(this.state, id);
    };
    removeMany = (ids: MockType['id'][]) => {
      this.state = this.adapter.removeMany(this.state, ids);
    };
  };
}
