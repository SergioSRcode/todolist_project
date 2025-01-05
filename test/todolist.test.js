const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  test("return an array of todolist items", () => {
    expect(list.toArray()).toEqual(list.todos);
  });

  test("return the first item of todolist", () => {
    expect(list.first()).toBe(todo1);
  });

  test("calling last returns the last todo item", () => {
    expect(list.last()).toBe(todo3);
  });

  test("calling shift removes the first item and returns it", () => {
    expect(list.shift()).toBe(todo1);
    expect(list.toArray()).not.toContain(todo1);
  });

  test("pop removes the last item and returns it", () => {
    expect(list.pop()).toBe(todo3);
    expect(list.toArray()).not.toContain(todo3);
  });

  test("isDone returns a boolean depending on whether it is done", () => {
    expect(typeof list.isDone()).toBe("boolean");
  });

  test("Throw TypeError when item is not a Todo object", () => {
    expect(() => list.add({})).toThrow(TypeError);  
    expect(() => list.add(1)).toThrow(TypeError);  
    expect(() => list.add("test")).toThrow(TypeError);  
    expect(() => list.add(new TodoList())).toThrow(TypeError);  
    expect(() => list.add(new Todo())).not.toThrow(TypeError);  
  });

  test("itemAt returns the item at indicated idx; Throws an error if idx has no element", () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(list.itemAt(1)).toBe(todo2);
    expect(list.itemAt(2)).toBe(todo3);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test("marks an item done at specified idx; Throw Reference Error if idx has no element", () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);

    list.markDoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(true);
    expect(list.itemAt(1).isDone()).toBe(false);
  });

  test("marks an item as undone by setting it to false", () => {
    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);
    
    list.itemAt(0).markDone();
    expect(list.itemAt(0).isDone()).toBe(true);

    list.markUndoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(false);
  });

  test("marks all items inside the list as done", () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test("removes an item at a certain idx; Throws an error if idx isn't taken", () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);

    let deletedItem = list.removeAt(0);
    expect(...deletedItem).toEqual(todo1);
    expect(list.toArray()).not.toContain(todo1);
  });

  test("toString returns string representation of the list", () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test("toString should show a done task with a capital X", () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
  });

  test("toString returns different string if all todos are done", () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    
        list.markAllDone();
        expect(list.toString()).toBe(string);
  });

  test("forEach takes a callback argument and iterates over all todos employing the callback on all todos", () => {
    list.forEach(todo => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test("filter returns a new list with all todos that fulfill a criteria", () => {
    list.markDoneAt(0);
    list.markDoneAt(2);

    expect(list.filter(todo => todo.isDone()).toArray()).toEqual([todo1, todo3]);
  });
});