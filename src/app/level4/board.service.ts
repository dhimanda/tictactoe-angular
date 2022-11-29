import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public gameCount = 0 ; 
  public status: boolean;
  public currentPlayerIx!: number ;
  public currentWinerIx !: number;
  public boardContent!: number[][];
  public count: number = 0;

  constructor() {
    this.status = false;

    this.reset();

  }
  getResultData(): boolean {
    return this.status;
  }
  public Myset(row: number, col: number): void {

    console.log("--------", this.count, "----------");

    if (this.currentWinerIx === 0 && this.boardContent[row][col] === 0) {
      this.boardContent[row][col] = this.currentPlayerIx;
      this.count = this.getCount();
      if(this.Check()){
        this.currentWinerIx = this.currentPlayerIx ;
        return ;
      }
      this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1 ;
    }

  }
  
  public Check():boolean{
    for(let i=0 ; i <= 3 ; i++) {
      if(this.testData(i,0,i,1,i,2,i,3) || this.testData(0,i,1,i,2,i,3,i)) {
        return true;
      }
    }
    return (this.testData(0,0,1,1,2,2,3,3) || this.testData(0,3,1,2,2,1,3,0)) ;
  }

  private testData(a: number, b: number, p: number, q: number, x: number, y: number, m:number , n: number): boolean {
    if(this.data(a, b) === 0) return false;
    return (this.data(a, b) === this.data(p, q) && this.data(p, q) === this.data(x, y) && this.data(p, q) === this.data(m, n));
  }

  private data(row: number, col: number): number {
    return this.boardContent[row][col];
  }

  public reset(): void {
    this.currentPlayerIx = this.gameCount%2 ? 1 : 2;
    this.currentWinerIx = 0;
    this.count = 0;
    this.boardContent = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.gameCount++ ; 
  }

  private getCount():number{
    let myCount = 0 ;
    for(let x=0 ; x < this.boardContent.length ; x++) {
      for(let y=0 ; y < this.boardContent[x].length ; y++){
        if(this.boardContent[x][y]!==0) myCount++ ;
      }
    }
    return myCount;
  }
}
