import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { UserDetailsResolver } from './_resolvers/user-details.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserEditComponent } from './members/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsavedchanges.guard';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
    children:[
      {path:'members', component: MemberListComponent, resolve: {users: UserListResolver}},
      {path: 'member/edit', component: UserEditComponent, resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges]},
      {path:'members/:id', component: MemberDetailComponent, resolve: {user: UserDetailsResolver}},
      {path:'messages', component: MessagesComponent, canActivate:[AuthGuard]},
      {path:'lists', component: ListsComponent}
            ]},
  {path:'**', redirectTo:'', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    }
