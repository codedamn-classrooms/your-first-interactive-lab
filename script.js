const backgroundImage = "https://codedamn.com/assets/cover-image.svg";
const nameElement = document.querySelector("#name");
const profileImage = document.querySelector("#profile-image");
let coverImage = document.querySelector("#cover-image");
const aboutElement = document.querySelector("#about");
const dateElement = document.querySelector("#date");

async function setCoverImage(about) {
	if (about === "Learning to code on codedamn is fun & Interactive") {
		coverImage.style.backgroundImage = `url("${backgroundImage}")`;
		return undefined;
	}

	const { imageURL } = await fetch(
		`https://codedamn-labs.vercel.app/api/getCoverImage?text=${about}`
	).then((response) => response.json());

	coverImage.style.backgroundImage = `url("${imageURL}?fit=crop&crop=entropy")`;
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
}

function updateDate() {
	const MONTHS = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const currentDate = new Date();
	const currentMonth = MONTHS[currentDate.getMonth()];
	const currentYear = currentDate.getFullYear();

	const dateString = `Joined ${currentMonth} ${currentYear}`;
	dateElement.textContent = dateString;
}

setProfileImage(nameElement.textContent);
setCoverImage(aboutElement.textContent.trim());
updateDate();
