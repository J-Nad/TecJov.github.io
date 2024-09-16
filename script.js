// Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    // Add scroll position to the cursor position
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    cursor.style.left = `${e.clientX + scrollX}px`;
    cursor.style.top = `${e.clientY + scrollY}px`;
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Navbar hide and show on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide navbar
    if (scrollTop > lastScrollTop) {
        navbar.classList.add('hide-navbar');
    } else {
        navbar.classList.remove('hide-navbar');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Project cards slide in/out effect
    
});
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; // x position within the element.
        let y = e.clientY - rect.top;  // y position within the element.
        let dx = x - rect.width / 2;
        let dy = y - rect.height / 2;
        let theta = Math.atan2(dy, dx);
        let distance = Math.min(rect.width / 2, Math.hypot(dx, dy));
        let angle = theta * 180 / Math.PI + 90;
        e.target.style.transform = `translate(${distance * Math.cos(theta) * 0.1}px, ${distance * Math.sin(theta) * 0.1}px)`;
    });

    card.addEventListener('mouseleave', (e) => {
        e.target.style.transform = ''; // Reset the transform on mouse leave
    });
});
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Elements
    const topBlackScreen = document.querySelector('.top-black-screen');
    const bottomBlackScreen = document.querySelector('.bottom-black-screen');
    const blackScreenContent = document.querySelector('.black-screen-content');

    // Calculate the progress of scrolling (0 to 1)
    const scrollProgress = scrollPosition / (documentHeight - windowHeight);

    // Adjust the height of black screens based on scroll progress
    const screenHeight = Math.min(scrollProgress * 100, 50); // Max 50vh for each screen
    topBlackScreen.style.height = `${screenHeight}vh`;
    bottomBlackScreen.style.height = `${screenHeight}vh`;

    // Show content when screens meet
    if (screenHeight >= 50) {
        blackScreenContent.style.opacity = 1;
    } else {
        blackScreenContent.style.opacity = 0;
    }
});
// Project Data
const projectData = {
    1: {
        title: "Boreaus",
        info: "Boreaus is a straightforward and easy-to-use weather website that lets users quickly check the current weather for any city around the world. Powered by a reliable weather API, the website ensures accurate, up-to-date forecasts at your fingertips. Whether you're planning your day, a trip, or just curious about the weather, Boreaus provides all the essential details in a clean, no-frills interface.",
        image: "portfolio-website.jpg" // Add actual image path here
    },
    2: {
        title: "SAT-Q",
        info: "SAT-Q is your go-to resource for realistic SAT practice. By leveraging questions from a trusted educator question bank, we provide you with a wide range of SAT practice questions formatted to match the official Bluebook style. Perfect for students aiming to improve their scores, SAT-Q is designed for personal, non-commercial use, giving you a tailored practice experience without any of the hassle.",
        image: "ml-model.jpg"
    },
    3: {
        title: "Grid Game",
        info: "Grid Game is a fresh twist on the popular word puzzle format, offering players an exciting challenge with an added layer of strategy. Like Wordle, the goal is to guess the secret word within a limited number of tries. But Grid Game gives you a helping hand—strategic hints to guide you along the way!",
        image: "game-dev.jpg"
    },
    4: {
        title: "Chat Application",
        info: "A real-time chat application built using React.js, Node.js, and WebSocket for instant messaging.",
        image: "chat-app.jpg"
    }
};

// Grabbing elements for dynamic content update
const projects = document.querySelectorAll(".project");
const projectTitle = document.getElementById("project-title");
const projectInfo = document.getElementById("project-info");
const projectImage = document.getElementById("project-image");

// Event listener for hover effect
projects.forEach(project => {
    project.addEventListener("mouseenter", (e) => {
        const projectId = e.target.getAttribute("data-project");
        const project = projectData[projectId];

        // Update project description and title
        projectTitle.textContent = project.title;
        projectInfo.textContent = project.info;
        
        // Update project image and show it with a smooth fade-in effect
        projectImage.src = project.image;
        projectImage.style.display = "block"; // Make sure image is visible
        projectImage.style.opacity = "1";
        projectImage.style.transform = "scale(1)";
    });

    project.addEventListener("mouseleave", () => {
        // Optionally reset project title and description to default
        projectImage.style.opacity = "0"; // Fade out image when hover leaves
        projectImage.style.transform = "scale(0.95)"; // Shrink the image
    });
});
// Script to dynamically update the pop-up content for each project
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseover', function() {
        const projectType = this.getAttribute('data-type');
        let content;

        // Check if it's embeddable or needs a screenshot fallback
        if (projectType === 'embed') {
            const url = this.getAttribute('data-url');
            content = `<iframe src="${url}" width="380" height="280"></iframe>`;
        } else if (projectType === 'screenshot') {
            const screenshot = this.getAttribute('data-screenshot');
            content = `<img src="${screenshot}" alt="Project Screenshot">`;
        }

        // Insert the content dynamically into the pop-up
        this.style.setProperty('--popup-content', `"${content}"`);
        this.querySelector('::before').innerHTML = content;
    });
});
window.addEventListener('scroll', function() {
    var scrollElement = document.querySelector('.scroll');
    var scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) { // Adjust this threshold as needed
      scrollElement.style.opacity = '0';
    } else {
      scrollElement.style.opacity = '1';
    }
  });
