import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserTable1594010714464
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						generationStrategy: 'uuid',
						isPrimary: true,
						default: `uuid_generate_v4()`,
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
