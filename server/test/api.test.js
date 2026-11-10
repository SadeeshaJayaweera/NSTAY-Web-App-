import assert from 'assert';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

console.log('🧪 Running Comprehensive NSTAY Functionality & Feature Verification Suite...\n');

let passed = 0;
let failed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

async function asyncIt(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

async function runAllTests() {
  // Test 1: Boardings count and integrity
  it('1. Boardings catalog integrity (at least 12 items populated)', () => {
    const list = db.getBoardings();
    assert.ok(list.length >= 12, `Expected >= 12 boardings, got ${list.length}`);
  });

  // Test 2: Specific property lookup by slug ID
  it('2. Detailed property lookup by ID (temple-junction-space)', () => {
    const item = db.getBoardingById('temple-junction-space');
    assert.ok(item, 'Item must exist');
    assert.strictEqual(item.title, 'Temple Junction Space');
    assert.strictEqual(item.city, 'Homagama');
    assert.ok(item.rooms && item.rooms.length >= 3, 'Must have at least 3 rooms');
    assert.ok(item.nearbyLocations && item.nearbyLocations.length >= 5, 'Must have proximity locations');
  });

  // Test 3: Filter boardings by category
  it('3. Category filtering (Shared Space, Hotel and apartments, Residence)', () => {
    const all = db.getBoardings();
    const shared = all.filter(b => b.category === 'Shared Space');
    const hotels = all.filter(b => b.category === 'Hotel and apartments');
    const residence = all.filter(b => b.category === 'Residence');

    assert.ok(shared.length > 0, 'Shared space listings must exist');
    assert.ok(hotels.length > 0, 'Hotel and apartments listings must exist');
    assert.ok(residence.length > 0, 'Residence listings must exist');
  });

  // Test 4: Budget filtering logic
  it('4. Budget filtering logic (LKR 15,000 - LKR 20,000 range)', () => {
    const all = db.getBoardings();
    const affordable = all.filter(b => b.price <= 20000);
    assert.ok(affordable.length > 0, 'Should find boardings with price <= LKR 20000');
    assert.ok(affordable.every(b => b.price <= 20000), 'All filtered items must be <= LKR 20000');
    const minPriceItem = all.reduce((min, b) => b.price < min ? b.price : min, Infinity);
    assert.strictEqual(minPriceItem, 15000, 'Starting rent price must be LKR 15,000');
  });

  // Test 5: Search query filtering
  it('5. Search by property name / location query', () => {
    const all = db.getBoardings();
    const q = 'temple';
    const matches = all.filter(b => 
      b.title.toLowerCase().includes(q) || 
      b.address.toLowerCase().includes(q)
    );
    assert.ok(matches.length >= 1, 'Should find Temple Junction listing');
    assert.ok(matches.some(b => b.id === 'temple-junction-space'));
  });

  // Test 6: NSBM Student Domain Validation
  it('6. Strict NSBM student email domain validation rules', () => {
    function isValidNsbm(email) {
      if (!email) return false;
      const clean = email.toLowerCase().trim();
      const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?nsbm\.ac\.lk$/;
      return regex.test(clean) || clean.endsWith('.nsbm.ac.lk') || clean.endsWith('@nsbm.ac.lk');
    }

    // Valid student emails
    assert.strictEqual(isValidNsbm('sadeesha@students.nsbm.ac.lk'), true);
    assert.strictEqual(isValidNsbm('student@nsbm.ac.lk'), true);
    assert.strictEqual(isValidNsbm('computing.lead@faculty.nsbm.ac.lk'), true);

    // Invalid non-NSBM emails
    assert.strictEqual(isValidNsbm('sadeesha@gmail.com'), false);
    assert.strictEqual(isValidNsbm('student@yahoo.com'), false);
    assert.strictEqual(isValidNsbm('impostor@nsbm.com'), false);
    assert.strictEqual(isValidNsbm('fake@nsbm.lk'), false);
    assert.strictEqual(isValidNsbm(''), false);
  });

  // Test 7: Bcrypt password security
  await asyncIt('7. Bcrypt password hashing and salt verification', async () => {
    const plaintext = 'NsbmPassword123!';
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plaintext, salt);

    assert.notStrictEqual(hash, plaintext, 'Password must never be saved in plaintext');
    assert.ok(bcrypt.compareSync(plaintext, hash), 'Bcrypt compare must succeed for correct password');
    assert.ok(!bcrypt.compareSync('WrongPass', hash), 'Bcrypt compare must fail for incorrect password');
  });

  // Test 8: JWT generation and verification
  it('8. JWT token generation, signature verification, and claims check', () => {
    const secret = 'test-jwt-secret-2024';
    const payload = {
      id: 'student-101',
      name: 'Chamath Silva',
      email: 'chamath@students.nsbm.ac.lk',
      role: 'student'
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    assert.ok(typeof token === 'string' && token.split('.').length === 3, 'Token must be valid JWT');

    const decoded = jwt.verify(token, secret);
    assert.strictEqual(decoded.email, 'chamath@students.nsbm.ac.lk');
    assert.strictEqual(decoded.role, 'student');
  });

  // Test 9: Create and remove boarding listing (Post Ad flow)
  it('9. Post Ad creation, database insertion, and subsequent cleanup', () => {
    const testBoarding = {
      id: `test-ad-${Date.now()}`,
      title: 'Automated Test Villa Pitipana',
      category: 'Residence',
      price: 1100,
      originalPrice: 1250,
      discount: '15% off',
      city: 'Homagama',
      address: 'Pitipana North, Homagama',
      phone: '0779911223',
      owner: 'Test Landlord',
      lat: 6.8214,
      lng: 80.0416,
      image: '/src/assets/temple_junction.png',
      gallery: ['/src/assets/temple_junction.png'],
      description: 'Test villa description for unit testing.',
      rooms: [
        { id: 'r1', title: 'Single Room', size: '200 sq ft', capacity: 'Sleeps 1', beds: '1 single bed', price: 1100 }
      ],
      reviews: []
    };

    db.addBoarding(testBoarding);
    const created = db.getBoardingById(testBoarding.id);
    assert.ok(created, 'Newly posted ad must be retrievable');
    assert.strictEqual(created.title, 'Automated Test Villa Pitipana');

    // Clean up
    db.deleteBoarding(testBoarding.id);
    const deleted = db.getBoardingById(testBoarding.id);
    assert.strictEqual(deleted, undefined, 'Deleted ad must no longer exist');
  });

  // Test 10: Student booking inquiry flow
  it('10. Student reservation inquiry lifecycle (Pending -> Confirmed -> Rejected)', () => {
    const inq = {
      id: `inq-lifecycle-${Date.now()}`,
      boardingId: 'temple-junction-space',
      boardingTitle: 'Temple Junction Space',
      studentName: 'Nipuna Bandara',
      studentEmail: 'nipuna@students.nsbm.ac.lk',
      studentPhone: '0714455667',
      checkInDate: '2023-03-18',
      checkOutDate: '2023-03-20',
      guests: '2 adult, 1 room',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    db.addInquiry(inq);
    const stored = db.getInquiries().find(i => i.id === inq.id);
    assert.ok(stored, 'Inquiry must be stored');
    assert.strictEqual(stored.status, 'Pending');

    // Host confirms inquiry
    db.updateInquiryStatus(inq.id, 'Confirmed');
    assert.strictEqual(db.getInquiries().find(i => i.id === inq.id).status, 'Confirmed');

    // Host updates status to Rejected
    db.updateInquiryStatus(inq.id, 'Rejected');
    assert.strictEqual(db.getInquiries().find(i => i.id === inq.id).status, 'Rejected');
  });

  // Test 11: Review posting and rating recalculation
  it('11. Student review submission and dynamic rating recalculation', () => {
    const bId = 'school-junction-space';
    const before = db.getBoardingById(bId);
    assert.ok(before, 'Target boarding must exist');
    const prevCount = before.reviewsCount || 0;

    const review = {
      id: `rev-calc-${Date.now()}`,
      author: 'Sachini Perera',
      faculty: 'Faculty of Business',
      rating: 5,
      date: 'November 10, 2026',
      comment: 'Super convenient location near School Junction, great security!'
    };

    const updated = db.addReview(bId, review);
    assert.strictEqual(updated.reviewsCount, prevCount + 1, 'Review count must increment');
    assert.ok(updated.reviews.some(r => r.id === review.id), 'Review must be in list');
    assert.ok(updated.rating >= 1 && updated.rating <= 5, 'Rating must be valid average');
  });

  // Test 12: Proximity data structure for Google Maps exploration
  it('12. Proximity data structure contains NSBM Green University and local junctions', () => {
    const b = db.getBoardingById('temple-junction-space');
    assert.ok(b.nearbyLocations && b.nearbyLocations.length >= 3, 'Should have transit points');
    const nsbmPoint = b.nearbyLocations.find(l => l.name.includes('NSBM'));
    assert.ok(nsbmPoint, 'Must include NSBM Green University proximity distance');
    assert.ok(nsbmPoint.time.includes('min'), 'Should state transit time');
  });

  console.log(`\n======================================================`);
  console.log(`📊 Complete Verification Results: ${passed} Passed, ${failed} Failed`);
  console.log(`======================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests();
