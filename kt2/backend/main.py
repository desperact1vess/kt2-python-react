from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from schema import schema
import config

settings = config.get_settings()

app = FastAPI(
    title="Task Manager API",
    description="KT2 GraphQL для Реакта",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings["frontend_url"]],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
