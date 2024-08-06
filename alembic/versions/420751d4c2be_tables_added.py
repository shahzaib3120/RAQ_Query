# from typing import Sequence, Union

# from alembic import op
# import sqlalchemy as sa


# # revision: str = '420751d4c2be'
# # down_revision: Union[str, None] = None
# # branch_labels: Union[str, Sequence[str], None] = None
# # depends_on: Union[str, Sequence[str], None] = None


# # def upgrade() -> None:
# #     op.create_table('authors',
# #     sa.Column('id', sa.Integer(), nullable=False),
# #     sa.Column('name', sa.String(), nullable=True),
# #     sa.PrimaryKeyConstraint('id')
# #     )
# #     op.create_index(op.f('ix_authors_id'), 'authors', ['id'], unique=False)
# #     op.create_index(op.f('ix_authors_name'), 'authors', ['name'], unique=False)
# #     op.create_table('books',
# #     sa.Column('id', sa.Integer(), nullable=False),
# #     sa.Column('title', sa.String(), nullable=True),
# #     sa.Column('subtitle', sa.String(), nullable=True),
# #     sa.Column('thumbnail', sa.String(), nullable=True),
# #     sa.Column('genre', sa.String(), nullable=True),
# #     sa.Column('published_year', sa.Integer(), nullable=True),
# #     sa.Column('description', sa.String(), nullable=True),
# #     sa.Column('average_rating', sa.Float(), nullable=True),
# #     sa.Column('num_pages', sa.Integer(), nullable=True),
# #     sa.Column('ratings_count', sa.Integer(), nullable=True),
# #     sa.PrimaryKeyConstraint('id')
# #     )
# #     op.create_index(op.f('ix_books_id'), 'books', ['id'], unique=False)
# #     op.create_index(op.f('ix_books_subtitle'), 'books', ['subtitle'], unique=False)
# #     op.create_index(op.f('ix_books_title'), 'books', ['title'], unique=False)
# #     op.create_table('book_author_association',
# #     sa.Column('book_id', sa.Integer(), nullable=False),
# #     sa.Column('author_id', sa.Integer(), nullable=False),
# #     sa.ForeignKeyConstraint(['author_id'], ['authors.id'], ),
# #     sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
# #     sa.PrimaryKeyConstraint('book_id', 'author_id')
# #     )
# #     # ### end Alembic commands ###


# # def downgrade() -> None:
# #     op.drop_table('book_author_association')
# #     op.drop_index(op.f('ix_books_title'), table_name='books')
# #     op.drop_index(op.f('ix_books_subtitle'), table_name='books')
# #     op.drop_index(op.f('ix_books_id'), table_name='books')
# #     op.drop_table('books')
# #     op.drop_index(op.f('ix_authors_name'), table_name='authors')
# #     op.drop_index(op.f('ix_authors_id'), table_name='authors')
# #     op.drop_table('authors')

# # alembic.ini
# [alembic]
# # Path to your alembic directory
# script_location = alembic

# # Database connection string
# sqlalchemy.url = postgresql+psycopg2://postgres:123@127.0.0.1:5432/test
