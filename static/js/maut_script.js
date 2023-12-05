const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function change_matrix_shape() {
    var baris = $('#baris').val()
    var kolom = $('#kolom').val()

    if (baris > 64) {
        baris = 64
        $('#baris').val(64)
    } else if (baris < 2) {
        baris = 2
        $('#baris').val(2)
    }

    if (kolom > 18) {
        kolom = 18
        $('#kolom').val(18)
    } else if (kolom < 2) {
        kolom = 2
        $('#kolom').val(2)
    }

    $('#initial-matrix').empty();
    $('#initial-type').empty();
    $('#initial-weight').empty();

    for (let i = 0; i < baris; i++) {
        let temp_html = `<div class="d-flex">`
        for (let j = 0; j < kolom; j++) {
            temp_html += `
            <div class="p-1 small-box">
                <input id="x${ i }${ j }" class="form-control form-control-sm border-black" type="number" min="1" value="1" placeholder="" aria-label="value"
                data-bs-toggle="tooltip" data-bs-placement="bottom"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="A${i+1}-C${j+1}">
            </div>
            `
        }
        temp_html += `</div>`
        $('#initial-matrix').append(temp_html);

        $('#initial-matrix [data-bs-toggle="tooltip"]').tooltip();
    }

    for (let j = 0; j < kolom; j++) {
        let temp_html_type = `
        <div class="p-1">
            <select id="t${j}" class="super-small-box form-select form-select-sm border-black" aria-label="Small select example"
            data-bs-toggle="tooltip" data-bs-placement="bottom"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="C${j+1}">
                <option selected value="benefit">Benefit</option>
                <option value="cost">Cost</option>
            </select>
        </div>
        `
        let temp_html_weight = `
        <div class="p-1 small-box">
            <input id="w${j}" class="form-control form-control-sm border-black" type="number" min="1" value="1" placeholder="" aria-label="value"
            data-bs-toggle="tooltip" data-bs-placement="bottom"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="C${j+1}">
        </div>
        `

        $('#initial-type').append(temp_html_type)
        $('#initial-weight').append(temp_html_weight)
    }
}