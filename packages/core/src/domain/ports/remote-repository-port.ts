export interface RemoteRepositoryPort<TEntity extends { id: string }> {
  push(entity: TEntity): Promise<void>;
  pull(since?: string): Promise<TEntity[]>;
}
