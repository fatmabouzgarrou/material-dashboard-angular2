import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudDataComponent } from './fraud-data.component';

describe('FraudDataComponent', () => {
  let component: FraudDataComponent;
  let fixture: ComponentFixture<FraudDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraudDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraudDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
