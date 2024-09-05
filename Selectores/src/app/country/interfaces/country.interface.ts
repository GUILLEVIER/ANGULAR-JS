export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export interface SmallCountry {
  name: string;
  cca3: string;
  borders: string[];
}

export interface Country {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: Status;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: Region;
  subregion: Subregion;
  languages: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini?: { [key: string]: number };
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: Region[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  postalCode?: PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side: Side;
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Currencies {
  MDL?: All;
  BGN?: All;
  EUR?: All;
  ALL?: All;
  SEK?: All;
  CZK?: All;
  GBP?: All;
  GIP?: All;
  RUB?: All;
  BYN?: All;
  CHF?: All;
  HUF?: All;
  ISK?: All;
  PLN?: All;
  MKD?: All;
  RSD?: All;
  DKK?: All;
  FOK?: All;
  UAH?: All;
  BAM?: BAM;
  GGP?: All;
  IMP?: All;
  NOK?: All;
  RON?: All;
  JEP?: All;
}

export interface All {
  name: string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex: string;
}

export enum StartOfWeek {
  Monday = 'monday',
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
  UserAssigned = 'user-assigned',
}

export enum Subregion {
  CentralEurope = 'Central Europe',
  EasternEurope = 'Eastern Europe',
  NorthernEurope = 'Northern Europe',
  SoutheastEurope = 'Southeast Europe',
  SouthernEurope = 'Southern Europe',
  WesternEurope = 'Western Europe',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toCountry(json: string): Country[] {
    return cast(JSON.parse(json), a(r('Country')));
  }

  public static countryToJson(value: Country[]): string {
    return JSON.stringify(uncast(value, a(r('Country'))), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(', ')}]`;
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = '',
  parent: any = ''
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l('Date'), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Country: o(
    [
      { json: 'name', js: 'name', typ: r('Name') },
      { json: 'tld', js: 'tld', typ: u(undefined, a('')) },
      { json: 'cca2', js: 'cca2', typ: '' },
      { json: 'ccn3', js: 'ccn3', typ: u(undefined, '') },
      { json: 'cca3', js: 'cca3', typ: '' },
      { json: 'cioc', js: 'cioc', typ: u(undefined, '') },
      { json: 'independent', js: 'independent', typ: u(undefined, true) },
      { json: 'status', js: 'status', typ: r('Status') },
      { json: 'unMember', js: 'unMember', typ: true },
      { json: 'currencies', js: 'currencies', typ: r('Currencies') },
      { json: 'idd', js: 'idd', typ: r('Idd') },
      { json: 'capital', js: 'capital', typ: a('') },
      { json: 'altSpellings', js: 'altSpellings', typ: a('') },
      { json: 'region', js: 'region', typ: r('Region') },
      { json: 'subregion', js: 'subregion', typ: r('Subregion') },
      { json: 'languages', js: 'languages', typ: m('') },
      { json: 'translations', js: 'translations', typ: m(r('Translation')) },
      { json: 'latlng', js: 'latlng', typ: a(3.14) },
      { json: 'landlocked', js: 'landlocked', typ: true },
      { json: 'borders', js: 'borders', typ: u(undefined, a('')) },
      { json: 'area', js: 'area', typ: 3.14 },
      { json: 'demonyms', js: 'demonyms', typ: r('Demonyms') },
      { json: 'flag', js: 'flag', typ: '' },
      { json: 'maps', js: 'maps', typ: r('Maps') },
      { json: 'population', js: 'population', typ: 0 },
      { json: 'gini', js: 'gini', typ: u(undefined, m(3.14)) },
      { json: 'fifa', js: 'fifa', typ: u(undefined, '') },
      { json: 'car', js: 'car', typ: r('Car') },
      { json: 'timezones', js: 'timezones', typ: a('') },
      { json: 'continents', js: 'continents', typ: a(r('Region')) },
      { json: 'flags', js: 'flags', typ: r('Flags') },
      { json: 'coatOfArms', js: 'coatOfArms', typ: r('CoatOfArms') },
      { json: 'startOfWeek', js: 'startOfWeek', typ: r('StartOfWeek') },
      { json: 'capitalInfo', js: 'capitalInfo', typ: r('CapitalInfo') },
      {
        json: 'postalCode',
        js: 'postalCode',
        typ: u(undefined, r('PostalCode')),
      },
    ],
    false
  ),
  CapitalInfo: o([{ json: 'latlng', js: 'latlng', typ: a(3.14) }], false),
  Car: o(
    [
      { json: 'signs', js: 'signs', typ: a('') },
      { json: 'side', js: 'side', typ: r('Side') },
    ],
    false
  ),
  CoatOfArms: o(
    [
      { json: 'png', js: 'png', typ: u(undefined, '') },
      { json: 'svg', js: 'svg', typ: u(undefined, '') },
    ],
    false
  ),
  Currencies: o(
    [
      { json: 'MDL', js: 'MDL', typ: u(undefined, r('All')) },
      { json: 'BGN', js: 'BGN', typ: u(undefined, r('All')) },
      { json: 'EUR', js: 'EUR', typ: u(undefined, r('All')) },
      { json: 'ALL', js: 'ALL', typ: u(undefined, r('All')) },
      { json: 'SEK', js: 'SEK', typ: u(undefined, r('All')) },
      { json: 'CZK', js: 'CZK', typ: u(undefined, r('All')) },
      { json: 'GBP', js: 'GBP', typ: u(undefined, r('All')) },
      { json: 'GIP', js: 'GIP', typ: u(undefined, r('All')) },
      { json: 'RUB', js: 'RUB', typ: u(undefined, r('All')) },
      { json: 'BYN', js: 'BYN', typ: u(undefined, r('All')) },
      { json: 'CHF', js: 'CHF', typ: u(undefined, r('All')) },
      { json: 'HUF', js: 'HUF', typ: u(undefined, r('All')) },
      { json: 'ISK', js: 'ISK', typ: u(undefined, r('All')) },
      { json: 'PLN', js: 'PLN', typ: u(undefined, r('All')) },
      { json: 'MKD', js: 'MKD', typ: u(undefined, r('All')) },
      { json: 'RSD', js: 'RSD', typ: u(undefined, r('All')) },
      { json: 'DKK', js: 'DKK', typ: u(undefined, r('All')) },
      { json: 'FOK', js: 'FOK', typ: u(undefined, r('All')) },
      { json: 'UAH', js: 'UAH', typ: u(undefined, r('All')) },
      { json: 'BAM', js: 'BAM', typ: u(undefined, r('BAM')) },
      { json: 'GGP', js: 'GGP', typ: u(undefined, r('All')) },
      { json: 'IMP', js: 'IMP', typ: u(undefined, r('All')) },
      { json: 'NOK', js: 'NOK', typ: u(undefined, r('All')) },
      { json: 'RON', js: 'RON', typ: u(undefined, r('All')) },
      { json: 'JEP', js: 'JEP', typ: u(undefined, r('All')) },
    ],
    false
  ),
  All: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'symbol', js: 'symbol', typ: '' },
    ],
    false
  ),
  BAM: o([{ json: 'name', js: 'name', typ: '' }], false),
  Demonyms: o(
    [
      { json: 'eng', js: 'eng', typ: r('Eng') },
      { json: 'fra', js: 'fra', typ: u(undefined, r('Eng')) },
    ],
    false
  ),
  Eng: o(
    [
      { json: 'f', js: 'f', typ: '' },
      { json: 'm', js: 'm', typ: '' },
    ],
    false
  ),
  Flags: o(
    [
      { json: 'png', js: 'png', typ: '' },
      { json: 'svg', js: 'svg', typ: '' },
      { json: 'alt', js: 'alt', typ: u(undefined, '') },
    ],
    false
  ),
  Idd: o(
    [
      { json: 'root', js: 'root', typ: '' },
      { json: 'suffixes', js: 'suffixes', typ: a('') },
    ],
    false
  ),
  Maps: o(
    [
      { json: 'googleMaps', js: 'googleMaps', typ: '' },
      { json: 'openStreetMaps', js: 'openStreetMaps', typ: '' },
    ],
    false
  ),
  Name: o(
    [
      { json: 'common', js: 'common', typ: '' },
      { json: 'official', js: 'official', typ: '' },
      { json: 'nativeName', js: 'nativeName', typ: m(r('Translation')) },
    ],
    false
  ),
  Translation: o(
    [
      { json: 'official', js: 'official', typ: '' },
      { json: 'common', js: 'common', typ: '' },
    ],
    false
  ),
  PostalCode: o(
    [
      { json: 'format', js: 'format', typ: '' },
      { json: 'regex', js: 'regex', typ: '' },
    ],
    false
  ),
  Side: ['left', 'right'],
  Region: ['Asia', 'Europe'],
  StartOfWeek: ['monday'],
  Status: ['officially-assigned', 'user-assigned'],
  Subregion: [
    'Central Europe',
    'Eastern Europe',
    'Northern Europe',
    'Southeast Europe',
    'Southern Europe',
    'Western Europe',
  ],
};
