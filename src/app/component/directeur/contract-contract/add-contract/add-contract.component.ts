import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';


@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  Contract_name !: string;
  mobile !: string;
  gender !: string;
  admission_date !: Date;
  prescription !: string;
  Contract_id !: string;
  buttonName !: string;
  Post_id !: string;
  Post_name !: string;

  allPosts : any[] = [];

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddContractComponent>,
    private dataApi : DataService
  ) {

      this.title = data.title;
      this.Contract_id = data.Contract_id;
      this.Contract_name = data.Contract_name;
      this.mobile = data.mobile;
      this.gender = data.gender;
      this.admission_date = data.admission_date;
      this.prescription = data.prescription;
      this.buttonName = data.buttonName;
      this.Post_id = data.Post_id;
      this.Post_name = data.Post_name;
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.form = this.fb.group({
      Contract_id: [this.Contract_id, []],
      Contract_name : [this.Contract_name, [Validators.required]],
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender : [this.gender, [Validators.required]],
      Post_id : [this.Post_id, [Validators.required]],
      Post_name : [this.Post_name, []],
      admission_date : [this.admission_date, [Validators.required]],
      prescription : [this.prescription, [Validators.required]]
    })

  }

  getAllPosts() {
    this.dataApi.getAllPosts().subscribe(res => {
      this.allPosts = res.map((e : any) => {
        const data = e.payload.doc.data();
        const Post = {
          Post_name : data.name,
          Post_id : e.payload.doc.id
        }
        return Post;
      })
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  async registerContract() {
    this.form.value.Post_name = await this.getPostName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }

  getPostName(PostId : string) {
    for( let i = 0; i < this.allPosts.length; i++) {
      if(this.allPosts[i].Post_id == PostId) {
        return this.allPosts[i].Post_name;
      }
    }
    return "";
  }

}
