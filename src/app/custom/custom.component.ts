import { Component, OnInit } from '@angular/core';
import { GridService } from '../grid.service';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NameformComponent } from '../nameform/nameform.component';
export interface PlayerName{
  player1:string,
  player2:string
}

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  PlayerNames!:PlayerName;
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  maxNeed = this.screenWidth ;


  public playerNames !: string[];
  public countValue : number = 0 ;

  public gameDetails!:FormGroup;
  public col!:number ;
  public row!:number ;
  public tdStyle!:string ;
  public modeType!:string ;
  myMode: boolean = false;

  IsGridMode:boolean = false; 

  public Player1RealName:string = 'x' ; 
  public Player2RealName:string = 'o' ; 


  constructor(public board:GridService , private http:HttpClient , private dialog:MatDialog, private _snackBar: MatSnackBar) {
    this.playerNames = ['', 'x', 'o'];
    this.board.reset(5,5,4);
    this.gameDetails = new FormGroup(
      {
        gameRow : new FormControl(5) ,
        gameCol : new FormControl(5) ,
        gameConnects : new FormControl(4) ,

      }
    );
  }
  ngOnInit(): void {
    this.openDialog();
    this.PlayerNames = {
      player1 :this.Player1RealName,
      player2 :this.Player2RealName
    }
    
    if(this.maxNeed > this.screenHeight){
      this.maxNeed = this.screenHeight ;
    }
    this.tdStyle = this.getTdStyle() ;
  }


  changeMode():void{
    this.board.dropMode = !this.board.dropMode ;
    this.myMode = this.board.dropMode;
  }

  changeAudio():void{
    this.board.IsAudioEnable = !this.board.IsAudioEnable ;
  }

  addCount(val:number):void{
    this.countValue += val ;
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
    if(this.board.currentWinerIx != 0){
      for(let i = 0 ; i<this.board.winnerIndex.length; i++) {
        if(this.board.currentWinerIx===1){
          if(row== this.board.winnerIndex[i][0] && this.board.winnerIndex[i][1]==col)return 'winner-line-x';
        }
        else{
          if(row== this.board.winnerIndex[i][0] && this.board.winnerIndex[i][1]==col)return 'winner-line-o';
        }
        
      }
    }
    return 'glow contains-' + this.getPlayerName(row, col);
  }

  public getResult(): string {
    return this.playerNames[this.board.currentWinerIx];
  }

  gameData : any = {gameConnects:4};

  public disp():void{

    console.log('From Disp=',this.gameDetails.value) ;
    this.gameData = this.gameDetails.value ;
    this.board.reset(this.gameDetails.value.gameRow , this.gameDetails.value.gameCol,this.gameDetails.value.gameConnects) ;
    this.tdStyle = this.getTdStyle() ;
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



  getTdStyle():string{
  let row = this.maxNeed/this.gameDetails.value.gameRow;
  let col = (this.maxNeed*.8)/this.gameDetails.value.gameCol ;
  let font = col * 0.66 ;
  let data:string;

  data = "height: "+col+"px; width:"+col+"px; font-size: "+font+"px;"
  console.log(data) ;
  return  data;
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

  // --- Robin Bai 
  mouseEnter(row:number,col:number):void{
    console.log("Enterd",row,col) ; 
  }
  mouseLeave():void{
    console.log("Mouse Leave") ; 
  }

  changeGridMode(){
    this.IsGridMode = !this.IsGridMode ; 
  }
  getApiCall(){

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');



    this.http.get('https://localhost:7001/api/board/state/board123').subscribe(()=>{
      headers: headers
    });

    // this.http.get('https://api.themoviedb.org/3/movie/550?api_key=4972464e7c5458ebaaf29cb554132bd6').subscribe(()=>{
    //   console.log("called") ; 
    // });
  }


  // --------------- Mad Daialoge -----------------
  
  openSnackBar(message: string,siteMassage:string) {
    this._snackBar.open(message, siteMassage, {
      duration: 2500
    });
    
  }

  realNameAssign(){
    this.Player1RealName = this.PlayerNames.player1;
    this.Player2RealName = this.PlayerNames.player2;
    if(this.PlayerNames.player1.length===0){
      this.Player1RealName = 'x' ; 
    }
    if(this.PlayerNames.player2.length===0){
      this.Player2RealName = 'o' ;
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(NameformComponent
      , {
      data:{
        player1:"" ,
        player2:"" ,
      }
    },

    );
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.openSnackBar("Welcome to TicTacToe Multiverse", "Lets Play"); 
      this.PlayerNames = res;
      this.realNameAssign();
    }

    )
  }

}
