import { DemoAlertModule } from './demo-alert.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DemoAlertComponent } from './demo-alert.component';

describe('DemoAlertComponent', () => {
  let component: DemoAlertComponent;
  let fixture: ComponentFixture<DemoAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, DemoAlertModule],
      declarations: [DemoAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
