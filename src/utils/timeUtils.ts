import type { Pharmacy } from '../types/pharmacy';

export function calculatePharmacyStatus(
  pharmacy: Pharmacy,
  currentTime: Date = new Date(),
  simulatedHour?: number | null
): Pharmacy['calculatedStatus'] {
  let date = new Date(currentTime);
  if (simulatedHour !== undefined && simulatedHour !== null && !isNaN(simulatedHour)) {
    date.setHours(simulatedHour, 0, 0, 0);
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  
  const dayNames: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'> = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];
  const currentDayName = dayNames[date.getDay()];

  // 1. Check On-Duty / Garde status (Night Priority)
  const isNightTime = hours >= 20 || hours < 8;
  if (pharmacy.dutyInfo.isOnDutyTonight) {
    if (pharmacy.dutyInfo.dutyType === '24h_duty') {
      return {
        status: 'on_duty',
        statusLabel: 'ON-DUTY 24H (GARDE)',
        subtext: 'Pharmacy on 24-hour emergency duty today',
        badgeColor: 'amber'
      };
    }
    
    if (isNightTime || pharmacy.dutyInfo.dutyType === 'night_shift') {
      const shiftStart = pharmacy.dutyInfo.shiftStart || '20:00';
      const shiftEnd = pharmacy.dutyInfo.shiftEnd || '08:30';
      return {
        status: 'on_duty',
        statusLabel: 'ON-DUTY NIGHT (GARDE)',
        subtext: `On-Duty Night Shift (${shiftStart} - ${shiftEnd})`,
        badgeColor: 'amber'
      };
    }
  }

  // 2. Check 24/7 Service
  if (pharmacy.services.includes('open_24_7')) {
    return {
      status: 'open',
      statusLabel: 'OPEN 24/7',
      subtext: 'Always open day and night',
      badgeColor: 'emerald'
    };
  }

  // 3. Handle Conflicting Hours Edge Case
  if (pharmacy.openingHours?.isConflicting) {
    return {
      status: 'conflicting',
      statusLabel: 'SCHEDULE CONFLICT',
      subtext: 'Special/Holiday hours unconfirmed • Call first',
      badgeColor: 'yellow'
    };
  }

  // 4. Handle Missing Opening Hours Edge Case
  if (!pharmacy.openingHours || pharmacy.openingHours.hasMissingHours) {
    return {
      status: 'unknown',
      statusLabel: 'HOURS UNKNOWN',
      subtext: 'Opening schedule unverified • Call before traveling',
      badgeColor: 'slate'
    };
  }

  // 5. Normal Day Schedule Evaluation
  const todaySchedule = pharmacy.openingHours[currentDayName];
  if (!todaySchedule || todaySchedule.isClosed) {
    return {
      status: 'closed',
      statusLabel: 'CLOSED TODAY',
      subtext: 'Closed for the day',
      badgeColor: 'rose'
    };
  }

  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const openMin = parseTime(todaySchedule.open);
  const closeMin = parseTime(todaySchedule.close);

  if (currentMinutes >= openMin && currentMinutes < closeMin) {
    const minsUntilClose = closeMin - currentMinutes;
    const hoursLeft = Math.floor(minsUntilClose / 60);
    const minsLeft = minsUntilClose % 60;
    
    let subtext = `Closes at ${todaySchedule.close}`;
    if (hoursLeft > 0) {
      subtext += ` (in ${hoursLeft}h ${minsLeft}m)`;
    } else {
      subtext += ` (Closing soon in ${minsLeft} mins)`;
    }

    return {
      status: 'open',
      statusLabel: 'OPEN NOW',
      subtext,
      badgeColor: 'emerald'
    };
  } else if (currentMinutes < openMin) {
    const minsUntilOpen = openMin - currentMinutes;
    const hoursWait = Math.floor(minsUntilOpen / 60);
    const minsWait = minsUntilOpen % 60;

    return {
      status: 'closed',
      statusLabel: 'CLOSED NOW',
      subtext: `Opens today at ${todaySchedule.open} (in ${hoursWait > 0 ? `${hoursWait}h ` : ''}${minsWait}m)`,
      badgeColor: 'rose'
    };
  } else {
    return {
      status: 'closed',
      statusLabel: 'CLOSED NOW',
      subtext: 'Closed for the evening • Check On-Duty pharmacies',
      badgeColor: 'rose'
    };
  }
}

export function formatDistance(meters?: number): string {
  if (meters === undefined || meters === null) return 'Distance unknown';
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatETA(drivingMin?: number, walkingMin?: number): string {
  if (!drivingMin) return '';
  if (drivingMin < 15 && walkingMin) {
    return `⚡ ${drivingMin} min drive (${walkingMin} min walk)`;
  }
  return `🚗 ${drivingMin} min drive`;
}
