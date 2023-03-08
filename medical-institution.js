const fs = require("fs");

class Doktor {
  constructor(ime, prezime, specijalizacija) {
    this.ime = ime;
    this.prezime = prezime;
    this.specijalizacija = specijalizacija;
    this.pacijenti = [];
  }
  zakaziPregled(pacijent, tipTesta, datumTesta) {
    let labPregled = new LabPregled(tipTesta, datumTesta);
    pacijent.labPregledi.push(labPregled);
    console.log(
      `Zakazan pregled ${tipTesta.tip} za pacijenta: ${pacijent.ime} ${pacijent.prezime}, termin je: ${datumTesta}.`
    );
    logAction(
      `Zakazan pregled ${tipTesta.tip} za pacijenta: ${pacijent.ime} ${pacijent.prezime}, termin je: ${datumTesta}.`
    );
  }
}
class Pacijent {
  constructor(ime, prezime, jmbg, brojKartona) {
    this.ime = ime;
    this.prezime = prezime;
    this.jmbg = jmbg;
    this.brojKartona = brojKartona;
    this.doktor = null;
    this.labPregledi = [];
  }
}

class LabPregled {
  constructor(datum, tip, rezultat) {
    this.datum = datum;
    this.tip = tip;
    this.rezultat = rezultat;
  }
}
class KrvniPritisak extends LabPregled {
  constructor(datum, tip, rezultat, gornjaVrednost, donjaVrednost, puls) {
    super(datum, tip, rezultat);
    this.gornjaVrednost = gornjaVrednost;
    this.donjaVrednost = donjaVrednost;
    this.puls = puls;
    this.rezultat = `${this.gornjaVrednost}/${this.donjaVrednost}, puls je: ${this.puls}`;
  }
}

class NivoSeceraUKrvi extends LabPregled {
  constructor(datum, tip, rezultat, vremePoslednjegObroka) {
    super(datum, tip, rezultat);
    this.vremePoslednjegObroka = vremePoslednjegObroka;
  }
}

class NivoHolesterolaUKrvi extends LabPregled {
  constructor(datum, tip, rezultat, vremePoslednjegObroka) {
    super(datum, tip, rezultat);
    this.vremePoslednjegObroka = vremePoslednjegObroka;
  }
}

function logAction(action) {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  fs.appendFileSync("tp.txt", `[${timestamp}] ${action}\n`);
}
