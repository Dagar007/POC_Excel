import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import '@angular/compiler';
import {LicenseManager} from "@ag-grid-enterprise/core";

// if (environment.production) {
//   enableProdMode();
// }
LicenseManager.setLicenseKey("[TRIAL]_17_April_2020_[v2]_MTU4NzA4MTYwMDAwMA==0b3758ea7920a80d972f7bd1718e805f");
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
