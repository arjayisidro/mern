const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Profile MOdel
const Profile = require('../../models/Profile');

// Load user model
const User = require('../../models/User');

// @route GET api/profile/search
// @desc Login User / Returning JWT Token
// @access Private
router.get(
  '/student/:studentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ studentId: req.params.studentId })
      .then(profile => {
        if (!profile) {
          errors.noStudent = 'There is no student for this Student ID.';
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find({})
      .then(student => {
        res.json(student);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this users.';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this users.';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: ' There is no profile for this user.' })
    );
});

// @route   GET api/profile/all
// @desc    Get all propfiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles.';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: 'there are no profiles' });
    });
});

// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return errors 400 statuts
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.admissionId) profileFields.admissionId = req.body.admissionId;
    if (req.body.studentName) profileFields.studentName = req.body.studentName;
    if (req.body.accountNo) profileFields.accountNo = req.body.accountNo;
    if (req.body.acadYear) profileFields.acadYear = req.body.acadYear;

    if (req.body.studentId) profileFields.studentId = req.body.studentId;
    if (req.body.studentType) profileFields.studentType = req.body.studentType;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.semester) profileFields.semester = req.body.semester;
    if (req.body.sex) profileFields.sex = req.body.sex;
    if (req.body.course) profileFields.course = req.body.course;
    if (req.body.major) profileFields.major = req.body.major;
    if (req.body.yearLevel) profileFields.yearLevel = req.body.yearLevel;
    if (req.body.totalUnits) profileFields.totalUnits = req.body.totalUnits;
    if (req.body.totalTuition)
      profileFields.totalTuition = req.body.totalTuition;
    if (req.body.totalMisc) profileFields.totalMisc = req.body.totalMisc;
    if (req.body.totalTuitionFee)
      profileFields.totalTuitionFee = req.body.totalTuitionFee;
    if (req.body.subjects)
      profileFields.subjects = JSON.parse(req.body.subjects);

    Profile.findOne({ studentId: req.body.studentId })
      .then(profile => {
        if (profile) {
          errors.studentId = 'The Student Id already registered';
          res.status(400).json(errors);
        } else {
          // Create

          // Save profile
          new Profile(profileFields)
            .save()
            .then(profile => {
              res.json(profile);
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
                to: profile.emailAdd,
                subject: 'Welcome to Trece Martirez City College!',
                text: `Welcome, ${profile.firstName}!`,
                html:
                  'This is your e-mail confirmation that you have been enrolled to Trece martirez city college!'
              });
            })
            .catch(err => {
              res.status(404).json(err);
            });
        }
      })
      .catch();
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Ssave
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      profile.education.splice(removeIndex, 1);

      // Ssave
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id }).then(() => {
      User.findOneAndDelete({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
