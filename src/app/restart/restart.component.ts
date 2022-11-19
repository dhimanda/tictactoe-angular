import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.scss']
})
export class RestartComponent implements OnInit {


  @Input() boardContent?: number[][];
  @Output() resetValue = new EventEmitter<number[][]>();

  constructor() { }
  newBoard?:number[][];

  ngOnInit(): void {
    this.newBoard = this.boardContent;
  }

  reset(): void {
    console.log('Restart Click');

    this.boardContent = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.resetValue.emit(this.boardContent) ;
    // console.log(this.newBoard)
  }

}
