import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  addPost(Post : any) {
    Post.id = this.afs.createId();
    Post.disponible = 0 ;

    return this.afs.collection("Post1/").add(Post);
  }

  getAllPosts() {
    return this.afs.collection("Post1/").snapshotChanges();
  }

  updatePost(Post : any) {
    return this.afs.doc("Post1/"+Post.id).update(Post);
  }

  deletePost(id : string) {
    return this.afs.doc("Post1/"+id).delete();
  }

  getPostById(id : any) {
    return this.afs.doc("Post1/"+id).valueChanges();
  }

  //------------------------------contraction------------------------------

  addContract(Contract : any) {
    Contract.Contract_id = this.afs.createId();
    return this.afs.collection("Contract1/").add(Contract);
  }

  getAllContracts() {
    return this.afs.collection("Contract1/").snapshotChanges();
  }

  updateContract(Contract : any) {
    return this.afs.doc("Contract1/"+Contract.Contract_id).update(Contract);
  }

  deleteContract(id : string) {
    return this.afs.doc("Contract1/"+id).delete();
  }

  getContractById(id : any) {
    return this.afs.doc("Contract1/"+id).valueChanges();
  }

// ajoute
  disp(id : any) {
    this.afs.collection('post1/').doc('id').update({ disponible: 1 });
  }
}


