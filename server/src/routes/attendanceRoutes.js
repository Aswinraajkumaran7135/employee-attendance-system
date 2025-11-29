const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  checkIn, 
  checkOut, 
  getMyHistory, 
  getTodayStatus,
  getAllAttendance 
} = require('../controllers/attendanceController');

// All routes here require the user to be logged in (protect)
router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);
router.get('/my-history', protect, getMyHistory);
router.get('/today', protect, getTodayStatus);

// Manager Route
router.get('/all', protect, getAllAttendance);

module.exports = router;