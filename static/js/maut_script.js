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
    $('#initial-matrix [data-bs-toggle="tooltip"]').tooltip();
}

function open_detail_calculation(id) {
    $(`#detail-${id}`).show()

    $(`#detail-button-${id}`).empty()

    let temp_html = `
        <button type="button" class="btn andes-button" onclick="close_detail_calculation(${id})">Sembunyikan Kalkulasi</button>
    `
    $(`#detail-button-${id}`).append(temp_html)
}

function close_detail_calculation(id) {
    $(`#detail-${id}`).hide()

    $(`#detail-button-${id}`).empty()

    let temp_html = `
        <button type="button" class="btn andes-button" onclick="open_detail_calculation(${id})">Detail Kalkulasi</button>
    `
    $(`#detail-button-${id}`).append(temp_html)
}

function calculate() {
    var baris = $('#baris').val()
    var kolom = $('#kolom').val()

    var matriks = []
    var jenis = []
    var bobot = []

    for (var i = 0; i < baris; i++) {
        matriks[i] = []
        for (var j = 0; j < kolom; j++) {
            value = $(`#x${i}${j}`).val()
            matriks[i][j] = parseFloat(value)
        }
    }

    for (var j = 0; j < kolom; j++) {
        value_jenis = $(`#t${j}`).val()
        jenis[j] = value_jenis

        value_bobot = $(`#w${j}`).val()
        bobot[j] = parseFloat(value_bobot)
    }

    let form_data = new FormData()
    form_data.append('matriks', JSON.stringify(matriks))
    form_data.append('jenis', JSON.stringify(jenis))
    form_data.append('bobot', JSON.stringify(bobot))

    $.ajax({
        type: 'POST',
        url: '/post_maut',
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            // console.log(response)
            result = response.result
            console.log(result)
            // change_result(result)
        },
        error: function (xhr, status, error) {
            // console.log(error)
            alert('Enter a New Matrix or Weight!!!\nInvalid Matrix or Weight!!!')
        }
    })
}

function update_calculation() {
    
}

function change2matrix() {
    var file = $('#file')[0].files[0]

    let form_data = new FormData()
    form_data.append('file', file)

    $.ajax({
        type: 'POST',
        url: '/post_file_maut',
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            data = response.result

            matriks = data.matriks
            jenis = data.jenis
            bobot = data.bobot

            baris = matriks.length
            kolom = matriks[0].length

            $('#baris').val(baris)
            $('#kolom').val(kolom)

            $('#initial-matrix').empty();
            $('#initial-type').empty();
            $('#initial-weight').empty();

            for (let i = 0; i < baris; i++) {
                let temp_html = `<div class="d-flex">`
                for (let j = 0; j < kolom; j++) {
                    temp_html += `
                    <div class="p-1 small-box">
                        <input id="x${ i }${ j }" class="form-control form-control-sm border-black" type="number" min="1" value=${matriks[i][j]} placeholder="" aria-label="value"
                        data-bs-toggle="tooltip" data-bs-placement="bottom"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="A${i+1}-C${j+1}">
                    </div>
                    `
                }
                temp_html += `</div>`
                $('#initial-matrix').append(temp_html);        
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

                value_bobot = 1
                value_jenis = 1

                if (Object.keys(data).length == 3) {
                    value_jenis = jenis[0][j].toLowerCase().trim()
                    value_bobot = bobot[0][j]

                    if (value_jenis == 'cost') {
                        temp_html_type = `
                        <div class="p-1">
                            <select id="t${j}" class="super-small-box form-select form-select-sm border-black" aria-label="Small select example"
                            data-bs-toggle="tooltip" data-bs-placement="bottom"
                            data-bs-custom-class="custom-tooltip"
                            data-bs-title="C${j+1}">
                                <option value="benefit">Benefit</option>
                                <option selected value="cost">Cost</option>
                            </select>
                        </div>
                        `
                    } else {
                        temp_html_type = `
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
                    }
                }
                let temp_html_weight = `
                <div class="p-1 small-box">
                    <input id="w${j}" class="form-control form-control-sm border-black" type="number" min="1" value=${value_bobot} placeholder="" aria-label="value"
                    data-bs-toggle="tooltip" data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="C${j+1}">
                </div>
                `
        
                $('#initial-type').append(temp_html_type)
                $('#initial-weight').append(temp_html_weight)
            }
            $('#initial-matrix [data-bs-toggle="tooltip"]').tooltip();
        },
        error: function (xhr, status, error) {
            // console.log(error)
            alert('Invalid CSV File!!!')
        }
    })
}