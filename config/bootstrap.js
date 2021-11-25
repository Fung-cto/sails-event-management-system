/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```




  if (await Event.count() > 0) {
    return generateUsers();
  }

  await Event.createEach([

    {
      EventName: "2021 Singing Contest",
      ShortDescription: " Free to sign up to show your talent.",
      LongDescription: "Don't be shy to join. Famous singers are invited as the guests.",
      ImageURL: "https://media.istockphoto.com/photos/silhouette-of-woman-with-microphone-singing-true-concert-stage-in-front-picture-id1160645050?k=20&m=1160645050&s=612x612&w=0&h=7S3bMHxLuFX0dawyL-XnP75ZqMg7OCM0lTLfu_gL1RY=",
      Organizer: "Music Society",
      EventDate: "2021-10-27",
      StartTime: "19:00",
      EndTime: "22:00",
      Venue: "AC Hall",
      Quota: "50",
      HighlightEvent: "true",
    },

    {
      EventName: "Career talk (IT industry)",
      ShortDescription: "You may have a chance to apply the internship.",
      LongDescription: "Over 20 famous companies are invited to share their operations to you.",
      ImageURL: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/1589896/1589896-1553567023809-05f7f934118a7.jpg",
      Organizer: "Department of Computer Science",
      EventDate: "2021-10-29",
      StartTime: "14:00",
      EndTime: "17:00",
      Venue: "AC Hall",
      Quota: "200",
      HighlightEvent: "false",
    },

    {
      EventName: "Leadership Programme",
      ShortDescription: "Be an excellent leader in the future!",
      LongDescription: "Three workshops are provided to improve your leadership skills.",
      ImageURL: "https://certifind.com/blog/wp-content/uploads/2018/05/Leadership-Development-833x474.jpeg",
      Organizer: "Student Union",
      EventDate: "2021-10-30",
      StartTime: "14:00",
      EndTime: "18:00",
      Venue: "AAB306",
      Quota: "30",
      HighlightEvent: "true",
    },

    {
      EventName: "Computer Science Oday",
      ShortDescription: "Welcome to CS Department! Come to meet new friends!",
      LongDescription: "The CS Oday is organised for the CS students of 2020 entry. You will join some group activities and games with your groupmates.",
      ImageURL: "https://i.ytimg.com/vi/SzJ46YA_RaA/maxresdefault.jpg",
      Organizer: "Department of Computer Science",
      EventDate: "2021-11-01",
      StartTime: "09:30",
      EndTime: "18:30",
      Venue: "AAB306",
      Quota: "120",
      HighlightEvent: "true",
    },

    {
      EventName: "CV Writing Workshop",
      ShortDescription: "Make your CV to be more attractive?",
      LongDescription: "The experienced guest is invited to teach our students to make a perfect CV. The final-year students are in advanced to join the workshop.",
      ImageURL: "https://www.careeraddict.com/uploads/article/59408/illustration-cv-desk.jpg",
      Organizer: "Department of Computer Science",
      EventDate: "2021-11-04",
      StartTime: "11:00",
      EndTime: "13:00",
      Venue: "AAB306",
      Quota: "30",
      HighlightEvent: "false",
    },

    {
      EventName: "Visit to MTR",
      ShortDescription: "Understanding the operation of MTR.",
      LongDescription: "You can walk around MTR building and have a conversation with the CEO of MTR.",
      ImageURL: "https://lh3.googleusercontent.com/proxy/pfSFKgXnnOz4LC1HBQW9A1zgSc3DYnEFCZF0r-n4PMCO0hIUXsoRxUIkM0_1N5V4GrETmHQaMhAEGolcgAg3NQU-YWv0qIw3arX9icb_nOz6LEXzyY97qt7RAZ7LUw",
      Organizer: "Registry",
      EventDate: "2021-11-15",
      StartTime: "13:00",
      EndTime: "18:00",
      Venue: "To Be Confirmed",
      Quota: "100",
      HighlightEvent: "true",
    },

    {
      EventName: "Dance Competition 2021",
      ShortDescription: "Move your body!",
      LongDescription: "You can form a group freely to join the competition.",
      ImageURL: "https://www.dancewavescompetition.com/media/images/20170808072349_home_banner_01.jpg",
      Organizer: "Student Union",
      EventDate: "2021-11-15",
      StartTime: "16:00",
      EndTime: "20:00",
      Venue: "AC Hall",
      Quota: "100",
      HighlightEvent: "true",
    },

    {
      EventName: "Blood Donation Day",
      ShortDescription: "Help more people.",
      LongDescription: "There is no substitute for blood. In order to provide fresh blood products for treatments of patients with chronic diseases or in need of surgery because of illness or accident, we entirely count on the generosity of our blood donors to donate on a continuous basis.The collected blood will be processed into its components, followed by stringent tests for infectious diseases and bacteria before being used in various treatments.  Your single donation can help 3 or more patients, so please do not underestimate your contribution.",
      ImageURL: "https://alea.care/static/874ec7ed499e8ea1cba9cf81b1400fb4/8265d/image_1_b9cad2a342.png",
      Organizer: "Registry",
      EventDate: "2021-11-30",
      StartTime: "09:00",
      EndTime: "20:00",
      Venue: "Courtyard",
      Quota: "1000",
      HighlightEvent: "false",
    },

  ]);

  return generateUsers();


  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    var hashedPassword = await sails.helpers.passwords.hashPassword('123456');

    await User.createEach([
      { username: "admin", password: hashedPassword, role: "admin" },
      { username: "student", password: hashedPassword, role: "student" }
      // etc.
    ]);

    const admin = await User.findOne({ username: "admin" });
    const student = await User.findOne({ username: "student" });

    //await User.addToCollection(admin.id, 'clients').members(kenny.id);
    
  }


};
