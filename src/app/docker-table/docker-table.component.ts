import { Component, OnInit ,Inject} from '@angular/core';
import {DockerTableService} from './docker-table.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {BookDetailsComponent}from '../book-details/book-details.component'
export interface dockerElement {
  id:number,
  name: string;
  author: any;
  publication: any;
  category: any;
  pages: any;
  price: any;
}

@Component({
  selector: 'app-docker-table',
  templateUrl: './docker-table.component.html',
  styleUrls: ['./docker-table.component.css']
})
export class DockerTableComponent implements OnInit {
  show=false;
  isLoading= false;
  hellodocker:any[]=[]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  EditRowId:any='';
  editField:any;
  constructor(private http:DockerTableService,public dialog: MatDialog) { }

  ngOnInit(): void {
      this.http.getdata('http://localhost:8080/bookservice/books',{status:"Active"}).subscribe((data:[])=>{
      // console.log(data)
      // for(var i=0; i<data.length;i++){
      //   this.hellodocker = data[i];
      // }
      this.hellodocker=data;

      // console.log(this.hellodocker)
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      width: '450px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.hellodocker[id][property] = editField;
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  deletedocker(dockerId:any){
  this.http.deletedocker(dockerId).subscribe((data:[]) => {
    console.log(data)
  console.log('Deleted Successfully');
}
  )}
  showBookDetailForm(){
    this.show=true;
  }
}



  // deletedocker(dockerId:any){
  //   this.http.deletedocker('http://localhost:8080/bookservice/books',dockerId).subscribe(result=>{
  //     console.log(result)
  //   })
