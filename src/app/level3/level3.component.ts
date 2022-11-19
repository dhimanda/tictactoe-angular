import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.scss']
})
export class Level3Component {
  public status: boolean;
  public currentPlayerIx!: number ;
  public currentWinerIx !: number;
  public boardContent!: number[][];
  public playerNames !: string[];
  public count: number = 0;

  constructor() {
    this.status = false;
    this.playerNames = ['', 'x', 'o'];
    
    this.reset();
  }

  getResultData(): boolean {
    return this.status;
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
    console.log("index", row, col, this.boardContent[row][col], "Player Name: ", this.playerNames[this.boardContent[row][col]]);
    return this.playerNames[this.boardContent[row][col]];
  }

  public getStyle(row: number, col: number): string {
    return 'contains-' + this.getPlayerName(row, col);
  }

  public getResult(): string {
    return this.playerNames[this.currentWinerIx];
  }

//--------- Result Logic Start ---------

  public Check():boolean{
    for(let i=0 ; i <= 2 ; i++) {
      if(this.testData(i,0,i,1,i,2) || this.testData(0,i,1,i,2,i)) {
        return true;
      }
    }
    return (this.testData(0,0,1,1,2,2) || this.testData(0,2,1,1,2,0)) ; 
  }

  private testData(a: number, b: number, p: number, q: number, x: number, y: number): boolean {
    if(this.data(a, b) === 0) return false;
    return (this.data(a, b) === this.data(p, q) && this.data(p, q) === this.data(x, y));
  }

  private data(row: number, col: number): number {
    return this.boardContent[row][col];
  }

  //--------- Result Logic Ends ---------

  private getCount():number{
    let myCount = 0 ; 
    for(let x=0 ; x < this.boardContent.length ; x++) {
      for(let y=0 ; y < this.boardContent[x].length ; y++){
        if(this.boardContent[x][y]!==0) myCount++ ; 
      }
    }
    return myCount; 
  }
  public Myset(row: number, col: number): void {
    this.count = this.getCount();
    console.log("--------", this.count, "----------");

    if (this.currentWinerIx === 0 && this.boardContent[row][col] === 0) {
      this.boardContent[row][col] = this.currentPlayerIx;
      if(this.Check()){
        this.currentWinerIx = this.currentPlayerIx ; 
        return ; 
      }
      this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1 ; 
    }

  }
  public reset(): void {
    this.currentPlayerIx = 1;
    this.currentWinerIx = 0;
    this.count = 0;
    this.boardContent = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

}
