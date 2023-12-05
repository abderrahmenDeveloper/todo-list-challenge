import { Component } from '@angular/core';
import { ProjectConfigService } from '@app/shared/services/project-config.service';
import { globalConfig } from '@config/config.global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private projectConfigService: ProjectConfigService) {
    this.projectConfigService.initConfig({ ...globalConfig });
  }
}
