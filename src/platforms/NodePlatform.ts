import { Canvas, Image, createCanvas } from "canvas";
import * as fs from "fs";

import IPlatform from "./IPlatform";

export default class NodePlatform implements IPlatform {
	public name = "NODE";
	public buffers = [];
	public Image = Image;
	public Promise = Promise;

	public getBuffer(width: number, height: number, clear: boolean): Canvas {
		return createCanvas(width, height);
	}

	public freeBuffer(buffer: any): void {
		// Nothing to do
	}

	public loadAsset(img: any, path: any, loaded: any, error: any): void {
		fs.readFile(path, (err, data) => {
			if (err) {
				error();
				return;
			}
			img.src = data;
			loaded();
		});
	}

	public requestAnimationFrame(cb) {
		setImmediate(cb);
	}
}
