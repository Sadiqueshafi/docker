import { Component, OnInit } from '@angular/core';
import {DockerTableService} from './docker-table.service'
import { NgForm } from '@angular/forms';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-docker-table',
  templateUrl: './docker-table.component.html',
  styleUrls: ['./docker-table.component.css']
})
export class DockerTableComponent implements OnInit {
  show=false;
  isLooding = false;
  hellodocker:any[]=[]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  EditRowId:any='';
  editField:any;
  constructor(private http:DockerTableService) { }

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
  onLogin(form:NgForm){
    console.log(form.value);

    this.http.postData('http://localhost:8080/bookservice/books/',form.value).subscribe(res=>{
      console.log('data successfully add')
    })
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
