from flask import (
    Blueprint, render_template, redirect, request, flash, g
)
from app.db import  get_db
from app.auth import login_required

bp = Blueprint('courses', __name__, url_prefix='/cursos')

@bp.route('/all-courses')
@login_required
def catalog():
    return render_template('courses/catalog.html')

@bp.route('/bases-de-datos', methods=['POST', 'GET'])
@login_required
def db_index():
    category="database"

    if request.method == 'POST':
        title = request.form.get('title-note')
        note = request.form.get('description')
        error = None

        if not note:
            error = "Necesitas escribir algo"
        if error is not None:
            flash(error)
        else:
            db, cursor = get_db()
            cursor.execute(

                'INSERT INTO note (title,description,completed,category, created_by)'
                'VALUES (%s,%s,%s,%s,%s)',
                (title,note,False,category,g.user['id'])
            )
            db.commit()

            print("commit successfully")
    notes = getNotes(category)
    return render_template('courses/dbIndex.html',notes=notes)

@bp.route('/networking-basico',methods=['POST', 'GET'])
@login_required
def netw_index():
    category="networking"

    if request.method == 'POST':
        title = request.form.get('title-note')
        note = request.form.get('description')
        error = None

        if not note:
            error = "Necesitas escribir algo"
        if error is not None:
            flash(error)
        else:
            db, cursor = get_db()
            cursor.execute(

                'INSERT INTO note (title,description,completed,category, created_by)'
                'VALUES (%s,%s,%s,%s,%s)',
                (title,note,False,category,g.user['id'])
            )
            db.commit()
            print("commit successfully")
            notes = getNotes(category)
            return render_template('courses/netwIndex.html',notes=notes)

    return render_template('courses/netwIndex.html')

def getNotes(category):
    db, cursor = get_db()
    cursor.execute(
        'select n.id, n.description, n.title, u.username, n.completed, n.created_at '
        'from note n JOIN user u on n.created_by = u.id WHERE  n.created_by = %s and category = %s order by created_at desc',(g.user['id'],category)
    )
    notes = cursor.fetchall()
    return notes

@bp.route('/introduccion-a-la-programacion', methods=[ 'POST','GET'])
@login_required
def progr_java():
    category = "programacion"
    if request.method == 'POST':
        title = request.form.get('title-note')
        note = request.form.get('description')
        error = None

        if not note:
            error = "Necesitas escribir algo"
        if error is not None:
            flash(error)
        else:
            db, cursor = get_db()
            cursor.execute(

                'INSERT INTO note (title,description,completed,category, created_by)'
                'VALUES (%s,%s,%s,%s,%s)',
                (title,note,False,category,g.user['id'])
            )
            db.commit()


    notes = getNotes(category)

    return render_template('courses/progrIndex.html', notes=notes)


@bp.route('/delete/<int:id>', methods=[ 'POST','GET'])
@login_required
def delete(id):
    try:
        db, cursor = get_db()
        cursor.execute('DELETE FROM note WHERE id=%s and created_by=%s',
                       (id,g.user['id'])

                       )
        db.commit()
        flash("Nota eliminada")
        notes = getNotes()
        return render_template('courses/progrIndex.html', notes=notes)
    except:
        flash('No se ha podido eliminar tu nota')

        notes = getNotes("programacion")
        return render_template('courses/progrIndex.html', notes=notes)
