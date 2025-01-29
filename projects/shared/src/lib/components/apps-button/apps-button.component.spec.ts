import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsButtonComponent } from './apps-button.component';

describe('AppsButtonComponent', () => {
  let component: AppsButtonComponent;
  let fixture: ComponentFixture<AppsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
