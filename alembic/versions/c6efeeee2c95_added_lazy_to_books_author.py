"""added lazy to books:author

Revision ID: c6efeeee2c95
Revises: 420751d4c2be
Create Date: 2024-08-03 07:42:52.253725

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'c6efeeee2c95'
down_revision: Union[str, None] = '420751d4c2be'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
