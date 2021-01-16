import Conf from 'conf';
import Table from 'cli-table3';
import { configKey } from './configure';
import {
  validateApiKey,
  validateCityId,
  validateUnits,
  queryCurrentWeather
} from './utils';

export async function now(args) {
  const config = new Conf().get(configKey);
  const apiKey =
    args.apiKey ||
    args.apikey ||
    args['api-key'] ||
    args.key ||
    args.k ||
    config.apiKey;
  if (!validateApiKey(apiKey)) {
    return;
  }
  const cityId =
    args.city ||
    args.cityId ||
    args.cityID ||
    args['city-id'] ||
    args.c ||
    config.cityId;
  if (!validateCityId(cityId)) {
    return;
  }
  const units = args.units || args.unit || args.u || config.units;
  if (!validateUnits(units)) {
    return;
  }

  const { data } = await queryCurrentWeather(cityId, units, apiKey);

  const table = new Table({
    head: ['City', 'DateTime', 'Weather', 'Temp'],
    colWidths: [15, 23, 18, 7],
    wordWrap: true
  });
  table.push([
    data.name,
    new Date(data.dt * 1000).toLocaleString(),
    data.weather[0].description,
    data.main.temp
  ]);
  console.log(table.toString());
}