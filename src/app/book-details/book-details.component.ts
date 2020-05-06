import { Component, OnInit,Inject } from '@angular/core';
import { DockerTableService } from '../docker-table/docker-table.service';

import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { dockerElement } from '../docker-table/doker.model';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  isLooding = false;
  constructor(
    public dialogRef: MatDialogRef<BookDetailsComponent>,private http:DockerTableService,
    @Inject(MAT_DIALOG_DATA) public data: dockerElement) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onLogin(form:NgForm){
    console.log(form.value);

    this.http.postData('http://localhost:8080/bookservice/books/',form.value).subscribe(res=>{
      console.log('data successfully add')
    })
  }


}
