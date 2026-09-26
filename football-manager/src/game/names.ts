// Name pools for generated (regen) players and nationality labels.
import type { Rng } from './rng';

interface Pool {
  first: string[];
  last: string[];
}

const POOLS: Record<string, Pool> = {
  ENG: {
    first: ['Harry', 'Jack', 'Oliver', 'Charlie', 'George', 'Alfie', 'Freddie', 'Leo', 'Archie', 'Theo', 'Oscar', 'Josh', 'Callum', 'Kai', 'Reece', 'Tyler', 'Jaden', 'Ethan', 'Mason', 'Harvey', 'Louie', 'Ryan', 'Dan', 'Sam', 'Tom', 'Ben', 'Joe', 'Lewis', 'Rhys', 'Kian'],
    last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright', 'Thompson', 'Evans', 'Walker', 'White', 'Roberts', 'Green', 'Hall', 'Wood', 'Jackson', 'Clarke', 'Hughes', 'Edwards', 'Cole', 'Barnes', 'Palmer', 'Stone', 'Fletcher', 'Marsh', 'Price', 'Hart', 'Webb', 'Mills', 'Doyle', 'Okafor', 'Mensah', 'Bennett', 'Lloyd', 'Kerr', 'Ward', 'Gray'],
  },
  ESP: {
    first: ['Pablo', 'Álvaro', 'Hugo', 'Iker', 'Javi', 'Sergio', 'Adrián', 'Dani', 'Marc', 'Pau', 'Unai', 'Jon', 'Aitor', 'Carlos', 'Mario', 'Rubén', 'Diego', 'Nico', 'Gonzalo', 'Raúl'],
    last: ['García', 'Fernández', 'González', 'Rodríguez', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Serrano', 'Blanco', 'Molina', 'Castro', 'Ortega', 'Rubio'],
  },
  FRA: {
    first: ['Lucas', 'Hugo', 'Théo', 'Nathan', 'Enzo', 'Mathis', 'Rayan', 'Yanis', 'Kylian', 'Adam', 'Noah', 'Maxence', 'Bastien', 'Mamadou', 'Ibrahim', 'Moussa', 'Kévin', 'Jordan', 'Wesley', 'Yann'],
    last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bertrand', 'Roux', 'Vincent', 'Fournier', 'Morel', 'Diallo', 'Traoré', 'Koné', 'Camara', 'Diaby', 'Sissoko', 'Mendy', 'Kanté', 'Bamba', 'Touré'],
  },
  GER: {
    first: ['Lukas', 'Leon', 'Finn', 'Jonas', 'Felix', 'Paul', 'Luca', 'Maximilian', 'Niklas', 'Tim', 'Jan', 'Moritz', 'Julian', 'Florian', 'Kevin', 'Tom', 'Nico', 'Ben', 'Elias', 'Noah'],
    last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Koch', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Braun', 'Zimmermann', 'Krüger', 'Hartmann', 'Lange', 'Werner', 'Krause', 'Lehmann', 'Kaiser', 'Fuchs', 'Vogel', 'Keller', 'Frank', 'Berger'],
  },
  ITA: {
    first: ['Lorenzo', 'Alessandro', 'Matteo', 'Francesco', 'Andrea', 'Leonardo', 'Riccardo', 'Tommaso', 'Gabriele', 'Federico', 'Davide', 'Marco', 'Nicolò', 'Simone', 'Luca', 'Giovanni', 'Filippo', 'Pietro', 'Samuele', 'Mattia'],
    last: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri', 'Fontana', 'Santoro', 'Mariani', 'Rinaldi', 'Caruso', 'Ferri', 'Galli', 'Martini', 'Leone'],
  },
  POR: {
    first: ['João', 'Rodrigo', 'Tiago', 'Gonçalo', 'Diogo', 'Rafael', 'Francisco', 'Pedro', 'Martim', 'Tomás', 'Gabriel', 'Lucas', 'Matheus', 'Vinícius', 'Gustavo', 'Felipe', 'Caio', 'Igor', 'Luan', 'Bruno'],
    last: ['Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa', 'Rodrigues', 'Martins', 'Sousa', 'Fernandes', 'Gonçalves', 'Gomes', 'Lopes', 'Marques', 'Alves', 'Almeida', 'Ribeiro', 'Pinto', 'Carvalho', 'Teixeira', 'Moreira', 'Correia', 'Mendes', 'Nunes', 'Soares', 'Vieira', 'Monteiro', 'Cardoso', 'Rocha', 'Neves'],
  },
  NED: {
    first: ['Daan', 'Sem', 'Levi', 'Luuk', 'Milan', 'Jesse', 'Thijs', 'Bram', 'Lars', 'Stijn', 'Ruben', 'Jurriën', 'Xavi', 'Quinten', 'Mats'],
    last: ['de Jong', 'Jansen', 'de Vries', 'van den Berg', 'van Dijk', 'Bakker', 'Visser', 'Smit', 'Meijer', 'de Boer', 'Mulder', 'de Groot', 'Bos', 'Vos', 'Peters', 'Hendriks', 'van Leeuwen', 'Dekker', 'Brouwer', 'de Wit'],
  },
  SCA: {
    first: ['Oscar', 'William', 'Lucas', 'Elias', 'Emil', 'Mathias', 'Magnus', 'Jonas', 'Oliver', 'Noah', 'Viktor', 'Anton', 'Isak', 'Sander', 'Erik'],
    last: ['Hansen', 'Johansen', 'Olsen', 'Larsen', 'Andersen', 'Pedersen', 'Nilsen', 'Jensen', 'Nielsen', 'Karlsson', 'Andersson', 'Johansson', 'Lindqvist', 'Berg', 'Haugen', 'Dahl', 'Lund', 'Holm', 'Strand', 'Eriksen'],
  },
  AFR: {
    first: ['Kwame', 'Samuel', 'Emmanuel', 'Victor', 'Ibrahim', 'Moussa', 'Abdou', 'Chidi', 'Kofi', 'Yaw', 'Issa', 'Amadou', 'Sadio', 'Joseph', 'Daniel'],
    last: ['Mensah', 'Boateng', 'Osei', 'Adeyemi', 'Okonkwo', 'Diouf', 'Ndiaye', 'Sarr', 'Kouassi', 'Traoré', 'Eto', 'Nwosu', 'Asante', 'Owusu', 'Bamba', 'Konaté', 'Coulibaly', 'Ekong', 'Oduya', 'Mbeki'],
  },
  SAM: {
    first: ['Santiago', 'Matías', 'Thiago', 'Nicolás', 'Facundo', 'Lautaro', 'Juan', 'Franco', 'Valentín', 'Agustín', 'Luis', 'Kevin', 'Brian', 'Joaquín', 'Enzo'],
    last: ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez', 'Pérez', 'Romero', 'Sosa', 'Álvarez', 'Torres', 'Ruiz', 'Benítez', 'Acosta', 'Medina', 'Herrera', 'Suárez', 'Aguirre', 'Giménez'],
  },
};

const NAT_POOL: Record<string, string> = {
  ENG: 'ENG', SCO: 'ENG', WAL: 'ENG', NIR: 'ENG', IRL: 'ENG', USA: 'ENG', CAN: 'ENG', AUS: 'ENG', JAM: 'ENG',
  ESP: 'ESP', MEX: 'SAM', ARG: 'SAM', URU: 'SAM', COL: 'SAM', CHI: 'SAM', PAR: 'SAM', ECU: 'SAM', VEN: 'SAM',
  FRA: 'FRA', BEL: 'FRA', SUI: 'GER', GER: 'GER', AUT: 'GER', ITA: 'ITA', POR: 'POR', BRA: 'POR',
  NED: 'NED', DEN: 'SCA', NOR: 'SCA', SWE: 'SCA', FIN: 'SCA', ISL: 'SCA',
  SEN: 'FRA', CIV: 'FRA', MLI: 'FRA', CMR: 'FRA', GUI: 'FRA', COD: 'FRA', ALG: 'FRA', MAR: 'FRA', TUN: 'FRA',
  NGA: 'AFR', GHA: 'AFR', GAM: 'AFR', BFA: 'AFR', ANG: 'POR', RSA: 'AFR', ZAM: 'AFR', ZIM: 'AFR',
};

export function randomName(rng: Rng, nat: string): { name: string; short: string } {
  const pool = POOLS[NAT_POOL[nat] ?? 'ENG'] ?? POOLS.ENG;
  const first = rng.pick(pool.first);
  const last = rng.pick(pool.last);
  return { name: `${first} ${last}`, short: last };
}

/** Nationality mix for youth intakes by league country */
export const YOUTH_NATS: Record<string, [string, number][]> = {
  ENG: [['ENG', 70], ['IRL', 5], ['SCO', 5], ['WAL', 5], ['NGA', 3], ['GHA', 3], ['JAM', 3], ['FRA', 3], ['POR', 3]],
  ESP: [['ESP', 82], ['ARG', 4], ['MAR', 4], ['FRA', 3], ['COL', 3], ['URU', 2], ['BRA', 2]],
  ITA: [['ITA', 78], ['ARG', 5], ['BRA', 4], ['SEN', 3], ['ALB', 3], ['CRO', 3], ['NGA', 2], ['FRA', 2]],
  GER: [['GER', 75], ['AUT', 5], ['TUR', 5], ['POL', 3], ['CRO', 3], ['KVX', 3], ['GHA', 3], ['NED', 3]],
  FRA: [['FRA', 65], ['SEN', 6], ['CIV', 6], ['MLI', 5], ['CMR', 4], ['ALG', 5], ['MAR', 5], ['BEL', 4]],
};

export const NATIONS: Record<string, string> = {
  ENG: 'England', SCO: 'Scotland', WAL: 'Wales', NIR: 'Northern Ireland', IRL: 'Republic of Ireland',
  ESP: 'Spain', FRA: 'France', GER: 'Germany', ITA: 'Italy', POR: 'Portugal', NED: 'Netherlands',
  BEL: 'Belgium', BRA: 'Brazil', ARG: 'Argentina', URU: 'Uruguay', COL: 'Colombia', CHI: 'Chile',
  PAR: 'Paraguay', ECU: 'Ecuador', VEN: 'Venezuela', MEX: 'Mexico', USA: 'United States', CAN: 'Canada',
  JAM: 'Jamaica', DEN: 'Denmark', NOR: 'Norway', SWE: 'Sweden', FIN: 'Finland', ISL: 'Iceland',
  SUI: 'Switzerland', AUT: 'Austria', POL: 'Poland', CZE: 'Czechia', SVK: 'Slovakia', HUN: 'Hungary',
  CRO: 'Croatia', SRB: 'Serbia', SVN: 'Slovenia', BIH: 'Bosnia & Herzegovina', MNE: 'Montenegro',
  ALB: 'Albania', KVX: 'Kosovo', MKD: 'North Macedonia', GRE: 'Greece', TUR: 'Türkiye', ROU: 'Romania',
  BUL: 'Bulgaria', UKR: 'Ukraine', RUS: 'Russia', GEO: 'Georgia', ARM: 'Armenia', EST: 'Estonia',
  LTU: 'Lithuania', LUX: 'Luxembourg', CYP: 'Cyprus', ISR: 'Israel', UZB: 'Uzbekistan',
  MAR: 'Morocco', ALG: 'Algeria', TUN: 'Tunisia', EGY: 'Egypt', SEN: 'Senegal', CIV: "Côte d'Ivoire",
  MLI: 'Mali', GUI: 'Guinea', GNB: 'Guinea-Bissau', CMR: 'Cameroon', NGA: 'Nigeria', GHA: 'Ghana',
  GAM: 'Gambia', BFA: 'Burkina Faso', COD: 'DR Congo', ANG: 'Angola', RSA: 'South Africa',
  ZAM: 'Zambia', ZIM: 'Zimbabwe', MOZ: 'Mozambique', GAB: 'Gabon', TOG: 'Togo', BEN: 'Benin',
  NIG: 'Niger', SLE: 'Sierra Leone', CTA: 'Central African Rep.', EQG: 'Equatorial Guinea',
  CPV: 'Cape Verde', JPN: 'Japan', KOR: 'South Korea', AUS: 'Australia', NZL: 'New Zealand',
  IDN: 'Indonesia', KSA: 'Saudi Arabia', JOR: 'Jordan', HON: 'Honduras', HAI: 'Haiti', PAN: 'Panama',
  DOM: 'Dominican Rep.', SUR: 'Suriname', BER: 'Bermuda', GUF: 'French Guiana',
};
