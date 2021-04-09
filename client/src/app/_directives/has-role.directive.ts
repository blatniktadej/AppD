import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' 
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(private viewContRef: ViewContainerRef, private templateRef: TemplateRef<any>,private accountSrv: AccountService ) 
  {this.accountSrv.currentUser$.pipe(take(1)).subscribe(user =>{
    this.user=user;
  }) }
  ngOnInit(): void {
    if(!this.user?.roles || this.user == null){
      this.viewContRef.clear();
      return;
    }
    if(this.user?.roles.some(r => this.appHasRole.includes(r)))
    {
      this.viewContRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContRef.clear();
    }
  }

}
