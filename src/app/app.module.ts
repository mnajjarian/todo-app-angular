import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatToolbarModule, MatButtonToggleModule,
  MatCheckboxModule, MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS, MAT_CHECKBOX_CLICK_ACTION, MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR, MAT_CHECKBOX_REQUIRED_VALIDATOR
 } from '@angular/material';

import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatRadioModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule, // database features
  ],
  providers: [AuthService, {
    provide: MAT_CHECKBOX_REQUIRED_VALIDATOR,
    useValue: { color: 'primary' },
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
