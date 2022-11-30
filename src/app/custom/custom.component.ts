import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormComponent } from '../form/form.component';
import { GridService } from '../grid.service';
import { FormControl, FormGroup, NgModel } from '@angular/forms';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  public playerNames !: string[];
  public countValue : number = 0 ; 

  public gameDetails!:FormGroup; 
  public col!:number ; 
  public row!:number ; 
  

  constructor(public dialog: MatDialog , public board:GridService) {
    this.playerNames = ['', 'x', 'o'];
    this.board.reset(5,5,4);
    this.gameDetails = new FormGroup(
      {
        gameRow : new FormControl(5) ,
        gameCol : new FormControl(5) ,
        gameConnects : new FormControl(4) ,
  
      }
    )
  }
  ngOnInit(): void {
    console.log(this.gameDetails.value) ; 
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

  gameData : any = {gameConnects:4}; 

  public disp():void{

    console.log('From Disp=',this.gameDetails.value) ; 
    this.gameData = this.gameDetails.value ; 
    this.board.reset(this.gameDetails.value.gameRow , this.gameDetails.value.gameCol,this.gameDetails.value.gameConnects) ; 
  }

  public IsConfigure():boolean{
    console.log('Trig' , this.gameDetails.value.gameConnects) ;
    if(this.gameDetails.value.gameConnects < 2){
      return true;
    }
    let minData = this.gameDetails.value.gameRow ; 
    if(minData < this.gameDetails.value.gameCol) {
      minData = this.gameDetails.value.gameCol ; 
    }
    if(minData < this.gameDetails.value.gameConnects) return true; 
    else return false; 
  }

  // 00 01 02 03
  // 10 11 12 13
  // 20 21 22 23
  // 30 31 32 33
//--------- Result Logic Start ---------

  

 public getTdStyle():string{
  let row = 900/this.gameDetails.value.gameRow;
  let col = 900/this.gameDetails.value.gameCol ; 
  let font = this.gameDetails.value.gameConnects ; 

  return "height: "+col+"; width:"+col+"; font-size: 35px;";
 }

  //--------- Result Logic Ends ---------

 

  // ---------- function for styling ------------
  public getPlayerColor():string{
    if(this.board.currentPlayerIx===1) return 'player-turn winner-x';
    if(this.board.currentPlayerIx===2) return 'player-turn winner-o';
    return "" ; 
  }

  // ---------- Audio ------------------

  public playAudio():void{
    let audio = new Audio();
    audio.src = "../../../assets/audio/tick.mp3";
    audio.load();
    audio.play();
  }

}
