import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeSearchFormComponent } from './recipe-search-form.component';

describe('RecipeSearchFormComponent', () => {
  let component: RecipeSearchFormComponent;
  let fixture: ComponentFixture<RecipeSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeSearchFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
