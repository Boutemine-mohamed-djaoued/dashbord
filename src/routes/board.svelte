<script>
	import { onMount } from 'svelte';

	let statistics = [
		{
			icon: 'board/wallet-money 1.svg',
			content: 'Total assets',
			amount: 0,
			real: 87.743
		},
		{
			icon: 'board/chart-square 1.svg',
			content: 'Total deposits',
			amount: 0,
			real: 95.173
		},
		{
			icon: 'board/moneys 1.svg',
			content: 'APY',
			amount: 0,
			real: 12.388
		}
	];

	let time = ['1H', '1D', '3D', '1M', '1Y'];
	let activeTime = '1D';

	const handleTime = (value) => {
		activeTime = value;
	};

	let graphLines = [];

	// graphs aspects
	const graphAspects = (canvas) => {
		canvas.width = canvas.getBoundingClientRect().width;
		canvas.height = canvas.getBoundingClientRect().height;
		if (canvas.width < 600) {
			// graphLines = graphLines.slice(0, 5);
			return [canvas, 5, canvas.height / 7, canvas.width / 6, 5];
		} else return [canvas, 10, canvas.height / 7, canvas.width / 11, 26];
	};

	// canvas start
	onMount(() => {
		// Animation

		let duration = 2000;
		for (let i = 0; i < 3; i++) {
			let timer = setInterval(() => {
				statistics[i].amount += statistics[i].real / 30;
				if (statistics[i].amount > statistics[i].real) {
					statistics[i].amount = statistics[i].real;
					clearInterval(timer);
				}
			}, duration / 30);
		}

		// Animation end
		let canvas = document.querySelector('canvas');
		let c = canvas.getContext('2d');
		c.lineWidth = 1.2;
		let dlineX, dlineY, Ylines;
		let startingPartsNum;
		[canvas, Ylines, dlineY, dlineX, startingPartsNum] = graphAspects(canvas);
		let debounceTimer;
		window.addEventListener('resize', () => {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				[canvas, Ylines, dlineY, dlineX, startingPartsNum] = graphAspects(canvas);
			}, 300);
		});
		class Line {
			static graphLineWidth = 10;
			constructor(x, y, h, color) {
				this.x = x;
				this.y = y;
				this.h = h;
				this.c = color;
				this.draw = () => {
					if (this.x > 60) {
						c.fillStyle = this.c;
						c.strokeStyle = this.c;
						c.beginPath();
						c.moveTo(this.x + Line.graphLineWidth / 2, this.y - 5);
						c.lineTo(this.x + Line.graphLineWidth / 2, this.y + this.h + 5);
						c.stroke();
						c.fillRect(this.x, this.y, Line.graphLineWidth, this.h);
						c.fill();
					}
				};
			}
		}
		let start = 0;
		let end = canvas.height - 90;
		let state = true;
		let amelioration = 0.44;
		let counter = 0;
		let x = 60;
		let y1 = Math.random() * (end - start) + 40;
		let h = Math.random() * (end - start - y1);

		// initiators logic
		graphLines.push(new Line(x, y1, h, '#5CFF9C'));
		for (let i = 1; i < startingPartsNum; i++) {
			let ran = Math.random();
			if (ran > 0.5 && state) {
				state = true;
				end = y1;
				x = Line.graphLineWidth * i + 10 * i + 60;
				y1 = Math.random() * (end - start) + 40;
				h = end - y1;
			} else if (ran > 0.5) {
				state = true;
				end = y1 + h;
				start = 0;
				x = Line.graphLineWidth * i + 10 * i + 60;
				y1 = Math.random() * (end - start) + 40;
				h = end - y1;
			} else if (state) {
				state = false;
				end = canvas.height - 50;
				x = Line.graphLineWidth * i + 10 * i + 60;
				h = Math.random() * (end - start - y1);
			} else {
				state = false;
				y1 = y1 + h;
				x = Line.graphLineWidth * i + 10 * i + 60;
				h = Math.random() * (end - start - y1);
			}
			let color = state ? '#5CFF9C' : '#F00090';
			graphLines.push(new Line(x, y1, h, color));
		}
		let distance = 70;
		let startPoint;
		if (state) startPoint = y1;
		else startPoint = y1 + h;
		let pointer = startingPartsNum - 1;
		let steps = Math.random() * distance + 10;
		let dt;
		const animate = () => {
			c.clearRect(0, 0, canvas.width, canvas.height);
			requestAnimationFrame(animate);
			counter += amelioration;
			if (state) startPoint = graphLines[pointer].y;
			else startPoint = graphLines[pointer].y + graphLines[pointer].h;
			if (steps > 0) {
				if (state) {
					graphLines[pointer].h += 1;
					graphLines[pointer].y -= 1;
					if (graphLines[pointer].y < 30) {
						pointer++;
						h = 0;
						if (state) {
							state = false;
							x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
							graphLines.push(new Line(x, graphLines[pointer - 1].y, h, '#F00090'));
						} else {
							state = false;
							x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
							graphLines.push(
								new Line(x, graphLines[pointer - 1].y + graphLines[pointer - 1].h, h, '#F00090')
							);
						}
						steps = Math.random() * distance + 10;
					}
				} else {
					graphLines[pointer].h++;
					if (graphLines[pointer].h + graphLines[pointer].y > canvas.height - 50) {
						pointer++;
						let ran = Math.random();
						h = 0;
						if (state) {
							state = true;
							x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
							graphLines.push(new Line(x, graphLines[pointer - 1].y, h, '#5CFF9C'));
						} else {
							state = true;
							x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
							graphLines.push(
								new Line(x, graphLines[pointer - 1].y + graphLines[pointer - 1].h, h, '#5CFF9C')
							);
						}
						steps = Math.random() * distance + 10;
					}
				}
				steps--;
			} else {
				pointer++;
				let ran = Math.random();
				h = 0;
				if (ran > 0.5 && state) {
					state = true;
					x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
					graphLines.push(new Line(x, graphLines[pointer - 1].y, h, '#5CFF9C'));
				} else if (ran > 0.5) {
					state = true;
					x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
					graphLines.push(
						new Line(x, graphLines[pointer - 1].y + graphLines[pointer - 1].h, h, '#5CFF9C')
					);
				} else if (state) {
					state = false;
					x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
					graphLines.push(new Line(x, graphLines[pointer - 1].y, h, '#F00090'));
				} else {
					state = false;
					x = Line.graphLineWidth * pointer + 10 * pointer + 60 - counter;
					graphLines.push(
						new Line(x, graphLines[pointer - 1].y + graphLines[pointer - 1].h, h, '#F00090')
					);
				}
				steps = Math.random() * distance + 10;
			}
			c.strokeStyle = '#ff0000';
			c.beginPath();
			c.moveTo(0, startPoint);
			c.lineTo(10000, startPoint);
			c.stroke();

			if (x > canvas.width / 2 + 60) {
				if (dt == -0.0001) amelioration = 0.44;
				dt = +0.0001;
			} else {
				if (dt == +0.0001) amelioration = 0.44;
				dt = -0.0001;
			}
			amelioration += dt;
			// console.log(amelioration);
			// horisontal lines
			for (let i = 1; i <= 6; i++) {
				c.strokeStyle = '#878787';
				c.fillStyle = '#878787';
				c.font = '15px Arial';
				c.fillText(`$ ${(7 - i) * 100}`, 0, dlineY * i + 4);
				c.beginPath();
				c.moveTo(50, dlineY * i);
				c.lineTo(canvas.width, dlineY * i);
				c.stroke();
			}
			// vertical lines
			for (let i = 1; i <= Ylines; i++) {
				c.strokeStyle = '#878787';
				c.fillStyle = '#878787';
				c.font = '15px Arial';
				c.fillText(`${i + 16} Mar`, dlineX * i - 20, canvas.height - 5);
				c.beginPath();
				c.moveTo(dlineX * i, 0);
				c.lineTo(dlineX * i, canvas.height - 30);
				c.stroke();
			}
			// updating
			for (let i = 0; i < graphLines.length; i++) {
				graphLines[i].draw();
				graphLines[i].x -= amelioration;
			}
		};
		animate();
	});
	// canvas end
</script>

<div class="board bg-off-black-200 bg-opacity-60 p-5 lg:mx-5 rounded-2xl">
	<div class="statistics flex my-5">
		{#each statistics as statistic}
			<div class="md:flex flex-1 justify-center">
				<div class="bg-off-black-100 p-3 max-md:mx-auto mr-3 rounded-xl w-fit h-fit">
					<img src={statistic.icon} alt="" />
				</div>
				<div class="max-md:text-center max-md:mt-2">
					<p>{statistic.content}</p>
					<p class="text-500 font-bold">{statistic.amount.toFixed(3)}</p>
				</div>
			</div>
		{/each}
	</div>
	<h2 class="text-500 mb-5 ml-2">Portfolios performance</h2>
	<div class="flex mb-5">
		<div class="flex gap-2 items-center p-2 rounded-full bg-black w-fit cursor-pointer">
			<img class="w-7" src="chain/Frame 6 (1).svg" alt="" />
			<p>ETH</p>
			<img class="w-5" src="board/chevron-down 1.svg" alt="" />
		</div>
		<img class="ml-5 mr-auto" src="board/candle 1.svg" alt="" />
		{#each time as unit}
			<button
				on:click={() => {
					handleTime(unit);
				}}
				class:max-md:hidden={unit != '1D' && unit != '1M'}
				class:active-time={unit === activeTime}
				class="bg-off-black-100 p-2 ml-3 rounded-xl">{unit}</button
			>
		{/each}
	</div>
	<canvas class="h-[21rem] w-full md:px-5 py-5"> </canvas>
</div>

<style>
	.active-time {
		background-color: whitesmoke;
		color: black;
	}

	.board {
		z-index: 20;
		position: relative;
	}
</style>
