import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingUserComponent } from './assing-user.component';

describe('AssingUserComponent', () => {
  let component: AssingUserComponent;
  let fixture: ComponentFixture<AssingUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssingUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
