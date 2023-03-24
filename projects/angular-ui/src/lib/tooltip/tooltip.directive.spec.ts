import { TooltipModule } from './tooltip.module';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TOOLTIP_DEFAULT_OPTIONS } from './tooltip.constants';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: `
  <h2 auTooltip="top" position="top" color="red">Something good</h2>
  <h2 auTooltip="bottom" position="bottom">Something good</h2>
  <h2 auTooltip="right" position="right" [activeOnLoaded]="true">Something good</h2>
  <h2 auTooltip="left" position="left">Something good</h2>
  `
})
class TestComponent { }


describe('TooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  const defaultFontColor = `#ccc`;
  const defaultBackgroundColor = `#fff`;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      imports: [
        TooltipModule
      ],
      declarations: [ TestComponent, TooltipDirective ],
      providers: [
        {
          provide: TOOLTIP_DEFAULT_OPTIONS,
          useValue: {
            textColor: defaultFontColor,
            backgroundColor: defaultBackgroundColor
          }
        }
      ],
      teardown: { destroyAfterEach: false }, // <-- disabling destroyAfterEach make test pass successfully
    })
    .createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initial binding

    // all elements with an attached TooltipDirective
    des = fixture.debugElement.queryAll(By.directive(TooltipDirective));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four elements', () => {
    expect(des.length).toBe(4);
  });

  it('should color 1st <h2> "#ccc"', () => {
    const color = des[1].nativeElement.querySelector(`.tooltip`).style.getPropertyValue('--color')
    expect(color).toBe(defaultFontColor);
  });

  it('should background 1st <h2> "#fff"', () => {
    const color = des[0].nativeElement.querySelector(`.tooltip`).style.getPropertyValue('--bg-color')
    expect(color).toBe(defaultBackgroundColor);
  });

  it('should color 2nd <h2> "red"', () => {
    const color = des[0].nativeElement.querySelector(`.tooltip`).style.getPropertyValue('--color')
    expect(color).toBe('red');
  });

  it('should 3rd <h2> is active from the beginning', () => {
    const active = des[2].nativeElement.querySelector(`.tooltip`).classList.contains('tooltip-active')
    expect(active).toBe(true);
  });
});

