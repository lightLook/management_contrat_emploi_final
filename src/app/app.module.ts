import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { MatButtonModule } from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

import { LoginComponent } from './component/auth/login/login.component';
import { PostPostComponent } from './component/directeur/post-post/post-post.component';
import { AddPostComponent } from './component/directeur/post-post/add-post/add-post.component';
import { DeletePostComponent } from './component/directeur/post-post/delete-post/delete-post.component';
 import { ContractContractComponent } from './component/directeur/contract-contract/contract-contract.component';
import { AddContractComponent } from './component/directeur/contract-contract/add-contract/add-contract.component';
import { UpdateContractComponent } from './component/directeur/contract-contract/update-contract/update-contract.component';
import { DeleteContractComponent } from './component/directeur/contract-contract/delete-contract/delete-contract.component';
import { SidebarComponent } from './component/directeur/sidebar/sidebar.component';
import { ViewContractComponent } from './component/directeur/contract-contract/view-contract/view-contract.component';
import { ViewPostComponent } from './component/directeur/post-post/view-post/view-post.component';
import { DashComponent } from './component/directeur/dash/dash.component';
import { ProfileComponent } from './component/directeur/profile/profile.component';
 

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    SidebarComponent,

    PostPostComponent,
    AddPostComponent,
    DeletePostComponent,
    ViewPostComponent,
     
    ContractContractComponent,
    AddContractComponent,
    UpdateContractComponent,
    DeleteContractComponent,
    ViewContractComponent,
    DashComponent,
    ProfileComponent,

   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,

    MatButtonModule,
    
    MaterialModule

    
    

    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddPostComponent]
})
export class AppModule { }
