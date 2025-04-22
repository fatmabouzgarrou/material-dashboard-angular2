import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AdminLayoutModule, // Import AdminLayoutModule
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}