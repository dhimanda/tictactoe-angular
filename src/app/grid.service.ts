import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  public gameCount = 0;
  public status: boolean;
  public currentPlayerIx!: number;
  public currentWinerIx !: number;
  public boardContent!: number[][];
  public count: number = 0;
  public connectDots!: number;

  constructor() {
    this.status = false;
    //this.reset(5);
  }
  getResultData(): boolean {
    return this.status;
  }
  public Myset(row: number, col: number): void {

    console.log("--------", this.count, "----------");

    if (this.currentWinerIx === 0 && this.boardContent[row][col] === 0) {
      this.boardContent[row][col] = this.currentPlayerIx;
      this.count = this.getCount();
      if (this.Check(row, col)) {
        this.currentWinerIx = this.currentPlayerIx;
        return;
      }
      this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1;
    }

    // console.log(this.boardContent) ; 

  }
  public Check(p: number, q: number): boolean {
    let v = this.boardContent;
    let x = v[p][q];
    let n = v.length;
    let m = v[0].length;
    let k = this.connectDots;
    if(x==0) return false;
 
    let cnt1=0,cnt2=0,cnt3=0,cnt4=0;
    for(let i=q; i>=0; i--){
        if(v[p][i]==x) cnt1++;
        else break;
    }
    for(let i=q+1; i<m; i++){
        if(v[p][i]==x) cnt1++;
        else break;
    }
 
    for(let i=p; i>=0; i--){
        if(v[i][q]==x) cnt2++;
        else break;
    }
    for(let i=p+1; i<n; i++){
        if(v[i][q]==x) cnt2++;
        else break;
    }
 
    for(let i=p,j=q; i>=0 && j>=0; i--,j--){
        if(v[i][j]==x) cnt3++;
        else break;
    }
    for(let i=p+1,j=q+1; i<n && j<m; i++,j++){
        if(v[i][j]==x) cnt3++;
        else break;
    }
 
    for(let i=p,j=q; i>=0 && j<m; i--,j++){
        if(v[i][j]==x) cnt4++;
        else break;
    }
    for(let i=p+1,j=q-1; i<n && j>=0;i++,j--){
        if(v[i][j]==x) cnt4++;
        else break;
    }
    
    if(cnt1>=k || cnt2>=k || cnt3>=k || cnt4>=k){
        return true;
    }
    return false;

  }

  private testData(a: number, b: number, p: number, q: number, x: number, y: number, m: number, n: number): boolean {
    if (this.data(a, b) === 0) return false;
    return (this.data(a, b) === this.data(p, q) && this.data(p, q) === this.data(x, y) && this.data(p, q) === this.data(m, n));
  }

  private data(row: number, col: number): number {
    return this.boardContent[row][col];
  }

  public reset(row: number, col: number, connect: number): void {
    this.currentPlayerIx = this.gameCount % 2 ? 1 : 2;
    this.currentWinerIx = 0;
    this.count = 0;
    this.connectDots = connect;
    const n = row; // or some dynamic value
    const m = col;

    const tmpBoard: number[][] = new Array(n).fill(0).map(() => new Array(m).fill(0));
    this.boardContent = tmpBoard;
    this.gameCount++;
  }

  private getCount(): number {
    let myCount = 0;
    for (let x = 0; x < this.boardContent.length; x++) {
      for (let y = 0; y < this.boardContent[x].length; y++) {
        if (this.boardContent[x][y] !== 0) myCount++;
      }
    }
    return myCount;
  }
}
