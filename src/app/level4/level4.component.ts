import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-level4',
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.scss']
})
export class Level4Component implements OnInit{


  public status: boolean;
  public currentPlayerIx!: number ;
  public currentWinerIx !: number;
  public boardContent!: number[][];
  public playerNames !: string[];
  public count: number = 0;

  constructor(private dialog: MatDialog) {
    this.status = false;
    this.playerNames = ['', 'x', 'o'];

    this.reset();

  }
  ngOnInit(): void {
    // Runs after constructor
    //this.dialog.open(FormComponent);
  }


  getResultData(): boolean {
    return this.status;
  }

  openDialog(){
    console.log('Laddu Baba');
    this.dialog.open(FormComponent);
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
    return this.playerNames[this.boardContent[row][col]];
  }

  public getStyle(row: number, col: number): string {
    return 'contains-' + this.getPlayerName(row, col);
  }

  public getResult(): string {
    return this.playerNames[this.currentWinerIx];
  }

  // 00 01 02 03
  // 10 11 12 13
  // 20 21 22 23
  // 30 31 32 33
//--------- Result Logic Start ---------

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
  public reset(): void {
    this.currentPlayerIx = 2;
    this.currentWinerIx = 0;
    this.count = 0;
    this.boardContent = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }
}
