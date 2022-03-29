import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameListComponent} from "./game-list/game-list.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule, GameListComponent],
  declarations: [
    GameListComponent
  ]
})

export class AppRoutingModule { }

