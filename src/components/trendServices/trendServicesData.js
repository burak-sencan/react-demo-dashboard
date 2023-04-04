import {
  //renovation
  renovation_bathroom,
  renovation_house,
  renovation_kitchen,
  renovation_room,

  //decoration
  Decoration_kitchen,
  Decoration_saloon,
  Decoration_home,
  Decoration_inter,

  //sheathing
  sheathing_wall,
  sheathing_wall_inter,
  sheathing_roof,
  sheathing_sheathing,

  //sheathing
  transport_truck,
  transport_truck_2,
  transport_elevator,
  transport_truck_3,

  //sheathing
  clean_home,
  clean_home_2,
  clean_home_3,
  clean_home_4,

  //interior
  interior_architect,
  interiorArchitect_store,
  interiorArchitect_cafe,
  interiorArchitect_office,

  //special
  special_math,
  special_music,
  special_pre_school,
  special_english,
} from '../../assets'

const renovation = [
  {
    id: 552,
    name: 'Banyo Tadilat',
    image: renovation_bathroom,
  },
  {
    id: 656,
    name: 'Mutfak Tadilat',
    image: renovation_house,
  },
  {
    id: 2045,
    name: 'Ev Tadilat',
    image: renovation_kitchen,
  },
  {
    id: 73092,
    name: 'Daire Tadilatı',
    image: renovation_room,
  },
]
const sheathing = [
  {
    id: 33,
    name: 'Dış Cephe Kaplama',
    image: sheathing_wall,
  },
  {
    id: 968,
    name: 'İç Cephe Mantolama',
    image: sheathing_wall_inter,
  },
  {
    id: 3872,
    name: 'Tavan Mantolama',
    image: sheathing_roof,
  },
  {
    id: 252,
    name: 'Mantolama',
    image: sheathing_sheathing,
  },
]
const transportation = [
  {
    id: 142,
    name: 'Evden Eve Nakliyat',
    image: transport_truck,
  },
  {
    id: 501,
    name: 'Şehirler Arası Nakliye',
    image: transport_truck_2,
  },
  {
    id: 461,
    name: 'Asansörlü Nakliyat',
    image: transport_elevator,
  },
  {
    id: 72266,
    name: 'Kısa Mesafe Nakliye',
    image: transport_truck_3,
  },
]
const cleaning = [
  {
    id: 417,
    name: 'İnşaat Sonrası Temizlik',
    image: clean_home,
  },
  {
    id: 669,
    name: 'Boş Ev Temizliği',
    image: clean_home_2,
  },
  {
    id: 42303,
    name: 'Taşınma Öncesi Temizlik',
    image: clean_home_3,
  },
  {
    id: 659,
    name: 'Apartman Temizliği',
    image: clean_home_4,
  },
]
const decoration = [
  {
    id: 476,
    name: 'Mutfak Dekorasyon',
    image: Decoration_kitchen,
  },
  {
    id: 655,
    name: 'Salon Dekorasyon',
    image: Decoration_saloon,
  },
  {
    id: 1063,
    name: 'Ev Dekorasyon',
    image: Decoration_home,
  },
  {
    id: 55862,
    name: 'İç Dekorasyon',
    image: Decoration_inter,
  },
]
const interiorArchitect = [
  {
    id: 100,
    name: 'İç Mimar',
    image: interior_architect,
  },
  {
    id: 3107,
    name: 'Mağaza İç Mimar',
    image: interiorArchitect_store,
  },
  {
    id: 9543,
    name: 'Cafe İç Mimar',
    image: interiorArchitect_cafe,
  },
  {
    id: 19608,
    name: 'Ofis İç Mimar',
    image: interiorArchitect_office,
  },
]
const specialLesson = [
  {
    id: 130,
    name: 'Matematik Özel Ders',
    image: special_math,
  },
  {
    id: 141,
    name: 'Müzik Özel Ders',
    image: special_music,
  },
  {
    id: 394,
    name: 'Okul Öncesi Özel Ders',
    image: special_pre_school,
  },
  {
    id: 37839,
    name: 'Online İngilizce Özel Ders',
    image: special_english,
  },
]

export {
  renovation,
  sheathing,
  transportation,
  cleaning,
  decoration,
  interiorArchitect,
  specialLesson,
}
