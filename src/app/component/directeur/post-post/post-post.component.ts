import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

 

import { DataService } from 'src/app/shared/service/data.service';

import { Post } from 'src/app/shared/model/post';
import { AddPostComponent } from './add-post/add-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';


@Component({
  selector: 'app-post-post',
  templateUrl: './post-post.component.html',
  styleUrls: ['./post-post.component.css']
})
export class PostPostComponent implements OnInit {

  PostsArr : any[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'email', 'department', 'gender','action'];
  dataSource!: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  addPost() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Register Post',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddPostComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addPost(data);
        this.openSnackBar("Registration of Post is successful.", "OK")
      }
    })
  }

  editPost(row : any) {
    if(row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit Post";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.birthdate = row.birthdate.toDate();

    const dialogRef = this.dialog.open(AddPostComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updatePost(data);
        this.openSnackBar("Post is updated successfully.", "OK")
      }
    })
  }

  deletePost(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete Post',
      PostName : row.name
    }

    const dialogRef = this.dialog.open(DeletePostComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deletePost(row.id);
        this.openSnackBar("Post deleted successfully.", "OK")
      }
    })
  }

  getAllPosts() {
    this.dataApi.getAllPosts().subscribe(res => {
      this.PostsArr = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.PostsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewPost(row : any) {
    window.open('/directeur/post/'+row.id,'_blank');
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
