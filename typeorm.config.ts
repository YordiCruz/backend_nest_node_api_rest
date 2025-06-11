import { DataSource} from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5436,
    username: "postgres",
    password: "admin123",
    database: "bd_backend_nest2",
    //capturar las entidades de forma automatica, de src que entre a cualquier carpeta y entre a cualquier archivo que termine con .entity.ts
    entities: ["src/**/*.entity.ts"],
    //migraciones
    migrations: ["src/database/migrations/*.ts"],
    //migrationsTableName: "migrations_tables",
});