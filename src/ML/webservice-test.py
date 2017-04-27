from flask import Flask, redirect, render_template, request, url_for
from MLEngineStub import MLEngine
import ast

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("input.html")

@app.route("/result", methods = ["GET", "POST"])
def result():
    if request.method == "POST":
        mle = MLEngine(listOfTuples = ast.literal_eval(request.form["intuple"]))
        scores = mle.getScores()
        print(scores)
        return render_template("display.html", scores = scores)
    else:
        return redirect(url_for("no"))

@app.route("/no")
def no():
    return "No!"

if __name__ == "__main__":
    app.run()
