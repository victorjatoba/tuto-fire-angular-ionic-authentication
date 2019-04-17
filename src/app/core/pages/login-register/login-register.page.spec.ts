import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRegisterPage } from './login-register.page';


describe('RegisterPage', () => {
  let component: LoginRegisterPage;
  let fixture: ComponentFixture<LoginRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
