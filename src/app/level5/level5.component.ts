import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { GridService } from '../grid.service';


@Component({
  selector: 'app-level5',
  templateUrl: './level5.component.html',
  styleUrls: ['./level5.component.scss']
})
export class Level5Component implements OnInit{

  
  public playerNames !: string[];
  public countValue : number = 0 ; 
  

  constructor(public dialog: MatDialog , public board:GridService) {
    this.playerNames = ['', 'x', 'o'];
    this.board.reset(5,5,4);
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
