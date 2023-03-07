class puissance {

    constructor(options = [{ player_one: { name: "toto", color: "yellow" }, player_two: { name: "tata", color: "red" }, grid: { columns: 7, rows: 6 } }], document) {
        this.options = options;
        this.doc = document;
        this.count = 0;
    }

    checkOptions() {
        this.setPlayerOne(this.options[0].player_one);
        this.setPlayerTwo(this.options[0].player_two);
        this.displayGrid();
    }

    displayGrid() {
        this.validCoins = [];
        this.columns = this.options[0].grid.columns;
        this.rows = this.options[0].grid.rows;
        if (this.rows<=12) {
            
            if (this.columns % 2 != 0) {
                this.class = "col";
            } else {
                this.class = "col" + "-" + (12 / this.columns);
            }
        }else{
            this.class = "col";
        }

        for (let index1 = 0; index1 < this.rows; index1++) {

            let row = this.doc.createElement("div");
            row.classList = "row";
            row.style.width = 65 * this.columns + "px";
            this.doc.getElementsByClassName("container-fluid")[0].appendChild(row);
            let row_append = this.doc.getElementsByClassName("row")[index1];
            for (let index2 = 0; index2 < this.columns; index2++) {
                let col = this.doc.createElement("div");
                col.classList = this.class;
                let id = (this.rows - index1) + "-" + (this.columns - index2);
                if (index1 == 1) {
                    this.validCoins.push({ column: index2 + 1, row: index1 });
                }
                col.id = id;
                let text = document.createTextNode(id);
                row_append.appendChild(col);
                this.doc.getElementById(id).appendChild(text);
                this.doc.getElementById(id).addEventListener("click", (event) => {
                    this.addCoin(id, this.doc, this.validCoins, this.columns, this.rows);
                })

            }
        }
        console.log(this.validCoins)
    }

    addCoin(id, doc, validCoins, columns, rows) {

        if (this.count < (columns * rows)) {

            

            if (this.count % 2 != 0) {
                this.player2 = this.getPlayerTwo();

                let index = id.substring(2, 3);

                let id_coin = this.validCoins[index - 1].row + "-" + this.validCoins[index - 1].column;
                this.validCoins[index - 1].row = this.validCoins[index - 1].row + 1;
                if (this.doc.getElementById((rows + "-" + index)).style.backgroundColor == "") {
                    this.doc.getElementById(id_coin).style.backgroundColor = this.player2.color;
                }

                console.log("id coiiiin: "+id_coin);
                let resultat2 = this.checkGain(columns, rows, id_coin, this.player2.color);

                for (let iterator = 0; iterator < resultat2.length; iterator++) {
                    if (resultat2[iterator].length.length == 4) {
                        // console.log("iterator : " + iterator);
                        alert(this.player2.name + " a gagne !");
                    }
                }

            }

            if (this.count % 2 == 0) {
                this.player = this.getPlayerOne();
                let index = id.substring(2, 3);
                let id_coin = this.validCoins[index - 1].row + "-" + this.validCoins[index - 1].column;
                this.validCoins[index - 1].row = this.validCoins[index - 1].row + 1;
                // console.log((rows+"-"+index));
                if (this.doc.getElementById((rows + "-" + index)).style.backgroundColor == "") {
                    this.doc.getElementById(id_coin).style.backgroundColor = this.player.color;
                }
                let resultat = this.checkGain(columns, rows, id_coin, this.player.color);

                for (let iterator = 0; iterator < resultat.length; iterator++) {
                    if (resultat[iterator].length.length == 4) {
                        // console.log("iterator : " + iterator);
                        alert(this.player.name + " a gagne !");
                    }
                }
            }
            this.count++;


        }
    }

    checkGain(columns, rows, id, color) {
        let checkGainHoriz = [];
        let checkGainVertic = [];
        let checkGainDiagTopLeft = [];
        let checkGainDiagTopRight = [];
        let col = id.substring(0, 1);
        let row = id.substring(2, 3);
        let id_col = col;
        let id_gain;
        let response = [];
        // console.log(col);
        let check = true;
        if (col > 1) {
            let max = 3;
            for (let index = 0; index < max; index++) {
                if (id_col - 1 > 0) {
                    id_col--;
                }
                id_gain = id_col + "-" + row;
                if (document.getElementById(id_gain).style.backgroundColor == color && id_col != col) {
                    if (check == true) {
                        checkGainVertic.push(id_gain);
                    }
                } else {
                    check = false;

                }
            }
        }

        if (check == true) {
            checkGainVertic.push(id);
        }

        check = true;

        response.push({ length: Array.from(new Set(checkGainVertic)) });


        id_col = row;

        let max = 3;

        for (let index2 = 0; index2 < max; index2++) {
            if (id_col - 1 > 0) {
                id_col--;

            }

            id_gain = col + "-" + id_col;

            if (document.getElementById(id_gain).style.backgroundColor == color && id_col != row) {
                if (check == true) {
                    checkGainHoriz.push(id_gain);
                }
            } else {
                check = false;

            }
        }

        if (check == true) {
            checkGainHoriz.push(id);
        }

        // console.log("check gain vertic : " + checkGainVertic);

        id_col = row;

        max = 3;

        check = true;

        for (let index4 = 0; index4 < max; index4++) {
            if (id_col < 5) {
                id_col++;
            }
            // console.log(Array.from(new Set(checkGainHoriz)));
            // console.log("id colonne : " + col + " col : " + id_col + "id : " + id);
            // console.log("couleur : " + color)
            id_gain = col + "-" + id_col;
            // console.log(id_gain);
            if (document.getElementById(id_gain).style.backgroundColor == color) {
                if (check == true) {
                    // console.log("test yellow right")
                    checkGainHoriz.push(id_gain);
                }
            } else {
                check = false;

            }
        }

        if (check == true) {
            checkGainHoriz.push(id);
        }

        // console.log("check gain horiz : " + checkGainHoriz);

        // console.log("longeur du tableau horizontale : " + Array.from(new Set(checkGainHoriz)).length);

        response.push({ length: Array.from(new Set(checkGainHoriz)) });


        return response;


    }

    setPlayerOne(option) {
        this.player_one = option;
    }

    setPlayerTwo(option) {
        this.player_two = option;
    }

    getPlayerOne() {
        return this.player_one;
    }

    getPlayerTwo() {
        return this.player_two;
    }
}

export { puissance };