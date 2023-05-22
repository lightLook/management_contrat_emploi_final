import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  addPost(Post : any) {
    Post.id = this.afs.createId();
    return this.afs.collection("Post/").add(Post);
  }

  getAllPosts() {
    return this.afs.collection("Post/").snapshotChanges();
  }

  updatePost(Post : any) {
    return this.afs.doc("Post/"+Post.id).update(Post);
  }

  deletePost(id : string) {
    return this.afs.doc("Post/"+id).delete();
  }

  getPostById(id : any) {
    return this.afs.doc("Post/"+id).valueChanges();
  }

  //------------------------------contraction------------------------------

  addContract(Contract : any) {
    Contract.Contract_id = this.afs.createId();
    return this.afs.collection("Contract/").add(Contract);
  }

  getAllContracts() {
    return this.afs.collection("Contract/").snapshotChanges();
  }

  updateContract(Contract : any) {
    return this.afs.doc("Contract/"+Contract.Contract_id).update(Contract);
  }

  deleteContract(id : string) {
    return this.afs.doc("Contract/"+id).delete();
  }

  getContractById(id : any) {
    return this.afs.doc("Contract/"+id).valueChanges();
  }
}
