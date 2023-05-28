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
  buttonName !: string;

  Contract_id !: string; 
  Post_id !: string;
  Entreprise_id !: string;
  Directeur_id !: string;

  
  Nom_complet : string;
  email : string;
  mobile : string;
  CNE : string;
   
  gender : string;
  title_post : string;
 

  date_debut : Date;
  date_fin : Date;
  
  allPosts : any[] = [];
 

  disponible !: number;

  
   constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddContractComponent>,
    private dataApi : DataService
  ) {

      this.title = data.title;
      this.Contract_id = data.Contract_id;
      this.Nom_complet = data.Nom_complet;
      this.mobile = data.mobile;
      this.email = data.email;
      this.gender = data.gender;
      this.date_debut = data.date_debut;
      this.date_fin = data.date_fin;
      this.CNE = data.CNE;
      this.buttonName = data.buttonName;
      this.Post_id = data.Post_id;
      this.title_post = data.title_post;
      this.disponible = data.disponible;
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.form = this.fb.group({

      Contract_id: [this.Contract_id, []],
      Nom_complet : [this.Nom_complet, [Validators.required]],
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email : [this.email, [Validators.required, Validators.email]],
      gender : [this.gender, [Validators.required]],
      Post_id : [this.Post_id, [Validators.required]],
      title_post : [this.title_post, []],
      disponible : [this.disponible, []],
      date_debut : [this.date_debut, [Validators.required]],
      date_fin : [this.date_fin, [Validators.required]],
      CNE : [this.CNE, [Validators.required]]
    })

  }

  getAllPosts() {
    this.dataApi.getAllPosts().subscribe(res => {
      this.allPosts = res.map((e : any) => {
        const data = e.payload.doc.data();
        const Post = {
          title_post : data.title_post, 
          disponible : data.disponible, 
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

    this.form.value.title_post = await this.getPostName(this.form.value.id);
    this.dialogRef.close(this.form.value);
    
     
  }

  getPostName(PostId : string) {
    for( let i = 0; i < this.allPosts.length; i++) {
      if(this.allPosts[i].Post_id == PostId && this.allPosts[i].disponible == 0) {
        this.dataApi.disp(this.allPosts[i].Post_id);
        return this.allPosts[i].title_post;
      }
    }
    return "";
  }

}
