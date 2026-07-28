import { Status } from './enums';
import { Species } from './species';

export const species: Species[] = [
  {
    id: 1,
    scientificName: 'Acanthurus chirurgus',
    commonName: 'Doctorfish',
    family: 'Acanthuridae',
    genus: 'Acanthurus',
    distributionNotes:
      'Western Atlantic: Bermuda, Florida, Gulf of Mexico, Caribbean Sea, south to Brazil.',
    description:
      'Body oval and strongly compressed. Adults are olive-brown with numerous wavy blue lines on the head and body.',
    status: Status.PUBLISHED,
    imageUrl: 'https://dummyimage.com/600x400/2c3e50/ffffff&text=Doctorfish',
    coordinates: [
      { id: 1, latitude: 18.2208, longitude: -66.5901 },
      { id: 2, latitude: 18.2315, longitude: -66.6103 },
      { id: 3, latitude: 18.2450, longitude: -66.5850 },
    ],
  },
  {
    id: 2,
    scientificName: 'Holacanthus ciliaris',
    commonName: 'Queen Angelfish',
    family: 'Pomacanthidae',
    genus: 'Holacanthus',
    distributionNotes:
      'Western Atlantic: Florida to Brazil, including Gulf of Mexico and Caribbean Sea.',
    description:
      'Brightly colored with a blue body, yellow tail, and a distinctive crown-like spot on the forehead.',
    status: Status.PUBLISHED,
    imageUrl:
      'https://dummyimage.com/600x400/16a085/ffffff&text=Queen+Angelfish',
    coordinates: [
      { id: 4, latitude: 19.2208, longitude: -67.5901 },
      { id: 5, latitude: 20.2315, longitude: -68.6103 },
      { id: 6, latitude: 21.2450, longitude: -69.5850 },
    ],
  },
  {
    id: 3,
    scientificName: 'Sparisoma viride',
    commonName: 'Stoplight Parrotfish',
    family: 'Scaridae',
    genus: 'Sparisoma',
    distributionNotes: 'Western Atlantic: Bermuda and Florida to Brazil.',
    description:
      'Greenish-brown with a distinctive yellow spot on the upper tail base. Males have a bright green head.',
    status: Status.DRAFT,
    imageUrl: 'https://dummyimage.com/600x400/27ae60/ffffff&text=Parrotfish',
    coordinates: [
      { id: 7, latitude: 18.2000, longitude: -65.5000 },
      { id: 8, latitude: 18.3000, longitude: -64.8000 },
    ],
  },
  {
    id: 4,
    scientificName: 'Canthigaster rostrata',
    commonName: 'Sharpnose Puffer',
    family: 'Tetraodontidae',
    genus: 'Canthigaster',
    distributionNotes: 'Caribbean Sea and Gulf of Mexico.',
    description:
      'Small pufferfish with a pointed snout. Brownish body with blue spots and lines.',
    status: Status.PUBLISHED,
    imageUrl: 'https://dummyimage.com/600x400/e67e22/ffffff&text=Puffer',
    coordinates: [
      { id: 9, latitude: 19.5000, longitude: -70.5000 },
      { id: 10, latitude: 20.0000, longitude: -71.5000 },
      { id: 11, latitude: 20.5000, longitude: -72.5000 },
      { id: 12, latitude: 21.0000, longitude: -73.5000 },
    ],
  },
  {
    id: 5,
    scientificName: 'Epinephelus striatus',
    commonName: 'Nassau Grouper',
    family: 'Serranidae',
    genus: 'Epinephelus',
    distributionNotes:
      'Western Atlantic: Bermuda and Florida to Brazil, including Caribbean Sea.',
    description:
      'Large fish with a robust body. Light brown with darker bars and stripes. Can change color dramatically.',
    status: Status.DRAFT,
    imageUrl: 'https://dummyimage.com/600x400/8e44ad/ffffff&text=Grouper',
    coordinates: [],
  },
];
