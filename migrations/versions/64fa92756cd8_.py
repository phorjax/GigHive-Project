"""empty message

Revision ID: 64fa92756cd8
Revises: dde9d479830e
Create Date: 2023-04-21 01:25:08.572753

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64fa92756cd8'
down_revision = 'dde9d479830e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('artist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('images', sa.String(length=250), nullable=True))

    with op.batch_alter_table('venue', schema=None) as batch_op:
        batch_op.add_column(sa.Column('images', sa.String(length=250), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('venue', schema=None) as batch_op:
        batch_op.drop_column('images')

    with op.batch_alter_table('artist', schema=None) as batch_op:
        batch_op.drop_column('images')

    # ### end Alembic commands ###