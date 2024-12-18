import { EditorComponent } from "../../../src/components/editor.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TraakNode } from "../../../src/nodes/traak-node";
import { Paragraph } from "../../../src/nodes/paragraph";
describe("EditorComponent", () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    component.config = {
      nodes: [Paragraph],
      starterNode: new TraakNode("paragraph", "Hello", null),
    };
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
