import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
export class LOEYBNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    let table: string =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    table = table.split('.').pop();
    const columnSnakeCase: string = columnNames.join('_');
    return `${table}_${columnSnakeCase}_pkey`;
  }
  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    let table: string =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    table = table.split('.').pop();
    const columnSnakeCase: string = columnNames.join('_');
    return `${table}_${columnSnakeCase}_key`;
  }
  indexName(
    tableOrName: Table | string,
    columns: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    where?: string,
  ): string {
    let table: string =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    table = table.split('.').pop();
    const columnSnakeCase: string = columns.join('_');
    return `${table}_${columnSnakeCase}_key`;
  }
  relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    where?: string,
  ): string {
    let table: string =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    table = table.split('.').pop();
    const columnSnakeCase: string = columnNames.join('_');
    return `${table}_${columnSnakeCase}_key`;
  }
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    referencedTablePath?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    referencedColumnNames?: string[],
  ): string {
    let table: string =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    table = table.split('.').pop();
    const columnSnakeCase: string = columnNames.join('_');
    return `${table}_${columnSnakeCase}_fkey`;
  }
}
