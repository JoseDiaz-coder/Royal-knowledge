from flask import (
    Blueprint, render_template, redirect, request, flash, g, jsonify
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
    notes = getNotes(category)

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
    return render_template('courses/netwIndex.html',notes=notes)

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
    notes = getNotes(category)
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


def get_note(id):
    db, cursor = get_db()
    cursor.execute(
        'select n.id, n.description, n.completed, n.created_by, n.created_at, u.username '
        'from note n join user u on n.created_by = u.id where n.id = %s',
        (id,)
    )
    note = cursor.fetchone()
    if note is None:
        abort(404, 'el todo de id {0} no existe'.format(id))

    return note

@bp.route('/<int:id>/update', methods=['', 'POST'])
@login_required
def update(id):
    note = get_todo(id)

    if request.method == "POST":
        description = request.form['description']
        completed = True if request.form.get('completed') == 'on' else False
        error = None

        if not description:
            error = "Description required"

        if error is not None:
            flash(error)

        else:
            db, cursor = get_db()
            cursor.execute(
                'update note set description = %s, completed = %s'
                ' where id = %s and created_by = %s',
                (description, completed, id, g.user['id'])
            )
            db.commit()
            return redirect(url_for('courses.progr_java'))

    return render_template('courses/progrIndex.html', notes=notes)

