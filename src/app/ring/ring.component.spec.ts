import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingComponent } from './ring.component';

describe('RingComponent', () => {
  let component: RingComponent;
  let fixture: ComponentFixture<RingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RingComponent]
    });
    fixture = TestBed.createComponent(RingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
