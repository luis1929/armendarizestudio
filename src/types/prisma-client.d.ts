declare module '@prisma/client' {
  import type { Contract } from '@prisma/orm-postgres/contract';
  import type { SqlStorage } from '@prisma/orm-family-sql/contract/types';

  type ContractType = Contract<SqlStorage>;
  type StorageNamespaces = ContractType['storage']['namespaces'];
  type PublicTables = StorageNamespaces['public']['entries']['table'];

  type UserRow = PublicTables['User']['columns'];
  type SystemConfigRow = PublicTables['SystemConfig']['columns'];
  type MigrationTrackingRow = PublicTables['MigrationTracking']['columns'];
  type ProductoRow = PublicTables['Producto']['columns'];

  type UserCreateInput = PublicTables['User'];
  type SystemConfigCreateInput = PublicTables['SystemConfig'];
  type MigrationTrackingCreateInput = PublicTables['MigrationTracking'];
  type ProductoCreateInput = PublicTables['Producto'];

  interface FindFirstArgs<T> {
    where?: Record<string, unknown>;
  }

  interface UpsertArgs<T> {
    where: Record<string, unknown>;
    update: Partial<T>;
    create: T;
  }

  interface CreateArgs<T> {
    data: T;
  }

  interface ModelDelegate<T, C> {
    findFirst(args?: FindFirstArgs<T>): Promise<T | null>;
    findMany(args?: FindFirstArgs<T>): Promise<T[]>;
    upsert(args: UpsertArgs<C>): Promise<T>;
    create(args: CreateArgs<C>): Promise<T>;
  }

  class PrismaClient {
    constructor(args?: { contract?: unknown; connection?: string });
    user: ModelDelegate<UserRow, UserCreateInput>;
    systemConfig: ModelDelegate<SystemConfigRow, SystemConfigCreateInput>;
    migrationTracking: ModelDelegate<MigrationTrackingRow, MigrationTrackingCreateInput>;
    producto: ModelDelegate<ProductoRow, ProductoCreateInput>;
    $disconnect(): Promise<void>;
  }
}
