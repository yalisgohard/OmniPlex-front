import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllowedAppsComponent } from './edit-allowed-apps.component';

describe('EditAllowedAppsComponent', () => {
  let component: EditAllowedAppsComponent;
  let fixture: ComponentFixture<EditAllowedAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAllowedAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAllowedAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
