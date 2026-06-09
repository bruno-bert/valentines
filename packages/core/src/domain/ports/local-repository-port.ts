export interface LocalRepositoryPort<TEntity extends { id: string }> {
  getById(id: string): Promise<TEntity | null>;
  save(entity: TEntity): Promise<void>;
  list(): Promise<TEntity[]>;
}
