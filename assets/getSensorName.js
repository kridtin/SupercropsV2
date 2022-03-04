export function getSensorName(text) {
  if (text == 'weather_temperature') {
    return { name: 'Weather Temperature', vocabulary: '°C' };
  } else if (text == 'weather_humidity') {
    return { name: 'Weather Humidity', vocabulary: '%RH' };
  } else if (text == 'weather_light_lux') {
    return { name: 'Light lux', vocabulary: 'Lux' };
  } else if (text == 'weather_Light_par') {
    return { name: 'Light par', vocabulary: 'umol' };
  } else if (text == 'weather_co2') {
    return { name: 'Weather co2', vocabulary: 'ppm' };
  } else if (text == 'weather_pm25') {
    return { name: 'Weather pm25', vocabulary: 'ug/m' };
  } else if (text == 'weather_pm10') {
    return { name: 'Weather pm10', vocabulary: 'ug/m' };
  } else if (text == 'weather_wind_direc') {
    return { name: 'Wind Direction', vocabulary: '°' };
  } else if (text == 'weather_wind_speed') {
    return { name: 'Wind Speed', vocabulary: 'm/s' };
  } else if (text == 'weather_rain_gauge') {
    return { name: 'Rain gauge', vocabulary: 'mm/h' };
  } else if (text == 'weather_pressure') {
    return { name: 'Weather Pressure', vocabulary: 'kPa' };
  } else if (text == 'weather_o2') {
    return { name: 'Oxygen', vocabulary: 'ppm' };
  } else if (text == 'weather_smoke') {
    return { name: 'Smoke', vocabulary: 'ppm' };
  } else if (text == 'soil_temperature') {
    return { name: 'Soil Temperature', vocabulary: '°C' };
  } else if (text == 'soil_moisture') {
    return { name: 'Soil Moisture', vocabulary: '%' };
  } else if (text == 'soil_ec') {
    return { name: 'Soil EC', vocabulary: 'uS/cm' };
  } else if (text == 'soil_ph') {
    return { name: 'Soil PH', vocabulary: 'pH' };
  } else if (text == 'soil_n') {
    return { name: 'Nitrogen', vocabulary: 'uS/Cm' };
  } else if (text == 'soil_p') {
    return { name: 'Phosphorus', vocabulary: 'uS/Cm' };
  } else if (text == 'soil_k') {
    return { name: 'Potassium', vocabulary: 'uS/Cm' };
  } else if (text == 'water_temperature') {
    return { name: 'Water Temperature', vocabulary: '°C' };
  } else if (text == 'water_ph') {
    return { name: 'Water PH', vocabulary: 'pH' };
  } else if (text == 'water_o2') {
    return { name: 'Water o2', vocabulary: 'mg/L' };
  } else if (text == 'water_ec') {
    return { name: 'Water EC', vocabulary: 'uS/cm' };
  } else if (text == 'water_nh3') {
    return { name: 'Ammonia', vocabulary: 'ppm' };
  } else if (text == 'water_cl') {
    return { name: 'Chlorine', vocabulary: 'mg/L' };
  } else if (text == 'water_phosphate') {
    return { name: 'Phosphate', vocabulary: 'ppm' };
  } else if (text == 'water_nitrite') {
    return { name: 'Nitrite', vocabulary: 'mg/L' };
  } else if (text == 'water_turbidity') {
    return { name: 'Turbidity', vocabulary: 'mg/L' };
  } else if (text == 'gas_pressure') {
    return { name: 'Pressure', vocabulary: 'Pa' };
  } else if (text == 'gas_no2') {
    return { name: 'Nitrogen dioxide', vocabulary: 'ppm' };
  } else if (text == 'gas_so2') {
    return { name: 'Sulfur dioxide', vocabulary: 'ppm' };
  } else if (text == 'gas_pm25') {
    return { name: 'PM 2.5', vocabulary: 'ug/m' };
  } else if (text == 'gas_temperature') {
    return { name: 'Temperature', vocabulary: '°C' };
  } else {
    return text;
  }
}
