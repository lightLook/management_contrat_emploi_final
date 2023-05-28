import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/shared/model/post';
import { Contract } from 'src/app/shared/model/contract';
import { DataService } from 'src/app/shared/service/data.service';
import { AddContractComponent } from './add-contract/add-contract.component';
import { DeleteContractComponent } from './delete-contract/delete-contract.component';



@Component({
  selector: 'app-contract-contract',
  templateUrl: './contract-contract.component.html',
  styleUrls: ['./contract-contract.component.css']
})
export class ContractContractComponent implements OnInit {

  allContracts : Contract[] = [];
  allPosts : Post[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'Post', 'gender','action'];
  dataSource!: MatTableDataSource<Contract>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllContracts();
    this.getAllPosts();
  }

  addContract() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Register Contract',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddContractComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addContract(data);
        this.openSnackBar("Registration of patient is successful.", "OK")
      }
    })
  }


  getAllContracts() {
    this.dataApi.getAllContracts().subscribe(res => {
      this.allContracts = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.Contract_id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.allContracts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getAllPosts() {
    this.dataApi.getAllPosts().subscribe(res => {
      this.allPosts = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }

  getPostName(id : string) {
    let PostName = '';
    this.allPosts.forEach(element => {
      if(element.id == id) {
        PostName = element.title_post;
      }
    });
    return PostName;
  }

  viewContract(row : any) {
    window.open('/directeur/contract/'+row.Contract_id,'_blank');
  }

  editContract(row : any) {
    if(row.Contract_id == null || row.Nom_complet == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit Contract";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.date_debut = row.date_debut.toDate();
    dialogConfig.data.date_fin = row.date_fin.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddContractComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateContract(data);
        this.openSnackBar("Contract is updated successfully.", "OK")
      }
    })
  }

  deleteContract(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete Contract',
      patientName : row.Nom_complet
    }

    const dialogRef = this.dialog.open(DeleteContractComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(row);
        this.dataApi.deleteContract(row.Contract_id);
        this.openSnackBar("Contract deleted successfully.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
