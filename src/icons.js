import sun from './img/sun.png';
import cloud from './img/cloud.png';
import partlyCloudy from './img/partly-cloudy.png';
import fog from './img/fog.png';
import rain from './img/rain.png';
import sleet from './img/sleet.png';
import snow from './img/snow.png';
import hail from './img/hail.png';
import thunderstorm from './img/thunderstorm.png';

const icons = [
  { codes: [1000], icon: sun },
  { codes: [1003], icon: partlyCloudy },
  { codes: [1006, 1009], icon: cloud },
  { codes: [1135, 1147], icon: fog },
  {
    codes: [
      1030, 1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1240, 1243, 1246,
    ],
    icon: rain,
  },
  {
    codes: [1069, 1072, 1168, 1171, 1198, 1201, 1204, 1207, 1249, 1252],
    icon: sleet,
  },
  {
    codes: [
      1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1225, 1255, 1258,
    ],
    icon: snow,
  },
  { codes: [1237, 1261, 1264], icon: hail },
  { codes: [1087, 1273, 1276, 1279, 1282], icon: thunderstorm },
];

export default icons;
