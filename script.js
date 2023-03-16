const backgroundImage = "https://codedamn.com/assets/cover-image.svg";
const name = document.querySelector("#name");
const profileImage = document.querySelector("#profile-image");
let coverImage = document.querySelector("#cover-image");
const aboutElement = document.querySelector("#about");

async function setCoverImage(about) {
	if (about === "Learning to code on codedamn is fun & Interactive") {
		coverImage.style.backgroundImage = `url("${backgroundImage}")`;
		return undefined;
	}

	const response = await fetch(
		`https://api.unsplash.com/photos/random?query=${about}&orientation=landscape&client_id=VKfNE7ps_SXcHWyvQhL6Ouziatpahe3lMditkleWa8I`
	).then((response) => response.json());
	const topics = await fetch(
		`https://api.unsplash.com/topics?client_id=RDrltY4xtGTzIL9k1AdbuuZjCJl3iqztOIBA9KChtx4`
	).then((response) => response.json());

	console.log(topics);
	console.log(coverImage.style.backgroundImage);
	console.log(response.urls.raw);
	coverImage.style.backgroundImage = `url("${response.urls.raw}fit=crop&crop=entropy")`;
	console.log(coverImage.style.backgroundImage);
}
async function setProfileImage(name) {
	if (name === "codedamn") {
		return false;
	}

	const data = await fetch(`https://api.genderize.io?name=${name}`).then(
		(response) => response.json()
	);

	const isMale = data.gender === "male";
	const profile = `https://api.dicebear.com/5.x/micah/svg?seed=${
		isMale ? "Felix" : "Aneka"
	}&backgroundColor=b6e3f4,c0aede,d1d4f9&mouth=laughing,smirk&hair=${
		isMale ? "fonze" : "full"
	}`;
	profileImage.setAttribute("src", profile);

	console.log(profileImage);
	console.log(profile);
}

setProfileImage(name.textContent);
setCoverImage(aboutElement.textContent.trim());
