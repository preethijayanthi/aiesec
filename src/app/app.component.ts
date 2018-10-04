import { Component, OnInit } from '@angular/core';
// import { MasterService } from './services/master.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  response ;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
