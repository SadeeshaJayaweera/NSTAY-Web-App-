import express from 'express';
import { db } from '../db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/boardings
// Query filters: search, category, minPrice, maxPrice, minRating, location, popularFilters, sort, page, limit
router.get('/', (req, res) => {
  try {
    let list = [...db.getBoardings()];
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      location,
      popularFilters,
      sort,
      page = 1,
      limit = 50
    } = req.query;

    // Search query
    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      list = list.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.address && item.address.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.city && item.city.toLowerCase().includes(q))
      );
    }

    // Location filter
    if (location && typeof location === 'string' && location.trim() !== '') {
      const loc = location.toLowerCase().trim();
      list = list.filter(item => 
        (item.city && item.city.toLowerCase().includes(loc)) ||
        (item.address && item.address.toLowerCase().includes(loc))
      );
    }

    // Category tab
    if (category && category !== 'Our top picks' && category !== 'all') {
      list = list.filter(item => item.category && item.category.toLowerCase() === category.toLowerCase());
    }

    // Price range
    if (minPrice && !isNaN(Number(minPrice))) {
      list = list.filter(item => item.price >= Number(minPrice));
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      list = list.filter(item => item.price <= Number(maxPrice));
    }

    // Rating filter
    if (minRating && !isNaN(Number(minRating))) {
      list = list.filter(item => item.rating >= Number(minRating));
    }

    // Popular filters
    if (popularFilters) {
      const filters = Array.isArray(popularFilters) ? popularFilters : popularFilters.split(',');
      list = list.filter(item => {
        if (!item.popularFilters || !Array.isArray(item.popularFilters)) return false;
        return filters.every(f => item.popularFilters.includes(f.trim()));
      });
    }

    // Sorting
    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    const total = list.length;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = list.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      boardings: paginated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch boardings: ' + err.message });
  }
});

// GET /api/boardings/:id
router.get('/:id', (req, res) => {
  const boarding = db.getBoardingById(req.params.id);
  if (!boarding) {
    return res.status(404).json({ error: 'Boarding accommodation not found.' });
  }
  res.json(boarding);
});

// POST /api/boardings (Create new ad)
router.post('/', (req, res) => {
  try {
    const {
      title,
      category,
      price,
      address,
      city,
      phone,
      description,
      image,
      owner
    } = req.body;

    if (!title || !price || !phone) {
      return res.status(400).json({ error: 'Title, price, and contact phone are required fields.' });
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: 'Price must be a valid positive number.' });
    }

    const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const newBoarding = {
      id: newId,
      title: title.trim(),
      category: category || 'Shared Space',
      rating: 5.0,
      reviewsCount: 1,
      price: priceNum,
      originalPrice: Math.round(priceNum * 1.15),
      discount: '15% off',
      city: city ? city.trim() : 'Homagama',
      address: address ? address.trim() : 'Near NSBM Green University, Pitipana, Homagama',
      phone: phone.trim(),
      owner: owner || 'Boarding Host',
      lat: 6.8214 + (Math.random() - 0.5) * 0.012,
      lng: 80.0416 + (Math.random() - 0.5) * 0.012,
      image: image || '/src/assets/temple_junction.png',
      gallery: [
        image || '/src/assets/temple_junction.png',
        '/src/assets/product_hero_main.png',
        '/src/assets/product_hero_bottom.png'
      ],
      description: description ? description.trim() : 'Live a little and celebrate with champagne. Rests include a glass of French champagne, parking and a late checkout.',
      longDescription: description ? description.trim() : 'Comfortable and secure student accommodation close to NSBM Green University premises.',
      popularFilters: ['Free cancellation', 'No prepayment'],
      topFacilities: [
        { name: 'Free wifi', icon: 'wifi' },
        { name: 'Air Conditioning', icon: 'wind' },
        { name: 'Parking available', icon: 'car' }
      ],
      nearbyLocations: [
        { name: 'NSBM Green University', time: '3 min drive', type: 'university' }
      ],
      rooms: [
        {
          id: `room-${Date.now()}`,
          title: `${title} Standard Room`,
          size: '300 sq ft',
          capacity: 'Sleeps 2',
          beds: '2 single beds',
          price: priceNum,
          image: image || '/src/assets/temple_junction.png',
          available: true
        }
      ],
      reviews: []
    };

    db.addBoarding(newBoarding);

    if (req.app.get('io')) {
      req.app.get('io').emit('new_boarding', newBoarding);
    }

    res.status(201).json(newBoarding);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create boarding listing: ' + err.message });
  }
});

// PUT /api/boardings/:id
router.put('/:id', (req, res) => {
  const updated = db.updateBoarding(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Boarding listing not found.' });
  }
  res.json(updated);
});

// DELETE /api/boardings/:id
router.delete('/:id', (req, res) => {
  const deleted = db.deleteBoarding(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Boarding listing not found.' });
  }
  res.json({ success: true, message: 'Boarding listing removed successfully.' });
});

// POST /api/boardings/:id/reviews
router.post('/:id/reviews', (req, res) => {
  try {
    const { author, faculty, rating, comment } = req.body;

    if (!comment || comment.trim().length < 5) {
      return res.status(400).json({ error: 'Review comment must be at least 5 characters long.' });
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 1 and 5.' });
    }

    const review = {
      id: `rev-${Date.now()}`,
      author: (author && author.trim()) || 'NSBM Student',
      faculty: faculty || 'Faculty of Computing',
      rating: ratingNum,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      comment: comment.trim()
    };

    const updatedBoarding = db.addReview(req.params.id, review);
    if (!updatedBoarding) {
      return res.status(404).json({ error: 'Boarding not found.' });
    }

    if (req.app.get('io')) {
      req.app.get('io').emit('new_review', { boardingId: req.params.id, review });
    }

    res.status(201).json(updatedBoarding);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post review: ' + err.message });
  }
});

export default router;
