import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-nameform',
  templateUrl: './nameform.component.html',
  styleUrls: ['./nameform.component.scss']
})
export class NameformComponent implements OnInit {
  playerNames!:FormGroup;
  isLoading: boolean = false;


  constructor(public dialogRef: MatDialogRef<NameformComponent>) {

    dialogRef.disableClose = true;

    this.playerNames = new FormGroup({
      player1:new FormControl("x"),
      player2:new FormControl("o")
    })
  }

  ngOnInit(): void {
  }

  dialogClose(){
    this.dialogRef.close();
  }

  submitPlayerName(){
    // this.dialogClose();
    this.isLoading=true;
    setTimeout(()=>{
      this.isLoading=false;
      this.dialogRef.close(this.playerNames.value);
    },1000)
  }

  playAsGuest(){
    this.playerNames = new FormGroup({
      player1:new FormControl("x"),
      player2:new FormControl("o")
    }) ;
    this.dialogClose();
  }

}
