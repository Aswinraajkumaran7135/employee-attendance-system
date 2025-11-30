const Attendance = require('../models/Attendance');
const User = require('../models/User'); // <-- FIX: Import User model for clarity and future role checks

// Helper to get today's date in YYYY-MM-DD format (for finding/creating records)
const getTodayDate = () => new Date().toISOString().split('T')[0];

// @desc    Check In (Start work)
// @route   POST /api/attendance/checkin
const checkIn = async (req, res) => {
  const userId = req.user.id;
  const today = getTodayDate();

  try {
    // 1. Check if already checked in today
    const existingAttendance = await Attendance.findOne({ userId, date: today });
    
    if (existingAttendance) {
      return res.status(400).json({ message: 'You have already checked in today.' });
    }

    // 2. Create new attendance record
    const attendance = await Attendance.create({
      userId,
      date: today,
      checkInTime: new Date(),
      status: 'Present'
    });

    res.status(201).json({ message: 'Checked in successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server Error during Check In', error: error.message });
  }
};

// @desc    Check Out (End work)
// @route   POST /api/attendance/checkout
const checkOut = async (req, res) => {
  const userId = req.user.id;
  const today = getTodayDate();

  try {
    // 1. Find today's active record
    const attendance = await Attendance.findOne({ userId, date: today });

    if (!attendance) {
      return res.status(400).json({ message: 'You have not checked in today. Cannot check out.' });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: 'You have already checked out today.' });
    }

    // 2. Update checkout time
    attendance.checkOutTime = new Date();

    // 3. Calculate total hours worked
    // FIX: Use .getTime() explicitly for robust calculation across all environments
    const milliseconds = attendance.checkOutTime.getTime() - attendance.checkInTime.getTime();
    const hours = milliseconds / (1000 * 60 * 60); // Convert ms to hours
    attendance.totalHours = hours.toFixed(2); // Keep 2 decimal places

    await attendance.save();

    res.status(200).json({ message: 'Checked out successfully. Hours calculated.', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server Error during Check Out', error: error.message });
  }
};

// @desc    Get current user's attendance history
// @route   GET /api/attendance/my-history
const getMyHistory = async (req, res) => {
  try {
    const history = await Attendance.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get today's status (Checked in or not?)
// @route   GET /api/attendance/today
const getTodayStatus = async (req, res) => {
  const today = getTodayDate();
  try {
    const attendance = await Attendance.findOne({ userId: req.user.id, date: today });
    res.status(200).json(attendance || null);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get ALL attendance records (Manager only view)
// @route   GET /api/attendance/all
const getAllAttendance = async (req, res) => {
  try {
    // .populate() pulls in the name/email/department from the related User ID
    const attendance = await Attendance.find()
      .populate('userId', 'name email department')
      .sort({ date: -1 });
      
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error during Manager View', error: error.message });
  }
};

module.exports = { 
  checkIn, 
  checkOut, 
  getMyHistory, 
  getTodayStatus,
  getAllAttendance 
};