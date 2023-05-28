import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';

import { Contract } from 'src/app/shared/model/contract';

import { DataService } from 'src/app/shared/service/data.service';

import { AddContractComponent } from '../../contract-contract/add-contract/add-contract.component';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class  ViewPostComponent implements OnInit {

  id !: any;
  PostObj !: any;
  allContracts : Contract[] = [];

  displayedColumns: string[] = ['name', 'mobile', 'gender','prescription','action'];
  dataSource!: MatTableDataSource<Contract>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService,
    private dialog : MatDialog,
    private _snackBar : MatSnackBar
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.getPostById();
    this.getAllContractsForPost();
  }

  getPostById() {
    this.dataApi.getPostById(this.id).subscribe(res => {
      this.PostObj = res;
    })
  }

  getAllContractsForPost() {
    this.dataApi.getAllContracts().subscribe(res => {
      this.allContracts = res.map((e : any) => {
        const data = e.payload.doc.data();
        if(data.Post_id == this.id) {
          data.Contract_id = e.payload.doc.id;
          return data;
        }
      })

      this.allContracts = this.allContracts.filter(item => item != undefined);
      this.dataSource = new MatTableDataSource(this.allContracts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewContract(row : any) {
    window.open('/directeur/Contract/'+row.Contract_id,'_blank');
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}


