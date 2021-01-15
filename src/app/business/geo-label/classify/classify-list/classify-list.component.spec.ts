import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyListComponent } from './classify-list.component';

describe('ClassifyListComponent', () => {
  let component: ClassifyListComponent;
  let fixture: ComponentFixture<ClassifyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
