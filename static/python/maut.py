import numpy as np
import math

def initiation(matriks, jenis, bobot):
    if type(matriks) != np.ndarray:  
        matriks = np.array(matriks)
    else:
        matriks = matriks
            
    if type(jenis) != np.ndarray:  
        jenis = np.array(jenis)
    else:
        jenis = jenis
            
    if type(bobot) != np.ndarray:  
        bobot = np.array(bobot)
    else:
        bobot = bobot
        
    matriks_ternormalisasi, max_kolom, min_kolom = normalisasi_matriks(matriks, jenis)
    matriks_marginal, euler_calc_list = hitung_marginal(matriks)
    utilitas_akhir = hitung_utilitas(matriks, bobot)
    list_rank = perangkingan_utilitas(utilitas_akhir)
    
    matriks_ternormalisasi = matriks_ternormalisasi.tolist()
    matriks_marginal = matriks_marginal.tolist()
    
    result = {
        'matriks_ternormalisasi': matriks_ternormalisasi,
        'max_kolom': max_kolom,
        'min_kolom': min_kolom,
        'matriks_marginal': matriks_marginal,
        'euler_calc_list': euler_calc_list,
        'utilitas_akhir': utilitas_akhir,
        'list_rank': list_rank,
    }
    
    return result
        
# 1. Normalisasi Matriks

def normalisasi_matriks(matriks, jenis):
  baris = len(matriks)
  kolom = len(matriks[0])

  max_column = []
  min_column = []
  max_value = 0
  min_value = 0

  # Memperoleh nilai max dan min tiap kriteria
  for j in range(kolom):
    max_value = float(np.max(matriks[:, j]))
    min_value = float(np.min(matriks[:, j]))

    max_column.append(max_value)
    min_column.append(min_value)

  matriks_ternormalisasi = np.zeros((baris, kolom))

  for i in range(baris):
    for j in range(kolom):
      value = 0
      if jenis[j].lower() == 'benefit':
        value = (matriks[i][j]-min_column[j])/(max_column[j]-min_column[j])
      elif jenis[j].lower() == 'cost':
        value = 1 + ((min_column[j]-matriks[i][j])/(max_column[j]-min_column[j]))
      else:
        return print('Jenis Tidak Dikenali')

      matriks_ternormalisasi[i][j] = float(value)

  return matriks_ternormalisasi, max_column, min_column

# 2. Menghitung nilai marginal utilitas

def hitung_marginal(matriks):
  baris = len(matriks)
  kolom = len(matriks[0])

  matriks_marginal = np.zeros((baris, kolom))
  euler_calc_list = []

  for i in range(baris):
    for j in range(kolom):
      euler_calc = math.e ** matriks[i][j] ** 2
      euler_calc_list.append((euler_calc))

      value = (euler_calc - 1) / 1.71
      matriks_marginal[i][j] = float(value)

  return matriks_marginal, euler_calc_list

# 3. Mendapatkan nilai utilitas akhir

def hitung_utilitas(matriks, bobot):
  baris = len(matriks)
  kolom = len(matriks[0])

  utilitas_akhir = []

  for i in range(baris):
    utilitas_akhir.append(0)
    for j in range(kolom):
      value = matriks[i][j] * bobot[j]
      
      utilitas_akhir[i] += float(value)

  return utilitas_akhir

# 4. Perangkingan Utilitas Akhir

def perangkingan_utilitas(utilitas_akhir):
  rank = sorted(utilitas_akhir, reverse=True)

  list_rank = []

  for i in utilitas_akhir:
    index = rank.index(i)
    list_rank.append(index + 1)

  return list_rank