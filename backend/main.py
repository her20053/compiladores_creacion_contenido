from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS


from modules.Gif        import crear_gif_thompson
from modules.Thompson   import Thompson
from modules.Graficador import graficarAutomataFinitoNoDeterminista
from modules.Postfix    import convertirAPostfix, formatearExpresionRegular

import os
import shutil
import sys

app = Flask(__name__)
CORS(app)
app.debug = True

def get_base_path():
    if getattr(sys, 'frozen', False): return sys._MEIPASS
    return os.path.abspath(os.path.dirname(__file__))

base_path = get_base_path()

@app.route('/')
def hello_world():
    gif_path = os.path.join(base_path, "static/RESULTADO.gif")
    gif_exists = os.path.exists(gif_path)
    return render_template('index.html', gif_exists=gif_exists)

@app.route('/generate', methods=['POST'])
def generate():
    user_input = request.form['user_input']
    
    print("")

    print(" + La expresion regular es:", user_input)

    print(" + Generando el AFN...")

    # ELIMINANDO EL DIRECTORIO DE IMAGENES SI EXISTE

    directorio = os.path.join(base_path, "AFN_Imagenes")
    if os.path.exists(directorio):
        shutil.rmtree(directorio)
        print(f" - Directorio '{directorio}' eliminado con éxito.")
    else:
        print(f" - El directorio '{directorio}' no existe.")

    os.makedirs(directorio, exist_ok=True)

    # CREAMOS EL AUTOMATA FINITO NO DETERMINISTA

    regex = user_input

    # Formateamos la expresion regular para que sea valida

    regex = formatearExpresionRegular(regex)

    # Convertimos la expresion regular de infix a postfix

    regex = convertirAPostfix(regex)

    AFN_Thompson = Thompson(regex).afn

    # Graficamos el automata finito no determinista

    graficarAutomataFinitoNoDeterminista(AFN_Thompson)

    print(" + Generando el GIF...")

    # CREAMOS EL GIF

    crear_gif_thompson()
    
    gif_url = url_for('static', filename='RESULTADO.gif', _external=True)
    return jsonify({'gifUrl': gif_url})

if __name__ == '__main__':
    app.run()
