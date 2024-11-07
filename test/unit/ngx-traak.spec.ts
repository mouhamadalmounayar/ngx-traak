import { NgxTraakComponent } from "../../src/lib/ngx-traak.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
describe("Runs correctly", () => {
  let component: NgxTraakComponent;
  let fixture: ComponentFixture<NgxTraakComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxTraakComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NgxTraakComponent);
    component = fixture.componentInstance;
  });
  it("tests that the component initializes correctly", () => {
    expect(component).toBeTruthy();
  });
});
