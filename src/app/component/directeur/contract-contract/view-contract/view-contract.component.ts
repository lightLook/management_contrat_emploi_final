import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css']
})
export class ViewContractComponent implements OnInit {

  Contract_id !: any;
  ContractObj !: any;

constructor(
    private route : ActivatedRoute,
    private dataApi : DataService
  ) {
    this.Contract_id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getContractById();
  }

  getContractById() {
    this.dataApi.getContractById(this.Contract_id).subscribe(res => {
      this.ContractObj = res;
      this.ContractObj.date_debut = this.ContractObj.date_debut.toDate();
      this.ContractObj.date_fin = this.ContractObj.date_fin.toDate();
      console.log(res);
    })
  }
}
