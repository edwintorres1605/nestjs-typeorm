import { Injectable, Inject } from '@nestjs/common';
/* import { ConfigService } from '@nestjs/config'; */
import { ConfigType } from '@nestjs/config';
import { resolve } from 'path';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    /* @Inject('API_KEY') private apiKey: string, */
    /* private config: ConfigService, */
    @Inject('PG') private clientPg: Client,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    /* const apiKey = this.config.get('API_KEY');
    const name = this.config.get('DATABASE_NAME'); */
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    /* return `Hello World! 😎 ${this.apiKey}`; */
    return `Hello World! 😎 ${apiKey} ${name}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
