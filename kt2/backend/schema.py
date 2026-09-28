import strawberry
from typing import List, Optional


@strawberry.type
class Category:
    name: str
    color: str


@strawberry.type
class Task:
    id: strawberry.ID
    title: str
    description: str
    is_completed: bool
    category: Category


@strawberry.input
class TaskInput:
    title: str
    description: str
    category_name: str = "Без категории"


storage: dict[str, Task] = {}
counter = 0


def next_id() -> str:
    global counter
    counter += 1
    return str(counter)


def bootstrap():
    if storage:
        return
    tid = next_id()
    storage[tid] = Task(
        id=strawberry.ID(tid),
        title="Сходить в пятёрочку",
        description="хлеб, яйца и что нить к чаю",
        is_completed=False,
        category=Category(name="Быт", color="#c9a227"),
    )
    tid = next_id()
    storage[tid] = Task(
        id=strawberry.ID(tid),
        title="Доделать кт к дедлайну",
        description="apollo и strawberry связать",
        is_completed=False,
        category=Category(name="Пары", color="#2a6f97"),
    )


bootstrap()


@strawberry.type
class Query:
    @strawberry.field
    def all_tasks(self) -> List[Task]:
        return list(storage.values())

    @strawberry.field
    def task(self, id: strawberry.ID) -> Optional[Task]:
        return storage.get(str(id))


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_task(self, input: TaskInput) -> Task:
        tid = next_id()
        item = Task(
            id=strawberry.ID(tid),
            title=input.title,
            description=input.description,
            is_completed=False,
            category=Category(name=input.category_name, color="#6c757d"),
        )
        storage[tid] = item
        return item

    @strawberry.mutation
    def complete_task(self, id: strawberry.ID) -> Optional[Task]:
        item = storage.get(str(id))
        if item is None:
            return None
        item.is_completed = True
        return item


schema = strawberry.Schema(query=Query, mutation=Mutation)
