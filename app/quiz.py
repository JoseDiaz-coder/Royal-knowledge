from flask import (
    Blueprint, redirect, render_template
)

from app.auth import login_required

bp = Blueprint('quiz', __name__, url_prefix='/quiz')


@bp.route('/index')
@login_required
def index():
     return render_template('quiz/index.html')
