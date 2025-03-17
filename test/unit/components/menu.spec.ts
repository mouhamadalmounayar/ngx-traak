import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MenuComponent } from "../../../src/components";
import { HoverService } from "../../../src/services/hover.service";
import { OutService } from "../../../src/services/out.service";
import { TraakPlugin } from "../../../src/components/plugins/traak-plugin";
import { TraakNode } from "../../../src/nodes";
describe("Menu Component", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let hoverService: HoverService;
  let outService: OutService;
  beforeEach(async () => {
    hoverService = { eventSubject: of(null) } as any;
    outService = { eventSubject: of(null) } as any;
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: HoverService, useValue: hoverService },
        { provide: OutService, useValue: outService },
        { provide: TraakPlugin, useExisting: MenuComponent },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should show menu when button is clicked", () => {
    const button = fixture.nativeElement.querySelector(".button");
    button.click();
    expect(component.isPluginVisible()).toBe(true);
  });
  it("should hide menu when mouse clicks outside the menu container", () => {
    component.showMenu();
    fixture.detectChanges();
    const menuContainer =
      fixture.nativeElement.querySelector(".menu-container");
    document.body.click();
    expect(component.isPluginVisible()).toBe(false);
  });
  it("should show the button on mouse over the container", () => {
    const container = fixture.nativeElement.querySelector(".container");
    container.dispatchEvent(new MouseEvent("mouseover"));
    fixture.detectChanges();
    expect(component.isHoveringButton()).toEqual(true);
    expect(container.classList).toContain("add-button__visible");
  });
  it("should hide the button on mouse out the container", () => {
    component.onMouseOver();
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector(".container");
    container.dispatchEvent(new MouseEvent("mouseout"));
    fixture.detectChanges();
    expect(component.isHoveringButton()).toEqual(false);
    expect(container.classList).toContain("add-button__hidden");
  });

  it("should add a bullet list node", () => {
    const setCursorToEndOfLineMock = jest
      .fn()
      .mockReturnValue(component.editor.commands);
    const addNodeMock = jest.fn().mockReturnValue(component.editor.commands);
    const commitMock = jest.fn();
    component.editor.commands.setCursorToEndOfLine = setCursorToEndOfLineMock;
    component.editor.commands.addNode = addNodeMock;
    component.editor.commands.commit = commitMock;
    const event = new MouseEvent("click");
    component.addBulletList(event);
    expect(setCursorToEndOfLineMock).toHaveBeenCalledWith(component.start());
    expect(addNodeMock).toHaveBeenCalledWith(
      new TraakNode("bullet_list", [
        new TraakNode("list_item", [new TraakNode("paragraph")]),
      ]),
    );
    expect(commitMock).toHaveBeenCalled();
    expect(component.isPluginVisible()).toBe(false);
  });

  it("should add an ordered list node", () => {
    const setCursorToEndOfLineMock = jest
      .fn()
      .mockReturnValue(component.editor.commands);
    const addNodeMock = jest.fn().mockReturnValue(component.editor.commands);
    const commitMock = jest.fn();

    component.editor.commands.setCursorToEndOfLine = setCursorToEndOfLineMock;
    component.editor.commands.addNode = addNodeMock;
    component.editor.commands.commit = commitMock;

    const event = new MouseEvent("click");
    component.addOrderedList(event);

    expect(setCursorToEndOfLineMock).toHaveBeenCalledWith(component.start());
    expect(addNodeMock).toHaveBeenCalledWith(
      new TraakNode("ordered_list", [
        new TraakNode("list_item", [new TraakNode("paragraph")]),
      ]),
    );
    expect(commitMock).toHaveBeenCalled();
    expect(component.isPluginVisible()).toBe(false);
  });

  it("should add a task list node", () => {
    const setCursorToEndOfLineMock = jest
      .fn()
      .mockReturnValue(component.editor.commands);
    const addNodeMock = jest.fn().mockReturnValue(component.editor.commands);
    const commitMock = jest.fn();

    component.editor.commands.setCursorToEndOfLine = setCursorToEndOfLineMock;
    component.editor.commands.addNode = addNodeMock;
    component.editor.commands.commit = commitMock;

    const event = new MouseEvent("click");
    component.addTaskList(event);

    expect(setCursorToEndOfLineMock).toHaveBeenCalledWith(component.start());
    expect(addNodeMock).toHaveBeenCalledWith(
      new TraakNode("task_list", [
        new TraakNode("task_list_item", [new TraakNode("paragraph")]),
      ]),
    );
    expect(commitMock).toHaveBeenCalled();
    expect(component.isPluginVisible()).toBe(false);
  });

  it("should add a line node", () => {
    const setCursorToEndOfLineMock = jest
      .fn()
      .mockReturnValue(component.editor.commands);
    const addNodeMock = jest.fn().mockReturnValue(component.editor.commands);
    const commitMock = jest.fn();

    component.editor.commands.setCursorToEndOfLine = setCursorToEndOfLineMock;
    component.editor.commands.addNode = addNodeMock;
    component.editor.commands.commit = commitMock;

    const event = new MouseEvent("click");
    component.addLine(event);

    expect(setCursorToEndOfLineMock).toHaveBeenCalledWith(component.start());
    expect(addNodeMock).toHaveBeenCalledWith(new TraakNode("paragraph"));
    expect(commitMock).toHaveBeenCalled();
    expect(component.isPluginVisible()).toBe(false);
  });
});
