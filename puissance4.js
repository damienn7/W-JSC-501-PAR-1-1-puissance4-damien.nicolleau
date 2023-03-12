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
        let coin_table = [];
        let last_coin = [];
        this.validCoins = [];
        this.columns = this.options[0].grid.columns;
        this.rows = this.options[0].grid.rows;
        if (this.rows <= 12) {

            if (this.columns % 2 != 0) {
                this.class = "col";
            } else {
                this.class = "col" + "-" + (12 / this.columns);
            }
        } else {
            this.class = "col";
        }

        for (let index1 = 0; index1 < this.rows; index1++) {

            let row = this.doc.createElement("div");
            row.classList = "row";
            row.style.width = (this.columns*70)+"px";
            row.style.flexWrap = "no-wrap";
            this.doc.getElementsByClassName("container-fluid")[0].appendChild(row);
            let row_append = this.doc.getElementsByClassName("row")[index1];
            for (let index2 = 0; index2 < this.columns; index2++) {
                let col = this.doc.createElement("div");
                col.classList = this.class;
                let width_row = row_append.clientWidth;
                let height_col = width_row / this.rows;
                let id = (this.rows - index1) + "-" + (this.columns - index2);
                if (index1 == 1) {
                    this.validCoins.push({ column: index2 + 1, row: index1 });
                }
                col.id = id;

                col.style.height = "57px";
                col.style.width = "57px";
                col.style.borderRadius = "50%";
                col.style.border = "1px solid blue";
                col.style.margin = "0.35rem";
                col.style.fontSize = "22px";
                // col.style.gap = "1px";
                let text = document.createTextNode(" ");
                row_append.appendChild(col);
                this.doc.getElementById(id).appendChild(text);
                this.doc.getElementById(id).addEventListener("click", (event) => {
                    this.addCoin(id, this.doc, this.validCoins, this.columns, this.rows, coin_table, last_coin);
                })

            }
        }

        let undo = this.doc.createElement("button");
        undo.id = "undo";
        undo.classList = "btn btn-primary";
        undo.Text = "Annuler le coup"; 
        this.doc.getElementsByClassName("container-fluid")[0].appendChild(undo);



        console.log(this.validCoins)
    }

    addCoin(id, doc, validCoins, columns, rows, coin_table, last_coin) {

        if (this.count < (columns * rows)) {



            if (this.count % 2 != 0) {
                this.player2 = this.getPlayerTwo();

                let index = id.substring(2, 3);

                let id_coin = this.validCoins[index - 1].row + "-" + this.validCoins[index - 1].column;

                coin_table.push(id_coin);

                last_coin.push(id_coin);

                if (this.validCoins[index - 1].row != 12) {

                    this.validCoins[index - 1].row = this.validCoins[index - 1].row + 1;
                }

                if (this.doc.getElementById((rows + "-" + index)).style.backgroundColor == "") {
                    this.doc.getElementById(id_coin).style.backgroundColor = this.player2.color;
                }

                // console.log("id coiiiin : " + id_coin);
                // console.log("vaaalid coiins : " + validCoins);
                let resultat2 = this.checkGain(columns, rows, id_coin, this.player2.color);

                for (let iterator = 0; iterator < resultat2.length; iterator++) {
                    if (resultat2[iterator].length.length >= 4) {
                        if (confirm(this.player2.name + " a gagne !")) {
                            for (let index = 0; index < coin_table.length; index++) {
                                const element = coin_table[index];
                                this.doc.getElementById(element).style.backgroundColor="";
                            }
                        }
                    }
                }

            }

            if (this.count % 2 == 0) {
                this.player = this.getPlayerOne();
                let index = id.substring(2, 3);
                let id_coin = this.validCoins[index - 1].row + "-" + this.validCoins[index - 1].column;
                coin_table.push(id_coin);
                last_coin = [id_coin];
                this.validCoins[index - 1].row = this.validCoins[index - 1].row + 1;
                if (this.doc.getElementById((rows + "-" + index)).style.backgroundColor == "") {
                    this.doc.getElementById(id_coin).style.backgroundColor = this.player.color;
                }
                let resultat = this.checkGain(columns, rows, id_coin, this.player.color);

                for (let iterator = 0; iterator < resultat.length; iterator++) {
                    if (resultat[iterator].length.length >= 4) {
                        if (confirm(this.player2.name + " a gagne !")) {
                            for (let index = 0; index < coin_table.length; index++) {
                                const element = coin_table[index];
                                this.doc.getElementById(element).style.backgroundColor="";   
                            }
                        }
                    }
                }
            }

            this.doc.getElementById("undo").addEventListener("click",()=>{
                if (last_coin.length==2) {
                    this.doc.getElementById(last_coin[2]+"").style.backgroundColor="";
                }
                if (last_coin.length==1) {
                    this.doc.getElementById(last_coin[1]+"").style.backgroundColor="";
                }
            });


            this.count++;
        }
    }

    checkGain(columns, rows, id, color) {
        let checkGainHoriz = [];
        let checkGainVertic = [];
        let checkGainDiagTopLeft = [];
        let checkGainDiagTopRight = [];
        let checkGainHoriz_two = [];
        let checkGainDiagTopLeft_two = [];
        let checkGainDiagTopRight_two = [];
        let col = id.split("-")[0];
        let row = id.split("-")[1];
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
                if (document.getElementById(id_gain).style.backgroundColor == color) {
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


        /**
         * joueur => checkGainHoriz
         * 
        */

        id_col = row;

        let max = 3;
        // horizontale 
        for (let index2 = 0; index2 < max; index2++) {
            console.log("index 2 : " + index2);
            if (id_col - 1 > 0) {
                id_col--;

            }

            id_gain = col + "-" + id_col;
            console.log("document.getElementById(" + id_gain + ")");
            if (document.getElementById(id_gain).style.backgroundColor == color && id_col != row) {
                if (check == true) {
                    checkGainHoriz.push(id_gain);
                }
            } else {
                check = false;

            }
        }

        // if (check == true) {
        // checkGainHoriz.push(id);
        // }

        // let col = id.substring(0, 1); => 6-4
        // let row = id.substring(2, 3);         

        console.log("check gain horiz : " + checkGainHoriz);

        id_col = row;

        max = 3;

        check = true;

        for (let index4 = 0; index4 < max; index4++) {
            if (parseInt(id_col) + 1 <= columns) {
                id_col++;
            }

            console.log(parseInt(id_col) + 1 + "     " + columns);
            // console.log(Array.from(new Set(checkGainHoriz)));
            // console.log("id colonne : " + col + " col : " + id_col + "id : " + id);
            // console.log("couleur : " + color)
            id_gain = col + "-" + id_col;
            // console.log(id_gain);
            console.log("document.getElementById(" + id_gain + ")");
            if (document.getElementById(id_gain).style.backgroundColor == color && id_col != row) {
                if (check == true) {
                    // console.log("test yellow right")
                    checkGainHoriz.push(id_gain);
                }
            } else {
                check = false;

            }
        }

        // if (check == true) {
        checkGainHoriz.push(id);
        // }

        console.log("check gain horiz : " + checkGainHoriz);

        response.push({ length: Array.from(new Set(checkGainHoriz)) });

        // console.log("check gain horiz : " + checkGainHoriz);



        /**
         * boucles conditions diagonales
         */
        console.log("longeur du tableau horizontale : " + Array.from(new Set(checkGainHoriz)).length);

        let id_row;

        id_col = row;

        id_row = col;

        max = 3;

        check = true;


        // { columns: 9, rows: 12 }

        let check_max = false;

        let id_max;

        let id_max2;


        for (let index4 = 0; index4 <= max; index4++) {
            let id_row_max = (columns - col) + parseInt(col);
            let id_col_max = (row - (columns - col)) * -1;
            console.log("id_row max : " + id_row_max + ", id_col max : " + id_col_max);
            if (id_row_max <= columns) {
                console.log("decremmmm_step1");
                if ((parseInt(id_row) - 1) > 0 && parseInt(id_col) + 1 <= columns) {
                    console.log("decremmmm");
                    id_col++;
                    id_row--;
                }
            }
            console.log(Array.from(new Set(checkGainDiagTopLeft)));
            console.log("id colonne diag : " + col + " id_col_gain : " + id_col + " id_row_gain : " + id_row + "id : " + id);
            console.log("couleur diag : " + color)
            id_gain = id_row + "-" + id_col;
            for (let _index = 1; _index <= columns; _index++) {

                id_max = rows + 1 + "-" + _index + 1;
                if (_index <= 6) {

                    id_max2 = _index + 1 + "-" + columns + 1;
                }

                if (id_max == id_gain || id_max2 == id_gain) {
                    id_col--;
                    id_row++;
                    check_max = true
                }

            }
            if (id_row > rows || id_col < 1 || id_row < 1 || id_col > columns) {
                id_col--;
                id_row++;
            }
            id_gain = id_row + "-" + id_col;
            console.log("id_gain diag : " + id_gain);
            if (document.getElementById(id_gain).style.backgroundColor == color && check_max == false) {
                if (check == true) {
                    console.log("id_gain pushed");
                    checkGainDiagTopLeft.push(id_gain);
                }
            } else {
                check = false;

            }

        }

        check_max = false;

        for (let index4 = 0; index4 <= max; index4++) {
            let id_row_max = (columns - col) + parseInt(col);
            let id_col_max = (row - (columns - col)) * -1;
            console.log("id_row max : " + id_row_max + ", id_col max : " + id_col_max);
            if (id_row_max <= columns) {
                console.log("decremmmm_step1");
                if ((parseInt(id_col) - 1) > 0) {
                    console.log("decremmmm");
                    id_col--;
                    id_row++;
                }
            }
            console.log(Array.from(new Set(checkGainDiagTopLeft)));
            console.log("id colonne diag : " + col + " id_col_gain : " + id_col + " id_row_gain : " + id_row + "id : " + id);
            console.log("couleur diag : " + color);

            id_gain = id_row + "-" + id_col;
            for (let _index = 1; _index <= columns; _index++) {

                id_max = rows + 1 + "-" + _index + 1;
                if (_index <= 6) {

                    id_max2 = _index + 1 + "-" + columns + 1;
                }

                if (id_max == id_gain || id_max2 == id_gain) {
                    id_col++;
                    id_row--;
                    check_max = true
                }

            }
            if (id_row > rows || id_col < 1 || id_row < 1 || id_col > columns) {
                id_col++;
                id_row--;
            }
            id_gain = id_row + "-" + id_col;
            console.log("id_gain diag : " + id_gain);
            if (document.getElementById(id_gain).style.backgroundColor == color && check_max == false) {
                if (check == true) {
                    console.log("id_gain pushed");
                    checkGainDiagTopLeft.push(id_gain);
                }
            } else {
                check = false;

            }

        }

        check_max = false;

        // if (check == true) {
        //     console.log("id og pushed");
        checkGainDiagTopLeft.push(id);
        // }

        console.log("longeur du tableau diagonale top left : " + Array.from(new Set(checkGainDiagTopLeft)).length);

        response.push({ length: Array.from(new Set(checkGainDiagTopLeft)) });

        id_col = row;

        id_row = col;

        max = 3;

        check = true;






        // { columns: 9, rows: 12 }


        for (let index4 = 0; index4 <= max; index4++) {
            let id_row_max = (columns - col) + parseInt(col);
            let id_col_max = (row - (columns - col)) * -1;
            console.log("id_row max : " + id_row_max + ", id_col max : " + id_col_max);
            if (id_row_max <= columns) {
                console.log("decremmmm_step1");
                if ((parseInt(id_col) + 1) <= columns) {
                    console.log("decremmmm");
                    id_col++;
                    id_row++;
                }
            }
            console.log(Array.from(new Set(checkGainDiagTopRight)));
            console.log("id colonne diag : " + col + " id_col_gain : " + id_col + " id_row_gain : " + id_row + "id : " + id);
            console.log("couleur diag : " + color)
            id_gain = id_row + "-" + id_col;
            for (let _index = 1; _index <= columns; _index++) {

                id_max = rows + 1 + "-" + _index + 1;
                if (_index <= 6) {

                    id_max2 = _index + 1 + "-" + columns + 1;
                }

                if (id_max == id_gain || id_max2 == id_gain) {
                    id_col--;
                    id_row--;
                    check_max = true
                }

            }
            if (id_row > rows || id_col < 1 || id_row < 1 || id_col > columns) {
                id_col--;
                id_row--;
            }
            id_gain = id_row + "-" + id_col;
            console.log("id_gain diag : " + id_gain);
            if (document.getElementById(id_gain).style.backgroundColor == color && check_max == false) {
                if (check == true) {
                    console.log("id_gain pushed");
                    checkGainDiagTopRight.push(id_gain);
                }
            } else {
                check = false;

            }

        }

        check_max = false;

        for (let index4 = 0; index4 <= max; index4++) {
            let id_row_max = (columns - col) + parseInt(col);
            let id_col_max = (row - (columns - col)) * -1;
            console.log("id_row max : " + id_row_max + ", id_col max : " + id_col_max);
            if (id_row_max <= columns) {
                console.log("decremmmm_step1");
                if ((parseInt(id_row) - 1) > 0) {
                    console.log("decremmmm");
                    id_col--;
                    id_row--;
                }
            }
            console.log(Array.from(new Set(checkGainDiagTopRight)));
            console.log("id colonne diag top right -- : " + col + " id_col_gain : " + id_col + " id_row_gain : " + id_row + "id : " + id);
            console.log("couleur diag : " + color);
            id_gain = id_row + "-" + id_col;
            for (let _index = 1; _index <= columns; _index++) {

                id_max = rows + 1 + "-" + _index + 1;
                if (_index <= 6) {

                    id_max2 = _index + 1 + "-" + columns + 1;
                }

                if (id_max == id_gain || id_max2 == id_gain) {
                    id_col++;
                    id_row++;
                    check_max = true
                }

            }
            if (id_row > rows || id_col < 1 || id_row < 1 || id_col > columns) {
                id_col++;
                id_row++;
            }
            id_gain = id_row + "-" + id_col;
            console.log("id_gain diag : " + id_gain);
            // if (check_max == false) {


            console.log("check : " + check);
            if (document.getElementById(id_gain).style.backgroundColor == color) {
                check = true;
                if (check == true) {
                    console.log("id_gain pushed");
                    checkGainDiagTopRight.push(id_gain);
                }
            } else {
                check = false;

            }
            // }

        }

        checkGainDiagTopRight.push(id);

        console.log("longeur du tableau diagonale top left : " + Array.from(new Set(checkGainDiagTopRight)));

        response.push({ length: Array.from(new Set(checkGainDiagTopRight)) });


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