import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.scss']
})
export class Level1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getClass():string{
    return "myClass";
  }
}
