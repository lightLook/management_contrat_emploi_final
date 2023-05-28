import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  form !: FormGroup;


  title !: string;
  id !: string;
  buttonName !: string;


//----------

  title_post !: string;
  
 
  contrat !: string;
  Salaire !: Number;
  
  Domaine !: string;
  Domaines : string[]  = ["Ventes",   "Marketing",    "Fabrication",  "Finance",    "Ressources humaines",    "Approvisionnement",     "Recherche et développement",   "Informatique"   ];
  qualification !: string;

//create automatique
   
  Annonce_N : Number = 999;
  disponible !: number ;


 
  


  
  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddPostComponent>
  ) {
      this.title = data.title;
      this.id = data.id;
      this.title_post = data.title_post;

      this.Salaire = data.Salaire;

      this.contrat = data.contrat;
      this.Domaine = data.Domaine;

       
      this.Annonce_N = data.Annonce_N+1;
      this.disponible = data.disponible;

 
      

      this.qualification = data.qualification;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      disponible: [this.disponible, []],
      
      title_post : [this.title_post, [Validators.required]],
      Domaine : [this.Domaine, [Validators.required]],
      contrat : [this.contrat, [Validators.required]],
      Salaire : [this.Salaire, [Validators.required]],
      
      qualification : [this.qualification,[Validators.required]],

      
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerDoctor() {
    this.dialogRef.close(this.form.value);
  }

}
