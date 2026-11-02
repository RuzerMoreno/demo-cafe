from flask import Flask, render_template

app = Flask(__name__)

PRODUCTS = [
    {
        "name": "Latte de la casa",
        "category": "cafe",
        "category_name": "Café",
        "price": "$ 3.80",
        "description": "Doble espresso, leche cremosa y un toque de miel de azahar.",
        "notes": "Doble espresso · leche texturizada · miel de azahar",
        "image_class": "menu-image-coffee",
        "image_alt": "Café latte servido en una taza",
        "tag": "Café de origen",
    },
    {
        "name": "Tostada de temporada",
        "category": "desayuno",
        "category_name": "Desayuno",
        "price": "$ 8.50",
        "description": "Pan de masa madre, aguacate, tomates dulces y aceite verde.",
        "notes": "Masa madre · aguacate · tomate · aceite verde",
        "image_class": "menu-image-toast",
        "image_alt": "Tostada artesanal con aguacate",
        "tag": "Favorito de siempre",
    },
    {
        "name": "Croissant de mantequilla",
        "category": "dulce",
        "category_name": "Algo dulce",
        "price": "$ 3.20",
        "description": "Hojaldre lento, mantequilla de campo y una pizca de sal.",
        "notes": "Mantequilla de campo · hojaldre fermentado lentamente · una pizca de sal",
        "image_class": "menu-image-pastry",
        "image_alt": "Croissant recién horneado",
        "tag": "Horneado hoy",
    },
    {
        "name": "Cold brew de la casa",
        "category": "cafe",
        "category_name": "Café",
        "price": "$ 4.20",
        "description": "Café extraído en frío durante toda la noche, suave y refrescante.",
        "notes": "Café de origen · extracción en frío durante 16 horas · hielo",
        "image_class": "menu-image-cold-brew",
        "image_alt": "Café cold brew servido con hielo",
        "tag": "Extracción lenta",
    },
    {
        "name": "Huevos de la mañana",
        "category": "desayuno",
        "category_name": "Desayuno",
        "price": "$ 9.50",
        "description": "Huevos de corral, pan de masa madre y hierbas frescas.",
        "notes": "Huevos de corral · pan de masa madre · hierbas frescas",
        "image_class": "menu-image-eggs",
        "image_alt": "Desayuno de huevos con pan artesanal",
        "tag": "Para empezar bien",
    },
    {
        "name": "Tarta de temporada",
        "category": "dulce",
        "category_name": "Algo dulce",
        "price": "$ 5.80",
        "description": "Una receta distinta cada temporada, hecha cada día en nuestra cocina.",
        "notes": "Fruta de temporada · crema ligera · base crujiente",
        "image_class": "menu-image-tart",
        "image_alt": "Tarta artesanal con fruta de temporada",
        "tag": "Hecha en casa",
    },
]


@app.get("/")
def home():
    return render_template("index.html", active_page="home", page_title="Un lugar para bajar el ritmo")


@app.get("/carta")
def menu():
    return render_template(
        "menu.html",
        active_page="menu",
        page_title="La carta",
        products=PRODUCTS,
    )


@app.get("/nuestra-casa")
def story():
    return render_template("story.html", active_page="story", page_title="Nuestra casa")


@app.get("/visitanos")
def visit():
    return render_template("visit.html", active_page="visit", page_title="Visítanos")


@app.get("/diario")
def journal():
    return render_template("journal.html", active_page="journal", page_title="Diario")


if __name__ == "__main__":
    app.run(debug=True)
