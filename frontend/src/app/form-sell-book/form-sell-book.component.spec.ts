import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSellBookComponent } from './form-sell-book.component';

describe('FormSellBookComponent', () => {
  let component: FormSellBookComponent;
  let fixture: ComponentFixture<FormSellBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSellBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSellBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
