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
  public IsAudioEnable:boolean = true;

  public dropMode:boolean = false;

  //------------ Audio Load -----------
  public winnerSound = this.getSound('winner.mp3');
  public xSound = this.getSound('tic.mp3');
  public oSound = this.getSound('tac.mp3');

  constructor() {
    this.status = false;
    //this.reset(5);

  }
  getResultData(): boolean {
    return this.status;
  }

  changeDropMode() {
    if (this.dropMode===true) this.dropMode = false;
    else this.dropMode = true;
    console.log('Drop Mode Chnaged',this.dropMode) ; 
  }

  public Myset(row: number, col: number): void {
    if (this.dropMode) {
      let freeRow = this.getFreeCol(col);
      if (this.currentWinerIx === 0 && freeRow !== -1) {
        this.boardContent[freeRow][col] = this.currentPlayerIx;
        this.count = this.getCount();
        if (this.Check(freeRow, col)) {
          this.currentWinerIx = this.currentPlayerIx;
          this.playAudio();
          return;
        }
        this.playAudio();
        this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1;
      }
      else {
        console.warn('This column is full');
      }
    }
    else {
      console.log("--------", this.count, "----------");

      if (this.currentWinerIx === 0 && this.boardContent[row][col] === 0) {

        this.boardContent[row][col] = this.currentPlayerIx;
        this.count = this.getCount();
        if (this.Check(row, col)) {
          this.currentWinerIx = this.currentPlayerIx;
          this.playAudio();
          return;
        }
        this.playAudio();
        this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1;
      }
    }
  }

  private getFreeCol(col: number): number {
    for (let i = this.boardContent.length - 1; i >= 0; i--) {
      if (this.boardContent[i][col] === 0) {
        return i;
      }
    }
    return -1;
  }

  public Myset2(row: number, col: number): void { // not drop

    console.log("--------", this.count, "----------");

    if (this.currentWinerIx === 0 && this.boardContent[row][col] === 0) {

      this.boardContent[row][col] = this.currentPlayerIx;
      this.count = this.getCount();
      if (this.Check(row, col)) {
        this.currentWinerIx = this.currentPlayerIx;
        this.playAudio();
        return;
      }
      this.playAudio();
      this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1;
    }
  }
  public Check(p: number, q: number): boolean {
    let v = this.boardContent;
    let x = v[p][q];
    let n = v.length;
    let m = v[0].length;
    let k = this.connectDots;
    let c1 = [], c2 =[] , c3 = [] , c4=[];

    if (x == 0) return false;

    let cnt1 = 0, cnt2 = 0, cnt3 = 0, cnt4 = 0;
    for (let i = q; i >= 0; i--) {
      if (v[p][i] == x){
        cnt1++;
        c1.push([p,i]);
      } 
      else break;
    }
    for (let i = q + 1; i < m; i++) {
      if (v[p][i] == x) {
        cnt1++;
        c1.push([p,i]);
      }
      else break;
    }

    for (let i = p; i >= 0; i--) {
      if (v[i][q] == x) {
        cnt2++;
        c2.push([i,q]); 
      }
      else break;
    }
    for (let i = p + 1; i < n; i++) {
      if (v[i][q] == x) {
        cnt2++;
        c2.push([i,q]); 
      }
      else break;
    }

    for (let i = p, j = q; i >= 0 && j >= 0; i--, j--) {
      if (v[i][j] == x){
         cnt3++;
         c3.push([i,j]) ; 
      }
      else break;
    }
    for (let i = p + 1, j = q + 1; i < n && j < m; i++, j++) {
      if (v[i][j] == x) {
        cnt3++;
        c3.push([i,j]) ; 
     }
      else break;
    }

    for (let i = p, j = q; i >= 0 && j < m; i--, j++) {
      if (v[i][j] == x) {
        cnt4++;
        c4.push([i,j]) ; 
      }
      else break;
    }
    for (let i = p + 1, j = q - 1; i < n && j >= 0; i++, j--) {
      if (v[i][j] == x) {
        cnt4++;
        c4.push([i,j]) ; 
      }
      else break;
    }

    if(this.IfMatch(cnt1,k,c1) || this.IfMatch(cnt2,k,c2) || this.IfMatch(cnt3,k,c3) || this.IfMatch(cnt4,k,c4)){
      return true;
    }

    // if(cnt1 >= k) {
    //   console.log(c1); 

    //   return true; 
    // }
    // if(cnt2 >= k) {
    //   console.log(c2); 
    //   return true; 
    // }
    // if(cnt3 >= k) {
    //   console.log(c3); 
    //   return true; 
    // }
    // if(cnt4 >= k) {
    //   console.log(c4); 
    //   return true; 
    // }
    // if (cnt1 >= k || cnt2 >= k || cnt3 >= k || cnt4 >= k) {
    //   return true;
    // }
    return false;

  }

  private IfMatch(cnt:number,k:number,c:number[][]){
    if(cnt>=k){
      console.log(c) ; 
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

  public playAudio(): void {
    if(!this.IsAudioEnable){
      return;
    }
    if (this.currentWinerIx > 0) {
      this.winnerSound.play();
    }
    else {
      if (this.currentPlayerIx === 1) {
        this.xSound.play();
      }
      else {
        this.oSound.play();
      }
    }
  }

  private playSound(soundName: string): void {
    let audio = new Audio();
    audio.src = "../../../assets/audio/" + soundName;
    audio.load();
    audio.play();
  }

  private getSound(soundName: string): HTMLAudioElement {
    let audio = new Audio();
    audio.src = "../../../assets/audio/" + soundName;
    audio.load();
    return audio;
  }
}
