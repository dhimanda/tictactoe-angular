import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss']
})
export class Level2Component{
  private currentPlayerIx :number ; 
  private currentWinerIx :number ; 
  public boardContent: number[][];
  private playerNames : string[] ;
  
  constructor(){
    this.playerNames = ['','x','o'] ; 
    this.boardContent = [
      [0,0,0],
      [0,0,0],
      [0,0,0],
    ] ; 
    this.currentPlayerIx = 1 ; 
    this.currentWinerIx = 0 ; 
  }

  RunLoop(num: number) {
    return new Array(num);
  }
  public testField = 'x'; 

  public getTestField() : string {
    return this.testField;
  }

  public getTestClass() : string {
    return 'contains-x' ; 
  }

  public getPlayerName(row:number , col:number) : string {
    return this.playerNames[this.boardContent[row][col]];
  }

  public getStyle(row:number ,col:number) : string{
    return 'contains-'+this.getPlayerName(row,col);
  }

  public set(row:number , col:number) : void {
    if(this.currentWinerIx===0 && this.boardContent[row][col]===0){
      this.boardContent[row][col] = this.currentPlayerIx ; 
      if(this.currentPlayerIx===1) {
        this.currentPlayerIx = 2 ; 
      }
      else {
        this.currentPlayerIx = 1 ; 
      }
      // this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1 ; 
    }
    
  }
  public resetBoard():void{
    alert('BH') ; 
    console.log('Resetting') ; 
    this.boardContent = [
      [0,0,0],
      [0,0,0],
      [0,0,0],
    ] ;
  }
}
