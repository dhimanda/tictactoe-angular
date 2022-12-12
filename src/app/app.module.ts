// Angular Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


// My import
import { Level1Component } from './level1/level1.component';
import { Level2Component } from './level2/level2.component';
import { Level3Component } from './level3/level3.component';
import { Level4Component } from './level4/level4.component';
import { Level5Component } from './level5/level5.component';
import { FormComponent } from './form/form.component';
import { RestartComponent } from './restart/restart.component';
import { AppRoutingModule } from './app-routing.module';
import { MAT_MODULES } from './mat-modules';
import { CustomComponent } from './custom/custom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
// import { MatIconModule } from '@angular/material';


@NgModule({
  declarations: [ // Ami Za Create korbo
    AppComponent,
    Level1Component,
    Level2Component,
    Level3Component,
    Level4Component,
    Level5Component,
    FormComponent,
    RestartComponent,
    CustomComponent
  ],
  imports: [ // external items :: Modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MAT_MODULES, // all mat module
    FlexLayoutModule,
    MatGridListModule
    // MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
