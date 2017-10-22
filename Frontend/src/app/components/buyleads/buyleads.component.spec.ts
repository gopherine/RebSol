import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyleadsComponent } from './buyleads.component';

describe('BuyleadsComponent', () => {
  let component: BuyleadsComponent;
  let fixture: ComponentFixture<BuyleadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyleadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
