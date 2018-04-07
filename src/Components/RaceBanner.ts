import {contextBoundingBox} from "../helpers";
import MinionCard from "../MinionCard";
import Sunwell from "../Sunwell";

export default class RaceBanner {
	private sunwell: Sunwell;
	private parent: MinionCard;

	constructor(sunwell: Sunwell, parent: MinionCard) {
		this.sunwell = sunwell;
		this.parent = parent;
	}

	public assets(): string[] {
		return [this.parent.raceBannerAsset];
	}

	public render(context: CanvasRenderingContext2D, ratio: number) {
		const coords = this.parent.raceBannerCoords;
		coords.ratio = ratio;
		const text = this.parent.raceText.split("");

		// Draw the banner
		this.sunwell.drawImage(context, this.parent.raceBannerAsset, coords);

		// Draw the text
		const buffer = this.sunwell.getBuffer(300, 60, true);
		const bufferCtx = buffer.getContext("2d");
		let x = 10;
		const textSize = 40;

		bufferCtx.font = textSize + "px " + this.parent.titleFont;
		bufferCtx.lineCap = "round";
		bufferCtx.lineJoin = "round";
		bufferCtx.textBaseline = "hanging";
		bufferCtx.textAlign = "left";

		const xWidth = bufferCtx.measureText("x").width;
		for (const char of text) {
			bufferCtx.lineWidth = 7;
			bufferCtx.strokeStyle = "black";
			bufferCtx.fillStyle = "black";
			bufferCtx.fillText(char, x, 10);
			bufferCtx.strokeText(char, x, 10);

			bufferCtx.fillStyle = "white";
			bufferCtx.strokeStyle = "white";
			bufferCtx.lineWidth = 1;
			bufferCtx.fillText(char, x, 10);
			// context.strokeText(char, x, y);

			x += bufferCtx.measureText(char).width;
			x += xWidth * 0.1;
		}

		const b = contextBoundingBox(bufferCtx);
		const textCoords = this.parent.raceTextCoords;

		context.drawImage(
			buffer,
			b.x,
			b.y,
			b.w,
			b.h,
			(textCoords.dx - b.w / 2) * ratio,
			(textCoords.dy - b.h / 2) * ratio,
			b.w * ratio,
			b.h * ratio
		);

		this.sunwell.freeBuffer(buffer);
	}
}