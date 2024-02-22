import { Pool, PoolConfig, QueryResult } from 'pg';
import { dbConfig } from '../config/dbConfig';

export class ConnectionDB {
  public pool: Pool;

  constructor() {
    this.pool = new Pool(dbConfig);
    this.pool.on('error', (err) => {
      console.error('Error en el pool de PostgreSQL', err);
    });
  }

  async connect() {
    try {
      await this.pool.connect();
      console.log('Conexión establecida con éxito a PostgreSQL.');
    } catch (error) {
      console.error('Error al conectar a PostgreSQL:', error);
      throw error;
    }
  }

}
