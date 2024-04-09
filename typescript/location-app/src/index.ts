/// <reference types="@types/google.maps" />
import { Company } from './Company';
import { User } from './User';
import { CustomMap } from './CustomMap';

const user = new User();
const company = new Company();
const map = new CustomMap('map');

map.initMap();
map.addMarker(user);
map.addMarker(company);

// ======================
// OLDER CODE:
// ======================
// let map;
// async function initMap() {
//   const position = { lat: 0, lng: 0 };

//   // Request needed libraries
//   // @ts-ignore
//   const { Map } = await google.maps.importLibrary('maps');
//   map = new Map(document.getElementById('map') as HTMLElement, {
//     zoom: 4,
//     center: position,
//   });
// }

// initMap();
