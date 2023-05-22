import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/auth/login/login.component';
import { PostComponent } from './component/directeur/post/post.component';
import { PostPostComponent } from './component/directeur/post-post/post-post.component';
import { AddPostComponent } from './component/directeur/post-post/add-post/add-post.component';
import { DeletePostComponent } from './component/directeur/post-post/delete-post/delete-post.component';
import { UpdatePostComponent } from './component/directeur/post-post/update-post/update-post.component';
import { ContractComponent } from './component/directeur/contract/contract.component';
import { ContractContractComponent } from './component/directeur/contract-contract/contract-contract.component';
import { AddContractComponent } from './component/directeur/contract-contract/add-contract/add-contract.component';
import { UpdateContractComponent } from './component/directeur/contract-contract/update-contract/update-contract.component';
import { DeleteContractComponent } from './component/directeur/contract-contract/delete-contract/delete-contract.component';
import { SidebarComponent } from './component/directeur/sidebar/sidebar.component';
import { MaterialComponent } from './material/material.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostComponent,
    PostPostComponent,
    AddPostComponent,
    DeletePostComponent,
    UpdatePostComponent,
    ContractComponent,
    ContractContractComponent,
    AddContractComponent,
    UpdateContractComponent,
    DeleteContractComponent,
    SidebarComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
