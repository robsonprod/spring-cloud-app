import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';
import { Paginate } from "../../models/paginate.model";
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users$: Observable<Paginate<any>>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.paginate();
  }



}
