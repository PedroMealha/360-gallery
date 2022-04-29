const $STAGE = document.querySelector('#stage');
const LAYERS = 1;
const PANELS = 10;
const PANEL_WIDTH = 250;
const PANEL_HEIGHT = PANEL_WIDTH * 1.5;
const PANEL_ANGLE = 360 / PANELS;
const RADIUS = Math.round(PANEL_WIDTH / 2 / Math.tan(Math.PI / PANELS));

let l = 0;
while (l < LAYERS) {
	let pivot = document.createElement('div');
	pivot.classList.add('pivot', 'c-hv');
	$STAGE.prepend(pivot);
	l++;
}

const $PIVOT = document.querySelectorAll('.pivot');

let p = 0;
while (p < LAYERS) {
	$PIVOT[p].style.width = `${PANEL_WIDTH * (p * .2 + 1)}px`;
	$PIVOT[p].style.height = `${PANEL_HEIGHT * (p * .2 + 1)}px`;
	createSlots($PIVOT[p], p);
	p++;
}

function createSlots(pivot, i) {
	let idx = 0;
	while (idx < PANELS) {
		let o = 1 - (1 / LAYERS * i);
		let panel = document.createElement('div');
		panel.classList.add('panel');
		panel.style.width = `${PANEL_WIDTH * (i * .2 + 1)}px`;
		panel.style.height = `${PANEL_HEIGHT * (i * .2 + 1)}px`;
		panel.style.transform = `rotateY(${PANEL_ANGLE * idx}deg) translateZ(${RADIUS * (i * .5 + 1)}px)`;
		panel.style.background =
			`linear-gradient(0deg,
			rgba(34, 193, 195, ${o}) 0%,
			rgba(34, 193, 195, 1) 45%,
			rgba(34, 193, 195, 1) 55%,
			rgba(34, 193, 195, ${o}) 100%
			)`;

		pivot.append(panel);
		idx++;
	}
}

$STAGE.addEventListener('mousemove', e => {
	const BCR = $STAGE.getBoundingClientRect();
	const CENTERX = BCR.x + BCR.width / 2;
	const CENTERY = BCR.y + BCR.height / 2;
	let rX = (e.clientY - CENTERY) / CENTERY;
	let rY = (e.clientX - CENTERX) / CENTERX;

	$PIVOT.forEach(pivot => {
		// pivot.style.transform = `translate(-50%, -50%) rotateX(${rX * PANEL_HEIGHT}deg) rotateY(${rY * PANEL_WIDTH}deg)`;
		pivot.style.transform = `translate(-50%, -50%) rotateY(${rY * PANEL_WIDTH}deg)`;
	});
})