import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  installCommand = `npm i --save lodash @types/lodash @johnson-lee/angular-ui
  npm i --save @ngx-translate/core@14 @ngx-translate/http-loader@7`;

  importModuleCommand = `export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/');
  }

  @NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'zh-tw',
      }),
      AngularUIModule,
    ],
    providers: [],
  })
  export class AppModule {}`;
}
