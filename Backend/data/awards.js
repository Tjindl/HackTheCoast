// Awards database
module.exports = [
  // Affiliation Scholarships
  {
    id: 'alpha-gamma-delta-626',
    name: 'ALPHA Gamma Delta Award',
    type: 'Scholarship',
    amount: 14000,
    description: 'Awards up to $14,000 endowed by the Alpha Gamma Delta Alumnae to a member of the Alpha Gamma Delta Fraternity who is entering her second or higher year of study.',
    category: 'Affiliation Scholarship',
    eligibility: {
      campus: ['Vancouver'],
      requiredYear: [2, 3, 4],
      affiliation: 'alphaGammaDelta',
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
    },
    requiredDocumentation: ['Letter of recommendation from the Fraternity'],
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/affiliation-scholarships/descriptions-affiliation-scholarships/'
  },
  {
    id: 'canadian-armed-forces-673',
    name: 'CANADIAN Armed Forces Memorial Scholarship',
    type: 'Scholarship',
    amount: 2150,
    description: 'Up to 4 scholarships of $2,150 each for undergraduate and graduate students who are serving or who have served in the Reserves or Regular Forces of Canada, are serving or have served as Cadets, or are descendants of those who have served.',
    category: 'Affiliation Scholarship',
    eligibility: {
      campus: ['Vancouver'],
      affiliation: 'canadianArmedForces',
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
    },
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/affiliation-scholarships/descriptions-affiliation-scholarships/'
  },
  {
    id: 'chan-yuet-lan-8572',
    name: 'Chan Yuet Lan Scholarship',
    type: 'Scholarship',
    amount: 2000,
    description: 'A $2,000 scholarship for an outstanding undergraduate student in any year or any field of study.',
    category: 'General Scholarship',
    eligibility: {
      campus: ['Vancouver'],
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
    },
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/affiliation-scholarships/descriptions-affiliation-scholarships/'
  },
  {
    id: 'beem-credit-union-4707',
    name: 'Beem Credit Union Scholarship',
    type: 'Scholarship',
    amount: 1000,
    description: 'Five scholarships of $1,000 each for students who are active members or immediate family of an active member of Beem Credit Union.',
    category: 'Affiliation Scholarship',
    eligibility: {
      campus: ['Vancouver', 'Okanagan'],
      affiliation: 'beemCreditUnion',
      financialNeed: true,
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
    },
    requiredDocumentation: ['Proof of Beem Credit Union membership (bank statement or letter)'],
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/affiliation-scholarships/descriptions-affiliation-scholarships/'
  },
  {
    id: 'iranian-student-memorial-1465',
    name: 'Iranian Student Memorial Award',
    type: 'Scholarship',
    amount: 4950,
    description: 'Awards totalling $4,950 for undergraduate and graduate students of Persian or Iranian heritage, or who are studying Persian Studies. Established in memory of those who perished aboard Flight PS752 in January 2020.',
    category: 'Heritage Scholarship',
    eligibility: {
      campus: ['Vancouver'],
      affiliation: 'iranianHeritage',
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
    },
    requiredDocumentation: ['Statement explaining Persian/Iranian heritage or Persian Studies interest'],
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/affiliation-scholarships/descriptions-affiliation-scholarships/'
  },
  {
    id: 'ufcw-kim-novak-103154',
    name: 'UFCW Local 1518 Kim Novak Memorial Scholarship',
    type: 'Scholarship',
    amount: 10000,
    description: 'Scholarships totalling $100,000 ($10,000 each) for women in their final year who are members, daughters, or legal wards of UFCW Local 1518 members.',
    category: 'Affiliation Scholarship',
    eligibility: {
      affiliation: 'ufcw',
      gender: ['Female'],
      requiredYear: [4],
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
    },
    requiredDocumentation: ['Letter from UFCW Local 1518 confirming membership'],
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/affiliation-scholarships/descriptions-affiliation-scholarships/'
  },
  {
    id: 'ubc-bursary-program',
    name: 'UBC Bursary Program',
    type: 'Bursary',
    amount: 'Variable',
    description: 'The UBC Bursary program helps fill the gap between assessed educational and living costs and available government assistance. Amount determined by student loan needs assessment, program eligibility, family size, and prior year total family income.',
    category: 'General Bursary',
    eligibility: {
      campus: ['Vancouver'],
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
      studentLoanRequired: true,
      financialNeed: true,
    },
    applicationDeadline: 'September 15 (Winter), June 2 (Summer)',
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/ubc-bursary-program/'
  },
  {
    id: 'indigenous-awards-general',
    name: 'UBC Awards for Indigenous Students',
    type: 'Scholarship',
    amount: 'Variable',
    description: 'Various scholarships and bursaries for Indigenous students, recognizing academic, community, or athletic achievement, and based on financial need.',
    category: 'Indigenous Award',
    eligibility: {
      campus: ['Vancouver'],
      indigenousOnly: true,
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident', 'Refugee'],
    },
    applicationDeadline: 'October 16',
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/awards-indigenous/'
  },
  {
    id: 'disability-awards-general',
    name: 'Awards for Students with Disabilities',
    type: 'Scholarship',
    amount: 'Variable',
    description: 'Various scholarships and bursaries for UBC Vancouver students with disabilities, based on academic achievement, community involvement, leadership, or demonstrated financial need.',
    category: 'Disability Award',
    eligibility: {
      campus: ['Vancouver'],
      hasDisability: true,
      citizenshipRequired: ['Canadian Citizen', 'Permanent Resident'],
    },
    applicationDeadline: 'September 15',
    requiredDocumentation: ['Medical documentation if not registered with Centre for Accessibility'],
    sourceUrl: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/awards-disabilities/'
  },
];
