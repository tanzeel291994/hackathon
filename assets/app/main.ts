import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app.module";
import * as $ from 'jquery';
platformBrowserDynamic().bootstrapModule(AppModule);