import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public board!:number[][];
  constructor() { }

  ngOnInit(): void {
    this.board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
    ]

    
  }

  setData(row:number,col:number):void{
    console.log(col,row);
    if(this.board[row][col]===1) this.board[row][col] = 2 ;
    else this.board[row][col] = 1 ;
  }

}
