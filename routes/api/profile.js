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
    if (req.body.heiName) profileFields.heiName = req.body.heiName;
    if (req.body.heiUUI) profileFields.heiUUI = req.body.heiUUI;
    if (req.body.acadYear) profileFields.acadYear = req.body.acadYear;

    if (req.body.studentId) profileFields.studentId = req.body.studentId;
    if (req.body.emailAdd) profileFields.emailAdd = req.body.emailAdd;
    if (req.body.lastName) profileFields.lastName = req.body.lastName;
    if (req.body.givenName) profileFields.givenName = req.body.givenName;
    if (req.body.middleName) profileFields.middleName = req.body.middleName;
    if (req.body.sex) profileFields.sex = req.body.sex;
    if (req.body.birthDate) profileFields.birthDate = req.body.birthDate;
    if (req.body.completeProgramName)
      profileFields.completeProgramName = req.body.completeProgramName;
    if (req.body.yearLevel) profileFields.yearLevel = req.body.yearLevel;
    if (req.body.mothersLastName)
      profileFields.mothersLastName = req.body.mothersLastName;
    if (req.body.mothersGivenName)
      profileFields.mothersGivenName = req.body.mothersGivenName;
    if (req.body.mothersMiddleName)
      profileFields.mothersMiddleName = req.body.mothersMiddleName;
    if (req.body.fathersLastName)
      profileFields.fathersLastName = req.body.fathersLastName;
    if (req.body.fathersGivenName)
      profileFields.fathersGivenName = req.body.fathersGivenName;
    if (req.body.fathersMiddleName)
      profileFields.fathersMiddleName = req.body.fathersMiddleName;
    if (req.body.streetAndBarangay)
      profileFields.streetAndBarangay = req.body.streetAndBarangay;
    if (req.body.townAndMunicipality)
      profileFields.townAndMunicipality = req.body.townAndMunicipality;
    if (req.body.province) profileFields.province = req.body.province;
    if (req.body.zipCode) profileFields.zipCode = req.body.zipCode;
    if (req.body.totalAssesment)
      profileFields.totalAssesment = req.body.totalAssesment;
    if (req.body.disability) profileFields.disability = req.body.disability;

    Profile.findOne({ studentId: req.body.studentId })
      .then(profile => {
        if (profile) {
          errors.studentId = 'The Student Id already registered';
          res.status(400).json(errors);
        } else {
          // Create

          // Save profile
          new Profile(profileFields).save().then(profile => {
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
              to: profileFields.emailAdd,
              subject: 'Welcome to Trece Martirez City College!',
              text: `Welcome, ${profileFields.givenName}!`,
              html:
                'This is your e-mail confirmation that you have been enrolled to Trece martirez city college!'
            });
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
