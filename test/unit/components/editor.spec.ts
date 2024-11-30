import { EditorComponent } from "../../../src/components/editor.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfigurationMissingException } from "../../../src/errors/errors";
import { Pipe } from "@angular/core";
import { TraakConfiguration } from "../../../src/models/traak-configuration.model";
import { TraakNode } from "../../../src/nodes/traak-node";
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
      nodes: [],
      starterNode: new TraakNode("paragraph", "Hello", null),
    };
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
