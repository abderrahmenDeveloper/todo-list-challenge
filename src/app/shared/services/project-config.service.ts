import { Injectable } from '@angular/core';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {
  private projectConfig!: Config;

  initConfig(config: Config): void {
    this.projectConfig = config;
  }

  getProjectConfig(): Config {
    return this.projectConfig;
  }
}
