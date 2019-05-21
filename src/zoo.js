const API_BASE = 'http://localhost:3000/';

export default class Zoo {

  constructor() {

  }


  // načte zvířata z API a zavolá funkci ShowAnimals pro jejich zobrazení
  getAnimals() {
    fetch(API_BASE + 'zvirata')
      .then(response => response.json())
      .then(data => {
        this.showAnimals(data);
      });
  }


  // vezme pole zvířat vrácené z API a předané do funkce jako parametr
  // a vygeneruje pro každé zvíře HTML kód, který se akonec vypíše do stránky
  showAnimals(data) {
    let zvirata = document.querySelector('#zvirata');

    let html = '';

    // vygenerujeme HTML pro každé zvíře v seznamu a přidáme ho do proměnné
    data.forEach(zvire => {
      html += `
        <div class="zvire" data-id="${zvire.id}">
          <div class="zvire__foto">
            <img src="images/${zvire.foto}" alt="${zvire.nazev}">
          </div>
          <div class="zvire__popis">
            <div class="zvire__nazev">${zvire.nazev}</div>
            <div class="zvire__latinsky">${zvire.nazevLatinsky}</div>
          </div>
        </div>
      `;
    });

    // vygenerované HTML zapíšeme do stránky
    zvirata.innerHTML = html;

    // pridame reakci na kliknuti na všechna vytvořená zvířata
    let tlacitka = document.querySelectorAll('.zvire');

    tlacitka.forEach(tlacitko => {
      tlacitko.addEventListener('click', (e) => {
        this.animalClick(e.target);
      });
    });

  }


  // zavolá se při kliknutí na zvíře
  animalClick(element) {

    let prvek = element.closest('.zvire');
    let id = prvek.dataset.id;

    this.getAnimal(id);
  }


  // načte z API konkrétní zvíře podle předaného ID
  getAnimal(id) {
   fetch(API_BASE + 'zvirata/' + id)
    .then(response => response.json())
    .then(data => {
      this.showAnimal(data);
    });
  }


  // funkce vezme data konkrétního zvířete získaná z API
  // a předaná do funkce jako parametr a zobrazí je do stránky
  showAnimal(data) {

    document.querySelector('#nazev').textContent = data.nazev;
    document.querySelector('#latinsky').textContent = data.nazevLatinsky;
    document.querySelector('#popis').textContent = data.popis;
    document.querySelector('#domovina').textContent = data.domovina;
    document.querySelector('#biotop').textContent = data.biotop;
    document.querySelector('#potrava').textContent = data.potrava;
    document.querySelector('#velikost').textContent = data.velikost;

    document.querySelector('.detail__foto').src = 'images/' + data.foto;
    document.querySelector('.detail__foto').alt = data.nazev;

    // data.zoo = [....]

    let polePromises = [];
    data.zoo.forEach(zoo => {
      polePromises.push(this.getZoo(zoo));
    });


    Promise.all(polePromises)
      .then(
        vysledek => this.showZoos(vysledek)
      );

  }


  async getZoo(id) {
    try {
      let response = await fetch(API_BASE + 'zoo/' + id);
      let data = await response.json();
      return data;
    } catch {
      return {}
    }
  }

  showZoos(pole) {
    const zooElement = document.querySelector('#zoo');

    let html = '';
    pole.forEach(zoo => {
      html += `<div class="zoo">${zoo.jmeno}</div>`;
    });

    zooElement.innerHTML = html;
  }






}
