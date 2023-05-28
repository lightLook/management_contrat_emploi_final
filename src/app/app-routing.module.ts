import { Directive, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './component/auth/login/login.component';

import { AuthguardGuard } from './shared/guard/authguard.guard';

import { PostPostComponent } from './component/directeur/post-post/post-post.component';
import { ContractContractComponent } from './component/directeur/contract-contract/contract-contract.component';

import { ViewContractComponent } from './component/directeur/contract-contract/view-contract/view-contract.component';
import { ViewPostComponent } from './component/directeur/post-post/view-post/view-post.component';

import { DashComponent } from './component/directeur/dash/dash.component';
import { ProfileComponent } from './component/directeur/profile/profile.component';


const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'directeur', children : 
  [
    {path: '' , redirectTo : 'contract', pathMatch : 'full'},

    {path : 'post', component: PostPostComponent},
    {path : 'contract', component: ContractContractComponent},
    {path : 'dash', component: DashComponent},
    {path : 'profile', component: ProfileComponent},


    {path: 'post/:id', component:ViewPostComponent},
    {path: 'contract/:id', component: ViewContractComponent}
    
  ] ,canActivate : [AuthguardGuard]
},
{path : 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
