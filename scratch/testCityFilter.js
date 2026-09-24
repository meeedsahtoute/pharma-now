import { fetchNearbyPharmacies, normalizeCityName } from '../src/services/pharmacyService.ts';
import { MOROCCAN_CITIES_COORDINATES } from '../src/data/moroccanPharmaciesDatabase.ts';

async function runTests() {
  const cities = ['Oujda', 'Nador', 'Casablanca', 'Rabat', 'Tangier', 'Fes', 'Marrakesh', 'Agadir'];

  for (const city of cities) {
    const geo = MOROCCAN_CITIES_COORDINATES[city];
    const res = await fetchNearbyPharmacies(geo.lat, geo.lng, 25000, false, city);
    console.log(`\n=== CITY: ${city} ===`);
    console.log(`Found: ${res.pharmacies.length} pharmacies`);
    const foreign = res.pharmacies.filter(p => normalizeCityName(p.city) !== city);
    if (foreign.length > 0) {
      console.error(`ERROR! Found foreign pharmacies in ${city}:`, foreign.map(p => `${p.name} (${p.city})`));
    } else {
      console.log(`SUCCESS: All ${res.pharmacies.length} pharmacies belong strictly to ${city}!`);
      res.pharmacies.forEach(p => console.log(`  - ${p.name} | ${p.address} | City: ${p.city} | Duty: ${p.dutyInfo.isOnDutyTonight}`));
    }
  }

  console.log('\n=== CITY SWITCHING TEST (Nador -> Oujda -> Casa -> Oujda) ===');
  let res = await fetchNearbyPharmacies(35.1681, -2.9335, 25000, false, 'Nador');
  console.log('1. Nador results count:', res.pharmacies.length, res.pharmacies.map(p => p.name));

  res = await fetchNearbyPharmacies(34.6814, -1.9086, 25000, false, 'Oujda');
  console.log('2. Oujda results count:', res.pharmacies.length, res.pharmacies.map(p => p.name));
  const hasNadorInOujda = res.pharmacies.some(p => p.name.includes('Nador') || p.city === 'Nador');
  console.log('Contains Nador in Oujda results?:', hasNadorInOujda ? 'FAIL (STALE DATA)' : 'PASS (ZERO STALE DATA)');

  res = await fetchNearbyPharmacies(33.5898, -7.6321, 25000, false, 'Casablanca');
  console.log('3. Casa results count:', res.pharmacies.length, res.pharmacies.map(p => p.name));
  const hasOujdaInCasa = res.pharmacies.some(p => p.name.includes('Oujda') || p.city === 'Oujda');
  console.log('Contains Oujda in Casablanca results?:', hasOujdaInCasa ? 'FAIL (STALE DATA)' : 'PASS (ZERO STALE DATA)');
}

runTests();
