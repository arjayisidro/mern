const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');

// load validation
const validateAdmissionInput = require('../../validation/admission');

const Admission = require('../../models/Admission');

// Load user model
const User = require('../../models/User');

// @route   POST api/admission/registered
// @desc    Get all admission registered
// @access  Private
router.get(
  '/registered',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Admission.find({})
      .then(student => {
        res.json(student);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/admission
// @desc    Create user admission
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAdmissionInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return errors 400 statuts
      return res.status(400).json(errors);
    }

    // Get fields
    const admissionFields = {};
    admissionFields.admissionId = req.user.id;
    if (req.body.firstName) admissionFields.firstName = req.body.firstName;
    if (req.body.lastName) admissionFields.lastName = req.body.lastName;
    if (req.body.middleName) admissionFields.middleName = req.body.middleName;

    if (req.body.sex) admissionFields.sex = req.body.sex;
    if (req.body.birthDate) admissionFields.birthDate = req.body.birthDate;
    if (req.body.civilStatus)
      admissionFields.civilStatus = req.body.civilStatus;
    if (req.body.cellNumber) admissionFields.cellNumber = req.body.cellNumber;
    if (req.body.religion) admissionFields.religion = req.body.religion;
    if (req.body.bplace) admissionFields.bplace = req.body.bplace;
    if (req.body.street) admissionFields.street = req.body.street;
    if (req.body.barangay) admissionFields.barangay = req.body.barangay;
    if (req.body.province) admissionFields.province = req.body.province;
    if (req.body.municipality)
      admissionFields.municipality = req.body.municipality;
    if (req.body.zipCode) admissionFields.zipCode = req.body.zipCode;

    if (req.body.learnersPreference)
      admissionFields.learnersPreference = req.body.learnersPreference;
    if (req.body.mothersLastName)
      admissionFields.mothersLastName = req.body.mothersLastName;

    if (req.body.mothersFirstName)
      admissionFields.mothersFirstName = req.body.mothersFirstName;
    if (req.body.mothersLastName)
      admissionFields.mothersLastName = req.body.mothersLastName;
    if (req.body.occupation) admissionFields.occupation = req.body.occupation;
    if (req.body.fathersFirstName)
      admissionFields.fathersFirstName = req.body.fathersFirstName;
    if (req.body.fathersMiddleName)
      admissionFields.fathersMiddleName = req.body.fathersMiddleName;

    if (req.body.fathersLastName)
      admissionFields.fathersLastName = req.body.fathersLastName;
    if (req.body.fatherOccupation)
      admissionFields.fatherOccupation = req.body.fatherOccupation;
    if (req.body.houseHoldIncome)
      admissionFields.houseHoldIncome = req.body.houseHoldIncome;
    if (req.body.highSchool) admissionFields.highSchool = req.body.highSchool;

    if (req.body.hsYearGraduated)
      admissionFields.hsYearGraduated = req.body.hsYearGraduated;
    if (req.body.seniorHighSchool)
      admissionFields.seniorHighSchool = req.body.seniorHighSchool;
    if (req.body.seniorYearGraduated)
      admissionFields.seniorYearGraduated = req.body.seniorYearGraduated;
    if (req.body.college) admissionFields.college = req.body.college;
    if (req.body.collegeYearGraduated)
      admissionFields.collegeYearGraduated = req.body.collegeYearGraduated;
    if (req.body.courseMajor)
      admissionFields.courseMajor = req.body.courseMajor;
    if (req.body.semesterSchoolYear)
      admissionFields.semesterSchoolYear = req.body.semesterSchoolYear;
    if (req.body.requirements)
      admissionFields.requirements = req.body.requirements;
    if (req.body.course1) admissionFields.course1 = req.body.course1;
    if (req.body.course2) admissionFields.course2 = req.body.course2;
    if (req.body.course3) admissionFields.course3 = req.body.course3;

    User.findById(req.user.id).then(user => {
      Admission.findOne({ admissionId: req.user.id })
        .then(profile => {
          if (profile) {
            errors.admissionId = 'You have been registered to admission before';
            res.status(400).json(errors);
          } else {
            // Create

            // Save profile
            new Admission(admissionFields).save().then(admission => {
              res.json(admission);
              // Generate test SMTP service account from ethereal.email
              // Only needed if you don't heeeave a real mail account for testing

              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                service: 'Gmail',
                secure: false,
                // port: 25,
                auth: {
                  user: 'tmcca.noreply@gmail.com',
                  pass: 'tmcaP@ss123'
                },
                tls: {
                  rejectUnauthorized: false
                }
              });

              // send mail with defined transport object
              transporter.sendMail({
                from:
                  '"Trece Martirez City College 👻" <tmcca.noreply@gmail.com>', // sender address
                to: user.email,
                subject: 'Welcome to Trece Martirez City College!',
                text: `Welcome, ${admissionFields.firstName}!`,
                html:
                  'Congratulations, you have successfully finish the admission process. Kindly check your email for proof of your admission and hand it at TMCC. Thank you!'
              });
            });
          }
        })
        .catch();
    });
  }
);

module.exports = router;
