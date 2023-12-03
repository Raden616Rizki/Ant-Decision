function change_matrix_shape() {
    var baris = $('#baris').val()
    var kolom = $('#kolom').val()

    $('#initial-matrix').empty();
    $('#initial-type').empty();
    $('#initial-weight').empty();

    for (let i = 0; i < baris; i++) {
        let temp_html = `<div class="row">`
        for (let j = 0; j < kolom; j++) {
            temp_html += `
            <div class="col-1">
                <input id="x${ i }${ j }" class="form-control form-control-sm p-0.5 border-black" type="number" min="1" value="1" placeholder="" aria-label="value">
            </div>
            `
        }
        temp_html += `</div>`
        $('#initial-matrix').append(temp_html);
    }

    for (let j = 0; j < kolom; j++) {
        let temp_html_type = `
        <div class="col-3">
            <select id="t${j}" class="form-select form-select-sm" aria-label="Small select example">
                <option selected value="benefit">Benefit</option>
                <option value="cost">Cost</option>
            </select>
        </div>
        `
        let temp_html_weight = `
        <div class="col-1 ">
            <input id="w${j}" class="form-control form-control-sm p-0.5 border-black" type="number" min="1" value="1" placeholder="" aria-label="value">
        </div>
        `

        $('#initial-type').append(temp_html_type)
        $('#initial-weight').append(temp_html_weight)
    }
}