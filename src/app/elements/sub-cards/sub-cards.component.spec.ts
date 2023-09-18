import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCardsComponent } from './sub-cards.component';

describe('SubCardsComponent', () => {
  let component: SubCardsComponent;
  let fixture: ComponentFixture<SubCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
