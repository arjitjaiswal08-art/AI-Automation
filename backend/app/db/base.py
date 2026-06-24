"""Base class for SQLAlchemy models"""
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Import all models here for Alembic to detect them
# These imports must come after Base is defined to avoid circular imports
def import_models():
    from app.models.user import User  # noqa
    from app.models.project import Project  # noqa
    from app.models.chat import ChatMessage  # noqa
