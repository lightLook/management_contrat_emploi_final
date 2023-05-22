import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractContractComponent } from './contract-contract.component';

describe('ContractContractComponent', () => {
  let component: ContractContractComponent;
  let fixture: ComponentFixture<ContractContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
