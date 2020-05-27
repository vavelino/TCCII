
this.lista = new Array();

this.Inserir = function (obj) {
    this.lista[this.lista.length] = obj;
}

this.RemoverPrimeiro = function () {
    if (this.lista.length > 0) {
        var obj = this.lista[0];
        this.lista.splice(0, 1);
        return obj;
    } else {
        console.log("Não há objetos na fila.")
        return null
    }
}

this.LerPrimeiro = function () {
    if (this.lista.length > 0) {
        return this.lista[0];
    } else {
        console.log("Não há objetos na fila.")
        return null
    }
}



module.exports = {
 lista:lista
}