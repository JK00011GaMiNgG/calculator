function appendCharacter(character) {
	const display = document.getElementById('display');
	if (display.textContent === '0' && character !== '.') {
		display.textContent = character;
	} else if (display.textContent === 'Error') {
		display.textContent = '';
		display.textContent += character;
	} else {
		display.textContent += character;
	}

	MathJax.typesetPromise();
	
	const scrollContainer = document.getElementById('scroll-container');
	scrollContainer.scrollLeft = scrollContainer.scrollWidth;
}

function setPage(page) {
	window.open(page, '_blank');
}

function clear_() {
	const display = document.getElementById('display');
	display.textContent = '0';

	const scrollContainer = document.getElementById('scroll-container');
	scrollContainer.scrollLeft = scrollContainer.scrollWidth;
}

function delete_() {
	const display = document.getElementById('display');
	if (display.textContent.length > 1) {
		display.textContent = display.textContent.slice(0, -1);
	} else {
		display.textContent = '0';
	}

	const scrollContainer = document.getElementById('scroll-container');
	scrollContainer.scrollLeft = scrollContainer.scrollWidth;
}

function calculate() {
	const display = document.getElementById('display');
	let expression = display.textContent;

	try {
		expression = expression.replace(/(\d)\(/g, '$1*$2');
		expression = expression.replace(/÷/g, '/');
		expression = expression.replace(/×/g, '*');
		expression = expression.replace(/π/g, 'pi');
		expression = expression.replace(/e/g, 'e');

		expression = expression.replace(/sqrt\(([^)]+)\)/g, 'sqrt($1)');
		expression = expression.replace(/root\[(\d+)\]\(([^)]+)\)/g, 'pow($2, 1/$1)');
		expression = expression.replace(/(\d+)\^\(([^)]+)\)/g, 'pow($1, $2)');
		expression = expression.replace(/([^\d])\^\(([^)]+)\)/g, 'pow($1, $2)');
		expression = expression.replace(/(\d+)\^\(([^)]+)\)/g, 'pow($1, $2)');

		console.log(expression);
		let result = math.evaluate(expression);

		if (typeof result === 'number' && !Number.isInteger(result)) {
			result = parseFloat(result.toFixed(5));
		}

		display.textContent = result;
	} catch (e) {
		console.error(e);
		display.textContent = 'Error';
	}

	const scrollContainer = document.getElementById('scroll-container');
	scrollContainer.scrollLeft = scrollContainer.scrollWidth;
}

function createStars(numStars) {
	const background = document.getElementById('background');
	for (let i = 0; i < numStars; i++) {
		const star = document.createElement('div');
		star.className = 'star';
		const size = Math.random() * 3 + 1 + 'px';
		star.style.width = size;
		star.style.height = size;
		star.style.top = Math.random() * 100 + '%';
		star.style.left = Math.random() * 100 + '%';
		background.appendChild(star);
	}
}

document.addEventListener('mousemove', (event) => {
	const x = event.clientX / window.innerWidth;
	const y = event.clientY / window.innerHeight;
	document.querySelectorAll('.star').forEach(star => {
		star.style.transform = `translate(-${x * 25}px, -${y * 25}px)`;
	});
});

createStars(150);
