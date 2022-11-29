import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormComponent } from '../form/form.component';
import { BoardService } from './board.service';

@Component({
  selector: 'app-level4',
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.scss']
})
export class Level4Component implements OnInit{

  
  public playerNames !: string[];
  public countValue : number = 0 ; 
  

  constructor(public dialog: MatDialog , public board:BoardService) {
    this.playerNames = ['', 'x', 'o'];

    this.board.reset();

  }
  ngOnInit(): void {
    
  }


  addCount(val:number):void{
    this.countValue += val ; 
  }

  openDialog(){
    console.log('Laddu Baba');
    this.dialog.open(FormComponent);
  }

  onColor():string{
    return (this.countValue < 0) ? 'color:red' : 'color:blue'; 
  }

  laddu(){
    console.log('hi laddu') ; 
  }

  RunLoop(num: number) {
    return new Array(num);
  }
  public testField = 'x';

  public getTestField(): string {
    return this.testField;
  }

  public getTestClass(): string {
    this.getResult();
    return 'contains-x';

  }

  public getPlayerName(row: number, col: number): string {
    //console.log("Get Players: ", this.boardContent[row][col], this.playerNames[this.boardContent[row][col]]) ;
    //console.log("index", row, col, this.boardContent[row][col], "Player Name: ", this.playerNames[this.boardContent[row][col]]);
    return this.playerNames[this.board.boardContent[row][col]];
  }

  public getStyle(row: number, col: number): string {
    return 'contains-' + this.getPlayerName(row, col);
  }

  public getResult(): string {
    return this.playerNames[this.board.currentWinerIx];
  }

  // 00 01 02 03
  // 10 11 12 13
  // 20 21 22 23
  // 30 31 32 33
//--------- Result Logic Start ---------

  

 

  //--------- Result Logic Ends ---------

 

  // ---------- function for styling ------------
  public getPlayerColor():string{
    if(this.board.currentPlayerIx===1) return 'player-turn winner-x';
    if(this.board.currentPlayerIx===2) return 'player-turn winner-o';
    return "" ; 
  }


}
