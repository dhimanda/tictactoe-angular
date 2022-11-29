import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomComponent } from './custom/custom.component';
import { Level1Component } from './level1/level1.component';
import { Level2Component } from './level2/level2.component';
import { Level3Component } from './level3/level3.component';
import { Level4Component } from './level4/level4.component';
import { Level5Component } from './level5/level5.component';


const routes: Routes = [
  {path: '' ,pathMatch:'full' , redirectTo:'custom' },
  {path: 'level1' , component: Level1Component}, 
  {path: 'level2' , component: Level2Component},
  {path: 'level3' , component: Level3Component}, 
  {component: Level4Component , path: 'level4'},
  {component: Level5Component , path: 'level5'}, 
  {component: CustomComponent , path: 'custom'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
