import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import sound from "sound-play";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { content: "Waiting for jokes", selectedCategories: [] });
});

app.post("/submit", async (req, res) => {
  try {
    const selectedCategories = req.body.categories || [];
    const selectedFlags = req.body.flags || [];

    console.log(selectedCategories);

    console.log(selectedCategories.includes("Programming"));
    let strurl = `https://v2.jokeapi.dev/joke/`;
    if (selectedCategories.length == 0) {
      strurl += "Any";
    } else if (selectedCategories.length > 0) {
      if (Array.isArray(selectedCategories)) {
        strurl += selectedCategories.join(",");
      } else {
        strurl += selectedCategories;
      }
    }

    if (selectedFlags.length > 0) {
      strurl += "?blacklistFlags=";
      if(Array.isArray(selectedFlags)){
        strurl += selectedFlags.join(",");
      } else{
        strurl += selectedFlags;
      }
    }

    const response = await axios.get(strurl);

    if (response.data.type == "single") {
      res.render("index.ejs", {
        content: response.data.joke,
        selectedCategories: selectedCategories,
        selectedFlags: selectedFlags,
      });
    } else {
      res.render("index.ejs", {
        content: response.data.setup,
        delivery: response.data.delivery,
        selectedCategories: selectedCategories,
        selectedFlags: selectedFlags,
      });
    }
    sound.play("assets/fart2.MP3");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
