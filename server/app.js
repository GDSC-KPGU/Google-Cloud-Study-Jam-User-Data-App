

// Function to fetch badges for all profiles and update the JSON data
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const Student = require('./db'); 
const app = express();
const port=3000;
const mongoose=require('mongoose');
const cors =require('cors');
require('dotenv').config();
const cron = require('node-cron');
// Load your JSON data
const jsonData = require('./data.json');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors())
// Function to fetch and parse badges for a single profile
async function fetchBadgesForProfile(profile) {
  try {
    const response = await axios.get(profile["Google Cloud Skills Boost Profile URL"]);
    const $ = cheerio.load(response.data);

    // Find all badge elements on the page
    const badgeElements = $('.profile-badge');

    // Initialize counters for courses and GenAI Game
    let coursesCompleted = 0;
    let genAIGameCompleted = 0;

    const Courses = new Set([
      "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
      "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
      "Google Cloud Computing Foundations: Networking & Security in Google Cloud",
      "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud",
      "Create and Manage Cloud Resources",
      "Perform Foundational Infrastructure Tasks in Google Cloud",
      "Build and Secure Networks in Google Cloud",
      "Perform Foundational Data, ML, and AI Tasks in Google Cloud",
      // "Level 3: GenAI"
    ]);
    
    // ...
    
    // Initialize a set to keep track of courses completed
    const completedCourses = new Set();
    
    // Iterate through each badge element and check if badgeTitle is in Courses array
    badgeElements.each((index, element) => {
      const badgeTitle = $(element).find('.ql-subhead-1').text().trim();
    
      if (Courses.has(badgeTitle) && !completedCourses.has(badgeTitle)) {
        // The badgeTitle is in the Courses array and hasn't been counted yet
        coursesCompleted++;
        completedCourses.add(badgeTitle); // Add the course to the completed set
        console.log(coursesCompleted);
      } else if (badgeTitle.includes("Level 3: GenAI")) {
        genAIGameCompleted++;
      }
    });
    
    
    profile["# of Courses Completed"] = coursesCompleted;
    profile["# of GenAI Game Completed"] = genAIGameCompleted;
    console.log(`Processed badges for student: ${profile["Student Name"]}  ${coursesCompleted+genAIGameCompleted}`);
    console.log(profile);
    // const student = new Student({
    //   studentName: profile["Student Name"],
    //   studentEmail: profile["Student Email"],
    //   institution: profile["Institution"],
    //   enrolmentDateTime: profile["Enrolment Date & Time"],
    //   enrolmentStatus: profile["Enrolment Status"],
    //   googleCloudSkillsBoostProfileURL: profile["Google Cloud Skills Boost Profile URL"],
    //   numberOfCoursesCompleted: coursesCompleted,
    //   numberOfSkillBadgesCompleted: coursesCompleted + genAIGameCompleted,
    //   numberOfGenAIGameCompleted: genAIGameCompleted,
    //   totalCompletionsOfBothPathways: profile["Total Completions of both Pathways"],
    //   redemptionStatus: profile["Redemption Status"],
    // });

    // await student.save();

    // console.log(`Saved data for student: ${profile["Student Name"]}`);

  } catch (error) {
    console.error(`Error fetching or parsing badges for ${profile["Student Name"]}:`, error);
  }
}

// Function to fetch badges for all profiles and update the JSON data
async function fetchAndParseBadges(jsonData) {
  const profiles = jsonData["Sheet1"].slice(0, 106);
  const studentsData = [];
 
  // Process profiles one by one sequentially
  for (const profile of profiles) {
    await fetchBadgesForProfile(profile);
    studentsData.push({
      studentName: profile["Student Name"],
      studentEmail: profile["Student Email"],
      institution: profile["Institution"],
      enrolmentDateTime: profile["Enrolment Date & Time"],
      enrolmentStatus: profile["Enrolment Status"],
      googleCloudSkillsBoostProfileURL: profile["Google Cloud Skills Boost Profile URL"],
      numberOfCoursesCompleted: profile["# of Courses Completed"],
      numberOfSkillBadgesCompleted: profile["# of Courses Completed"] +  profile["# of GenAI Game Completed"],
      numberOfGenAIGameCompleted:  profile["# of GenAI Game Completed"],
      totalCompletionsOfBothPathways: profile["Total Completions of both Pathways"],
      redemptionStatus: profile["Redemption Status"],
    });
  }
  await Student.deleteMany({});
  await Student.insertMany(studentsData);

  console.log(`Saved data for ${studentsData.length} students`);

  return jsonData; // Return the updated JSON data
}
cron.schedule('0 * * * *', async () => {
  console.log('Running cron job to update data...');
  await fetchAndParseBadges(jsonData);
});


// Route to fetch and parse badges for all profiles and return as JSON
// Route to fetch and parse badges for all profiles from the database and return as JSON
app.get('/fetch-badges', async (req, res) => {
  try {
    const studentsData = await Student.find({});
    
    // Convert student data into the format you need
    const updatedData = {
      "Sheet1": studentsData.map(student => ({
        "Student Name": student.studentName,
        "Student Email": student.studentEmail,
        "Institution": student.institution,
        "Enrolment Date & Time": student.enrolmentDateTime,
        "Enrolment Status": student.enrolmentStatus,
        "Google Cloud Skills Boost Profile URL": student.googleCloudSkillsBoostProfileURL,
        "# of Courses Completed": student.numberOfCoursesCompleted,
        "# of GenAI Game Completed": student.numberOfGenAIGameCompleted,
        "Total Completions of both Pathways": student.totalCompletionsOfBothPathways,
        "Redemption Status": student.redemptionStatus
      }))
    };
    
    res.json(updatedData);
  } catch (error) {
    console.error('Error fetching and parsing badges from the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Route to fetch and parse badges for all profiles and return as JSON
